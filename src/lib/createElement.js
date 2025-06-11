export const Fragment = Symbol('Fragment');

function checkChildren(children) {
  if (!children.length) return null;
  const flat = children.flat(Infinity);
  return flat.length === 1 ? flat[0] : flat;
}

export function createElement(type, config, ...children) {
  const { key, ref, ...rest } = config ?? {};
  const childrenContent = checkChildren(children);

  if (typeof type === 'function') {
    return type({ ...rest, children: childrenContent });
  }

  if (type === Fragment) {
    return {
      type: 'Fragment',
      props: {
        ...rest,
        children: childrenContent,
      },
      ref,
      key: key != null ? String(key) : null,
    };
  }

  if (typeof type === 'string' || type === null) {
    return {
      type,
      props: {
        ...rest,
        children: childrenContent,
      },
      ref,
      key: key != null ? String(key) : null,
    };
  }

  return {
    type,
    props: {
      ...rest,
      children: null,
    },
    ref,
    key: key != null ? String(key) : null,
  };
}
