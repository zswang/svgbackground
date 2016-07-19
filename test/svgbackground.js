var svgbackground = require('../');
var jsdom = require('jsdom');

describe("src/svgbackground.js", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  it('jsdom@rhombusBackgrounds', function (done) {
    jsdom.env('',
      function (err, window) {
        global.window = window;
        global.document = window.document;
        global.atob = window.atob;
        global.btoa = window.btoa;
        // domInclude
        assert.equal(err, null);
        done();
      }
    );
  });

  it("rhombusBackgrounds", function() {
    examplejs_printLines = [];

    svgbackground.rhombusBackgrounds('body');
    examplejs_print(/data:image\/svg\+xml/.test(document.body.style.backgroundImage));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
});