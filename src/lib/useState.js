import { reRender } from './re-render';

const state = { index: 0, list: [] };

export function resetIndex() {
  state.index = 0;
}

export default function useState(initialValue) {
  const currentIndex = state.index;

  if (!(currentIndex in state.list)) {
    state.list[currentIndex] =
      typeof initialValue === 'function' ? initialValue() : initialValue;
  }

  const setState = (newValue) => {
    const prev = state.list[currentIndex];
    const next = typeof newValue === 'function' ? newValue(prev) : newValue;

    if (Object.is(prev, next)) {
      return;
    }

    state.list[currentIndex] = next;
    reRender();
  };

  const value = state.list[currentIndex];
  state.index++;

  return [value, setState];
}
