(function(exportName) {

  /*<jdists encoding="ejs" data="../package.json">*/
  /**
   * @file <%- name %>
   *
   * <%- description %>
   * @author
       <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
   *   <%- item.name %> (<%- item.url %>)
       <% }); %>
   * @version <%- version %>
       <% var now = new Date() %>
   * @date <%- [
        now.getFullYear(),
        now.getMonth() + 101,
        now.getDate() + 100
      ].join('-').replace(/-1/g, '-') %>
   */
  /*</jdists>*/

  var exports = exports || {};

  /*<jdists encoding="fndep" import="texture/rhombusBackgrounds.js" depend="rhombusBackgrounds">*/
  var rhombusBackgrounds = require('./texture/rhombusBackgrounds');
  /*</jdists>*/
  exports.rhombusBackgrounds = rhombusBackgrounds;

  /*<jdists encoding="fndep" import="texture/xiangqiBackgrounds.js" depend="xiangqiBackgrounds">*/
  var xiangqiBackgrounds = require('./texture/xiangqiBackgrounds');
  /*</jdists>*/
  exports.xiangqiBackgrounds = xiangqiBackgrounds;

  if (typeof define === 'function') {
    if (define.amd) {
      define(function() {
        return exports;
      });
    }
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  } else {
    window[exportName] = exports;
  }

})('svgbackground');