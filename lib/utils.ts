export function isObject(variable) {
  return Object.prototype.toString.call(variable) === '[object Object]';
}

export const ui = { hasTouch: false, scrollbarWidth: 0 };

function getScrollbarWidth() {
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute('style', 'width: 100px; overflow: scroll; visibility: hidden;');
  document.body.appendChild(scrollDiv);
  const width = scrollDiv[`offsetWidth`] - scrollDiv[`clientWidth`];
  document.body.removeChild(scrollDiv);
  return width;
}

if (typeof document !== 'undefined') {
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      ui.hasTouch = 'ontouchstart' in window;
      ui.scrollbarWidth = getScrollbarWidth();
    }
  };
}
