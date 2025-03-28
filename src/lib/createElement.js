export default function createElement(type, props, ...children) {
  if (typeof type === 'function') {
    const component = type(props);
    return component;
  }
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' && child !== null
          ? child
          : { type: 'TEXT_ELEMENT', props: { nodeValue: child, children: [] } }
      ),
    },
  };
}

// test 코드
const vdom = createElement('h1', { className: 'title' }, 'Hello, world!');
console.log(vdom);
console.log(JSON.stringify(vdom, null, 2));
