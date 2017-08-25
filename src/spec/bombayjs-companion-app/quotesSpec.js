import StocksHelper from './stocksHelper';
import AlbumsHelper from './albumsHelper';
import SettingsHelper from './settingsHelper';

describe('JavaScript addition operator', function () {

  var stocksHelper = new StocksHelper();
  var albumsHelper = new AlbumsHelper();
  var settingsHelper = new SettingsHelper();

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

  it('does end-to-end ui testing', function (done) {
    const conn = bombay.server.connect();
    console.log('conn = ' + conn);
    conn.then(function() {
      return bombay.client.visit('/#/stocks');
    }).then(function() {
      return stocksHelper.stocksPageTests();
    }).then(function() {
      return bombay.client.visit('/#/settings');
    }).then(function() {
      return settingsHelper.settingsPageTests();
    }).then(function() {
      return albumsHelper.albumsPageTests();
    }).then(function() {
      done();
    }).catch(function (err) {
      console.log('++++ Unexpected error in spec.  ' + err + '\nExiting...');
      expect(err).toBe(undefined);
      done(-1);
    });
  })
})
