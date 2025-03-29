export const Fragment = Symbol('Fragment');

function checkChildren(children) {
  if (!children.length) return null;
  return children.length === 1 ? children[0] : children;
}

export default function createElement(type, props = {}, ...children) {
  const childrenContent = checkChildren(children);

  if (typeof type === 'function') {
    return type(props);
  }

  if (type === Fragment) {
    return {
      type: 'Fragment',
      props: { ...props, children: childrenContent },
    };
  }

  if (typeof type === 'string' || type === null) {
    return {
      type,
      props: { ...props, children: childrenContent },
    };
  }

  return {
    type,
    props: { ...props, children: null },
  };
}
