import App from './App';
import { createRoot } from './lib/createRoot';

const app = App();
//console.log(JSON.stringify(app, null, 2));

const rootEl = document.getElementById('app');
const root = createRoot(rootEl);

root.render(App());
