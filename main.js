var canvas = document.getElementById('gameCanvas');
canvas.style.cursor='none';
var context = canvas.getContext('2d');
var playerIMG = new Image();
playerIMG.onload = function() {context.drawImage(playerIMG, 0,0);};
playerIMG.src = 'Assets/images/player.png';
var mapIMG = new Image();
mapIMG.onload = function() {context.drawImage(mapIMG, 0,0);};
mapIMG.src = 'Assets/images/map2.png';
var bulletIMG = new Image();
bulletIMG.src = 'Assets/images/bullet.png';
var youDiedIMG = new Image();
youDiedIMG.src = 'Assets/images/youDied.jpg';
var youWonIMG = new Image();
youWonIMG.src = 'Assets/images/youWon.jpg';
var bGM = new Audio('Assets/sounds/music/4ware.mp3');
bGM.volume=0.25;
bGM.play();
var pXpos=150;
var pYpos=300;
var mx=0;
var my=0;
var chs=4;
var chm = chs/2;
const cms=5;
var ms=5;
var is=false;
var keyStates = [];
var health=100;
var ammo =45;
var stamina =250;
var maxStamina=250;
var tTD =0;
var pSTI = setInterval(pST, 20);
var bA =[];
/////////////
//    GUNS //
/////////////
var pistol = {
	name:"pistol",
    damage:8,
    clipAmmo:7,
    maxAmmo:20,
	fireRate:1,//how many times per second can you shoot
	runSpeedModifier:0,//how much it decreases ms by
    isEquipped:true
};
var smg = {
	name:"smg",
    damage:3,
    clipAmmo:50,
    maxAmmo:200,
	fireRate:12,//how many times per second can you shoot
	runSpeedModifier:1,//how much it decreases ms by
    isEquipped:false
};
var ar = {
	name:"ar",
    damage:26,
    clipAmmo:30,
    maxAmmo:70,
	fireRate:4,//how many times per second can you shoot
	runSpeedModifier:3,//how much it decreases ms by
    isEquipped:false
};
var sniper = {
	name:"sniper",
    damage:69,
    clipAmmo:5,
    maxAmmo:15,
	fireRate:(1/3),//how many times per second can you shoot
	runSpeedModifier:5,//how much it decreases ms by
    isEquipped:false
};
var guns = {
	pistol:pistol,
	smg:smg,
	ar:ar,
	sniper:sniper
};
function gunEquipped(){
	if(guns.pistol.isEquipped==true){
		return guns.pistol;
	} else if(guns.smg.isEquipped==true){
		return guns.smg;
	} else if(guns.ar.isEquipped==true){
		return guns.ar;
	} else if(guns.sniper.isEquipped==true){
		return guns.sniper;
	}
}

//---------------------------------------------------------------------Leron's Work------------------------------------------------------------------------------------------------
// not needed as it is implemented in the array of enemy objects
//var enemy1IsAlive = true;
//var enemy2IsAlive = true;
//var enemy3IsAlive = true;
//var enemy4IsAlive = true;

var enemy1IMG = new Image();
enemy1IMG.src = 'Assets/images/enemy.png';
var enemy2IMG = new Image();
enemy2IMG.src = 'Assets/images/enemy.png';
var enemy3IMG = new Image();
enemy3IMG.src = 'Assets/images/Boss.png';
var enemy4IMG = new Image();
enemy4IMG.src = 'Assets/images/enemy.png';
//-------tylors add on--------------------
var enemies=[
	enemy1={
		xPos:400,
		yPos:300,
		health:50,
		isAlive:true,
		gunEquipped:guns.pistol,
		tTDE:0
	},
	enemy2={
		xPos:800,
		yPos:600,
		health:100,
		isAlive:true,
		gunEquipped:guns.smg,
		tTDE:0
	},
	enemy3={
		xPos:1200,
		yPos:500,
		health:500,
		isAlive:true,
		gunEquipped:guns.ar,
		tTDE:0
	},
	enemy4={
		xPos:500,
		yPos:60,
		health:200,
		isAlive:true,
		gunEquipped:guns.sniper,
		tTDE:0
	}
];
//----------------------------------

