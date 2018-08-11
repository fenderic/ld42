// HOW-TO:
// - Arrow keys to activate thrusters
// - "r" to reset
// - "space bar" to activate/de-activate shield, can protect you from enemy bullets and "small" asteroids, will recharge when de-activated

// Ideas:
// - 4 directions of shooting with WASD? I think clicking and aiming with your mouse would be too easy since its 2D</li>
// - mini-map
// - limited fuel?
// - different weapon pickups
// - temporary invisibility cloak?
// - trap: - mini warp hole - pulls enemy in and holds them for a couple seconds

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

  	ctx.stroke();
  }
}

class Thrusters extends ld42.Actor {
  constructor() {
    super(0, 0);
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
  	ctx.strokeStyle = "#fc9723";
  	ctx.lineWidth = "1";
    const point = this.getPoint();
    const x = point[0];
    const y = point[1];

  	// moving up -- thrusters down
  	if (this.down) {
  		ctx.rect(x, y + 60, 5, 5);
  		ctx.rect(x + 55, y + 60, 5, 5);
  	}

  	// moving down -- thrusters up
  	if (this.up) {
  		ctx.rect(x, y - 5, 5, 5);
  		ctx.rect(x + 55, y - 5, 5, 5);
  	}

  	// moving left -- thrusters right
  	if (this.right) {
  		ctx.rect(x + 60, y, 5, 5);
  		ctx.rect(x + 60, y + 55, 5, 5);
  	}

  	// moving right -- thrusters left
  	if (this.left) {
  		ctx.rect(x - 5, y, 5, 5);
  		ctx.rect(x - 5, y + 55, 5, 5);
  	}

  	ctx.stroke();
  }
}

class Blasters extends ld42.Actor {
  constructor() {
    super(0, 0);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "rgb(35, 136, 252, 1)";
    ctx.lineWidth = "1";
    const point = this.getPoint();
    const x = point[0];
    const y = point[1];
    ctx.rect(x + 20, y - 5, 20, 5);
    ctx.stroke();
  }
}

class Player extends ld42.Actor {
  constructor() {
    super(0, 0);
    this.speed = 60;
    this.xVel = 0;
    this.yVel = 0;
    this.health = 100;
    this.shield = 100;
    this.shieldActivated = false;
    this.thrusters = new Thrusters();
    this.addChild(this.thrusters);
    this.blasters = new Blasters();
    this.addChild(this.blasters);
  }

  update(timeDelta) {
    this.x += Math.round(this.xVel * timeDelta * 20);
    this.y += Math.round(this.yVel * timeDelta * 20);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x,this.y, 60, 60);
    ctx.strokeStyle = "rgb(35, 136, 252, 1)";
    ctx.lineWidth = "1";
    ctx.stroke();
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

		var x = this.x + 30;
		var y = this.y + 30;
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
  	this.life = 1000;
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
  constructor() {
    this.speed = 30;
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.life = bombLife; // bombs last longer, move slower, and do more damage
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
    ctx.fillText("x: " + this.player.x, 2, 2);
    ctx.fillText("y: " + this.player.y, 2, 32);
    ctx.fillText("xVel: " + Math.round(this.player.xVel), 2, 62);
    ctx.fillText("yVel: " + Math.round(this.player.yVel), 2, 92);

    ctx.fillText("health: " + Math.round(this.player.health), 2, 570);
   	ctx.fillText("shield: " + Math.round(this.player.shield), 2, 592);
   	ctx.fillText("bombs: " + Math.round(this.player.bombs), 2, 610);
    ctx.stroke();
  }
}

class Game {
  constructor(canvas, client) {
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.canvas = canvas;
    this.root = new ld42.Actor(0, 0);
    const starfield = new ld42.Actor(0, 0);
    starfield.draw = ctx => {
      // Draw starfield
      ctx.fillStyle = "#0C1116";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    this.root.addChild(starfield);
    this.bullets = [];

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

    this.player = new Player();
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
          this.player.bombs -= Math.round(1);
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

    this.reset();
    client.connect().then(() => {
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
   	var x;
   	var y;
   	x = this.player.x + 30;
   	y = this.player.y;
   	var xVel = this.player.xVel;
   	var yVel = this.player.yVel;
    const b = new Bomb(x,y,xVel,yVel);
    this.root.addChild(b);
   	bullets.push(b);
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
