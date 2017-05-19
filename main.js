var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var imageObj = new Image();
imageObj.onload = function() {context.drawImage(imageObj, 0,0);};
imageObj.src = 'Assets/images/player.png';

var pXpos=0;
var pYpos=0;
var mx=0;
var my=0;
var chs=4;
var chm = chs/2;
var ms=5;
var keyStates = [];
var health=100;
var ammo =0;
window.addEventListener('keyup', function(e) {var pos = null; if( (pos = keyStates.indexOf( e.keyCode )) > -1 ) keyStates.splice( pos, 1 ); }, false);
window.addEventListener("keydown", keyHandler, false);
setInterval(render, 16.66);
function keyHandler(e){
	//alert(e.keyCode);
	if (keyStates.indexOf( e.keyCode ) > -1){
		console.log("key already down");
	} else {
		keyStates.push( e.keyCode );
	}
	console.log("keys dedected down");
	for (var i=0; i<keyStates.length; i++){
		console.log(i);
		console.log(keyStates[i]);
	}
	if(e.keyCode==32){
		shoot();
	} else if ((keyStates.indexOf( 87 ) > -1) && (keyStates.indexOf( 68 ) > -1)){
		moveUp();
		moveRight();
	} else if (keyStates.indexOf( 87 ) > -1 && keyStates.indexOf( 65 ) > -1){
		moveUp();
		moveLeft();
	} else if (keyStates.indexOf( 83 ) > -1 && keyStates.indexOf( 65 ) > -1){
		moveDown();
		moveLeft();
	} else if (keyStates.indexOf( 83 ) > -1 && keyStates.indexOf( 68 ) > -1){
		moveDown();
		moveRight();
	} else if (keyStates.indexOf( 87 ) > -1){
		moveUp();
	} else if (keyStates.indexOf( 65 ) > -1){
		moveLeft();
	} else if (keyStates.indexOf( 68 ) > -1){
		moveRight();
	} else if (keyStates.indexOf( 83 ) > -1){
		moveDown();
	} else if (keyStates.indexOf( 82 ) > -1){
		reLoad();
	}
}
function moveUp(){
	if (pYpos>0){
		pYpos -= ms;
		if (pYpos<0){
			pYpos = 0;
		}
	}
}
function moveLeft(){
	if (pXpos>0){
		pXpos -= ms;
		if (pXpos<0){
			pXpos = 0;
		}
	}
}
function moveRight(){
	if (pXpos<canvas.width-32){
		pXpos += ms;
		if (pXpos>canvas.width-32){
			pXpos = canvas.width-32;
		}
	}
}
function moveDown(){
	if (pYpos<canvas.height-32){
		pYpos += ms;
		if (pYpos>canvas.height-32){
			pYpos = canvas.height-32;
		}
	}
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
	};
}
canvas.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvas, evt);
    console.log( 'Mouse position: ' + mousePos.x + ',' + mousePos.y);
	mx=mousePos.x;
	my=mousePos.y;
}, false);

function render(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.moveTo(pXpos+16,pYpos+16);
	context.lineTo((mx-chm-1),(my-chm-1));
	context.strokeStyle="#FF0000";
	context.stroke();
	context.beginPath();
	context.fillStyle="#FF0000";
	context.arc((mx-chm-1), (my-chm-1), chs, 0, 2 * Math.PI);
	context.fill();
	context.drawImage(imageObj, pXpos,pYpos);
	console.log(pXpos,pYpos);
};