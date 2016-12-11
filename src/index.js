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
global['bombay'] = bombay;
global['bom_it'] = bombay.server.bom_it;


let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

global['app'] = app;

var JasmineLib = require('jasmine');
var jasmine = new JasmineLib();

jasmine.loadConfig({
    spec_dir: __dirname + '/spec',
    spec_files: [
        'utils/**/*[sS]pec.js'
    ],
    helpers: [
        'helpers/**/*.js'
    ],
    stopSpecOnExpectationFailure: false,
    random: false
});

jasmine.configureDefaultReporter({
    timer: new jasmine.jasmine.Timer(),
    print: function() {
        process.stdout.write(util.format.apply(this, arguments));
    },
    showColors: true,
    jasmineCorePath: jasmine.jasmineCorePath
});

// connect to db
initializeDb( db => {
console.log('++++ db initialized ');
	// internal middleware
	app.use(middleware({ config, db }));

    // endpoints
	app.use('/', api({ config, db }));

	app.server.listen(process.env.PORT || config.port);

	console.log(`Started on port ${app.server.address().port}`);

  jasmine.addSpecFile(__dirname + '/spec/fooSpec.js');
  jasmine.execute();
});

export default app;
