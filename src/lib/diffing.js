import { createDOM } from './render';
import { setProperty } from './set-property';
import { isPrimitiveType } from './check-type';

export function diffing(prevNode, nextNode, parentDom) {
  updateDOM(parentDom, prevNode, nextNode);
}

function updateDOM(parent, oldNode, newNode) {
  if (isPrimitiveType(oldNode) && isPrimitiveType(newNode)) {
    if (oldNode !== newNode) {
      parent.textContent = newNode;
    }
    return;
  }

  if (oldNode == null) {
    const dom = createDOM(newNode);
    if (dom) parent.appendChild(dom);
    return;
  }

  if (newNode == null) {
    parent.removeChild(oldNode.dom);
    return;
  }

  if (oldNode.type !== newNode.type) {
    const newDom = createDOM(newNode);
    parent.replaceChild(newDom, oldNode.dom);
    return;
  }

  const dom = (newNode.dom = oldNode.dom);
  diffProps(dom, oldNode.props, newNode.props);
  diffChildren(dom, oldNode.props?.children, newNode.props?.children);
}

function diffProps(dom, prev, next) {
  for (const key in prev) {
    if (!(key in next)) {
      dom.removeAttribute(key);
      if (key.startsWith('on') && typeof prev[key] === 'function') {
        const event = key.slice(2).toLowerCase();
        dom.removeEventListener(event, prev[key]);
      }
    }
  }

  for (const [key, value] of Object.entries(next)) {
    if (key === 'children') continue;
    setProperty(dom, key, value);
  }
}

function diffChildren(dom, prevChildren, nextChildren) {
  const prev = Array.isArray(prevChildren) ? prevChildren : [prevChildren];
  const next = Array.isArray(nextChildren) ? nextChildren : [nextChildren];

  const max = Math.max(prev.length, next.length);

  for (let i = 0; i < max; i++) {
    updateDOM(dom, prev[i], next[i]);
  }
}
