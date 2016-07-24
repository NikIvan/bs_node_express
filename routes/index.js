var express = require('express');
var path = require('path');

var htmlDir = path.resolve(__dirname, '../public');

var rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
  return res.sendFile(htmlDir + '/index.html');
});

rootRouter.get('/ajax', (req, res) => {
  return res.sendFile(htmlDir + '/ajax.html');
});

rootRouter.get('/websockets', (req, res) => {
  return res.sendFile(htmlDir + '/websockets.html');
});

/*

Путь можно прописать ещё таким способом:

rootRouter.get('/:route', (req, res) => {
  return res.sendFile(htmlDir + '/' + req.params.route + '.html');
});

Но, так как этот сервер будет обслуживать миллиарды пользователей - 
шаблон в роутере является неприемлимым :)

*/

module.exports = rootRouter;