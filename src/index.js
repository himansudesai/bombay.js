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
import jasmineUtils from './utils/jasmineUtils';
global['RSVP'] = require('rsvp');
global['bombay'] = bombay;

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use(express.static('public'));

global['app'] = app;

jasmineUtils.initializeJasmine();

// connect to db
initializeDb( db => {
//	app.use(middleware({ config, db }));

	app.server.listen(process.env.PORT || config.port);

	console.log(`[bombay.js] Started on port ${app.server.address().port}`);

	bombay.expressConfig.app = app;
	bombay.expressConfig.expressDB = db;
	bombay.expressConfig.router = api;

	jasmineUtils.executeJasmineSpecs();
});

export default app;
