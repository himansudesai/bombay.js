var socketServer;
var io;
var url = require('url');


export default (function () {

  var helper = {

		ress: undefined,
	
		cb: function(val) {
			this.ress(val);
		},

		ticketNumber: undefined,

		sendQuote: function(req, res) {
					var mockQuote = {
						"query": {
							"count": 1,
							"results": {
								"quote": {
									"symbol": "SPY",
									"Ask": "226.30",
									"Bid": "226.17",
									"LastTradePriceOnly": "226.51",
									"PercentChange": "+0.60%",
									"Name": "SPDR S&P 500"
								}
							}
						}
					};

					var url_parts = url.parse(req.url, true);
					var query = url_parts.query;
					var str = query.q;
					var re = /(.*)IN(.*)\("(\w+)"\)(.*)/;
					var stock = str.replace(re, "$3");
					switch(stock) {
						case 'GOOG':
								mockQuote.query.results.quote.Name = 'Alphabet Inc.';
								break;
						case 'SPY':
								break;
						default:
				}
				res.json(mockQuote);
				this.cb(this.ticketNumber);
		}
  };

  return helper;
})();
