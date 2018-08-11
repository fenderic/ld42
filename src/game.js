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

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 960;
canvas.height = 640;
document.body.appendChild(canvas);

// Environment
dVel = 0.25;
maxVel = 5;
maxShield = 100;

// Game Objects
var player = {
	speed: 60,
	x: 0,
	y: 0,
	xVel: 0,
	yVel: 0,
	health: 100,
	shield: 100,
	shieldActivated: false
};

var thrusters = {
	up: false,
	down: false,
	left: false,
	right: false
};

var blasters = {
	up: false,
	down: false,
	left: false,
	right: false
}

var bullets = new Array();

var Bullet = function (x,y,xVel,yVel) {
	this.speed = 60;
	this.x = x;
	this.y = y;
	this.xVel = xVel;
	this.yVel = yVel;
	this.life = 1000; // make the bullets disappear after a while? or just wait till they go outside the game area?
}

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var applyVelocity = function() {
	player.x += Math.round(player.xVel);
	player.y += Math.round(player.yVel);
}

// Shoot bullet from blaster
// bullets should fly in the direction from the ships cannot
// but speed should also take into account the ships velocity when it was shot
// maybe pass in "1" "-1" as a directional x and directional y value instead of a string?
var shootBullet = function(direction) {
	var x;
	var y;
	if (direction == "up")
	{
		x = player.x + 30;
		y = player.y;
	}
	else if (direction == "down")
	{
		x = player.x + 30;
		y = player.y + 60;
	}
	else if (direction == "left")
	{
		x = player.x;
		y = player.y + 30;
	}
	else if (direction == "right")
	{
		x = player.x + 60;
		y = player.y + 30;
	}
	var xVel = player.xVel;
	var yVel = player.yVel;
	bullets.push(new Bullet(x,y,xVel,yVel));
}

// press R to reset
var reset = function () {
	player.x = ((canvas.width) / 2);
	player.y = ((canvas.height) / 2);
	player.xVel = 0;
	player.yVel = 0;
	player.health = 100;
	player.shield = 100;
};

// Update objects
var update = function (modifier) {

	// UP
	if (38 in keysDown) {
		thrusters.down = true;
		player.y -= Math.round(player.speed * modifier);

		if (player.yVel > -maxVel) {
			player.yVel -= dVel;
		}
	}
	else
	{
		thrusters.down = false;
	}


	// DOWN
	if (40 in keysDown) {
		thrusters.up = true;
		player.y += Math.round(player.speed * modifier);

		if (player.yVel < maxVel) {
			player.yVel += dVel;
		}
	}
	else
	{
		thrusters.up = false
	}

	// LEFT
	if (37 in keysDown) {
		thrusters.right = true;
		player.x -= Math.round(player.speed * modifier);

		if (player.xVel > -maxVel) {
			player.xVel -= dVel;
		}
	}
	else
	{
		thrusters.right = false;
	}

	// RIGHT
	if (39 in keysDown) {
		thrusters.left = true;
		player.x += Math.round(player.speed * modifier);

		if (player.xVel < maxVel) {
			player.xVel += dVel;
		}
	}
	else
	{
		thrusters.left = false;
	}

	// SPACE BAR
	if (32 in keysDown) {

		if (player.shield > 0)
		{
			player.shieldActivated = true;
			player.shield -= Math.round(1);
		}
		else
		{
			player.shieldActivated = false;
		}
	}
	else
	{
		player.shieldActivated = false;
		
		if (player.shield < 100)
		{
			player.shield += Math.round(1);
		}
	}

	// W
	if (87 in keysDown) {
		// shoot up
		blasters.up = true;
		shootBullet("up");
	}
	else
	{
		// stop
		blasters.up = false;
	}

	// S
	if (83 in keysDown) {
		// shoot down
		blasters.down = true;
		shootBullet("down");
	}
	else
	{
		// stop
		blasters.down = false;
	}

	// A
	if (65 in keysDown) {
		// shoot left
		blasters.left = true;
		shootBullet("left");
	}
	else
	{
		// stop
		blasters.left = false;
	}

	// D
	if (68 in keysDown) {
		// shoot right
		blasters.right = true;
		shootBullet("right");
	}
	else
	{
		// stop
		blasters.right = false;
	}

	// R
	if (82 in keysDown) {
		reset();
	}
};

// Draw the ship
// This is what the player controls
var drawShip = function () {

	ctx.beginPath();
	ctx.rect(player.x,player.y,60,60);
	ctx.strokeStyle = "rgb(35, 136, 252, 1)";
	ctx.lineWidth = "1";
	ctx.stroke();
};

