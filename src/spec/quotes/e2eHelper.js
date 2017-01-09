var url = require('url');


export default (function () {

  class Helper {

    parseStockSymbol(req) {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      var str = query.q;
      var re = /(.*)IN(.*)\("(\w+)"\)(.*)/;
      var stock = str.replace(re, "$3");
      return stock;
    }

    generateResponse(symbol) {
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
      switch(symbol) {
        case 'GOOG':
            mockQuote.query.results.quote.Name = 'Alphabet Inc.';
            mockQuote.query.results.quote.symbol = 'GOOG';
            break;
        case 'SPY':
            mockQuote.query.results.quote.Name = 'SPDR S&P 500';
            mockQuote.query.results.quote.symbol = 'SPY';
            break;
        default:
      }
      return mockQuote;
    }

  }

  return Helper;
})();
