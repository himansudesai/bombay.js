var url = require('url');


export default (function () {

  const texas = 'Texas';
  const joke = 'Crime does not pay - unless you are an undertaker following Walker, Texas Ranger, on a routine patrol.';

  class Helper {

    parseJokeCategory(req) {
      var url_parts = url.parse(req.url, true);
      return url_parts.query.query;
    }

    generateResponse(category) {
      var mockJoke = {
        "total": 1,
        "result": [
          {
            "category": null,
//            "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
            "id": "fwnuhljktgw4vj7ra0axow",
//            "url": "http://api.chucknorris.io/jokes/fwnuhljktgw4vj7ra0axow",
            "value": joke
          }
        ]
      };
      return JSON.stringify(mockJoke);
    }

    jokesPageTests() {
      var self = this;
      var jokesEndpoint;
      var promise = new RSVP.Promise(function(resolve, reject) {

        bombay.client.setInputVal('input', texas)
        
        .then(function (results) {

          jokesEndpoint = bombay.server.configureEndpoint('GET', 'jokes');
          return bombay.client.click('button#get-jokes', 250);

        }).then(function(clickResults) {

          return jokesEndpoint.getIncomingRequest();

        }).then(function(req) {

          var category = self.parseJokeCategory(req);
          expect(category).toBe(texas);
          return jokesEndpoint.respondWithString(self.generateResponse(category));

        }).then(function() {

          return bombay.client.exists('#joke');

        }).then(function (results) {

          expect(results).toBe(true);
          return bombay.client.getTextVal('#joke', joke);

        }).then(function (results) {

          expect(results.trim()).toEqual(joke);
          resolve();

        }).catch(function (err) {
          console.log('++++ Unexpected error on Jokes page - ' + err);
          reject('++++ Unexpected error on Jokes page - ' + err);
        });
      });
      return promise;
    }
  }

  return Helper;
})();
