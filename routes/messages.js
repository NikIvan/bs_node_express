var express = require('express');
var path = require('path');
var MessagesService = require('../services/MessagesService');

var messagesRouter = express.Router();

messagesRouter.get('/', (req, res) => {
  var data = MessagesService.getMessages();
  return res.status(200).json(data);
});

messagesRouter.post('/', (req, res) => {
  var data = req.body;
  var text = data.text.trim();
  var name = data.name.trim();

  if(!text) {
    var err = new Error(401);
    err.message = 'Bad request';

    throw err;
  }

  name = name || 'Anonymous';

  MessagesService.addMessage({
    name: name,
    text: text
  });

  return res.status(200).send('Ok');
});


module.exports = messagesRouter;