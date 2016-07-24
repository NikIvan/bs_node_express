import {
  txtUserName, 
  txtMessage,
  btnSetName,
  btnSendMessage,
  chat,
  createChatMessage
} from './controls';

let userName = 'Anonymous';
let socket = io.connect();

btnSendMessage.addEventListener('click', () => {
  userName = txtUserName.value || 'Anonymous';
});

btnSendMessage.addEventListener('click', () => {
  let data = {
    name: userName,
    text: txtMessage.value
  };

  txtMessage.value = '';

  socket.emit('chat message', data);
});

socket.on('chat history', (msgs) => {
  for(let i in msgs) {
    if(msgs.hasOwnProperty(i)) {
      let chatMessage = createChatMessage(msgs[i]);
      chat.appendChild(chatMessage);
    }
  }

  chat.scrollTop = chat.scrollHeight;
});

socket.on('chat message', (msg) => {
  let chatMessage = createChatMessage(msg);
  chat.appendChild(chatMessage);

  chat.scrollTop = chat.scrollHeight;
});

