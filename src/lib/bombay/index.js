
var socketServer;
var io;

export default (function() {
    var bombay = {};
    bombay.connect = function(app) {
        socketServer = require('http').Server(app);
        io = require('socket.io')(socketServer);

        var count = 0;
        socketServer.listen(3033);
        console.log('++++ connecting to socket...');
        io.on('connection', function (socket) {
            console.log('++++ connected.  sending...');
            var commands = [
                {type: 'EXISTS', css: '#quote-details'},
                {type: 'SET-INPUT-VAL', val: 'GOOG', css: 'input'},
                {type: 'CLICK', css: 'simple-http button'},
                {type: 'EXISTS', css: '#quote-details'},
                {type: 'TEXT-VAL', css: '#company-name'},
                {type: 'SET-INPUT-VAL', val: 'YHOO', css: 'input'},
                {type: 'CLICK', css: 'simple-http button'},
                {type: 'TEXT-VAL', css: '#company-name'},
                {type: 'SET-INPUT-VAL', val: 'A', css: 'input'},
                {type: 'CLICK', css: 'simple-http button'},
                {type: 'TEXT-VAL', css: '#company-name'},
                {type: 'SET-INPUT-VAL', val: 'C', css: 'input'},
                {type: 'CLICK', css: 'simple-http button'},
                {type: 'TEXT-VAL', css: '#company-name'},
                {type: 'SET-INPUT-VAL', val: 'SPY', css: 'input'},
                {type: 'CLICK', css: 'simple-http button'},
                {type: 'TEXT-VAL', css: '#company-name'},
            ];
            setTimeout(function() {
                var command = commands.shift();
                socket.emit('bom-do', { command: command });
                console.log('++++ sent command ' + JSON.stringify(command));
                socket.on('RESULTS', function (data) {
                console.log(data);
                command = commands.shift();
                if (command) {
                    socket.emit('bom-do', { command: command } );
                console.log('++++ sent command ' + JSON.stringify(command));
                } else {
                    process.exit();
                }
                });
            }, 250);  
        });
    }
    return bombay;
})();
