import Widget from './Widget';

const root = document.getElementById('root');
const widget = new Widget(root, 'ws://localhost:7080/ws');
// widget.createNick();
widget.showChat();
