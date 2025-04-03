let stateList = []; // 상태 저장 배열
let stateIndex = 0; // 상태 인덱스
let rerender = null; // 외부에서 주입되는 rerender 함수

export default function useState(initialValue) {
  const currentIndex = stateIndex;

  // 상태 초기화
  if (stateList[currentIndex] === undefined) {
    stateList[currentIndex] =
      typeof initialValue === 'function' ? initialValue() : initialValue;
  }

  // 상태 변경
  // 값이 바뀌었을 때만 업데이트 + 리렌더링
  function setState(newValue) {
    const prev = stateList[currentIndex];
    const next = typeof newValue === 'function' ? newValue(prev) : newValue;

    if (Object.is(prev, next)) return;
    stateList[currentIndex] = next;
    stateIndex = 0;
    rerender?.();
  }

  const value = stateList[currentIndex];
  stateIndex++;

  return [value, setState];
}

export function setRerender(fn) {
  rerender = fn;
}

export function resetStateIndex() {
  stateIndex = 0;
}
