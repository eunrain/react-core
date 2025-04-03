import useState from '../lib/useState';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter</h2>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+ 1</button>
      <button onClick={() => setCount(count - 1)}>- 1</button>
    </div>
  );
}
