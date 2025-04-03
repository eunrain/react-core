import render from './render.js';
import { setRerender, resetStateIndex } from './useState.js';

let component = null;

export function createRoot(container) {
  function rerender() {
    resetStateIndex();
    container.innerHTML = '';
    render(component(), container);
  }
  return {
    render(rootComponent) {
      component = rootComponent;
      setRerender(rerender);
      rerender();
    },
  };
}
