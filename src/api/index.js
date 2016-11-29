import { version } from '../../package.json';
import { Router } from 'express';


export default ({ config, db }) => {
	let api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	console.log('++++ ' + config.endpoints.length + ' endpoints declared');
	for (var i=0; i<config.endpoints.length; i++) {
		var endpoint = config.endpoints[i];
		if (endpoint.method == 'GET') {
			console.log('      __ GET on ' + endpoint.url);
			api.get('/' + endpoint.url, (req, res) => {
				res.json({ 'greeting': 'hello' });
			});
		} else if (endpoint.method == 'POST') {
			console.log('      __ POST on ' + endpoint.url);
			api.post('/' + config.endpoints[i].url, (req, res) => {
				res.json({ 'parting': 'goodbye' });
			});
		}
	}

	return api;
}
