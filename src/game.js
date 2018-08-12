const ACCELERATION = 30;
const VELOCITY = 70;

class Storm extends ld42.Actor {
  draw(ctx) {
  	//ctx.fillStyle = "rgb(252, 35, 136, 0.5)";
  	//ctx.fillRect(0, 0, canvas.width, canvas.height);

  	// set XOR to cut-out
  	//ctx.globalCompositeOperation = "xor";

  	ctx.beginPath();
  	ctx.strokeStyle = "rgb(252, 35, 136, 1)";
  	ctx.lineWidth = "3";

  	var r = 300;
  	var start = 0;
  	var end = 2 * Math.PI;
  	ctx.arc(0,0,r,start,end);
    ctx.closePath();

  	ctx.stroke();
  }
}

class Thrusters extends ld42.Actor {
  constructor() {
    super(0, 0);
    this.width = 5;
    this.height = 5;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
  }

  // Draw Thrusters
  // Used to show movement
  // would like to replace with a nice particle effect later
  draw(ctx) {

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "#11447e";
    ctx.fillStyle = "#185fb0";

/* THRUSTER FRAME WITHOUT RESPECT TO PLAYER
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(20,0);
    ctx.lineTo(40,0);
    ctx.lineTo(40,10);
    ctx.lineTo(35,10);
    ctx.lineTo(35,25);
    ctx.lineTo(50,25);
    ctx.lineTo(50,20);
    ctx.lineTo(60,20);
    ctx.lineTo(60,40);
    ctx.lineTo(50,40);
    ctx.lineTo(50,35);
    ctx.lineTo(35,35);
    ctx.lineTo(35,50);
    ctx.lineTo(40,50);
    ctx.lineTo(40,60);
    ctx.lineTo(20,60);
    ctx.lineTo(20,50);
    ctx.lineTo(25,50);
    ctx.lineTo(25,35);
    ctx.lineTo(10,35);
    ctx.lineTo(10,40);
    ctx.lineTo(0,40);
    ctx.lineTo(0,20);
    ctx.lineTo(10,20);
    ctx.lineTo(10,25);
    ctx.lineTo(25,25);
    ctx.lineTo(25,10);
    ctx.lineTo(20,10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
*/
    // THRUSTER FRAME WITH RESPECT TO PLAYER
    ctx.moveTo(20,0);
    ctx.lineTo(40,0);
    ctx.lineTo(40,10);
    ctx.lineTo(35,10);
    ctx.lineTo(35,25);
    ctx.lineTo(50,25);
    ctx.lineTo(50,20);
    ctx.lineTo(60,20);
    ctx.lineTo(60,40);
    ctx.lineTo(50,40);
    ctx.lineTo(50,35);
    ctx.lineTo(35,35);
    ctx.lineTo(35,50);
    ctx.lineTo(40,50);
    ctx.lineTo(40,60);
    ctx.lineTo(20,60);
    ctx.lineTo(20,50);
    ctx.lineTo(25,50);
    ctx.lineTo(25,35);
    ctx.lineTo(10,35);
    ctx.lineTo(10,40);
    ctx.lineTo(0,40);
    ctx.lineTo(0,20);
    ctx.lineTo(10,20);
    ctx.lineTo(10,25);
    ctx.lineTo(25,25);
    ctx.lineTo(25,10);
    ctx.lineTo(20,10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // If thruster active, draw fire
  	// moving up -- thrusters down
  	if (this.down) {
/* THRUSTER FLAME WITHOUT RESPECT TO PLAYER
      ctx.beginPath();
      ctx.moveTo(20,60);
      ctx.lineTo(20,75);
      ctx.lineTo(25,70);
      ctx.lineTo(30,80);
      ctx.lineTo(35,70);
      ctx.lineTo(40,75);
      ctx.lineTo(40,60);
      ctx.closePath();
*/
  	  // THRUSTER FLAME WITH RESPECT TO PLAYER
      ctx.beginPath();
      ctx.strokeStyle = "#fc9723";
      ctx.fillStyle = "#fcab4e";
      ctx.moveTo(20, 60);
      ctx.lineTo(20, 75);
      ctx.lineTo(25, 70);
      ctx.lineTo(30, 80);
      ctx.lineTo(35, 70);
      ctx.lineTo(40, 75);
      ctx.lineTo(40, 60);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  	// moving down -- thrusters up
  	if (this.up) {
      ctx.beginPath();
      ctx.strokeStyle = "#fc9723";
      ctx.fillStyle = "#fcab4e";
      ctx.moveTo(20, 0);
      ctx.lineTo(20, -15);
      ctx.lineTo(25, -10);
      ctx.lineTo(30, -20);
      ctx.lineTo(35, -10);
      ctx.lineTo(40, -15);
      ctx.lineTo(40, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
  	}

  	// moving left -- thrusters right
  	if (this.right) {
      ctx.beginPath();
      ctx.strokeStyle = "#fc9723";
      ctx.fillStyle = "#fcab4e";
      ctx.moveTo(60, 20);
      ctx.lineTo(75, 20);
      ctx.lineTo(70, 25);
      ctx.lineTo(80, 30);
      ctx.lineTo(70, 35);
      ctx.lineTo(75, 40);
      ctx.lineTo(60, 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
  	}

  	// moving right -- thrusters left
  	if (this.left) {
      ctx.beginPath();
      ctx.strokeStyle = "#fc9723";
      ctx.fillStyle = "#fcab4e";
      ctx.moveTo(0, 20);
      ctx.lineTo(-15, 20);
      ctx.lineTo(-10, 25);
      ctx.lineTo(-20, 30);
      ctx.lineTo(-10, 35);
      ctx.lineTo(-15, 40);
      ctx.lineTo(0, 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
  	}
  }
}

class Blasters extends ld42.Actor {
  constructor() {
    super(0, 0);
    this.width = 20;
    this.height = 5;
  }

/*
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "rgb(35, 136, 252, 1)";
    ctx.lineWidth = "1";
    const point = this.getPoint();
    const x = point[0];
    const y = point[1];
    ctx.rect(x + this.width, y - this.height, this.width, this.height);
    ctx.stroke();
  }
*/
}

class RemotePlayer extends ld42.Actor {
  constructor() {
    super(0, 0);
    this.width = 40;
    this.height = 40;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(0, 0, this.width, this.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = "1";
    ctx.stroke();
  }
}

class Player extends ld42.Actor {
  constructor() {
    super(0, 0);
    this.width = 60;
    this.height = 60;
    this.velocity = new ld42.Point(0, 0);
    this.acc = new ld42.Point(0, 0);
    this.health = 100;
    this.shield = 100;
    this.shieldActivated = false;
    this.bombs = 3;
    this.mouseX = 0;
    this.mouseY = 0;
    this.thrusters = new Thrusters();
    this.addChild(this.thrusters);
    this.blasters = new Blasters();
    this.addChild(this.blasters);
  }

  getState() {
    return {x: this.getPoint().x, y: this.getPoint().y};
  }

  update(timeDelta) {
    this.velocity.x = this.velocity.x + this.acc.x * timeDelta;
    this.velocity.y = this.velocity.y + this.acc.y * timeDelta;
    if ((this.acc.x > 0 && this.velocity.x >= 0) ||
        (this.acc.x < 0 && this.velocity.x <= 0)) {
      this.acc.x = 0;
      this.velocity.x = 0;
    }
    if ((this.acc.y > 0 && this.velocity.y >= 0) ||
        (this.acc.y < 0 && this.velocity.y <= 0)) {
      this.acc.y = 0;
      this.velocity.y = 0;
    }
    const averageVelocity = this.getAverageVelocity(timeDelta);
    this.setPoint(
        this.getPoint().x + averageVelocity.x * timeDelta,
        this.getPoint().y + averageVelocity.y * timeDelta);
  }

  getAverageVelocity(timeDelta) {
    return new ld42.Point(
        this.velocity.x + this.acc.x * 0.5 * timeDelta,
        this.velocity.y + this.acc.y * 0.5 * timeDelta);
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();

    ctx.translate(this.width/2, this.height/2);

    var targetX = this.mouseX - this.getProjectedPoint().x;
    var targetY = this.mouseY - this.getProjectedPoint().y;

    var deg = Math.atan2(targetX,  targetY);
    //console.log(deg);
    var rad = deg * (180 / Math.PI);
    //console.log("deg = " + deg + ", rad = " + rad);
    ctx.rotate(-deg);
    //ctx.rotate(rad);

    ctx.strokeStyle = "#2388fc";
    ctx.fillStyle = "#4e9ffc";

    ctx.moveTo(-5, -15)
    ctx.lineTo(5, -15);
    ctx.lineTo(15, -5);
    ctx.lineTo(15, 5);
    ctx.lineTo(5, 15);
    ctx.lineTo(5, 35);
    ctx.lineTo(-5, 35);
    ctx.lineTo(-5, 15);
    ctx.lineTo(-15, 5);
    ctx.lineTo(-15, -5);

    ctx.closePath();

    ctx.translate(-this.width/2, -this.height/2);

    ctx.fill();
    ctx.stroke();
    ctx.restore();

    this.drawShield(ctx);
  }

  drawShield(ctx) {
  	if (!this.shieldActivated) {
      return;
    }
		ctx.beginPath();
		ctx.strokeStyle = "rgb(35, 245, 252, 1)";
		ctx.fillStyle = "rgb(35, 245, 252, 0.5)";
		ctx.lineWidth = "3";

		var x = this.width/2;
		var y = this.height/2;
		var r = 45;
		var start = 0;
		var end = 2 * Math.PI;
		ctx.arc(x,y,r,start,end);
		ctx.fill();

		ctx.stroke();
  }
}

class Bullet extends ld42.Actor {
  constructor(x, y, xVel, yVel) {
    super(x, y);
  	this.speed = 60;
  	this.xVel = xVel;
  	this.yVel = yVel;
  	this.life = 100;
    // make the bullets disappear after a while? or just wait
    // till they go outside the game area?
  }

  update(timeDelta) {
    if (this.life > 0) {
      this.life -= 5 * timeDelta;
    }
  }

  // Draw bullets
  // make them disappear after existing a lifetime? or get rid of once they
  // leave the game area?
  // want to prevent spam, but realisticly they bullets wouldnt disappear?
  // maybe make them laser beams?
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "rgb(245, 252, 35, 1)";
    //ctx.strokeStyle = "rgb(252, 42, 35, 1)"; // enemy bullet
    ctx.lineWidth = "1";

    var r = 1;
    var start = 0;
    var end = 2 * Math.PI;
    ctx.arc(0, 0, r, start, end);

    ctx.stroke();
  }
}

class Bomb extends ld42.Actor {
  constructor(x, y, xVel, yVel) {
    super(x,y);
    this.speed = 30;
    this.xVel = xVel;
    this.yVel = yVel;
    this.life = 200; // bombs are bigger, last longer, move slower, and do more damage. maybe pulse too?
  }

  update(timeDelta) {
    if (this.life > 0) {
      this.life -= 5 * timeDelta;
    }
  }

  // Draw bullets
  // make them disappear after existing a lifetime? or get rid of once they
  // leave the game area?
  // want to prevent spam, but realisticly they bullets wouldnt disappear?
  // maybe make them laser beams?
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "rgb(252, 42, 35, 1)";
    ctx.lineWidth = "1";

    var r = 3;
    var start = 0;
    var end = 2 * Math.PI;
    ctx.arc(0, 0, r, start, end);

    ctx.stroke();
  }
}

class Hud extends ld42.Actor {
  constructor(player) {
    super(0, 0);
    this.player = player;
  }

  draw(ctx) {
    // HUD
    ctx.beginPath();
    ctx.fillStyle = "#FFF";
    ctx.font = "24px Consolas";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("x: " + this.player.getPoint().x, 2, 10);
    ctx.fillText("y: " + this.player.getPoint().y, 2, 30);
    ctx.fillText("xVel: " + Math.round(this.player.velocity.x), 2, 60);
    ctx.fillText("yVel: " + Math.round(this.player.velocity.y), 2, 90);

    ctx.fillText("health: " + Math.round(this.player.health), 2, 570);
   	ctx.fillText("shield: " + Math.round(this.player.shield), 2, 590);
   	ctx.fillText("bombs: " + Math.round(this.player.bombs), 2, 610);
    ctx.stroke();
  }
}

class ClientUpdater extends ld42.Actor {
  constructor(player, client) {
    super();
    this.player = player;
    this.client = client;
    this.remotePlayers = new Map();
  }

  update(timeDelta) {
    this.client.sendState(this.player.getState());
    this.applyAdditions(this.client.getAdditions());
    this.applyRemovals(this.client.getRemovals());
    this.applyUpdates(this.client.getUpdates())
  }

  applyRemovals(removedPlayers) {
    for (let playerId of removedPlayers) {
      this.remotePlayers.get(playerId).removeFromParent();
      this.remotePlayers.delete(playerId);
    }
  }

  applyAdditions(addedPlayers) {
    for (let player of addedPlayers) {
      const remotePlayer = new RemotePlayer(player.x, player.y);
      this.addChild(remotePlayer);
      this.remotePlayers.set(player.id, remotePlayer);
    }
  }

  applyUpdates(updatedPlayers) {
    for (let playerUpdate of updatedPlayers) {
      console.log(playerUpdate);
      const player = this.remotePlayers.get(playerUpdate.id);
      if (player) {
        player.setPoint(playerUpdate.x, playerUpdate.y);
      }
    }
  }
}

class Game {
  constructor(canvas, client) {
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.canvas = canvas;
    this.root = new ld42.Actor(0, 0);
    this.camera = new ld42.Camera(canvas);
    this.player = new Player();
    const starfield = new ld42.Actor(0, 0);
    starfield.draw = ctx => {
      // Draw starfield
      ctx.fillStyle = "rgb(12, 17, 22, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    this.root.addChild(starfield);
    this.bullets = [];

    const clientUpdater = new ClientUpdater(this.player, client);
    this.root.addChild(clientUpdater);

    const storm = new Storm(canvas.width / 2, canvas.height / 2);
    this.root.addChild(storm);

    const bulletManager = new ld42.Actor(0, 0);
    bulletManager.update = timeDelta => {
      for (let i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].life <= 0) {
          this.bullets[i].removeFromParent();
          this.bullets.splice(i, 1);
          i--;
        }
      }
    };
    this.root.addChild(bulletManager);

    this.root.addChild(new Hud(this.player));
    this.environ = {
      dVel: 0.25,
      maxVel: 5,
      maxShield: 100,
    };

    this.controls = new Actor(0, 0);
    // Update objects
    this.controls.update = timeDelta => {
      // E
      if (69 in keysDown) {
        if (this.player.bombs > 0)
        {
          this.player.bombs--;
          // prevent more than one from shooting
          this.shootBomb();
        }
      }

    	// SPACE BAR
    	if (32 in keysDown) {

    		if (this.player.shield > 0)
    		{
    			this.player.shieldActivated = true;
    			this.player.shield -= Math.round(1);
    		}
    		else
    		{
    			this.player.shieldActivated = false;
    		}
    	}
    	else
    	{
    		this.player.shieldActivated = false;

    		if (this.player.shield < 100)
    		{
    			this.player.shield += Math.round(1);
    		}
    	}

    	// R
    	if (82 in keysDown) {
    		this.reset();
    	}
    };
    this.root.addChild(this.controls);
    this.root.addChild(this.player);

    this.client = client;
    this.reset();
    this.client.connect().then(() => {
      this.start();
    });
  }

  keyDown(keyDown) {
    if (keyDown == 87) { // W
      this.player.thrusters.down = true;
      this.player.thrusters.false = true;
      this.player.velocity.y = -VELOCITY;
      this.player.acc.y = 0;
    } else if (keyDown == 83) { // S
      this.player.thrusters.up = true;
      this.player.thrusters.down = false;
      // this.player.y += Math.round(this.player.speed * timeDelta);
      this.player.velocity.y = VELOCITY;
      this.player.acc.y = 0;
    } else if (keyDown == 65) { // A
      this.player.thrusters.right = true;
      this.player.thrusters.left = false;
      // this.player.x -= Math.round(this.player.speed * timeDelta);
      this.player.velocity.x = -VELOCITY;
      this.player.acc.x = 0;
    } else if (keyDown == 68) { // D
      this.player.thrusters.left = true;
      this.player.thrusters.right = false;
      this.player.velocity.x = VELOCITY;
      this.player.acc.x = 0;
    }
  }

  keyUp(keyUp) {
    if (keyUp == 87) { // W
      this.player.thrusters.down = false;
      this.player.acc.y = ACCELERATION;
    } else if (keyUp == 83) { // S
      this.player.thrusters.up = false;
      this.player.acc.y = -ACCELERATION;
    } else if (keyUp == 65) { // A
      this.player.thrusters.right = false;
      this.player.acc.x = ACCELERATION;
    } else if (keyUp == 68) { // D
      this.player.thrusters.left = false;
      this.player.acc.x = -ACCELERATION;
    }
  }

  start() {
    this.then = Date.now();
    this.main();
  }

  reset() {
    this.player.setPoint(this.canvas.width / 2, this.canvas.height / 2);
  	this.player.xVel = 0;
  	this.player.yVel = 0;
  	this.player.health = 100;
  	this.player.shield = 100;
    this.player.bombs = 3;
  }

  getMousePosition(canvas, e) {
    var canvasPosition = canvas.getBoundingClientRect();
    this.player.mouseX = e.clientX - canvasPosition.top;
    this.player.mouseY = e.clientY - canvasPosition.left;
  }

  shootBullet() {
  	var xVel = this.player.velocity.x;
  	var yVel = this.player.velocity.y;
    const b = new Bullet(
        this.player.getPoint().x + 30,
        this.player.getPoint().y,
        xVel,yVel);
    this.root.addChild(b);
  	this.bullets.push(b);
  }

  shootBomb() {
    var xVel = this.player.velocity.x;
  	var yVel = this.player.velocity.y;
    const b = new Bomb(
        this.player.getPoint().x + 30,
        this.player.getPoint().y,
        xVel,yVel);
    this.root.addChild(b);
   	this.bullets.push(b);
  }

  // The main game loop
  main() {
  	const now = Date.now();
  	const delta = Math.min(50, now - this.then);
    this.camera.updateAndDraw(this.root, delta, this.ctx);

  	this.then = now;

  	// Request to do this again ASAP
  	requestAnimationFrame(() => this.main());
  }
}

const init = () => {
  // Handle keyboard controls
  window.keysDown = {};

  addEventListener("keydown", function (e) {
  	game.keyDown(e.keyCode);
  }, false);

  addEventListener("keyup", function (e) {
    game.keyUp(e.keyCode);
  }, false);

  // Create the canvas
  var canvas = document.createElement("canvas");
  canvas.width = 960;
  canvas.height = 640;
  document.body.appendChild(canvas);

  canvas.addEventListener("mousemove", function (e) {
    game.getMousePosition(canvas, e);
  }, false);

  canvas.addEventListener("mousedown", function (e) {
    game.shootBullet();
  }, false);

  // Cross-browser support for requestAnimationFrame
  var w = window;
  requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

  const client = new ld42.Client();
  const game = new Game(canvas, client);
};
init();
