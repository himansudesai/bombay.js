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

  bombay.server.connect(app).then(function() {
    return bombay.client.exists('#quote-details');
  }).then(function(results) {
    console.log('++++ "#quote-details" exists = ' + results);
    bombay.assertEquals(results, false);
    return bombay.client.setInputVal('GOOG', 'input');
  }).then(function(results) {
    return bombay.client.click('simple-http button');
  }).then(function(results) {
    return bombay.client.exists('#quote-details');
  }).then(function(results) {
    console.log('++++ "#quote-details" exists = ' + results);
    bombay.assertEquals(results, true);
    return bombay.client.getTextVal('#company-name', 500);
  }).then(function(results) {
    console.log('++++ getText results = ' + results);  
    bombay.assertEquals(results, 'Alphabet Inc.');
    return bombay.client.setInputVal('SPY', 'input');
  }).then(function(results) {
    return bombay.client.click('simple-http button');
  }).then(function(results) {
    return bombay.client.getTextVal('#company-name', 500);
  }).then(function(results) {
    console.log('++++ getText results = ' + results);
    bombay.assertEquals(results, 'SPDR S&P 500');
    jasmine.addSpecFile(__dirname + '/spec/fooSpec.js');
  jasmine.execute();
    process.exit();
  }).catch(function(err) {
    console.log('++++ Unexpected.  ' + err + '\nExiting...');
    process.exit();
  })
});

export default app;
