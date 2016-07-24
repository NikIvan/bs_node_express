var socketio = require('socket.io');
var MessagesService = require('./services/MessagesService');

module.exports = function(server) {
  var io = socketio.listen(server);

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('chat message', (msg) => {
      MessagesService.addMessage(msg);
      io.emit('chat message', msg);
    });

    var msgs = MessagesService.getMessages(); 

    socket.emit('chat history', msgs);
  });
};