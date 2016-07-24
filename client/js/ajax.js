import ajaxRequest from './ajaxRequest';
import {
  txtUserName, 
  txtMessage,
  btnSetName,
  btnSendMessage,
  chat,
  createChatMessage
} from './controls';

let userName = 'Anonymous';

btnSendMessage.addEventListener('click', () => {
  userName = txtUserName.value || 'Anonymous';
});

let getData = () => {
  ajaxRequest({
    url: '/messages/',
    method: 'GET',
    callback: (data) => {
      let msg = JSON.parse(data);
      chat.innerHTML = '';

      for(let i in msg) {
        if(msg.hasOwnProperty(i)) {
          let chatMessage = createChatMessage(msg[i]);
          chat.appendChild(chatMessage);
        }
      }

      chat.scrollTop = chat.scrollHeight;
    }
  })
};

btnSendMessage.addEventListener('click', () => {
  let data = {
    name: userName,
    text: txtMessage.value
  };

  txtMessage.value = '';

  ajaxRequest({
    url: '/messages/',
    method: 'POST',
    data: data
  });
});

getData();

setInterval(() => {
  getData()
}, 2500);