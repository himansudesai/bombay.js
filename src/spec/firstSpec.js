describe('JavaScript addition operator', function () {

    var config = {
        "port": 3039,
        "bodyLimit": "100kb",
        "corsHeaders": ["Link"],
        "endpoints": [
            {
                "url": "v1/public/yql",
                "method": "GET"
            },
            {
                "url": "greeting",
                "method": "GET"
            },
            {
                "url": "parting",
                "method": "POST"
            }
        ]
    };

    // var endpoint = 'http://localhost:3039';
    // this.http.request(endpoint + '/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22' + this.symbol + '%22)&format=json&env=http://datatables.org/alltables.env')

    beforeAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
        bombay.server.configureEndpoints(config);
    });
    it ('does some bugs stuff', function(done) {
        expect(true).toBe(true);
        done();
    })

/*
    it('does end-to-end ui testing', function (done) {
        bombay.server.connect().then(function() {
            return bombay.client.exists('#quote-details');
        }).then(function(results) {
            // expect(results).toBe(false);
            return bombay.client.setInputVal('SPY', 'input');
        }).then(function(results) {
            return bombay.client.click('simple-http button', 250);
        }).then(function(results) {
            return bombay.client.exists('#quote-details');
        }).then(function(results) {
            console.log('++++ "#quote-details" exists = ' + results);
            expect(results).toBe(true);
            return bombay.client.getTextVal('#company-name', 500);
        }).then(function(results) {
            console.log('++++ getText results = ' + results);  
            expect(results).toEqual('SPDR S&P 500');
            return bombay.client.setInputVal('GOOG', 'input');
        }).then(function(results) {
            return bombay.client.click('simple-http button', 250);
        }).then(function(results) {
            return bombay.client.getTextVal('#company-name', 1500);
        }).then(function(results) {
            console.log('++++ getText results = ' + results);
            expect(results).toEqual('Alphabet Inc.');
            done();
        }).catch(function(err) {
            console.log('++++ Unexpected.  ' + err + '\nExiting...');
            done(-1);
        });
    })
*/
})


        