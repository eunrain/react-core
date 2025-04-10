import App from '../App';
import { createRoot } from './createRoot';
import { resetIndex } from './useState';

let root = null;

export function reRender() {
  const container = document.getElementById('app');

  if (!root) {
    root = createRoot(container);
  }

  resetIndex();
  const vdom = App();
  root.render(vdom);
}
