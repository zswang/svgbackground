var svgbackground = require('../');


describe("src/svgbackground.js", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  var jsdom = require('jsdom');
  

  it("jsdom@rhombusBackgrounds():base", function (done) {
    jsdom.env("    <div></div>\n    <div></div>", {
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
          
  it("rhombusBackgrounds():base", function () {
    examplejs_printLines = [];
    svgbackground.rhombusBackgrounds('div');

    examplejs_print(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];

    examplejs_print(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(2)').style.backgroundImage));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("rhombusBackgrounds():none", function () {
    examplejs_printLines = [];
    svgbackground.rhombusBackgrounds('');
  });
          
  it("jsdom@rhombusBackgrounds():radius => 50", function (done) {
    jsdom.env("    <div></div>", {
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
          
  it("rhombusBackgrounds():radius => 50", function () {
    examplejs_printLines = [];
    svgbackground.rhombusBackgrounds('div', 50);
    examplejs_print(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("jsdom@rhombusBackgrounds():radius => {radius: 50}", function (done) {
    jsdom.env("    <div></div>", {
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
          
  it("rhombusBackgrounds():radius => {radius: 50}", function () {
    examplejs_printLines = [];
    svgbackground.rhombusBackgrounds('div', {radius: 50});
    examplejs_print(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
});
         