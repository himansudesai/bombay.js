import { version } from '../../package.json';
import { Router } from 'express';


export default (config, db ) => {
	console.log('++++ api index.js config = ' + JSON.stringify(config));
	console.log('++++ api index.js ' + config.endpoints.length + ' endpoints declared');


	let api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	for (var i=0; i<config.endpoints.length; i++) {
		var endpoint = config.endpoints[i];
		if (endpoint.method == 'GET') {
			console.log(`[bombay.js] Configuring GET endpoint at ${endpoint.url}`);
			api.get('/' + endpoint.url, (req, res) => {
				res.json({ 'greeting': 'hello' });
			});
		} else if (endpoint.method == 'POST') {
			console.log(`[bombay.js] Configuring POST endpoint at ${endpoint.url}`);			
			api.post('/' + config.endpoints[i].url, (req, res) => {
				res.json({ 'parting': 'goodbye' });
			});
		}
	}

	return api;
}
