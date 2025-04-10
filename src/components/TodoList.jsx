import useState from '../lib/useState';

export default function TodoList() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    setTodos([...todos, { value: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (index) => {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updated);
  };

  const removeTodo = (indexToRemove) => {
    setTodos(todos.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div>
      <h2>📋 TodoList</h2>
      <input
        value={input}
        onInput={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>추가</button>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {todos?.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(index)}
            />
            <span style={todo.done ? 'text-decoration: line-through;' : ''}>
              {todo.value}
            </span>
            <button onClick={() => removeTodo(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
