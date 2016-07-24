var messages = [
  {
    name: 'Vasya',
    text: 'Hello!'
  }, {
    name: 'Ivan',
    text: 'Qq, guys'
  }, {
    name: 'Nina',
    text: 'Привет, ребята'
  }, {
    name: 'Danila',
    text: 'Здоровенькі були!'
  }, {
    name: 'Olya',
    text: 'Hi!'
  }
];

function getMessages() {
  return messages;
}

function addMessage(message) {
  return messages.push(message);
}

module.exports = {
  getMessages: getMessages,
  addMessage: addMessage
}