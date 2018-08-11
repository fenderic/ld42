'use strict';

const server = require('http').createServer();
const io = require('socket.io')(server);

io.origins(['*:*']);
console.log('starting');
server.listen(8080);

class Player {
  constructor(client, playerId) {
    this.client = client;
    this.playerId = playerId;
    this.x = 0;
    this.y = 0;
    this.client.on('state', state => {
      this.update(state);
    });
  }

  update(state) {
    this.x = state.x;
    this.y = state.y;
  }

  getState() {
    return {
      id: this.playerId,
      x: this.x,
      y: this.y,
    }
  }
}

class Game {
  constructor(io) {
    this.io = io;
    this.players = new Map();
    this.playerId = 0;
    setInterval(() => {
      this.update();
    }, 50);
    io.on('connection', client => {
      this.onConnection(client);
    });
  }

  update() {
    this.io.emit('state', {
      players: new Array(...this.players.values())
          .map(player => player.getState())});
  }

  onConnection(client) {
    io.emit('player joined', {});
    const playerId = this.playerId++;
    console.log('connected ' + playerId);
    this.players.set(client.id, new Player(client, playerId));
    client.emit('playerId', playerId);
    client.on('disconnect',
      () => {
        this.players.delete(client.id);
        console.log('disconnect ' + playerId);
      });
  }
}

const game = new Game(io);

module.exports = server;
