var svgbackground = require('../');


describe("src/texture/xiangqiBackgrounds.js", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  var jsdom = require('jsdom');
  

  it("jsdom@xiangqiBackgrounds():base", function (done) {
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
          
  it("xiangqiBackgrounds():base", function () {
    examplejs_printLines = [];
  svgbackground.xiangqiBackgrounds('div');

  examplejs_print(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];

  examplejs_print(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(2)').style.backgroundImage));
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("xiangqiBackgrounds():none", function () {
    examplejs_printLines = [];
  svgbackground.xiangqiBackgrounds('');
  });
          
  it("jsdom@xiangqiBackgrounds():options", function (done) {
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
          
  it("xiangqiBackgrounds():options", function () {
    examplejs_printLines = [];
  svgbackground.xiangqiBackgrounds('div', { color: 'gray', pieceWidth: 40, pieceHeight: 43 });

  examplejs_print(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
});
         