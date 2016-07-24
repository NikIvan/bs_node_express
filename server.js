var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var rootRouter = require('./routes/index');
var messagesRouter = require('./routes/messages');

var app = express();
require('./config/connections')(app);

var server = app.listen(app.get('port'), () => {
  console.log('Server is running on http://localhost:' + app.get('port'));
});

require('./serverWS')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('publicDir', path.join(__dirname, 'public'));
app.use(express.static(app.get('publicDir')));

app.get('*', (req, res, next) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('Requested ' + req.method + ' ' + fullUrl + ' from ' + ip);
  return next();
});

app.use('/', rootRouter);
app.use('/messages', messagesRouter)

// 404 Route not found
app.use((req, res, next) => {
  var err = new Error('Not found');
  err.status = 404;
  return next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  console.log('Error: ' + err.status + ' :: ' + err.message);
  
  return res.render('error', {
    status: err.status,
    message: err.message || 'Internal server error'
  });
});