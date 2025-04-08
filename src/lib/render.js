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

  // 노드 생성
  const dom =
    vdom.type === 'Fragment'
      ? document.createDocumentFragment()
      : document.createElement(vdom.type);

  const propsKeyMap = {
    className: 'class',
    htmlFor: 'for',
  };

  // props 처리
  for (const [key, value] of Object.entries(vdom.props || {})) {
    if (key === 'children') continue;

    const actualKey = propsKeyMap[key] || key;

    if (actualKey === 'style' && typeof value === 'object') {
      Object.assign(dom.style ?? {}, value);
    } else if (actualKey.startsWith('on')) {
      dom.addEventListener(actualKey.slice(2).toLowerCase(), value);
    } else if (actualKey in dom) {
      dom[actualKey] = value;
    } else {
      dom.setAttribute?.(actualKey, value);
    }
  }

  // children 처리
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
