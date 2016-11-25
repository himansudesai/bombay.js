'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _facets = require('./facets');

var _facets2 = _interopRequireDefault(_facets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// mount the facets resource
	api.use('/facets', (0, _facets2.default)({ config: config, db: db }));

	// perhaps expose some API metadata at the root
	api.get('/', function (req, res) {
		res.json({ version: _package.version });
	});

	console.log('++++ ' + config.endpoints.length + ' endpoints declared');
	for (var i = 0; i < config.endpoints.length; i++) {
		var endpoint = config.endpoints[i];
		if (endpoint.method == 'GET') {
			console.log('      __ GET on ' + endpoint.url);
			api.get('/' + endpoint.url, function (req, res) {
				res.json({ 'greeting': 'hello' });
			});
		} else if (endpoint.method == 'POST') {
			console.log('      __ POST on ' + endpoint.url);
			api.post('/' + config.endpoints[i].url, function (req, res) {
				res.json({ 'greeting': 'hello' });
			});
		}
	}

	return api;
};
//# sourceMappingURL=index.js.map