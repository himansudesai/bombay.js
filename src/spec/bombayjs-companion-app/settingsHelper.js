export default (function () {
  const greeting = 'Howdy';
  const eight = '8';
  const twelve = '12';

  class Helper {
  
    settingsPageTests() {
      var self = this;
      var postEndpoint;
      var promise = new RSVP.Promise(function(resolve, reject) {    

        bombay.client.clickByDynamicSelection(self.bandSelectFunctionStr('Bangles'))

        .then(function() {

          return bombay.client.getInputVal('#settings-detail #num-albums', twelve);

        }).then(function(results) {

          expect(results).toEqual(twelve);
          return bombay.client.setInputVal('#settings-detail #num-albums', eight);

        }).then(function(results) {

          return bombay.client.clickByDynamicSelection(self.bandSelectFunctionStr('Beatles'));

        }).then(function() {

          return bombay.client.getInputVal('#settings-detail #num-albums', twelve);

        }).then(function(results) {

          expect(results).toEqual(twelve);
          return bombay.client.clickByDynamicSelection(self.bandSelectFunctionStr('Bangles'));

        }).then(function(results) {

          return bombay.client.getInputVal('#settings-detail #num-albums', eight);

        }).then(function(results) {

          expect(results).toEqual(eight);

        }).then(function() {

          return bombay.client.setInputVal('#post-param', greeting);

        }).then(function() {

          postEndpoint = bombay.server.configureEndpoint('POST', 'postit');
          return bombay.client.click('#post-button');

        }).then(function(results) {

          return postEndpoint.getIncomingRequest();

        }).then(function(req) {

          expect(req.body.greeting).toEqual(greeting);
          return postEndpoint.respondWithJson(JSON.stringify({"resonse": "hello to you as well!"}));

        }).then(function(req) {
          resolve();
        })   
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

