import Widget from './Widget';

const root = document.getElementById('root');
const widget = new Widget(root, 'wss://ws-backend-ajsb.herokuapp.com/ws');
widget.createNick();
