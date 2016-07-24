module.exports = (app) => {
	var port = '3003';
	var dbHost = 'localhost';
	var dbPort = '28017';
	var dbName = 'bs-node-express';

	app.set('port', port);
	app.set('dbHost', dbHost);
	app.set('dbPort', dbPort);
	app.set('dbName', dbName);
};