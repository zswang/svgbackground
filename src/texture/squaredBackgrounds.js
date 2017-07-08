/*<function name="squaredBackgrounds">*/
/**
 * 菱形花纹背景
 *
 * @param {HTMLElement|String} selector 选择器或 HTML 对象
 * @param {Object|Number=} size 半径，默认: 100
 * @example squaredBackgrounds():base
  ```html
  <div></div>
  <div></div>
  ```
  ```js
  svgbackground.squaredBackgrounds('div');

  console.log(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
  // > true

  console.log(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(2)').style.backgroundImage));
  // > true
  ```
 * @example squaredBackgrounds():none
  ```js
  svgbackground.squaredBackgrounds('');
  ```
 * @example squaredBackgrounds():size => 50
  ```html
  <div></div>
  ```
  ```js
  svgbackground.squaredBackgrounds('div', 50);
  console.log(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
  // > true
  ```
 * @example squaredBackgrounds():size => {size: 50}
  ```html
  <div></div>
  ```
  ```js
  svgbackground.squaredBackgrounds('div', {size: 50});
  console.log(/data:image\/svg\+xml/.test(document.querySelector('div:nth-of-type(1)').style.backgroundImage));
  // > true
  ```
 */
function squaredBackgrounds(dom, size) {
  if (!dom) {
    return;
  }
  if (typeof dom === 'string') {
    [].slice.apply(document.querySelectorAll(dom)).forEach(function(element) {
      squaredBackgrounds(element, size);
    });
    return;
  }
  if (typeof size === 'object') {
    size = size.size;
  }

  size = size || 100;

  /**
   * 添加一个正方形
   *
   * @param {Array} position 中心坐标
   * @returns {string} 返回 svg 形状
   */
  function addShape(position) {
    var color = 'rgba(255,255,255,' + ((10 + Math.random() * 20) / 100).toFixed(2) + ')';
    return '<path d="M' + position + 'v ' + size + ' h ' + size + ' v -' + size + ' z" fill="' + color + '" stroke="none" />';
  }

  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">';
  var count = 800 / size;
  for (var y = 0; y < count; y++) {
    for (var x = 0; x < count; x++) {
      svg += addShape([x * size, y * size]);
    }
  }
  svg += '</svg>';

  dom.style.backgroundImage = 'url(data:image/svg+xml;base64,' + btoa(svg) + ')';
}
/*</function>*/

module.exports = squaredBackgrounds;