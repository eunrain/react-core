import App from './App';
import render from './lib/render';

const app = App();
console.log(JSON.stringify(app, null, 2));

const root = document.getElementById('app');
render(app, root);
