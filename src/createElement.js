function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object'
          ? child
          : { type: 'TEXT_ELEMENT', props: { nodeValue: child, children: [] } }
      ),
    },
  };
}

// test
const vdom = createElement('h1', { className: 'title' }, 'Hello, world!');
console.log(vdom);
console.log(JSON.stringify(vdom, null, 2));
