var svgbackground = require('../');


describe("src/texture/squaredBackgrounds.js", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  var jsdom = require('jsdom');
  

  it("jsdom@squaredBackgrounds():base", function (done) {
    jsdom.env("  <div></div>\n  <div></div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["btoa","document"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("squaredBackgrounds():base", function () {
    examplejs_printLines = [];
  svgbackground.squaredBackgrounds('div');

  examplejs_print(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];

  examplejs_print(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(2)').style.backgroundImage));
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("squaredBackgrounds():none", function () {
    examplejs_printLines = [];
  svgbackground.squaredBackgrounds('');
  });
          
  it("jsdom@squaredBackgrounds():size => 50", function (done) {
    jsdom.env("  <div></div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["btoa","document"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("squaredBackgrounds():size => 50", function () {
    examplejs_printLines = [];
  svgbackground.squaredBackgrounds('div', 50);
  examplejs_print(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("jsdom@squaredBackgrounds():size => {size: 50}", function (done) {
    jsdom.env("  <div></div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["btoa","document"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("squaredBackgrounds():size => {size: 50}", function () {
    examplejs_printLines = [];
  svgbackground.squaredBackgrounds('div', {size: 50});
  examplejs_print(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
});
         