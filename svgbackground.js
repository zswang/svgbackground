(function(exportName) {
  /**
   * @file svgbackground
   *
   * Some simple SVG background generation tools.
   * @author
   *   zswang (http://weibo.com/zswang)
<<<<<<< HEAD
   * @version 0.0.14
   * @date 2016-10-17
=======
   * @version 0.0.12
   * @date 2016-07-21
>>>>>>> origin/master
   */
  var exports = exports || {};
  /*<function name="rhombusBackgrounds">*/
/**
 * 菱形花纹背景
 *
 * @param {HTMLElement|String} selector 选择器或 HTML 对象
 * @param {Object|Number=} radius 半径，默认: 100
 * @example rhombusBackgrounds():base
  ```html
  <div></div>
  <div></div>
  ```
  ```js
  svgbackground.rhombusBackgrounds('div');
  console.log(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
  // > true
  console.log(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(2)').style.backgroundImage));
  // > true
  ```
 * @example rhombusBackgrounds():none
  ```js
  svgbackground.rhombusBackgrounds('');
  ```
 * @example rhombusBackgrounds():radius => 50
  ```html
  <div></div>
  ```
  ```js
  svgbackground.rhombusBackgrounds('div', 50);
  console.log(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
  // > true
  ```
 * @example rhombusBackgrounds():radius => {radius: 50}
  ```html
  <div></div>
  ```
  ```js
  svgbackground.rhombusBackgrounds('div', {radius: 50});
  console.log(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
  // > true
  ```
 */
function rhombusBackgrounds(dom, radius) {
  if (!dom) {
    return;
  }
  if (typeof dom === 'string') {
    [].slice.apply(document.querySelectorAll(dom)).forEach(function(element) {
      rhombusBackgrounds(element, radius);
    });
    return;
  }
  if (typeof radius === 'object') {
    radius = radius.radius;
  }
  radius = radius || 100;
  /**
   * 添加一个三角形
   *
   * @param {Array} center 中心坐标
   * @param {Boolean} reversed 是否颠倒
   * @returns {string} 返回 svg 形状
   */
  function addShape(center, reversed) {
    var a = [
      (center[0] + Math.cos(0) * radius).toFixed(2),
      (center[1] + Math.sin(0) * radius).toFixed(2),
    ];
    var b = [
      (center[0] + Math.cos((reversed ? -0.5 : 0.5) * Math.PI) * radius).toFixed(2),
      (center[1] + Math.sin((reversed ? -0.5 : 0.5) * Math.PI) * radius).toFixed(2),
    ];
    var c = [
      (center[0] + Math.cos(Math.PI) * radius).toFixed(2),
      (center[1] + Math.sin(Math.PI) * radius).toFixed(2),
    ];
    var color = 'rgba(255,255,255,' + ((10 + Math.random() * 20) / 100).toFixed(2) + ')';
    return '<path d="M' + a + 'L' + b + 'L' + c + 'Z" fill="' + color + '" stroke="none" />';
  }
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">';
  var size = 800 / radius;
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      svg += addShape([x * radius * 2 + radius, y * radius * 2 + radius], false);
      svg += addShape([x * radius * 2 + radius, y * radius * 2 + radius], true);
      svg += addShape([x * radius * 2, y * radius * 2], false);
      svg += addShape([x * radius * 2, y * radius * 2], true);
    }
  }
  svg += '</svg>';
  dom.style.backgroundImage = 'url(data:image/svg+xml;base64,' + btoa(svg) + ')';
}
/*</function>*/
  exports.rhombusBackgrounds = rhombusBackgrounds;
  /*<function name="xiangqiBackgrounds">*/
/**
 * 象棋底纹
 *
 * @param {HTMLElement|String} selector 选择器或 HTML 对象
 * @param {Object} options
 */
function xiangqiBackgrounds(dom, options) {
  if (!dom) {
    return;
  }
  if (typeof dom === 'string') {
    [].slice.apply(document.querySelectorAll(dom)).forEach(function(element) {
      xiangqiBackgrounds(element, options);
    });
    return;
  }
  options = options || {};
  var color = options.color || 'black';
  var pieceWidth = options.pieceWidth || 50;
  var pieceHeight = options.pieceHeight || 50;
  var width = pieceHeight * 9;
  var height = pieceHeight * 10;
  var lines = [];
  // 横线
  for (var y = 0; y < 10; y++) {
    lines.push([[0, y] ,[8, y]]);
  }
  // 左右竖线
  lines.push([[0, 0] ,[0, 9]]);
  lines.push([[8, 0] ,[8, 9]]);
  // 上下竖线
  for (var x = 1; x < 8; x++) {
    lines.push([[x, 0] ,[x, 4]]);
    lines.push([[x, 5] ,[x, 9]]);
  }
  // 上面王宫
  lines.push([[3, 0] ,[5, 2]]);
  lines.push([[5, 0] ,[3, 2]]);
  // 下面王宫
  lines.push([[3, 9 - 0] ,[5, 9 - 2]]);
  lines.push([[5, 9 - 0] ,[3, 9 - 2]]);
  /**
   * 添加标记点
   *
   * @param {Number} x
   * @param {Number} y
   */
  function addHashes(x, y) {
    if (x > 0) {
      lines.push([[x - 0.1, y - 0.1], [x - 0.3, y - 0.1]]);
      lines.push([[x - 0.1, y + 0.1], [x - 0.3, y + 0.1]]);
      lines.push([[x - 0.1, y - 0.1], [x - 0.1, y - 0.3]]);
      lines.push([[x - 0.1, y + 0.1], [x - 0.1, y + 0.3]]);
    }
    if (x < 8) {
      lines.push([[x + 0.1, y - 0.1], [x + 0.3, y - 0.1]]);
      lines.push([[x + 0.1, y + 0.1], [x + 0.3, y + 0.1]]);
      lines.push([[x + 0.1, y - 0.1], [x + 0.1, y - 0.3]]);
      lines.push([[x + 0.1, y + 0.1], [x + 0.1, y + 0.3]]);
    }
  }
  addHashes(1, 2);
  addHashes(7, 2);
  addHashes(1, 9 - 2);
  addHashes(7, 9 - 2);
  for (var i = 0; i < 5; i++) {
    addHashes(i * 2, 3);
    addHashes(i * 2, 6);
  }
  lines.push([
    [-0.25, -0.25], [-0.25, 9.25],
    [8.25, 9.25], [8.25, -0.25],
    [-0.25, -0.25]
  ]);
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '">';
  var d = '';
  lines.forEach(function (line) {
    line.forEach(function (pos) {
      pos[0] += 0.5;
      pos[1] += 0.5;
      pos[0] *= pieceWidth;
      pos[1] *= pieceHeight;
    });
    d += 'M' + line.join('L');
  });
  svg += '<path d="' + d + '" fill="none" stroke="' + color + '" />'
  svg += '</svg>';
  dom.style.backgroundImage = 'url(data:image/svg+xml;base64,' + btoa(svg) + ')';
}
/*</function>*/
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