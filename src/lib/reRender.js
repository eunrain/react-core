import App from '../App';
import { createRoot } from './createRoot';
import { resetIndex } from './useState';

let container = null;
let prevVDOM = null;

export function reRender() {
  if (!container) {
    container = document.getElementById('app');
  }

  resetIndex();
  const nextVDOM = App();

  if (prevVDOM === null) {
    // 초기 렌더링
    const root = createRoot(container);
    root.render(nextVDOM);
  } else {
    // diff로 이전 VDOM과 비교 업데이트
    diff(prevVDOM, nextVDOM, container);
  }

  prevVDOM = nextVDOM;
}
