let canv = document.getElementById('gameField');
let cnt = canv.getContext('2d');

let ballRadius = 10;
let x = canv.width/2 ;
let y = canv.height/2 ;
let dx = 2;
let dy = 2;
let racketWidth = 10;
let racketHeight = 80;
let racket1X = 0;
let racket1Y = canv.height/2 - racketHeight/2;
let racket2X = canv.width-racketWidth;
let racket2Y = canv.height/2 - racketHeight/2;
let aPressed = false;
let dPressed = false;
let leftPressed = false;
let rightPressed = false;
let intervalID;
let gameEndPoint = 5;
let player1Point = 0;
let player2Point = 0;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.getElementById('startButton').addEventListener('click', getStart, false);
document.getElementById('restartButton').addEventListener('click',
	function() {document.location.reload()}, false)

function keyDownHandler(event) {
	if(event.keyCode == 39){
		rightPressed = true;
	} else if(event.keyCode == 37){
		leftPressed = true;
	}

	if(event.keyCode == 65){
		aPressed = true;
	} else if(event.keyCode == 68){
		dPressed = true;
	}
}

function keyUpHandler(event){
	if(event.keyCode == 39){
		rightPressed = false;
	} else if(event.keyCode == 37){
		leftPressed = false;
	}

	if(event.keyCode == 65){
		aPressed = false;
	} else if(event.keyCode == 68){
		dPressed = false;
	}
}

function setBallInCenter(){
		x = canv.width/2 ;
		y = canv.height/2 ;
		
		if(Math.random() > 0.5) {
			dx = 2;
		} else {
			dx = -2;
		}

		if(Math.random() > 0.5) {
			dy = 2;
		} else {
			dy = -2;
		}

}

function drawBall(){
	cnt.beginPath();
	cnt.arc(x, y, ballRadius, 0, Math.PI*2);
	cnt.fillStyle = "#0095DD";
	cnt.fill();
	cnt.closePath();
}

function drawRackets(){
	cnt.fillRect(racket1X, racket1Y, racketWidth, racketHeight);
	cnt.fillRect(racket2X, racket2Y, racketWidth, racketHeight);
}

function drawGameOver(a){
	cnt.fillStyle = 'red';
	cnt.font = '60px Georgia';
	cnt.fillText(a , 130, 200);
}

function accelerationBall(){
	if(dx > 0){
		dx += 1;
	} else {
		dx -= 1;
	}
	if(dy > 0){
		dy += 1;
	} else {
		dy -= 1;
	}
}

function getStart(){
	document.getElementById('startButton').style.display = "none";
	document.getElementById('restartButton').style.display = "flex";
	intervalID = setInterval(draw, 10);
	setInterval(accelerationBall, 10000)
}

function draw() {
	cnt.clearRect(0, 0, canv.width, canv.height);
	drawBall();
	drawRackets();

// движение ракетки
	if (rightPressed && racket2Y > 0){
		racket2Y -= 5;
	} else if (leftPressed && racket2Y + racketHeight < canv.height) {
		racket2Y += 5;
	}


	if (aPressed && racket1Y > 0){
		racket1Y -= 5;
	} else if (dPressed && racket1Y + racketHeight < canv.height) {
		racket1Y += 5;
	}

//отсткок от стен
	if (y  < ballRadius || y > canv.height - ballRadius){
		dy = -dy;
	}

	if (x  < ballRadius){
		player1Point += 1;
		document.getElementById('player1Score').innerHTML = player1Point;
		setBallInCenter();
	} else if ( x > canv.width - ballRadius){
		player2Point += 1;
		document.getElementById('player2Score').innerHTML = player2Point;
		setBallInCenter();
	}

// отсткок от ракетки 
	if (x > racket2X - ballRadius 
		&& racket2Y < y 
		&& racket2Y + racketHeight > y
		) {
		dx = -dx;
	}

	if (x < racket1X + racketWidth + ballRadius && racket1Y < y && racket1Y + racketHeight > y) {
		dx = -dx;
	}

//конец игры
	if (player1Point == gameEndPoint) {
		drawGameOver('Player 2 WIN')
		clearInterval(intervalID);
	} else if (player2Point == gameEndPoint) {
		drawGameOver('Player 1 WIN')
		clearInterval(intervalID);
}
	x += dx;
	y += dy;
}

draw();



