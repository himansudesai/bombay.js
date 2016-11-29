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

export default app;
