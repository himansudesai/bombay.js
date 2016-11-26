var attemptNumber = 0;
function connect(url) {
    attemptNumber++;
    var socket = io.connect(url, {
    reconnection: false
    });
    setTimeout(function() {
    if (!socket.connected) {
        console.log('++++ Unable to connect on attempt ' + attemptNumber + '.  Retrying in 10 seconds');
        setTimeout(function() {
        connect(url);
        }, 10000);
    } else {
        console.log('++++ Able to connect on attempt ' + attemptNumber);
        socket.on('disconnect', function() {
        console.log('============= DISCONNECTED ===============');
        attemptNumber = 0;
        connect(url);
        });
        socket.on('check', function (data) {
        console.log(JSON.stringify(data));
        socket.emit('results', { id: data.id, value: 'WORKING!' });
        });
    }
    }, 250);
}
connect('http://localhost:3033');

