import App from '../App';
import { createRoot } from './createRoot';
import { resetStateIndex } from './useState';
import { diffing } from './diffing';
import { resetEffectIndex } from './useEffect';

let container = null;
let prevVDOM = null;

export function reRender() {
  if (!container) {
    container = document.getElementById('app');
  }

  resetStateIndex();
  resetEffectIndex();

  const nextVDOM = App();

  if (prevVDOM === null) {
    const root = createRoot(container);
    root.render(nextVDOM);
  } else {
    diffing(prevVDOM, nextVDOM, container);
  }

  prevVDOM = nextVDOM;
}
