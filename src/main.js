import App from './App';
import { createRoot } from './lib/createRoot';

const rootEl = document.getElementById('app');
const root = createRoot(rootEl);

root.render(App());
