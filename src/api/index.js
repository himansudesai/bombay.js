import { version } from '../../package.json';
import { Router } from 'express';

export default (config, db) => {
	let api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	for (var i = 0; i < config.endpointDefs.length; i++) {
		var endpoint = config.endpointDefs[i];
		if (endpoint.method == 'GET') {
			console.log(`[bombay.js] Configuring POST endpoint at ${endpoint.url}`);
			api.get('/' + endpoint.url, makeFunction(endpoint.endpoint.getBody.bind(endpoint.endpoint)));
		} else if (endpoint.method == 'POST') {
			console.log(`[bombay.js] Configuring POST endpoint at ${endpoint.url}`);
			api.post('/' + config.endpoints[i].url, (req, res) => {
				res.json({ 'parting': 'goodbye' });
			});
		}
	}
	return api;
}

function get_foo() {

}

function makeFunction(endpointbody) {
	var fn = function (req, res) {
		endpointbody(req, res);
	};
	return fn;
}
