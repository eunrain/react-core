import App from '../App';
import { createRoot } from './createRoot';
import { resetIndex } from './useState';
import { diffing } from './diffing';

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
    diffing(prevVDOM, nextVDOM, container);
  }

  prevVDOM = nextVDOM;
}
