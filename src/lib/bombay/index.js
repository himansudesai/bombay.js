
var socketServer;
var io;

export default (function () {
  var bombay = {
    client: {},
    server: {
        socket: undefined
    },
    expressConfig: {}
  };
  bombay.server.connect = function () {
    console.log('++++ beginning - socket = ' + bombay.server.socket);
    var app = bombay.expressConfig.app;
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

  bombay.client.click = function (css, wait) {
    var promise = new RSVP.Promise(function (resolve, reject) {
      var msgId = new Date().getTime();
      var command = { type: 'CLICK', css: css, msgId: msgId };
      if (wait) {
        command.wait = wait;
      }
      bombay.server.socket.emit('bom-do', { command: command});
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

  bombay.client.getTextVal = function (css, wait) {
    var promise = new RSVP.Promise(function (resolve, reject) {
      var msgId = new Date().getTime();
      var command = { type: 'TEXT-VAL', css: css, msgId: msgId };
      if (wait) {
        command.wait = wait;
      }
      bombay.server.socket.emit('bom-do', { command: command});
      bombay.server.socket.on(msgId, function (data) {
        resolve(data.details); 
      });
    });
    return promise;
  }

  bombay.server.bom_it = function (description, cb) {
    console.log('aaaa inside bom_it');
    var promise = new RSVP.Promise(function (resolve, reject) {
      console.log('aaaa inside promise of bom_it');
      it(description, function() {
        console.log('aaaa inside jasmine it');
        var res = cb();
        console.log('aaaa after cb()');
        resolve(res);
      })
    });
    console.log('aaaa initial promise return');
    return promise;
  }

  bombay.server.configureEndpoints = function(cc) {
    var app = bombay.expressConfig.app;
    var db = bombay.expressConfig.expressDB;
    var api = bombay.expressConfig.router;
    console.log('++++ bombay.server.configureEndpoints - config = ' + JSON.stringify(cc));
    	app.use('/', api(cc, db));
  }

  return bombay;
})();
