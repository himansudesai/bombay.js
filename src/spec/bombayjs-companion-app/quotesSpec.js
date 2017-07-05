import QuotesHelper from './quotesHelper';

describe('JavaScript addition operator', function () {

  var helper = new QuotesHelper();

  // var endpoint = 'http://localhost:3039';
  // this.http.request(endpoint + '/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22' + this.symbol + '%22)&format=json&env=http://datatables.org/alltables.env')
  beforeAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    // bombay.server.configureEndpoints(config);
  });

  it('does some bugs stuff', function (done) {
    expect(true).toBe(true);
    done();
  })

  var endpoint;

  it('does end-to-end ui testing', function (done) {
    const conn = bombay.server.connect();
    console.log('conn = ' + conn);
    conn.then(function() {
      return bombay.client.exists('#quote-details');
    }).then(function (results) {
      // expect(results).toBe(false);
      return bombay.client.setInputVal('GOOG', 'input');
    }).then(function (results) {
      endpoint = bombay.server.configureEndpoint('GET', 'finance/info');
      return bombay.client.click('button#get-stock-quote', 250);
    }).then(function(clickResults) {
      return endpoint.getIncomingRequest();
    }).then(function(req) {
      var symbol = helper.parseStockSymbol(req);
      expect(symbol).toBe('GOOG');
      return endpoint.respondWithString(helper.generateResponse(symbol));
    }).then(function() {      
      return bombay.client.exists('#quote-details');
    }).then(function (results) {
      expect(results).toBe(true);
      return bombay.client.getTextVal('#sym', 500);
    }).then(function (results) {
      expect(results).toEqual('GOOG');
      return bombay.client.getTextVal("#pct-change", 500);
    }).then(function (results) {
      expect(results).toEqual('-0.49')
      return bombay.client.setInputVal('TSLA', 'input');
    }).then(function (results) {
      return bombay.client.click('button#get-stock-quote', 250);
    }).then(function(clickResults) {
      return endpoint.getIncomingRequest();
    }).then(function(req) {
      var symbol = helper.parseStockSymbol(req);
      expect(symbol).toBe('TSLA');
      return endpoint.respondWithString(helper.generateResponse(symbol));
    }).then(function (results) {
      return bombay.client.getTextVal('#sym', 1500);
    }).then(function (results) {
      expect(results).toEqual('TSLA');
      return bombay.client.getTextVal("#pct-change", 500);
    }).then(function (results) {
      expect(results).toEqual('1.29');
      done();
    }).catch(function (err) {
      console.log('++++ Unexpected error in spec.  ' + err + '\nExiting...');
      expect(err).toBe(undefined);
      done(-1);
    });
  })

})
