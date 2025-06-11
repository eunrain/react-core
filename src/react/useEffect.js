const effectStates = [];
const cleanupFns = [];
let effectIndex = 0;

export function resetEffectIndex() {
  effectIndex = 0;
}

export function useEffect(callback, deps) {
  const index = effectIndex++;
  const prevDeps = effectStates[index];

  const hasChanged = !prevDeps || deps.some((dep, i) => dep !== prevDeps[i]);

  if (hasChanged && typeof cleanupFns[index] === 'function') {
    cleanupFns[index]();
  }

  if (hasChanged) {
    const cleanup = callback();
    if (typeof cleanup === 'function') {
      cleanupFns[index] = cleanup;
    }
    effectStates[index] = deps;
  }
}
