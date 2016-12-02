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

  console.log('++++ bombay = ' + bombay);
  for (var att in bombay) {
    console.log('++++ bombay att ' + att);
  }
  bombay.server.connect(app, function() {
    bombay.server.sendStuffs();
  });
});

export default app;
