    var retry = 0;
    var socket;
    function connect(url) {
      retry++;
      socket = io.connect( url, { reconnection: false } );
      setTimeout(function() {
        if (!socket.connected) {
          log('++++ Unable to connect ' + retry + '.  Retrying in 10 seconds');
          setTimeout(function() { connect(url) }, 10000);
        } else {
          log('++++ Connected on attempt ' + retry);
          socket.on('disconnect', function() { retry = 0; connect(url) });
          socket.on('bom-do', function (data) { bomDo(data) });
        }
      }, 250);
    }
    connect('http://localhost:3033');

    function bomDo(data) {
      var command = data.command;
      console.log('++++ command = ' + JSON.stringify(command));
      if (command.type == 'SET-INPUT-VAL') {
        console.log('++++ command.css = ' + command.css);
        var domEle = $(command.css);
        if (!domEle) {
          socket.emit('RESULTS', { command: command, success: false, details: 'No matching elements for ' + command.css });
        } else {
          var currentVal = $(domEle).val();
          // clear out the current contents of the input field
          for (var val_i=0; val_i<currentVal.length; val_i++) {
          console.log('      _ backspacing...');
            $(domEle).sendkeys ('{backspace}');
          }
          console.log('     _ sending ' + command.val);
          $(domEle).sendkeys (command.val);
          console.log('      _ sent!');
          socket.emit('RESULTS', { command: command, success: true });
        }
      }
      if (command.type == 'CLICK') {
        var domEle = $(command.css);
        console.log('    _ domEle = ' + domEle);
        $(domEle).click();
        socket.emit('RESULTS', { command: command, success: true });
      }
      if (command.type == 'EXISTS') {
        setTimeout(function() {
          var domEle = $(command.css);
          console.log('++++ EXISTS ' + command.css + ' domEle = ' + domEle.length);
          socket.emit('RESULTS', {command: command, details: ((domEle.length > 0) ? true : false)});
        }, 500);
      }
      console.log('~~~~ checking for TEXT-VAL');
      if (command.type == 'TEXT-VAL') {
        setTimeout(function() {
          console.log('@@@@ inside TEXT-VAL');
          var domEle = $(command.css);
          console.log('++++ length of ' + command.css + ' = ' + domEle.length);
          socket.emit('RESULTS', {command: command, details: ((domEle.length > 0) ? $(domEle).text() : '')});
        }, 1000);
      }
    }

    function log(msg) {
      console.log('++++ ' + msg);
    }
