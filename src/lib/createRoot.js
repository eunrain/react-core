import render from './render.js';

export function createRoot(container) {
  return {
    render(vdom) {
      container.innerHTML = '';
      render(vdom, container);
    },
  };
}
