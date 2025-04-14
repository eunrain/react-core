import App from '../App';
import { createRoot } from './createRoot';
import { resetIndex } from './useState';
import { diff } from './diffing';

let container = null;
let prevVDOM = null;

export function reRender() {
  if (!container) {
    container = document.getElementById('app');
  }

  resetIndex();
  const nextVDOM = App();

  if (prevVDOM === null) {
    const root = createRoot(container);
    root.render(nextVDOM);
  } else {
    diff(prevVDOM, nextVDOM, container);
  }

  prevVDOM = nextVDOM;
}
