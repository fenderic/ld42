class Client {
  constructor() {
    this.playerId = null;
    this.socket = io('http://localhost:8080');
    this.socket.on('state', state => this.update(state));
    this.connection = new Promise(resolve => {
      this.socket.on('playerId', playerId => {
        this.playerId = playerId;
        console.log('ready');
        resolve();
      });
    });
  }

  connect() {
    return this.connection;
  }

  update(state) {
    console.log(state);
  }
}

ld42.Client = Client;
