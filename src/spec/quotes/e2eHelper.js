var socketServer;
var io;
var url = require('url');


export default (function () {

  class Helper {
    constructor() {
      this.ress = undefined;
      this.ticketNumber = undefined;
      this.reqq = undefined;
      this.reqqP = undefined;
      this.okToRespond = undefined;
    }

    waitForEndpointRequest(endpoint) {
      var self = this;
      var p = new RSVP.Promise(function(resolve, reject) {
          self.reqq = resolve;
      });
      this.reqqP = p;
      return p;
    }

    respond() {
      this.reqq(45);
    }

    cb(val) {
      this.ress(val);
    }

    getStock(req) {
      console.log('@@@@ Helper->getStock()');
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      var str = query.q;
      var re = /(.*)IN(.*)\("(\w+)"\)(.*)/;
      var stock = str.replace(re, "$3");
      return stock;
    }

    getResponse(symbol) {
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

    getBody (req, res) {
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
            mockQuote.query.results.quote.symbol = 'GOOG';
            break;
        case 'SPY':
            mockQuote.query.results.quote.Name = 'SPDR S&P 500';
            mockQuote.query.results.quote.symbol = 'SPY';
            break;
        default:
      }
      var self = this;
      this.reqqP.then(function(val) {
        console.log('------ reqq yielded result ' + val);
        res.json(mockQuote);
      }).catch(function(err) {
        console.log('UNEXPECTED ERROR suring reqq - ' + err);
      })
		}

  }

  return Helper;
})();
