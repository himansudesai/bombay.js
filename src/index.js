import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';

import { Router } from 'express';


let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router

	console.log('++++ app about to use /');
	app.use('/', api({ config, db }));

	app.server.listen(process.env.PORT || config.port);

	console.log(`Started on port ${app.server.address().port}`);
});


var socketServer = require('http').Server(app);
var io = require('socket.io')(socketServer);

socketServer.listen(3333);
console.log('++++ connecting to socket...');
io.on('connection', function (socket) {
  setTimeout(function() {
    console.log('++++ connected.  sending...')
    socket.emit('check', { id: 'greeting' });
    socket.on('results', function (data) {
      console.log(data);
      setTimeout(function() { 
        socket.emit('check', { id: 'greeting'});
      }, 10000);
    });
  }, 250);  
});




export default app;
