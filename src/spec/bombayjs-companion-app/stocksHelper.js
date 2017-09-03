var url = require('url');


export default (function () {

  class Helper {

    parseStockSymbol(req) {
      var url_parts = url.parse(req.url, true);
      return url_parts.query.q;
    }

    generateResponse(symbol) {
      var mockQuote = {
        "id": "304466804484872",
        "t": "GOOG",
        "e": "NASDAQ",
        "l": "927.13",
        "l_fix": "927.13",
        "l_cur": "927.13",
        "s": "0",
        "ltt": "4:00PM EDT",
        "lt": "May 5, 4:00PM EDT",
        "lt_dts": "2017-05-05T16:00:02Z",
        "c": "-4.53",
        "c_fix": "-4.53",
        "cp": "-0.49",
        "cp_fix": "-0.49",
        "ccol": "chr",
        "pcls_fix": "931.66"
      };
      switch(symbol) {
        case 'GOOG':
            mockQuote.t = 'GOOG';
            break;
        case 'TSLA':
            mockQuote.t = 'TSLA';
            mockQuote.cp = "1.29";
            mockQuote.cp_fix = "1.29";
            mockQuote.l = "304.32";
            break;
        default:
      }
      return '//  ' + JSON.stringify([mockQuote]);
    }

    stocksPageTests() {
      var self = this;
      var stocksEndpoint;
      var promise = new RSVP.Promise(function(resolve, reject) {
        bombay.client.setInputVal('GOOG', 'input').then(function (results) {
          stocksEndpoint = bombay.server.configureEndpoint('GET', 'finance/info');
          return bombay.client.click('button#get-stock-quote', 250);
        }).then(function(clickResults) {
          return stocksEndpoint.getIncomingRequest();
        }).then(function(req) {
          var symbol = self.parseStockSymbol(req);
          expect(symbol).toBe('GOOG');
          return stocksEndpoint.respondWithString(self.generateResponse(symbol));
        }).then(function() {      
          return bombay.client.exists('#quote-details');
        }).then(function (results) {
          expect(results).toBe(true);
          return bombay.client.getTextVal('#sym', 'GOOG');
        }).then(function (results) {
          expect(results).toEqual('GOOG');
          return bombay.client.getTextVal("#pct-change", '-0.49');
        }).then(function (results) {
          expect(results).toEqual('-0.49')
          return bombay.client.setInputVal('TSLA', 'input');
        }).then(function (results) {
          return bombay.client.click('button#get-stock-quote');
        }).then(function(clickResults) {
          return stocksEndpoint.getIncomingRequest();
        }).then(function(req) {
          var symbol = self.parseStockSymbol(req);
          expect(symbol).toBe('TSLA');
          return stocksEndpoint.respondWithString(self.generateResponse(symbol));
        }).then(function (results) {
          return bombay.client.getTextVal('#sym', 'TSLA');
        }).then(function (results) {
          expect(results).toEqual('TSLA');
          return bombay.client.getTextVal("#pct-change", '1.29');
        }).then(function (results) {
          expect(results).toEqual('1.29');
          resolve();
        });
      });
      return promise;
    }
  }

  return Helper;
})();
