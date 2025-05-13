export default function render(vdom, container) {
  const dom = createDOM(vdom);
  if (dom) container.appendChild(dom);
}

export function createDOM(vdom) {
  if (vdom == null || typeof vdom === 'boolean') {
    return null;
  }

  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom);
  }

  const { type, props } = vdom;

  const dom =
    type === 'Fragment'
      ? document.createDocumentFragment()
      : document.createElement(type);

  setProps(dom, props);
  setChildren(dom, props?.children);
  return dom;
}

function setProps(dom, props) {
  for (const [key, value] of Object.entries(props)) {
    if (key === 'children') continue;
    if (key.startsWith('on') && typeof value === 'function') {
      const event = key.slice(2).toLowerCase();
      dom.addEventListener(event, value);
    } else if (key === 'className') {
      dom.setAttribute('class', value);
    } else if (key === 'htmlFor') {
      dom.setAttribute('for', value);
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(dom.style, value);
    } else {
      dom.setAttribute(key, value);
    }
  }
}

function setChildren(parent, children) {
  if (Array.isArray(children)) {
    children.forEach((child) => {
      const childDOM = createDOM(child);
      if (childDOM) parent.appendChild(childDOM);
    });
  } else if (children != null) {
    const childDOM = createDOM(children);
    if (childDOM) parent.appendChild(childDOM);
  }
}
