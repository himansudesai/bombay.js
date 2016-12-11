  var retry = 0;
  var socket;
  function connect(url) {
    retry++;
    socket = io.connect( url, { reconnection: false } );
    setTimeout(function() {
      if (!socket.connected) {
        log('Unable to connect (' + retry + ').  Retrying in 10 seconds');
        setTimeout(function() { connect(url) }, 10000);
      } else {
        log('Connected on attempt (' + retry + ')');
        socket.on('disconnect', function() { retry = 0; connect(url) });
        socket.on('bom-do', function (data) {
          console.log('got bom-do message'); 
          bomDo(data); 
        });
      }
    }, 250);
  }
  connect('http://localhost:3033');

  function bomDo(data) {
    console.log('++++ bomDo');
    var command = data.command;
    console.log('++++ command = ' + JSON.stringify(command));
    if (command.type == 'SET-INPUT-VAL') {
      console.log('++++ command.css = ' + command.css);
      var domEle = $(command.css);
      if (!domEle) {
        socket.emit(command.msgId, { command: command, success: false, details: 'No matching elements for ' + command.css });
      } else {
        var currentVal = $(domEle).val();
        // clear out the current contents of the input field
        for (var val_i=0; val_i<currentVal.length; val_i++) {
        console.log('      _ backspacing...');
          $(domEle).sendkeys ('{backspace}');
        }
        console.log('     _ sending ' + command.val);
        $(domEle).sendkeys (command.val);
        socket.emit(command.msgId, { command: command, success: true });
      }
    }
    if (command.type == 'CLICK') {
      var timeoutVal = (data.command.wait) ? data.command.wait : 250;
      var domEle = $(command.css);
      setTimeout(function() {
        $(domEle).click();
      }, timeoutVal);
      socket.emit(command.msgId, { command: command, success: true });
    }
    if (command.type == 'EXISTS') {
      var domEle = $(command.css);
      if (domEle.length < 1) {
        setTimeout(function() {
          var domEle = $(command.css);
          socket.emit(command.msgId, {command: command, details: ((domEle.length > 0) ? true : false)});
        }, 1000);
      } else {
        socket.emit(command.msgId, {command: command, details: true});
      }
    }
    if (command.type == 'TEXT-VAL') {
      var timeoutVal = (data.command.wait) ? data.command.wait : 500;
      var domEle = $(command.css);
      setTimeout(function() {
        var domEle = $(command.css);
        socket.emit(command.msgId, {command: command, details: ((domEle.length > 0) ? $(domEle).text() : '')});
      }, timeoutVal);
    }
  }

  function log(msg) {
    console.log('++++ ' + msg);
  }
