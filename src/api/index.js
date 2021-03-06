import { version } from '../../package.json';
import { Router } from 'express';

export default (config, db) => {
	let api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	var endpoint = config.endpoint;
	if (config.method == 'GET') {
		console.log(`[bombay.js] Configuring GET endpoint at ${config.url}`);
		api.get('/' + config.url, makeFunction(endpoint.getBody.bind(endpoint)));
	} else if (config.method == 'POST') {
		console.log(`[bombay.js] Configuring POST endpoint at ${config.url}`);
		api.post('/' + config.url, makeFunction(endpoint.getBody.bind(endpoint)));
	}
	return api;
}

function makeFunction(endpointbody) {
	var fn = function (req, res) {
		endpointbody(req, res);
	};
	return fn;
}
