import { createDOM } from './render';

export function diffing(prevNode, nextNode, parentDom) {
  if (diffTextNode(prevNode, nextNode, parentDom)) {
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
    const newDom = createDOM(nextNode);
    const oldDom =
      typeof prevNode === 'object' && prevNode?.dom
        ? prevNode.dom
        : parentDom.firstChild;
    if (oldDom && newDom) {
      parentDom.replaceChild(newDom, oldDom);
    }
    return;
  }

  const dom = (nextNode.dom = prevNode.dom);
  updateAttributes(dom, prevNode.props, nextNode.props);
  updateChildren(prevNode.props?.children, nextNode.props?.children, dom);
}

function diffTextNode(prevNode, nextNode, parentDom) {
  const isPrevText =
    typeof prevNode === 'string' || typeof prevNode === 'number';
  const isNextText =
    typeof nextNode === 'string' || typeof nextNode === 'number';

  if (isPrevText && isNextText) {
    if (prevNode !== nextNode) {
      const textNode = document.createTextNode(nextNode);
      parentDom.replaceChild(textNode, parentDom.firstChild);
    }
    return true;
  }

  if (isPrevText || isNextText) {
    const textNode = document.createTextNode(String(nextNode));
    const replaceTarget = isPrevText ? parentDom.firstChild : prevNode.dom;
    parentDom.replaceChild(textNode, replaceTarget);
    return true;
  }

  return false;
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

    diffing(prevChild, nextChild, parentDom);
  }
}
