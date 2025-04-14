import { createDOM } from './render';

export function diff(prevNode, nextNode, parentDom) {
  if (typeof prevNode === 'string' || typeof prevNode === 'number') {
    if (typeof nextNode === 'string' || typeof nextNode === 'number') {
      if (prevNode !== nextNode) {
        const textNode = document.createTextNode(nextNode);
        parentDom.replaceChild(textNode, parentDom.firstChild);
      }
    } else {
      parentDom.replaceChild(createDOM(nextNode), parentDom.firstChild);
    }
    return;
  }

  if (typeof nextNode === 'string' || typeof nextNode === 'number') {
    const textNode = document.createTextNode(nextNode);
    parentDom.replaceChild(textNode, prevNode.dom);
    return;
  }

  if (!prevNode) {
    parentDom.appendChild(createDOM(nextNode));
    return;
  }

  if (!nextNode) {
    parentDom.removeChild(prevNode.dom);
    return;
  }

  if (prevNode.type !== nextNode.type) {
    parentDom.replaceChild(createDOM(nextNode), prevNode.dom);
    return;
  }

  const dom = (nextNode.dom = prevNode.dom);
  updateAttributes(dom, prevNode.props, nextNode.props);
  updateChildren(prevNode.props?.children, nextNode.props?.children, dom);
}

function updateAttributes(dom, prev = {}, next = {}) {
  for (const key in prev) {
    if (!(key in next)) {
      dom.removeAttribute(key);
    }
  }

  for (const [key, value] of Object.entries(next)) {
    if (key === 'children') continue;
    if (key.startsWith('on') && typeof value === 'function') {
      dom[key] = value;
      dom.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      dom[key] = value;
    }
  }
}

function updateChildren(prevChildren, nextChildren, parentDom) {
  const prev = Array.isArray(prevChildren) ? prevChildren : [prevChildren];
  const next = Array.isArray(nextChildren) ? nextChildren : [nextChildren];

  const max = Math.max(prev.length, next.length);

  for (let i = 0; i < max; i++) {
    const prevChild = prev[i];
    const nextChild = next[i];

    if (prevChild == null) {
      const newChild = createDOM(nextChild);
      parentDom.appendChild(newChild);
      continue;
    }

    if (nextChild == null) {
      const domToRemove =
        typeof prevChild === 'object' && prevChild?.dom
          ? prevChild.dom
          : parentDom.childNodes[i];

      if (domToRemove) {
        parentDom.removeChild(domToRemove);
      }

      continue;
    }

    diff(prevChild, nextChild, parentDom);
  }
}
