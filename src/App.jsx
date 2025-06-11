import { useEffect } from './lib/useEffect';
import { useState } from './lib/useState';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`🟢 타이머 시작: count = ${count}`);

    const id = setInterval(() => {
      console.log(`⏱️ 현재 count: ${count}`);
    }, 5000);

    return () => {
      console.log(`🔴 타이머 종료: count = ${count}`);
      clearInterval(id);
    };
  }, [count]);

  return (
    <div>
      <h1>count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
