class Storm extends ld42.Actor {
  draw(ctx) {
  	//ctx.fillStyle = "rgb(252, 35, 136, 0.5)";
  	//ctx.fillRect(0, 0, canvas.width, canvas.height);

  	// set XOR to cut-out
  	//ctx.globalCompositeOperation = "xor";

  	ctx.beginPath();
  	ctx.strokeStyle = "rgb(252, 35, 136, 1)";
  	ctx.lineWidth = "3";

  	var x = this.x;
  	var y = this.y;
  	var r = 300;
  	var start = 0;
  	var end = 2 * Math.PI;
  	ctx.arc(x,y,r,start,end);
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

    const point = this.getPoint();
    const x = point[0];
    const y = point[1];


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
    ctx.moveTo(this.parent.x + 20,this.parent.y + 0);
    ctx.lineTo(this.parent.x + 40,this.parent.y + 0);
    ctx.lineTo(this.parent.x + 40,this.parent.y + 10);
    ctx.lineTo(this.parent.x + 35,this.parent.y + 10);
    ctx.lineTo(this.parent.x + 35,this.parent.y + 25);
    ctx.lineTo(this.parent.x + 50,this.parent.y + 25);
    ctx.lineTo(this.parent.x + 50,this.parent.y + 20);
    ctx.lineTo(this.parent.x + 60,this.parent.y + 20);
    ctx.lineTo(this.parent.x + 60,this.parent.y + 40);
    ctx.lineTo(this.parent.x + 50,this.parent.y + 40);
    ctx.lineTo(this.parent.x + 50,this.parent.y + 35);
    ctx.lineTo(this.parent.x + 35,this.parent.y + 35);
    ctx.lineTo(this.parent.x + 35,this.parent.y + 50);
    ctx.lineTo(this.parent.x + 40,this.parent.y + 50);
    ctx.lineTo(this.parent.x + 40,this.parent.y + 60);
    ctx.lineTo(this.parent.x + 20,this.parent.y + 60);
    ctx.lineTo(this.parent.x + 20,this.parent.y + 50);
    ctx.lineTo(this.parent.x + 25,this.parent.y + 50);
    ctx.lineTo(this.parent.x + 25,this.parent.y + 35);
    ctx.lineTo(this.parent.x + 10,this.parent.y + 35);
    ctx.lineTo(this.parent.x + 10,this.parent.y + 40);
    ctx.lineTo(this.parent.x + 0,this.parent.y + 40);
    ctx.lineTo(this.parent.x + 0,this.parent.y + 20);
    ctx.lineTo(this.parent.x + 10,this.parent.y + 20);
    ctx.lineTo(this.parent.x + 10,this.parent.y + 25);
    ctx.lineTo(this.parent.x + 25,this.parent.y + 25);
    ctx.lineTo(this.parent.x + 25,this.parent.y + 10);
    ctx.lineTo(this.parent.x + 20,this.parent.y + 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

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
      ctx.moveTo(this.parent.x + 20, this.parent.y + 60);
      ctx.lineTo(this.parent.x + 20, this.parent.y + 75);
      ctx.lineTo(this.parent.x + 25, this.parent.y + 70);
      ctx.lineTo(this.parent.x + 30, this.parent.y + 80);
      ctx.lineTo(this.parent.x + 35, this.parent.y + 70);
      ctx.lineTo(this.parent.x + 40, this.parent.y + 75);
      ctx.lineTo(this.parent.x + 40, this.parent.y + 60);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  	// moving down -- thrusters up
  	if (this.up) {
      ctx.beginPath();
      ctx.strokeStyle = "#fc9723";
      ctx.fillStyle = "#fcab4e";
      ctx.moveTo(this.parent.x + 20, this.parent.y);
      ctx.lineTo(this.parent.x + 20, this.parent.y - 15);
      ctx.lineTo(this.parent.x + 25, this.parent.y - 10);
      ctx.lineTo(this.parent.x + 30, this.parent.y - 20);
      ctx.lineTo(this.parent.x + 35, this.parent.y - 10);
      ctx.lineTo(this.parent.x + 40, this.parent.y - 15);
      ctx.lineTo(this.parent.x + 40, this.parent.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
  	}

  	// moving left -- thrusters right
  	if (this.right) {
      ctx.beginPath();
      ctx.strokeStyle = "#fc9723";
      ctx.fillStyle = "#fcab4e";
      ctx.moveTo(this.parent.x + 60, this.parent.y + 20);
      ctx.lineTo(this.parent.x + 75, this.parent.y + 20);
      ctx.lineTo(this.parent.x + 70, this.parent.y + 25);
      ctx.lineTo(this.parent.x + 80, this.parent.y + 30);
      ctx.lineTo(this.parent.x + 70, this.parent.y + 35);
      ctx.lineTo(this.parent.x + 75, this.parent.y + 40);
      ctx.lineTo(this.parent.x + 60, this.parent.y + 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
  	}

  	// moving right -- thrusters left
  	if (this.left) {
      ctx.beginPath();
      ctx.strokeStyle = "#fc9723";
      ctx.fillStyle = "#fcab4e";
      ctx.moveTo(this.parent.x, this.parent.y + 20);
      ctx.lineTo(this.parent.x - 15, this.parent.y + 20);
      ctx.lineTo(this.parent.x - 10, this.parent.y + 25);
      ctx.lineTo(this.parent.x - 20, this.parent.y + 30);
      ctx.lineTo(this.parent.x - 10, this.parent.y + 35);
      ctx.lineTo(this.parent.x - 15, this.parent.y + 40);
      ctx.lineTo(this.parent.x, this.parent.y + 40);
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
    ctx.rect(this.x,this.y, this.width, this.height);
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
    this.speed = 60;
    this.xVel = 0;
    this.yVel = 0;
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
    return {x: this.x, y: this.y};
  }

  update(timeDelta) {
    this.x += Math.round(this.xVel * timeDelta * 20);
    this.y += Math.round(this.yVel * timeDelta * 20);
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();

    ctx.translate(this.x+this.width/2, this.y+this.height/2);

    var targetX = this.mouseX - this.x;
    var targetY = this.mouseY - this.y;

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
    
    ctx.translate(-this.x-this.width/2, -this.y-this.height/2);

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

		var x = this.x + this.width/2;
		var y = this.y + this.height/2;
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
    ctx.arc(this.x, this.y, r, start, end);

    ctx.stroke();
  }
}

class Bomb extends ld42.Actor {
  constructor(x, y, xVel, yVel) {
    super(x,y);
    this.speed = 30;
    this.x = x;
    this.y = y;
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
    ctx.arc(this.x, this.y, r, start, end);

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
    ctx.fillText("x: " + this.player.x, 2, 10);
    ctx.fillText("y: " + this.player.y, 2, 30);
    ctx.fillText("xVel: " + Math.round(this.player.xVel), 2, 60);
    ctx.fillText("yVel: " + Math.round(this.player.yVel), 2, 90);

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
        player.x = playerUpdate.x;
        player.y = playerUpdate.y;
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
    	// W
    	if (87 in keysDown) {
    		this.player.thrusters.down = true;
    		this.player.y -= Math.round(this.player.speed * timeDelta);

    		if (this.player.yVel > -this.environ.maxVel) {
    			this.player.yVel -= this.environ.dVel;
    		}
    	}
    	else
    	{
    		this.player.thrusters.down = false;
    	}

    	// S
    	if (83 in keysDown) {
    		this.player.thrusters.up = true;
    		this.player.y += Math.round(this.player.speed * timeDelta);

    		if (this.player.yVel < this.environ.maxVel) {
    			this.player.yVel += this.environ.dVel;
    		}
    	}
    	else
    	{
    		this.player.thrusters.up = false
    	}

    	// A
    	if (65 in keysDown) {
    		this.player.thrusters.right = true;
    		this.player.x -= Math.round(this.player.speed * timeDelta);

    		if (this.player.xVel > -this.environ.maxVel) {
    			this.player.xVel -= this.environ.dVel;
    		}
    	}
    	else
    	{
    		this.player.thrusters.right = false;
    	}

    	// D
    	if (68 in keysDown) {
    		this.player.thrusters.left = true;
    		this.player.x += Math.round(this.player.speed * timeDelta);

    		if (this.player.xVel < this.environ.maxVel) {
    			this.player.xVel += this.environ.dVel;
    		}
    	}
    	else
    	{
    		this.player.thrusters.left = false;
    	}

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

  start() {
    this.then = Date.now();
    this.main();
  }

  reset() {
    this.player.x = ((this.canvas.width) / 2);
  	this.player.y = ((this.canvas.height) / 2);
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
    const x = this.player.x + 30;
   	const y = this.player.y;
  	var xVel = this.player.xVel;
  	var yVel = this.player.yVel;
    const b = new Bullet(x,y,xVel,yVel);
    this.root.addChild(b);
  	this.bullets.push(b);
  }

  shootBomb() {
   	const x = this.player.x + 30;
   	const y = this.player.y;
   	var xVel = this.player.xVel;
   	var yVel = this.player.yVel;
    const b = new Bomb(x,y,xVel,yVel);
    this.root.addChild(b);
   	this.bullets.push(b);
  }

  // The main game loop
  main() {
  	const now = Date.now();
  	const delta = now - this.then;
    ld42.Actor.traverse(this.root, actor => actor.update(delta / 1000));
    ld42.Actor.traverse(this.root, actor => actor.draw(this.ctx));

  	this.then = now;

  	// Request to do this again ASAP
  	requestAnimationFrame(() => this.main());
  }
}

const init = () => {
  // Handle keyboard controls
  window.keysDown = {};

  addEventListener("keydown", function (e) {
  	keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function (e) {
  	delete keysDown[e.keyCode];
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
