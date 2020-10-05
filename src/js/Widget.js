export default class Widget {
  constructor(container, url) {
    this.container = container;
    this.openUsers = [];
    this.ws = new WebSocket(url);

    this.ws.addEventListener('open', () => {
      console.log('connected');
      this.ws.send(JSON.stringify({ type: 'response', text: 'hello' }));
    });

    this.ws.addEventListener('message', (evt) => {
      const response = JSON.parse(evt.data);
      if (response.type === 'error') {
        this.showError(document.querySelector('input'), response.text);
        return;
      } if (response.type === 'name') {
        this.hideForm();
        this.showChat();
        console.log(response.nick);
        return;
      }
      console.log(response.text);
    });

    this.ws.addEventListener('close', (evt) => {
      console.log('connection closed', evt);
    });

    this.ws.addEventListener('error', () => {
      console.log('error');
    });
  }

  createNick() {
    const form = document.createElement('form');
    form.classList.add('form');
    const head = document.createElement('h4');
    head.classList.add('head');
    const box = document.createElement('div');
    box.classList.add('box');
    const input = document.createElement('input');
    const btn = document.createElement('button');
    btn.classList.add('btn');

    head.textContent = 'Choose nickname';
    btn.textContent = 'Next';
    input.name = 'nick';

    box.appendChild(input);
    form.append(head, box, btn);
    this.container.appendChild(form);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const nick = event.target.nick.value;
      const response = { nick, type: 'name' };
      this.ws.send(JSON.stringify(response));
    });

    input.addEventListener('input', () => {
      this.deleteError();
    });
  }

  hideForm() {
    this.container.removeChild(this.container.firstChild);
  }

  showChat() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="wrapper">
        <div class="list-part">
            ${this.showPart()}
        </div>
        <div class="chat">
            <div class="messages">
                ${this.showMessage()}
            </div>
            <div class="message-text">
                <input type="text" name="message" id="message" class="input" 
                placeholder="Type your message here">
            </div>
        </div>
      </div>
    `;
    this.container.appendChild(wrapper);
  }
  /* eslint-disable */
  showPart() {

  }

  showMessage() {

  }

  showError(target, text) {
    target.focus();
    const error = document.createElement('div');
    error.dataset.id = 'error';
    error.className = 'form-error';
    error.textContent = `${text}`;

    document.body.appendChild(error);
    const { top, left } = target.getBoundingClientRect();
    error.style.top = `${window.scrollY + top - target.offsetHeight + error.offsetHeight}px`;
    error.style.left = `${window.scrollX + left}px`;
  }

  deleteError() {
    if (document.querySelector('.form-error')) {
      document.querySelector('.form-error').remove();
    }
  }
}
