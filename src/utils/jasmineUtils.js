
export default (function () {
  var utils = {};

  var JasmineLib = require('jasmine');
  var jasmine = new JasmineLib();
  const fs = require('fs');

  utils.specFiles = function (dir, filelist) {
      var path = path || require('path');
      var files = fs.readdirSync(dir);
      filelist = filelist || [];
      var self = this;
      files.forEach(function(file) {
          if (fs.statSync(path.join(dir, file)).isDirectory()) {
              filelist = self.specFiles(path.join(dir, file), filelist);
          } else {
              if (file.match(/(.*)[sS]pec.js$/)) {
                  filelist.push(dir + '/' + file);
              }
          }
      });
      return filelist;
  }

  utils.initializeJasmine = function() {

    jasmine.loadConfig({
        spec_dir: '/spec',
        spec_files: [
            '**/*[sS]pec.js'
        ],
        helpers: [
            'helpers/**/*.js'
        ],
        stopSpecOnExpectationFailure: false,
        random: false
    });

    jasmine.configureDefaultReporter({
        timer: new jasmine.jasmine.Timer(),
        print: function() {
            process.stdout.write(util.format.apply(this, arguments));
        },
        showColors: true,
        jasmineCorePath: jasmine.jasmineCorePath
    });
  }

  utils.executeJasmineSpecs = function() {
    var specFiles = this.specFiles(__dirname + '/../spec');
    for (var i = 0; i < specFiles.length; i++) {
        jasmine.addSpecFile(specFiles[i]);
    }    
    jasmine.execute();
  }

  return utils;
})();

