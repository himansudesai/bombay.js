  var retry = 0;
  var socket;
  function connect(url) {
    retry++;
    socket = io.connect( url, { reconnection: false } );
    setTimeout(function() {
      if (!socket.connected) {
        if ((retry % 10) == 0) {
          log('Unable to connect (' + retry + ').  Retrying in 2 seconds');
        }
        setTimeout(function() { connect(url) }, 2000);
      } else {
        log('Connected on attempt (' + retry + ')');
        socket.on('disconnect', function() { retry = 0; connect(url) });
        socket.on('bom-do', function (data) {
          log('got bom-do message'); 
          bomDo(data); 
        });
      }
    }, 250);
  }
  connect('http://localhost:3033');

  function bomDo(data) {
    var command = data.command;
    log('++++ bomDo command = ' + JSON.stringify(command));
    if (command.type == 'SET-INPUT-VAL') {
      var domEle = $(command.css);
      if (domEle.length < 1) {
        socket.emit(command.msgId, { command: command, success: false, details: 'No matching elements for ' + command.css });
      } else {
        var currentVal = $(domEle).val();
        // clear out the current contents of the input field
        for (var val_i=0; val_i<currentVal.length; val_i++) {
          $(domEle).sendkeys ('{backspace}');
        }
        $(domEle).sendkeys (command.val);
        socket.emit(command.msgId, { command: command, success: true });
      }
    }
    if (command.type == 'CLICK') {
      var domEle = $(command.css);
      $(domEle).click();
      socket.emit(command.msgId, { command: command, success: true });
    }
    if (command.type == 'CLICK-JS') {
      var fnStr = command.fn;
      var fn = new Function(fnStr);
      var domEle = fn();
      $(domEle).click();
      socket.emit(command.msgId, { command: command, success: true });
    }
    if (command.type == 'EXISTS') {
      repeatAsNecessary(function() {
        var domElements = $(command.css);
        return {
          val: domElements.length > 0,
          done: (domElements.length > 0 ? true: false)
        };
      }, function(exists) {
        socket.emit(command.msgId, {command: command, details: exists});
      });
    }
    if (command.type == 'TEXT-VAL') {
      repeatAsNecessary(function() {
        var domEle = $(command.css);
        var text = $(domEle).text();      
         return {
          val: text,
          done: (text == command.expectedVal ? true: false)
        };
      }, function(val) {
        socket.emit(command.msgId, {command: command, details: val});
      });
    }
    if (command.type == 'INPUT-VAL') {
      repeatAsNecessary(function() {
        var domEle = $(command.css);
        var text = $(domEle).val();
         return {
          val: text,
          done: (text == command.expectedVal ? true: false)
        };
      }, function(val) {
        socket.emit(command.msgId, {command: command, details: val});
      });
    }
    if (command.type == 'VISIT') {
      window.location = command.url;
      socket.emit(command.msgId, {command: command, details: ''});
    }
    if (command.type == 'COUNT') {
      repeatAsNecessary(function() {
        var domElements = $(command.css);
        return {
          val: domElements.length,
          done: (domElements.length == command.expectedCount ? true: false)
        };
      }, function(length) {
        socket.emit(command.msgId, {command: command, details: length});
      });
    }
    if (command.type == 'SELECT-BY-DISPLAY-VALUE') {
      var selectElement = $(command.css);
      if (selectElement.length > 0) {
        var opts = $("" + command.css + " option");
        var idx = -1;
        for (var i=0; i<opts.length; i++) {
          if ($(opts[i]).text() == command.val) {
            idx = i;
          }
        }
        if (idx >= 0) {
          $(command.css).val($(opts[idx]).val());
          var nativeEvent = document.createEvent('Event');
          nativeEvent.initEvent('change', true, true);
          $(command.css)[0].dispatchEvent(nativeEvent);
        }
        socket.emit(command.msgId, {command: command, details: {success: true, error: undefined}});
      } else {
        socket.emit(command.msgId, {command: command, details: {error: 'Select element with css ' + command.css + ' does not exist'}});
      }
    }
    if (command.type == 'SELECT-BY-OPTION-VALUE') {
      var selectElement = $(command.css);
      if (selectElement.length < 1) {
        var val = command.val;
        var opts = $("" + command.css + " option");
        var idx = -1;
        for (var i=0; i<opts.length; i++) {
          if (opts[i].val() == val) {
            idx = i;
          }
        }
        if (idx >= 0) {
          var nativeEvent = document.createEvent('Event');
          nativeEvent.initEvent('change', true, true);
          $(selectElement)[0].dispatchEvent(nativeEvent);
        }
        socket.emit(command.msgId, {command: command, details: {success: true, error: undefined}});
      } else {
        socket.emit(command.msgId, {command: command, details: {error: 'Select element with css ' + command.css + ' does not exist'}});
      }
    }
  }

  function log(msg) {
    console.log('++++ ' + msg);
  }

  function repeatAsNecessary(doBlock, returnBlock) {
    var delays = [0, 250, 250, 1000, 2000];
    var idx = 0;
    setTimeoutAndPeformDoBlock();

    function setTimeoutAndPeformDoBlock() {
      setTimeout(function() {
        idx++;
        result = doBlock();
        if ( result.done || (idx >= delays.length) ) {
          returnBlock(result.val);
        } else {
          setTimeoutAndPeformDoBlock();
        }
      }, delays[idx]);
    }

  }