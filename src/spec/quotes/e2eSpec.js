import E2EHelper from './e2eHelper';

describe('JavaScript addition operator', function () {

  var helper = new E2EHelper();

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
    bombay.server.connect().then(function () {
      return bombay.client.exists('#quote-details');
    }).then(function (results) {
      // expect(results).toBe(false);
      return bombay.client.setInputVal('GOOG', 'input');
    }).then(function (results) {
      endpoint = bombay.server.configureEndpoint('GET', 'v1/public/yql');
      endpoint.resetPromises();
      return bombay.client.click('simple-http button', 250);
    }).then(function(clickResults) {
      return endpoint.getIncomingRequest();
    }).then(function(req) {
      var symbol = helper.parseStockSymbol(req);
      expect(symbol).toBe('GOOG');
      return endpoint.respond(helper.generateResponse(symbol));
    }).then(function() {
      endpoint.resetPromises();
      return bombay.client.exists('#quote-details');
    }).then(function (results) {
      expect(results).toBe(true);
      return bombay.client.getTextVal('#company-name', 500);
    }).then(function (results) {
      expect(results).toEqual('Alphabet Inc.');
      return bombay.client.setInputVal('SPY', 'input');
    }).then(function (results) {
      return bombay.client.click('simple-http button', 250);
    }).then(function(clickResults) {
      return endpoint.getIncomingRequest();
    }).then(function(req) {
      var symbol = helper.parseStockSymbol(req);
      expect(symbol).toBe('SPY');
      return endpoint.respond(helper.generateResponse(symbol));
    }).then(function (results) {
      return bombay.client.getTextVal('#company-name', 1500);
    }).then(function (results) {
      expect(results).toEqual('SPDR S&P 500');
      done();
    }).catch(function (err) {
      console.log('++++ Unexpected error in spec.  ' + err + '\nExiting...');
      expect(err).toBe(undefined);
      done(-1);
    });
  })

})
