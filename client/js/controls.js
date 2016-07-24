const txtUserName    = document.getElementById('txtUserName');
const txtMessage     = document.getElementById('txtMessage');
const btnSetName     = document.getElementById('btnSetName');
const btnSendMessage = document.getElementById('btnSendMessage');
const chat           = document.getElementById('chat');

function createChatMessage(msg) {
  let li = document.createElement('li');
  let msgName = document.createElement('span');
  let delimiter = document.createElement('span');
  let msgText = document.createElement('span');
  msgName.className = 'msg-name';
  delimiter.className = 'msg-delimiter';
  msgText.className = 'msg-text';
  msgName.innerHTML = msg.name;
  msgText.innerHTML = msg.text;
  li.appendChild(msgName);
  li.appendChild(delimiter);
  li.appendChild(msgText);
  return li;
}

export {
  txtUserName,
  txtMessage,
  btnSetName,
  btnSendMessage,
  chat,
  createChatMessage
}