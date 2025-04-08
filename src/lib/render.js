export default function render(vdom, container) {
  const el = createDOM(vdom);
  container.appendChild(el);
}

function createDOM(vdom) {
  if (vdom === null || vdom === undefined || typeof vdom === 'boolean') {
    return null;
  }

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
    if (key === 'style' && typeof value === 'object') {
      Object.assign(dom.style, value);
    } else if (key.startsWith('on')) {
      dom.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      dom.setAttribute(key, value);
    }
  }

  const children = vdom.props?.children;
  if (Array.isArray(children)) {
    children.forEach((child) => {
      const childDOM = createDOM(child);
      if (childDOM) dom.appendChild(childDOM);
    });
  } else if (children != null) {
    const childDOM = createDOM(children);
    if (childDOM) dom.appendChild(childDOM);
  }

  return dom;
}
