'use strict';

const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
  console.log('connected');
  client.on('event',
    data => console.log('onEvent: ' + data));
  client.on('disconnect',
    () => console.log('disconnect'));
});
console.log('starting');
server.listen(8080);

module.exports = server;
