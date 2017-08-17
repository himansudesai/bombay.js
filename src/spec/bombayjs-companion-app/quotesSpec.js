import StocksHelper from './stocksHelper';
import AlbumsHelper from './albumsHelper';

describe('JavaScript addition operator', function () {

  var stocksHelper = new StocksHelper();
  var albumsHelper = new AlbumsHelper();

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

  var stocksEndpoint, albumsEndpoint;

  it('does end-to-end ui testing', function (done) {
    const conn = bombay.server.connect();
    console.log('conn = ' + conn);
    conn.then(function() {
      return bombay.client.visit('/#/stocks');
    }).then(function() {
     return bombay.client.setInputVal('GOOG', 'input');
    }).then(function (results) {
      stocksEndpoint = bombay.server.configureEndpoint('GET', 'finance/info');
      return bombay.client.click('button#get-stock-quote', 250);
    }).then(function(clickResults) {
      return stocksEndpoint.getIncomingRequest();
    }).then(function(req) {
      var symbol = stocksHelper.parseStockSymbol(req);
      expect(symbol).toBe('GOOG');
      return stocksEndpoint.respondWithString(stocksHelper.generateResponse(symbol));
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
      var symbol = stocksHelper.parseStockSymbol(req);
      expect(symbol).toBe('TSLA');
      return stocksEndpoint.respondWithString(stocksHelper.generateResponse(symbol));
    }).then(function (results) {
      return bombay.client.getTextVal('#sym', 'TSLA');
    }).then(function (results) {
      expect(results).toEqual('TSLA');
      return bombay.client.getTextVal("#pct-change", '1.29');
    }).then(function (results) {
      expect(results).toEqual('1.29');
      return bombay.client.visit('/#/settings');
    }).then(function() {
      return bombay.client.clickByDynamicSelection(bandSelectFunctionStr('Police'));
    }).then(function() {
      return bombay.client.getInputVal('#settings-detail #num-albums', '12');
    }).then(function(results) {
      expect(results).toEqual('12');
      return bombay.client.setInputVal('8', '#settings-detail #num-albums');
    }).then(function(results) {
      return bombay.client.clickByDynamicSelection(bandSelectFunctionStr('Beatles'));
    }).then(function() {
      return bombay.client.getInputVal('#settings-detail #num-albums', '12');
    }).then(function(results) {
      expect(results).toEqual('12');
      return bombay.client.clickByDynamicSelection(bandSelectFunctionStr('Police'));
    }).then(function(results) {
      return bombay.client.getInputVal('#settings-detail #num-albums', '8');
    }).then(function(results) {
      expect(results).toEqual('8');
      albumsEndpoint = bombay.server.configureEndpoint('GET', 'albums');
      return bombay.client.click('#update-button', 2000);
    }).then(function(results) {
      return albumsEndpoint.getIncomingRequest();
    }).then(function(req) {
      var requestParameters = albumsHelper.parseBandAndAlbumCount(req);
      expect(requestParameters.band).toBe('Beatles');
      expect(requestParameters.albumCount).toBe('12');
      return albumsEndpoint.respondWithJson(albumsHelper.generateResponse(requestParameters.band, requestParameters.albumCount));
    }).then(function(req) {
      return bombay.client.count('album-comp', 12);
    }).then(function(results) {
      expect(results).toBe(12);
      return bombay.client.setSelectByDisplayValue('#band', 'Bangles');
    }).then(function() {
      return albumsEndpoint.getIncomingRequest();
    }).then(function(req) {
      var requestParameters = albumsHelper.parseBandAndAlbumCount(req);
      expect(requestParameters.band).toBe('Bangles');
      expect(requestParameters.albumCount).toBe('12');
      return albumsEndpoint.respondWithJson(albumsHelper.generateResponse(requestParameters.band, requestParameters.albumCount));
    }).then(function(results) {
      return bombay.client.count('album-comp', 12);
    }).then(function(results) {
      expect(results).toBe(12);
      done();
    }).catch(function (err) {
      console.log('++++ Unexpected error in spec.  ' + err + '\nExiting...');
      expect(err).toBe(undefined);
      done(-1);
    });
  })
})

function bandSelectFunctionStr(band) {
  var fnStr = 
    "    var  allLi = $('li.band, li.selected-band');    " +
    "    return allLi.filter(function(idx) {    " +
    "      return $(allLi[idx]).text() == '" + band + "'" +
    "    });    ";
  return fnStr;
}



