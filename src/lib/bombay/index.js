
var socketServer;
var io;

export default (function () {
  var bombay = {
    client: {},
    server: {
        socket: undefined
    }
  };
  bombay.server.connect = function (app, cb) {
    console.log('++++ beginning - socket = ' + bombay.server.socket);
    var promise = new RSVP.Promise(function (resolve, reject) {
        socketServer = require('http').Server(app);
        io = require('socket.io')(socketServer);

        var count = 0;
        socketServer.listen(3033);
        console.log('++++ connecting to socket...');
        io.on('connection', function (socket) {
            console.log('++++ connected!');
            bombay.server.socket = socket;
            setTimeout(function() {
              resolve();
            }, 500);
        });
    });
    return promise;
  }

  bombay.assertEquals = function(src, tar) {
    if (src == tar) {
      return true;
    } else {
      throw new Error(src + ' is not equal to ' + tar);
    }
  }

  bombay.client.exists = function (css) {
    var promise = new RSVP.Promise(function (resolve, reject) {
      var msgId = new Date().getTime();
      bombay.server.socket.emit('bom-do', { command: { type: 'EXISTS', css: css, msgId: msgId } });
      bombay.server.socket.on(msgId, function (data) {
        resolve(data.details); 
      });
    });
    return promise;
  }

  bombay.client.click = function (css) {
    var promise = new RSVP.Promise(function (resolve, reject) {
      var msgId = new Date().getTime();
      bombay.server.socket.emit('bom-do', { command: { type: 'CLICK', css: css, msgId: msgId }});
      bombay.server.socket.on(msgId, function (data) {
        resolve(data.details); 
      });
    });
    return promise;
  }

  bombay.client.setInputVal = function (val, css) {
    var promise = new RSVP.Promise(function (resolve, reject) {
      var msgId = new Date().getTime();
      bombay.server.socket.emit('bom-do', { command: { type: 'SET-INPUT-VAL', val: val, css: css, msgId: msgId }});
      bombay.server.socket.on(msgId, function (data) {
        resolve(data.details); 
      });
    });
    return promise;
  }

  bombay.client.getTextVal = function (css) {
    var promise = new RSVP.Promise(function (resolve, reject) {
      var msgId = new Date().getTime();
      bombay.server.socket.emit('bom-do', { command: { type: 'TEXT-VAL', css: css, msgId: msgId }});
      bombay.server.socket.on(msgId, function (data) {
        resolve(data.details); 
      });
    });
    return promise;
  }

  return bombay;
})();
