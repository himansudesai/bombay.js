
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
    console.log('++++ in the beginning - socket = ' + bombay.server.socket);
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
        setTimeout(function () {
          resolve();
        }, 500);
      });
    });
    return promise;
  }

  bombay.assertEquals = function (src, tar) {
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
      bombay.server.socket.emit('bom-do', { command: command });
      bombay.server.socket.on(msgId, function (data) {
        resolve(data.details);
      });
    });
    return promise;
  }

  bombay.client.clickByDynamicSelection = function (fn, wait) {
    var promise = new RSVP.Promise(function (resolve, reject) {
      var msgId = new Date().getTime();
      var command = { type: 'CLICK-JS', fn: fn, msgId: msgId };
      if (wait) {
        command.wait = wait;
      }
      bombay.server.socket.emit('bom-do', { command: command });
      bombay.server.socket.on(msgId, function (data) {
        resolve(data.details);
      });
    });
    return promise;
  }

  bombay.client.setInputVal = function (val, css) {
    var promise = new RSVP.Promise(function (resolve, reject) {
      var msgId = new Date().getTime();
      bombay.server.socket.emit('bom-do', { command: { type: 'SET-INPUT-VAL', val: val, css: css, msgId: msgId } });
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
      bombay.server.socket.emit('bom-do', { command: command });
      bombay.server.socket.on(msgId, function (data) {
        resolve(data.details);
      });
    });
    return promise;
  }

    bombay.client.getInputVal = function (css, wait) {
    var promise = new RSVP.Promise(function (resolve, reject) {
      var msgId = new Date().getTime();
      var command = { type: 'INPUT-VAL', css: css, msgId: msgId };
      if (wait) {
        command.wait = wait;
      }
      bombay.server.socket.emit('bom-do', { command: command });
      bombay.server.socket.on(msgId, function (data) {
        resolve(data.details);
      });
    });
    return promise;
  }

  bombay.client.visit = function (url, wait) {
    var promise = new RSVP.Promise(function (resolve, reject) {
      var msgId = new Date().getTime();
      var command = { type: 'VISIT', url: url, msgId: msgId };
      if (wait) {
        command.wait = wait;
      }
      bombay.server.socket.emit('bom-do', { command: command });
      bombay.server.socket.on(msgId, function (data) {
        resolve(data.details);
      });
    });
    return promise;
  }

  bombay.server.bom_it = function (description, cb) {
    var promise = new RSVP.Promise(function (resolve, reject) {
      it(description, function () {
        var res = cb();
        resolve(res);
      })
    });
    return promise;
  }

  bombay.server.configureEndpoints = function (cc) {
    var app = bombay.expressConfig.app;
    var db = bombay.expressConfig.expressDB;
    var api = bombay.expressConfig.router;
    console.log('++++ bombay.server.configureEndpoints - config = ' + JSON.stringify(cc));
    app.use('/', api(cc, db));
  }

  bombay.server.configureEndpoint = function (httpMethod, url) {
    var app = bombay.expressConfig.app;
    var db = bombay.expressConfig.expressDB;
    var api = bombay.expressConfig.router;

    var endpoint = {
      waitForInspectRequestCommand: undefined, // promise
      inspectRequestCommandReceived: undefined, // resolve promise
      waitForRespondCommand: undefined, // promise
      respondCommandReceived: undefined, // resolve promise
      getRequest: undefined, // promise
      resolveRequest: undefined, // resolve promise
      getResponse: undefined, // promise
      resolveResponse: undefined // resolve promise
    };

    endpoint.resetPromises = function() {
      endpoint.waitForInspectRequestCommand = new RSVP.Promise(function(resolve, reject) {
        endpoint.inspectRequestCommandReceived = resolve;
      });
      endpoint.waitForRespondCommand = new RSVP.Promise(function(resolve, reject) {
        endpoint.respondCommandReceived = resolve;
      });
      endpoint.getRequest = new RSVP.Promise(function(resolve, reject) {
        endpoint.resolveRequest = resolve;
      });
      endpoint.getResponse = new RSVP.Promise(function(resolve, reject) {
        endpoint.resolveResponse = resolve;
      });
    }

    endpoint.getBody = function(req, res) {
      endpoint.ress = res;
      endpoint.waitForInspectRequestCommand.then(function() {
        endpoint.resolveRequest(req);
        return endpoint.waitForRespondCommand;
      }).then(function() {
        // var response = { 'parting': 'goodbye' };
        endpoint.resolveResponse();
      }).catch(function (err) {
        var errStr = '++++ Unexpected error in endpoint.getBody() ' + err;
        console.log(errStr);
        throw new Error(errStr);
      })
    }

    endpoint.getIncomingRequest = function() {
      var p = new RSVP.Promise(function(resolve, reject) {
        endpoint.inspectRequestCommandReceived();
        endpoint.getRequest.then(function(req) {
          resolve(req);
        }).catch(function (err) {
          console.log('++++ Unexpected error in getIncomingRequest.  ' + err);
          throw err;
        });
      });
      return p;
    }

    endpoint.respondWithJson = function(resp) {
      var p = new RSVP.Promise(function(resolve, reject) {
        endpoint.respondCommandReceived();
        endpoint.getResponse.then(function() {
          resolve(resp);
          endpoint.ress.json(resp);
        }).catch(function (err) {
          console.log('++++ Unexpected error in respond.  ' + err);
          throw err;
        });
      });
      return p;
    }

    endpoint.respondWithString = function(resp) {
      var p = new RSVP.Promise(function(resolve, reject) {
        endpoint.respondCommandReceived();
        endpoint.getResponse.then(function() {
          resolve(resp);
          endpoint.ress.send(resp);
          endpoint.resetPromises();
        }).catch(function (err) {
          console.log('++++ Unexpected error in respond.  ' + err);
          throw err;
        });
      });
      return p;
    }

    app.use('/', api({
      endpoint: endpoint,
      url: url,
      method: httpMethod
    }, db));

    endpoint.resetPromises();
    return endpoint;
  }

  return bombay;
})();
