export default function render(vdom, container) {
  const el = createDOM(vdom);
  container.appendChild(el);
}

function createDOM(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom);
  }

  if (vdom.type === 'Fragment') {
    const fragment = document.createDocumentFragment();
    const children = vdom.props?.children;
    if (Array.isArray(children)) {
      children.forEach((child) => fragment.appendChild(createDOM(child)));
    } else if (children != null) {
      fragment.appendChild(createDOM(children));
    }
    return fragment;
  }

  const dom = document.createElement(vdom.type);

  for (const [key, value] of Object.entries(vdom.props || {})) {
    if (key === 'children') continue;
    if (key.startsWith('on')) {
      dom.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      dom.setAttribute(key, value);
    }
  }

  const children = vdom.props?.children;
  if (Array.isArray(children)) {
    children.forEach((child) => dom.appendChild(createDOM(child)));
  } else if (children) {
    dom.appendChild(createDOM(children));
  }

  return dom;
}