// Draw the shield
// When pressing space bar, protects from bullets, storm, and small asteroids
var drawShield = function () {
	if (player.shieldActivated)
	{
		ctx.beginPath();
		ctx.strokeStyle = "rgb(35, 245, 252, 1)";
		ctx.fillStyle = "rgb(35, 245, 252, 0.5)";
		ctx.lineWidth = "3";

		var x = player.x + 30;
		var y = player.y + 30;
		var r = 45;
		var start = 0;
		var end = 2 * Math.PI;
		ctx.arc(x,y,r,start,end);
		ctx.fill();

		ctx.stroke();
	}
}

// Draw blasters
// Fire bullets into the direction based on user input
// maybe put a small cooldown or something on each side? or just a limiter of some sort?
var drawBlasters = function () {
	ctx.beginPath();
	ctx.strokeStyle = "rgb(35, 136, 252, 1)";
	ctx.lineWidth = "1";

	// shooting up
	if (blasters.up == true)
	{
		ctx.rect(player.x + 20, player.y - 5, 20, 5);
	}

	// shooting down
	if (blasters.down == true)
	{
		ctx.rect(player.x + 20, player.y + 60, 20, 5);
	}

	// shooting left
	if (blasters.left == true)
	{
		ctx.rect(player.x - 5, player.y + 20, 5, 20);
	}

	// shooting right
	if (blasters.right == true)
	{
		ctx.rect(player.x + 60, player.y + 20, 5, 20);
	}

	ctx.stroke();
}

// Draw bullets
// make them disappear after existing a lifetime? or get rid of once they leave the game area?
// want to prevent spam, but realisticly they bullets wouldnt disappear?
// maybe make them laser beams?
var drawBullets = function (x, y) {
	for (var i = 0; i < bullets.length; i++) {

		if (bullets[i].life > 0)
		{
			ctx.beginPath();
			ctx.strokeStyle = "rgb(245, 252, 35, 1)";
			//ctx.strokeStyle = "rgb(252, 42, 35, 1)"; // enemy bullet
			ctx.lineWidth = "1";

			var r = 1;
			var start = 0;
			var end = 2 * Math.PI;
			ctx.arc(bullets[i].x, bullets[i].y, r, start, end);
			
			ctx.stroke();

			bullets[i].life -= 5;
		}
		else
		{
			bullets.splice(i, 1);
		}

	}
}

// Draw Thrusters
// Used to show movement
// would like to replace with a nice particle effect later
var drawThrusters = function () {

	ctx.beginPath();
	ctx.strokeStyle = "#fc9723";
	ctx.lineWidth = "1";

	// moving up -- thrusters down
	if (thrusters.down == true)
	{
		ctx.rect(player.x, player.y + 60, 5, 5);
		ctx.rect(player.x + 55, player.y + 60, 5, 5);
	}

	// moving down -- thrusters up
	if (thrusters.up == true)
	{
		ctx.rect(player.x, player.y - 5, 5, 5);
		ctx.rect(player.x + 55, player.y - 5, 5, 5);
	}

	// moving left -- thrusters right
	if (thrusters.right == true)
	{
		ctx.rect(player.x + 60, player.y, 5, 5);
		ctx.rect(player.x + 60, player.y + 55, 5, 5);
	}

	// moving right -- thrusters left
	if (thrusters.left == true)
	{
		ctx.rect(player.x - 5, player.y, 5, 5);
		ctx.rect(player.x - 5, player.y + 55, 5, 5);
	}

	ctx.stroke();
};

var drawStorm = function () {
	//ctx.fillStyle = "rgb(252, 35, 136, 0.5)";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);

	// set XOR to cut-out
	//ctx.globalCompositeOperation = "xor";
	
	ctx.beginPath();
	ctx.strokeStyle = "rgb(252, 35, 136, 1)";
	ctx.lineWidth = "3";

	var x = canvas.width/2;
	var y = canvas.height/2;
	var r = 300;
	var start = 0;
	var end = 2 * Math.PI;
	ctx.arc(x,y,r,start,end);

	ctx.stroke();

	// draw storm mask canvas on top of main canvas context
}

// Draw everything
var render = function () {

	ctx.imageSmoothingEnabled = false;

	// Draw starfield
	ctx.fillStyle = "#0C1116";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	drawThrusters();
	drawBlasters();
	drawShip();
	drawBullets();
	drawShield();
	drawStorm();

	// HUD
	ctx.beginPath();
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "24px Consolas";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("x: " + player.x, 2, 2);
	ctx.fillText("y: " + player.y, 2, 32);
	ctx.fillText("xVel: " + Math.round(player.xVel), 2, 62);
	ctx.fillText("yVel: " + Math.round(player.yVel), 2, 92);

	ctx.fillText("health: " + Math.round(player.health), 2, 562);
	ctx.fillText("shield: " + Math.round(player.shield), 2, 592);
	ctx.stroke();
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	applyVelocity();
	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();