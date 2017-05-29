var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var playerIMG = new Image();
playerIMG.onload = function() {context.drawImage(playerIMG, 0,0);};
playerIMG.src = 'Assets/images/playerTestCollision.png';
var mapIMG = new Image();
mapIMG.onload = function() {context.drawImage(mapIMG, 0,0);};
mapIMG.src = 'Assets/images/map.png';
var pXpos=0;
var pYpos=0;
var mx=0;
var my=0;
var chs=4;
var chm = chs/2;
const cms=1;
var ms=1;
var is=false;
var keyStates = [];
var health=100;
var ammo =0;
var stamina =10000;
var maxStamina=175;
var bA =[];

function bullet(sXpos,sYpos,cXpos,cYpos,damage,speed,image,isA){
	this.sXpos = sXpos;
	this.sYpos = sYpos;
	this.cXpos = cXpos;
	this.cYpos = cYpos;
	this.damage = damage;
	this.speed = speed;
	this.image = imgae;
	this.isA = isA;
};
window.addEventListener('keyup', function(e) {var pos = null; if( (pos = keyStates.indexOf( e.keyCode )) > -1 ) keyStates.splice( pos, 1 ); }, false);
window.addEventListener("keydown", keyHandler, false);
setInterval(render, 16.66);
setInterval(hudU, 16.66);
setInterval(staminaRefill, 500);
function keyHandler(e){
	console.log(is);
	is=false;
	ms=cms;
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
	} else if (keyStates.indexOf( 87 ) > -1 && keyStates.indexOf( 16 ) > -1){
		is=true;
		moveUp();
	} else if (keyStates.indexOf( 65 ) > -1 && keyStates.indexOf( 16 ) > -1){
		is=true;
		moveLeft();
	} else if (keyStates.indexOf( 68 ) > -1 && keyStates.indexOf( 16 ) > -1){
		is=true;
		moveRight();
	} else if (keyStates.indexOf( 83 ) > -1 && keyStates.indexOf( 16 ) > -1){
		is=true;
		moveDown();
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
	} else if (keyStates.indexOf( 192 ) > -1){
		cheatConsole();
	}
};
function cheatConsole(){
	keyStates=[];
    var cheat = prompt("Please enter a cheat code:", "Cheat Code");
    switch(cheat) {
	case "health":
    case "Health":
        health=health*10;
        break;
	case "ammo":
    case "Ammo":
        ammo=500;
        break;
    case "stamina":
	case "Stamina":
        stamina=maxStamina*10;
        break;
    default:
		alert("Invalid Cheat Code");
	}
}
function moveUp(){
	isSprinting();
	if (pYpos>0){
		pYpos -= ms;
		if (pYpos<0){
			pYpos = 0;
		}
	}
};
function moveLeft(){
	isSprinting();
	if (pXpos<=343 && pYpos<=617 && pXpos>288){
		pXpos = 343;
	} else if (pXpos<=470 && pYpos<=671 && pYpos>=618 && pXpos>288){
		pXpos = 470;
	} else if (pXpos>=587 && pYpos>=672 && pXpos<642 && pXpos<1102){
		pXpos = 587;
	} else if (pXpos<=0){
		pXpos = 0;
	} else {
		pXpos -= ms;
	}
};
function moveRight(){
	isSprinting();
	if (pXpos>=288 && pYpos<672 && pXpos<343){
		pXpos = 288;
	} else if (pXpos>=529 && pYpos<672 && pYpos>617){
		pXpos = 529;
	} else if (pXpos>=587 && pYpos>=672 && pXpos<642 && pXpos<1102){
		pXpos = 587;
	} else if (pXpos>=708 && pYpos<=617 && pYpos>207 && pXpos<763){
		pXpos = 708;
	} else if (pXpos>=708 && pYpos<162 && pYpos>=132 && pXpos<763){
		pXpos = 708;
	} else if (pXpos>=804 && pYpos>377 && pYpos<432 && pXpos<987){
		pXpos = 804;
	} else if (pXpos>=874 && pYpos>=132 && pYpos<=377 && pXpos<929){
		pXpos = 874;
	} else if (pXpos>=976 && pYpos>=109 && pYpos<=132 && pXpos<1102){
		pXpos = 976;
	} else if (pXpos>=1047 && pYpos>=132 && pYpos<=617 && pXpos<1102){
		pXpos = 1047;
	} else if (pXpos>=canvas.width-32){
		pXpos = canvas.width-32;
	} else {
		pXpos += ms;
	}
};
function moveDown(){
	isSprinting();
	if (pYpos<canvas.height-32){
		pYpos += ms;
		if (pYpos>canvas.height-32){
			pYpos = canvas.height-32;
		}
	}
};

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
function shoot(){
	var b = new bullet(sx,sy,cx,cy,damage,bs,bi,doa);
	for(var i=0;i<bA.length-1;i++){
		bA[i]=b;
	};
};
function staminaRefill(){
	if (stamina<maxStamina){
		stamina++;	
	}
};
function isSprinting(){
	if (is==true && stamina>=5){
		console.log(is);
		stamina-=5;
		ms=15;
	}
};
function hudU(){
	document.getElementById('playerHealth').innerHTML="Health: "+health;
	document.getElementById('playerAmmo').innerHTML="Ammo: "+ammo;
	document.getElementById('playerStamina').innerHTML="Stamina: "+stamina;
};
function render(){
	//erase
	context.clearRect(0, 0, canvas.width, canvas.height);
	//map
	context.drawImage(mapIMG, 0,0);
	//line from player to crosshair
	context.beginPath();
	context.moveTo(pXpos+16,pYpos+16);
	context.lineTo((mx-chm-1),(my-chm-1));
	context.strokeStyle="#FF0000";
	context.stroke();
	//crosshair
	context.beginPath();
	context.fillStyle="#FF0000";
	context.arc((mx-chm-1), (my-chm-1), chs, 0, 2 * Math.PI);
	context.fill();
	//player
	context.drawImage(playerIMG, pXpos,pYpos);
	console.log(pXpos,pYpos);
};