import Content from './components/Content';
import Header from './components/Header';
import createElement from './lib/createElement';

export default function App() {
  return createElement(createElement(Header), createElement(Content));
}
