export function setProperty(dom, key, value) {
  if (key === 'className') {
    dom.setAttribute('class', value);
  } else if (key === 'htmlFor') {
    dom.setAttribute('for', value);
  } else if (key === 'style' && typeof value === 'object') {
    Object.assign(dom.style, value);
  } else if (key.startsWith('on') && typeof value === 'function') {
    const event = key.slice(2).toLowerCase();
    if (typeof prevValue === 'function') {
      dom.removeEventListener(event, prevValue);
    }
    dom.addEventListener(event, value);
  } else {
    dom.setAttribute(key, value);
  }
}
