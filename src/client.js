// Websocket client for multiplayer game.
class Client {
  constructor() {
    this.playerId = null;
    this.socket = io(
      window.location.href.indexOf('#local') > 0 ?
          'ws://localhost:8080' : 'ws://35.236.213.152:8080');
    this.socket.on('state', state => this.update(state));
    this.connection = new Promise(resolve => {
      this.socket.on('playerId', playerId => {
        this.playerId = playerId;
        console.log('ready. I am player ' + playerId);
        resolve();
      });
    });
    this.players = new Map();
    this.updates = [];
    this.additions = [];
    this.removals = [];
  }

  getUpdates() {
    const updates = this.updates;
    this.updates = [];
    return updates;
  }

  getAdditions() {
    const additions = this.additions;
    this.additions = [];
    return additions;
  }

  getRemovals() {
    const removals = this.removals;
    this.removals = [];
    return removals;
  }

  connect() {
    return this.connection;
  }

  sendState(state) {
    this.socket.emit('state', state);
  }

  update(state) {
    const seen = Array.from(this.players.keys());
    for (let player of state.players) {
      if (player.id == this.playerId) {
        continue;
      }
      if (!this.players.has(player.id)) {
        console.log('new player ' + player.id);
        this.additions.push(player);
      } else {
        const index = seen.findIndex(id => id == player.id);
        seen.splice(index, 1);
      }
      this.players.set(player.id, player);
      this.updates.push(player);
    }
    for (let playerId of seen) {
      console.log('removed player ' + playerId);
      this.removals.push(playerId);
      this.players.delete(playerId);
    }
  }
}

ld42.Client = Client;
