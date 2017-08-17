var url = require('url');


export default (function () {

  class Helper {

    parseStockSymbol(req) {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      var str = query.q;
      var stock = str.substring(7);
      return stock;
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

  }

  return Helper;
})();
