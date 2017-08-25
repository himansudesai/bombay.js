export default (function () {

  class Helper {

    settingsPageTests() {
      var self = this;
      var stocksEndpoint;
      var promise = new RSVP.Promise(function(resolve, reject) {    
        bombay.client.clickByDynamicSelection(self.bandSelectFunctionStr('Police')).then(function() {
          return bombay.client.getInputVal('#settings-detail #num-albums', '12');
        }).then(function(results) {
          expect(results).toEqual('12');
          return bombay.client.setInputVal('8', '#settings-detail #num-albums');
        }).then(function(results) {
          return bombay.client.clickByDynamicSelection(self.bandSelectFunctionStr('Beatles'));
        }).then(function() {
          return bombay.client.getInputVal('#settings-detail #num-albums', '12');
        }).then(function(results) {
          expect(results).toEqual('12');
          return bombay.client.clickByDynamicSelection(self.bandSelectFunctionStr('Police'));
        }).then(function(results) {
          return bombay.client.getInputVal('#settings-detail #num-albums', '8');
        }).then(function(results) {
          expect(results).toEqual('8');
          resolve();
        });   
      });
      return promise;
    }

    bandSelectFunctionStr(band) {
      var fnStr = 
        "    var  allLi = $('li.band, li.selected-band');    " +
        "    return allLi.filter(function(idx) {    " +
        "      return $(allLi[idx]).text() == '" + band + "'" +
        "    });    ";
      return fnStr;
    }
  }
  return Helper;
})();
