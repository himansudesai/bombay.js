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
      console.log('++++ num commands = ' + data.commands.length);
      for (var data_i=0; data_i<data.commands.length; data_i++) {
        var command = data.commands[data_i];
        console.log('++++ command ' + data_i + ' = ' + JSON.stringify(command));
        if (command.type == 'SET-INPUT-VAL') {
          console.log('++++ command.css = ' + command.css);
          var domEle = $(command.css);
          if (!domEle) {
//            socket.emit('RESULTS', { command: command, success: false, detail: 'No matching elements for ' + command.css });
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
  //          socket.emit('RESULTS', { command: command, success: true });
          }
        }
        if (command.type == 'CLICK') {
          setTimeout(function() {
            var domEle = $(command.css);
            console.log('    _ domEle = ' + domEle);
            $(domEle[2]).click();
            socket.emit('RESULTS', { command: command, success: true });
          }, 100);
        }
      }
      var type = data.type;
      if (type == 'FIND')
      socket.emit('results', { id: data.id, value: 'WORKING!' });
    }

    function log(msg) {
      console.log('++++ ' + msg);
    }
