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

module.exports = rhombusBackgrounds;