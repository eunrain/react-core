import useState from '../lib/useState';

export default function TodoList() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, done: false }]);
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
      <h2>📋 Todo List</h2>
      <input
        value={input}
        onchange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onclick={addTodo}>추가</button>

      <ul>
        {todos.map((todo, index) => (
          <li>
            <input
              type="checkbox"
              checked={todo.done}
              onchange={() => toggleTodo(index)}
            />
            <span style={todo.done ? 'text-decoration: line-through;' : ''}>
              {todo.text}
            </span>
            <button onclick={() => removeTodo(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
