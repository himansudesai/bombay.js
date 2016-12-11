describe('JavaScript addition operator', function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    it('adds two numbers together', function (done) {
        setTimeout(function() {
            console.log('add test begin');
            expect(1 + 2).toEqual(3);
            console.log('add test end');
            done();
        }, 500)
    });
    it('subtracts two numbers together', function (done) {
        console.log('subtract test begin');
        expect(5 - 3).toEqual(2);
        console.log('subtract test end');
        done();
    })
    it('does actual ui testing', function (done) {
        bombay.server.connect(app).then(function() {
            console.log('333');
            return bombay.client.exists('#quote-details');
        }).then(function(results) {
            console.log('++++ success? ' + results);
            expect(results).toBe(false);
            return bombay.client.setInputVal('GOOG', 'input');
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
            expect(results).toEqual('Alphabet Inc.');
            return bombay.client.setInputVal('SPY', 'input');
        }).then(function(results) {
            return bombay.client.click('simple-http button', 250);
        }).then(function(results) {
            return bombay.client.getTextVal('#company-name', 1500);
        }).then(function(results) {
            console.log('++++ getText results = ' + results);
            expect(results).toEqual('SPDR S&P 500');
            done();
        }).catch(function(err) {
            console.log('++++ Unexpected.  ' + err + '\nExiting...');
            done(-1);
        });
    })
})


        