var uIval = setInterval(initGame, 20);

function initGame() {
    dangerArea();
	uEST();//update Enemy Shooting Timer
};
function uEST(){
	if(enemy1.tTDE>20&&enemy1.tTDE-20>0){
		enemy1.tTDE-=20;
	} else {
		enemy1.tTDE=0;
	}
	if(enemy2.tTDE>20&&enemy2.tTDE-20>0){
		enemy2.tTDE-=20;
	} else {
		enemy2.tTDE=0;
	}
	if(enemy3.tTDE>20&&enemy3.tTDE-20>0){
		enemy3.tTDE-=20;
	} else {
		enemy3.tTDE=0;
	}
	if(enemy4.tTDE>20&&enemy4.tTDE-20>0){
		enemy4.tTDE-=20;
	} else {
		enemy4.tTDE=0;
	}
};
function dangerArea() {
    if (pYpos <= 458 && pYpos > 132 && pXpos >= 343 && pXpos <= 708) {
        if(enemy1.isAlive && enemy1.tTDE==0){
        	health -= enemies[0].gunEquipped.damage;
			enemy1.tTDE=(1000/enemies[0].gunEquipped.fireRate);
		}
    }
    if (pYpos <= 400 && pYpos > 132 && pXpos >= 763 && pXpos <= 825) {
        if(enemy2.isAlive && enemy2.tTDE==0){
            health -= enemies[1].gunEquipped.damage;
			enemy2.tTDE=(1000/enemies[1].gunEquipped.fireRate);
        }
    }
    if (pYpos <= 617  && pYpos > 401 && pXpos >= 763 && pXpos <= 1042) {
        if(enemy2.isAlive && enemy2.tTDE==0){
            health -= enemies[1].gunEquipped.damage;
			enemy2.tTDE=(1000/enemies[1].gunEquipped.fireRate);
        }
    }
    if (pYpos <= 101 && pYpos > 0 && pXpos >= 343 && pXpos <= 1368) {
        if(enemy4.isAlive && enemy4.tTDE==0){
            health -= enemies[3].gunEquipped.damage;
			enemy4.tTDE=(1000/enemies[3].gunEquipped.fireRate);
        }    }
    if (pYpos <= 768 && pYpos > 0 && pXpos >= 1102 && pXpos <= 1368) {
        if(enemy3.isAlive && enemy3.tTDE==0){
            health -= enemies[2].gunEquipped.damage;
			enemy3.tTDE=(1000/enemies[2].gunEquipped.fireRate);
        }
    }

};

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.addEventListener('keyup', function(e) {var pos = null; if( (pos = keyStates.indexOf( e.keyCode )) > -1 ) keyStates.splice( pos, 1 ); }, false);
window.addEventListener("keydown", keyHandler, false);
var renderI = setInterval(render, 16.66);
var hudI = setInterval(hudU, 16.66);
var staminaI = setInterval(staminaRefill, 500);
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
	} else if (keyStates.indexOf( 49 ) > -1){
		changeWeapon(1);
	} else if (keyStates.indexOf( 50 ) > -1){
		changeWeapon(2);
	} else if (keyStates.indexOf( 51 ) > -1){
		changeWeapon(3);
	} else if (keyStates.indexOf( 52 ) > -1){
		changeWeapon(4);
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
		case "teleport":
		case "Teleport":
			pXpos= prompt("Desired X Position:", "xxxxx");
			pYpos= prompt("Desired Y Position:", "yyyyy");
			break;
		case "teleporttomouse":
		case "TeleportToMouse":
			pXpos= mx;
			pYpos= my;
			break;
		case "killall":
		case "KillAll":
			enemies[0].isAlive=false;
			enemies[1].isAlive=false;
			enemies[2].isAlive=false;
			enemies[3].isAlive=false;
			break;
		default:
			alert("Invalid Cheat Code");
	}
};
function changeWeapon(wW){
	switch(wW){
		case 1:
			guns.pistol.isEquipped=true;
			guns.smg.isEquipped=false;
			guns.ar.isEquipped=false;
			guns.sniper.isEquipped=false;
			clearInterval(pSTI);
			tTD=(1000/gunEquipped().fireRate);
			pSTI = setInterval(pST, 200);
			break;
		case 2:
			guns.pistol.isEquipped=false;
			guns.smg.isEquipped=true;
			guns.ar.isEquipped=false;
			guns.sniper.isEquipped=false;
			clearInterval(pSTI);
			tTD=(1000/gunEquipped().fireRate);
			pSTI = setInterval(pST, 200);
			break;
		case 3:
			guns.pistol.isEquipped=false;
			guns.smg.isEquipped=false;
			guns.ar.isEquipped=true;
			guns.sniper.isEquipped=false;
			clearInterval(pSTI);
			tTD=(1000/gunEquipped().fireRate);
			pSTI = setInterval(pST, 200);
			break;
		case 4:
			guns.pistol.isEquipped=false;
			guns.smg.isEquipped=false;
			guns.ar.isEquipped=false;
			guns.sniper.isEquipped=true;
			clearInterval(pSTI);
			tTD=(1000/gunEquipped().fireRate);
			pSTI = setInterval(pST, 200);
			break;
		default:
			guns.pistol.isEquipped=false;
			guns.smg.isEquipped=false;
			guns.ar.isEquipped=false;
			guns.sniper.isEquipped=false;
			clearInterval(pSTI);
	}
};
function moveUp(){
	isSprinting();
	if (pYpos<=132 && pYpos>77 && pXpos>=343 && pXpos<=874){
		pYpos = 132;
	} else if (pYpos<=132 && pYpos>77 && pXpos>=977 && pXpos<=1047){
		pYpos = 132;
	} else if (pYpos<=162 && pYpos>77 && pXpos<=762 && pXpos>=709){
		pYpos = 162;
	} else if (pYpos<=432 && pYpos>377 && pXpos>=805 && pXpos<=986){
		pYpos = 432;
	} else if (pYpos<=513 && pYpos>458 && pXpos>=343 && pXpos<=653){
		pYpos = 513;
	} else if (pYpos<=672 && pYpos>617 && pXpos>=343 && pXpos<=469){
		pYpos = 672;
	} else if (pYpos<=672 && pYpos>617 && pXpos>=530 && pXpos<=1101){
		pYpos = 672;
	} else if (pYpos<=0){
		pYpos = 0;
	} else {
		pYpos -= ms;
	}
};
function moveLeft(){
	isSprinting();
	if (pXpos<=343 && pYpos<=617 && pXpos>288){
		pXpos = 343;
	} else if (pXpos<=470 && pYpos<=671 && pYpos>=618 && pXpos>288){
		pXpos = 470;
	} else if (pXpos<=642 && pYpos>=672 && pXpos>587){
		pXpos = 642;
	} else if (pXpos<=654 && pYpos>=459 && pYpos<513 && pXpos>288){
		pXpos = 654;
	} else if (pXpos<=763 && pYpos>=208 && pYpos<=617 && pXpos>708){
		pXpos = 763;
	} else if (pXpos<=763 && pYpos>=132 && pYpos<=161 && pXpos>708){
		pXpos = 763;
	} else if (pXpos<=929 && pYpos>=78 && pYpos<=377 && pXpos>874){
		pXpos = 929;
	} else if (pXpos<=987 && pYpos>=378 && pYpos<=431 && pXpos>804){
		pXpos = 987;
	} else if (pXpos<=1102 && pYpos>=78 && pYpos<=671 && pXpos>1047){
		pXpos = 1102;
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
	} else if (pXpos>=529 && pYpos<672 && pYpos>617 && pXpos<1102){
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
	} else if (pXpos>=976 && pYpos>77 && pYpos<132 && pXpos<1102){
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
	if (pYpos>=617 && pYpos<672 && pXpos<=469 && pXpos>=289){
		pYpos = 617;
	} else if (pYpos>=617 && pYpos<672 && pXpos>529 && pXpos<1102){
		pYpos =617;
	} else if (pYpos>=458 && pYpos<513 && pXpos>=343 && pXpos<=653){
		pYpos = 458;
	} else if (pYpos>=377 && pYpos<432 && pXpos>=803 && pXpos<=986){
		pYpos = 377;
	} else if (pYpos>=207 && pYpos<672 && pXpos>=707 && pXpos<=762){
		pYpos = 207;
	} else if (pYpos>=77 && pYpos<132 && pXpos>=343 && pXpos<=928){
		pYpos = 77;
	} else if (pYpos>=77 && pYpos<132 && pXpos>=975 && pXpos<1102){
		pYpos = 77;
	} else if (pYpos>=canvas.height-32){
		pYpos = canvas.height-32;
	} else {
		pYpos += ms;
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
canvas.addEventListener("mousedown", function(evt) {
	var mousePos = getMousePos(canvas, evt);
    console.log( 'Click Detected, Mouse position: ' + mousePos.x + ',' + mousePos.y);
	mx=mousePos.x;
	my=mousePos.y;
	if (ammo>0 && pST()==0){
		shoot(pXpos,pYpos,mx,my);
	}
}, false);
var mouseDown = false;
document.body.onmousedown = function() { 
    mouseDown = true;
}
document.body.onmouseup = function() {
    mouseDown = false;
}

function staminaRefill(){
	if (stamina+(maxStamina/10)>maxStamina){
		stamina=maxStamina;
	} else if (stamina<maxStamina){
		stamina+=(maxStamina/25);
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
	switch (gunEquipped().name){
		case "pistol":
			document.getElementById('pistolHUD').style.color="green";
			document.getElementById('smgHUD').style.color="black";
			document.getElementById('arHUD').style.color="black";
			document.getElementById('sniperHUD').style.color="black";
			break;
		case "smg":
			document.getElementById('pistolHUD').style.color="black";
			document.getElementById('smgHUD').style.color="green";
			document.getElementById('arHUD').style.color="black";
			document.getElementById('sniperHUD').style.color="black";
			break;
		case "ar":
			document.getElementById('pistolHUD').style.color="black";
			document.getElementById('smgHUD').style.color="black";
			document.getElementById('arHUD').style.color="green";
			document.getElementById('sniperHUD').style.color="black";
			break;
		case "sniper":
			document.getElementById('pistolHUD').style.color="black";
			document.getElementById('smgHUD').style.color="black";
			document.getElementById('arHUD').style.color="black";
			document.getElementById('sniperHUD').style.color="green";
		
	}
	if (mouseDown==true && ammo>0 && pST()==0){
		shoot(pXpos,pYpos,mx,my);
	}
	
};
function render(){
	
	//erase
	context.clearRect(0, 0, canvas.width, canvas.height);
	//map
	context.drawImage(mapIMG, 0,0);

	//---------------------------------------------------------------------Leron's Work------------------------------------------------------------------------------------------------
	//Enemy 1
	if(enemies[0].health>0){
		context.drawImage(enemy1IMG, enemies[0].xPos, enemies[0].yPos);
		context.fillText("Health: " + enemies[0].health, enemies[0].xPos-14, enemies[0].yPos-10);
	} else if(enemies[0].health<=0){
		enemies[0].isAlive=false;
	}
	//Enemy 2
	if(enemies[1].health>0){
		context.drawImage(enemy2IMG, enemies[1].xPos, enemies[1].yPos);
		context.fillText("Health: " + enemies[1].health, enemies[1].xPos-14, enemies[1].yPos-10);
	} else if(enemies[1].health<=0){
		enemies[1].isAlive=false;
	}
	//Enemy 3
	if(enemies[2].health>0){
		context.drawImage(enemy3IMG, enemies[2].xPos, enemies[2].yPos);
		context.fillText("Health: " + enemies[2].health, enemies[2].xPos-14, enemies[2].yPos-10);
	} else if(enemies[2].health<=0){
		enemies[2].isAlive=false;
	}
	//Enemy 4
	if(enemies[3].health>0){
		context.drawImage(enemy4IMG, enemies[3].xPos, enemies[3].yPos);
		context.fillText("Health: " + enemies[3].health, enemies[3].xPos-14, enemies[3].yPos-10);
	} else if(enemies[3].health<=0){
		enemies[3].isAlive=false;
	}
	//Health display in canvas bottom left red
	//context.fillText("Health:" + health, 20, 796);

    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
	//context.save();
    //context.translate(pXpos+16,pYpos+16); // change origin
    //context.rotate(lookAngle()*Math.PI/180);
    //context.drawImage(playerIMG,pXpos,pYpos);
    //context.restore();
	context.drawImage(playerIMG, pXpos,pYpos);
	console.log(pXpos,pYpos);
	lostGame();
	wonGame();
	console.log(pST());
};
function lookAngle(){
	var a = pXpos - mx;
	var b = pYpos - my;
	var c = Math.sqrt(((a*2)+(b*2)));
	var tan = b/a;
	var cos = a/c;
	var sin = b/c;
	return tan;
};
function shoot(px,py,mx,my){
	if(ammo>0){
		if(mx>=enemies[0].xPos && mx<=(enemies[0].xPos+32) && my>=enemies[0].yPos && my<=(enemies[0].yPos+32)){
			enemies[0].health-=gunEquipped().damage;
		}
		if(mx>=enemies[1].xPos && mx<=(enemies[1].xPos+32) && my>=enemies[1].yPos && my<=(enemies[1].yPos+32)){
			enemies[1].health-=gunEquipped().damage;
		}
		if(mx>=enemies[2].xPos && mx<=(enemies[2].xPos+64) && my>=enemies[2].yPos && my<=(enemies[2].yPos+64)){
			enemies[2].health-=gunEquipped().damage;
		}
		if(mx>=enemies[3].xPos && mx<=(enemies[3].xPos+32) && my>=enemies[3].yPos && my<=(enemies[3].yPos+32)){
			enemies[3].health-=gunEquipped().damage;
		}
		console.log(gunEquipped());
		ammo--;
		tTD=(1000/gunEquipped().fireRate);
		//animateFromTo(pXpos,pYpos,mx,my);
	}
};
function wonGame(){
	if(enemies[0].isAlive==false && enemies[1].isAlive==false && enemies[2].isAlive==false && enemies[3].isAlive==false){
		bGM.pause();
		context.clearRect(0, 0, canvas.width, canvas.height);
		console.log("you won");
		context.drawImage(youWonIMG, 0,0);
		console.log("you won");
	}
};
function lostGame(){
	if(health<=0){
		bGM.pause();
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(youDiedIMG, 0,0);
		canvas.style.cursor='default';
		health=0;
		pXpos=0;
		pYpos=0;
	}
};
function animateFromTo(cx,cy,tx,ty){
	b={
		cx:cx,
		cy:cy,
		tx:tx,
		ty:ty
	}
	createjs.Tween.get(bulletIMG, {loop: true})
          .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
          .to({alpha: 0, y: 75}, 500, createjs.Ease.getPowInOut(2))
          .to({alpha: 0, y: 125}, 100)
          .to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))
          .to({x: 100}, 800, createjs.Ease.getPowInOut(2));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", canvas);
};
function pST (){
	if(tTD>0&&tTD-20>0){
		tTD -= 20;
	} else {
		tTD=0;
	}
	return tTD;
};
//TO DO
/*
1. fix all the collisions to make it so you cant go into a wall and glitch through by moving in the opposite direction ....I know how to fix this but its way too tedious and time consuming for friday
2. fix the shooting
3. make the enemies shoot
4. make the bullets stop when they hit a wall
*/