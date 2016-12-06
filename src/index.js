import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import { Router } from 'express';
import bombay from './lib/bombay';
global['RSVP'] = require('rsvp');


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
console.log('++++ db initialized ');
	// internal middleware
	app.use(middleware({ config, db }));

  // endpoints
	app.use('/', api({ config, db }));

	app.server.listen(process.env.PORT || config.port);

	console.log(`Started on port ${app.server.address().port}`);

  bombay.server.connect(app).then(function() {
    return bombay.client.exists('#quote-details');
  }).then(function(results) {
    console.log('++++ "#quote-details" exists = ' + results);
    return bombay.client.setInputVal('GOOG', 'input');
  }).then(function(results) {
    return bombay.client.click('simple-http button');
  }).then(function(results) {
    return bombay.client.exists('#quote-details');
  }).then(function(results) {
    console.log('++++ "#quote-details" exists = ' + results);
    return bombay.client.getTextVal('#company-name');
  }).then(function(results) {
    console.log('++++ getText results = ' + results);    
    return bombay.client.setInputVal('SPY', 'input');
  }).then(function(results) {
    return bombay.client.click('simple-http button');
  }).then(function(results) {
    return bombay.client.getTextVal('#company-name');
  }).then(function(results) {
    console.log('++++ getText results = ' + results);
  }).catch(function(err) {
    console.log('++++ ERROR connecting to socket.  Exiting... ' + err);
    process.exit();
  })
});

export default app;
