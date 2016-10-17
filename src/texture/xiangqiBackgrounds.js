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

module.exports = xiangqiBackgrounds;