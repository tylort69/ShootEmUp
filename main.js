var canvas = document.getElementById('gameCanvas');
canvas.style.cursor='none';
var context = canvas.getContext('2d');
var playerIMG = new Image();
playerIMG.onload = function() {context.drawImage(playerIMG, 0,0);};
playerIMG.src = 'Assets/images/player.png';
var fLLIMG = new Image();
fLLIMG.src = 'Assets/images/flashlightlightv2.png';
var mapIMG = new Image();
mapIMG.onload = function() {context.drawImage(mapIMG, 0,0);};
mapIMG.src = 'Assets/images/map2.png';
var bulletIMG = new Image();
bulletIMG.src = 'Assets/images/bullet.png';
var youDiedIMG = new Image();
youDiedIMG.src = 'Assets/images/youDied.jpg';
var youWonIMG = new Image();
youWonIMG.src = 'Assets/images/youWon.jpg';
var fowIMG = new Image();
fowIMG.src = 'Assets/images/NightFOW.png';
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
// BULLETS //
var deltaX = 0;
var deltaY = 0;
var rotation = 0;
var xtarget = 0;
var ytarget = 0;
var theBullets = [];
var deltaX, deltaY, newAngle = 0;
var fLO=true;
/////////////////////////////////////////
/////////////
//    GUNS //
/////////////
var pistol = {
	name:"pistol",
    damage:8,
    clipAmmo:7,
	cClipAmmo:7,
    maxAmmo:20,
	cMaxAmmo:20,
	fireRate:1,//how many times per second can you shoot
	runSpeedModifier:0,//how much it decreases ms by
	accuracyModifier:5,
    isEquipped:true
};
var smg = {
	name:"smg",
    damage:3,
    clipAmmo:50,
	cClipAmmo:50,
    maxAmmo:200,
	cMaxAmmo:200,
	fireRate:12,//how many times per second can you shoot
	runSpeedModifier:1,//how much it decreases ms by
	accuracyModifier:50,
    isEquipped:false
};
var sg = {
	name:"sg",
    damage:10,
    clipAmmo:12,
	cClipAmmo:12,
    maxAmmo:40,
	cMaxAmmo:40,
	fireRate:0.75,//how many times per second can you shoot
	runSpeedModifier:2,//how much it decreases ms by
	accuracyModifier:200,
    isEquipped:false
};
var ar = {
	name:"ar",
    damage:26,
    clipAmmo:30,
	cClipAmmo:30,
    maxAmmo:70,
	cMaxAmmo:70,
	fireRate:4,//how many times per second can you shoot
	runSpeedModifier:3,//how much it decreases ms by
	accuracyModifier:15,
    isEquipped:false
};
var sniper = {
	name:"sniper",
    damage:69,
    clipAmmo:5,
	cClipAmmo:5,
    maxAmmo:15,
	cMaxAmmo:15,
	fireRate:(1/3),//how many times per second can you shoot
	runSpeedModifier:5,//how much it decreases ms by
	accuracyModifier:1,
    isEquipped:false
};
var guns = {
	pistol:pistol,
	smg:smg,
	sg:sg,
	ar:ar,
	sniper:sniper
};
function gunEquipped(){
	if(guns.pistol.isEquipped==true){
		return guns.pistol;
	} else if(guns.smg.isEquipped==true){
		return guns.smg;
	} else if(guns.sg.isEquipped==true){
		return guns.sg;
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
		xPos:800,
		yPos:500,
		health:50,
		isAlive:true,
		gunEquipped:guns.pistol,
		tTDE:0
	},
	enemy2={
		xPos:450,
		yPos:60,
		health:100,
		isAlive:true,
		gunEquipped:guns.smg,
		tTDE:0
	},
	enemy3={
		xPos:800,
		yPos:700,
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
    enemyAnimator();
};

function enemyAnimator(){
    if(enemy1.yPos >= 175){
        enemy1.yPos -= 1;
    }
    if(enemy1.yPos < 176 && enemy1.xPos >= 475){
        enemy1.xPos -= 1;
    }
    if(enemy1.xPos < 476 && enemy1.yPos <= 400){
        enemy1.yPos += 2;
    }
    
    if(enemy2.xPos <= 968){
        enemy2.xPos += 1;
    }
    
    if(enemy2.xPos > 967 && enemy2.yPos <= 280){
        enemy2.yPos += 1;
    }
    
    if(enemy2.yPos > 279 && enemy2.xPos <= 1120){
        enemy2.xPos += 1;
    }
    
    if(enemy2.xPos > 1119 && enemy2.yPos <= 430){
        enemy2.yPos += 1;
    }
    if(enemy2.yPos > 429 && enemy2.xPos >= 800){
        enemy2.xPos -= 2.1;
    }
    
    if(enemy3.xPos <= 1250){
        enemy3.xPos += 1;
    }
    
    if(enemy3.xPos > 1249 && enemy3.yPos >= 400){
        enemy3.yPos -= 1;
    }
    
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
			createBullet(pXpos + (32 / 2), pYpos + (32 / 2), enemy1.xPos+ (32 / 2), enemy1.yPos + (32 / 2));
			enemy1.tTDE=(1000/enemies[0].gunEquipped.fireRate);
		}
    }
    if (pYpos <= 400 && pYpos > 132 && pXpos >= 763 && pXpos <= 825) {
        if(enemy2.isAlive && enemy2.tTDE==0){
            health -= enemies[1].gunEquipped.damage;
			createBullet(pXpos + (32 / 2), pYpos + (32 / 2), enemy2.xPos+ (32 / 2), enemy2.yPos + (32 / 2));
			enemy2.tTDE=(1000/enemies[1].gunEquipped.fireRate);
        }
    }
    if (pYpos <= 617  && pYpos > 401 && pXpos >= 763 && pXpos <= 1042) {
        if(enemy2.isAlive && enemy2.tTDE==0){
            health -= enemies[1].gunEquipped.damage;
			createBullet(pXpos + (32 / 2), pYpos + (32 / 2), enemy2.xPos+ (32 / 2), enemy2.yPos + (32 / 2));
			enemy2.tTDE=(1000/enemies[1].gunEquipped.fireRate);
        }
    }
    if (pYpos <= 101 && pYpos > 0 && pXpos >= 343 && pXpos <= 1368) {
        if(enemy4.isAlive && enemy4.tTDE==0){
            health -= enemies[3].gunEquipped.damage;
			createBullet(pXpos + (32 / 2), pYpos + (32 / 2), enemy4.xPos+ (32 / 2), enemy4.yPos + (32 / 2));
			enemy4.tTDE=(1000/enemies[3].gunEquipped.fireRate);
        }    }
    if (pYpos <= 768 && pYpos > 0 && pXpos >= 1102 && pXpos <= 1368) {
        if(enemy3.isAlive && enemy3.tTDE==0){
            health -= enemies[2].gunEquipped.damage;
			createBullet(pXpos + (32 / 2), pYpos + (32 / 2), enemy3.xPos+ (32 / 2), enemy3.yPos + (32 / 2));
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
	} else if (keyStates.indexOf( 53 ) > -1){
		changeWeapon(5);
	} else if (keyStates.indexOf( 192 ) > -1){
		cheatConsole();
	} else if (keyStates.indexOf( 70 ) > -1){
		tFL();
	}
};
function reLoad(){
	var temp =0;
	if(gunEquipped().maxAmmo>=gunEquipped().cClipAmmo&&gunEquipped().clipAmmo>0){
		gunEquipped().maxAmmo-=(gunEquipped().cClipAmmo-gunEquipped().clipAmmo);
		gunEquipped().clipAmmo=gunEquipped().cClipAmmo;
	}else if(gunEquipped().maxAmmo>=gunEquipped().cClipAmmo){
		gunEquipped().clipAmmo=gunEquipped().cClipAmmo;
		gunEquipped().maxAmmo-=gunEquipped().cClipAmmo;
	}else if(gunEquipped().clipAmmo<gunEquipped().cClipAmmo && !gunEquipped().maxAmmo<1){
		temp=gunEquipped().cClipAmmo-gunEquipped().clipAmmo;
		gunEquipped().maxAmmo-=temp;
		gunEquipped().clipAmmo+=temp;
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
			guns.sg.isEquipped=false;
			guns.ar.isEquipped=false;
			guns.sniper.isEquipped=false;
			clearInterval(pSTI);
			tTD=(1000/gunEquipped().fireRate);
			pSTI = setInterval(pST, 200);
			ammo=gunEquipped().maxAmmo;
			break;
		case 2:
			guns.pistol.isEquipped=false;
			guns.smg.isEquipped=true;
			guns.sg.isEquipped=false;
			guns.ar.isEquipped=false;
			guns.sniper.isEquipped=false;
			clearInterval(pSTI);
			tTD=(1000/gunEquipped().fireRate);
			pSTI = setInterval(pST, 200);
			ammo=gunEquipped().maxAmmo;
			break;
		case 3:
			guns.pistol.isEquipped=false;
			guns.smg.isEquipped=false;
			guns.sg.isEquipped=true;
			guns.ar.isEquipped=false;
			guns.sniper.isEquipped=false;
			clearInterval(pSTI);
			tTD=(1000/gunEquipped().fireRate);
			pSTI = setInterval(pST, 200);
			ammo=gunEquipped().maxAmmo;
			break;
		case 4:
			guns.pistol.isEquipped=false;
			guns.smg.isEquipped=false;
			guns.sg.isEquipped=false;
			guns.ar.isEquipped=true;
			guns.sniper.isEquipped=false;
			clearInterval(pSTI);
			tTD=(1000/gunEquipped().fireRate);
			pSTI = setInterval(pST, 200);
			ammo=gunEquipped().maxAmmo;
			break;
		case 5:
			guns.pistol.isEquipped=false;
			guns.smg.isEquipped=false;
			guns.sg.isEquipped=false;
			guns.ar.isEquipped=false;
			guns.sniper.isEquipped=true;
			clearInterval(pSTI);
			tTD=(1000/gunEquipped().fireRate);
			pSTI = setInterval(pST, 200);
			ammo=gunEquipped().maxAmmo;
			break;
		default:
			guns.pistol.isEquipped=false;
			guns.smg.isEquipped=false;
			guns.sg.isEquipped=false;
			guns.ar.isEquipped=false;
			guns.sniper.isEquipped=false;
			clearInterval(pSTI);
			ammo=gunEquipped().maxAmmo;
	}
};
function tFL (){
	if(fLO){
		fLO=false;
	} else {
		fLO=true;
	}
};
function moveUp(){
	isSprinting();
	if (pYpos<=107 && pYpos>90 && pXpos>=343 && pXpos<=953){
		pYpos = 107;
	} else if (pYpos<=107 && pYpos>90 && pXpos>=1024 && pXpos<=1167){
		pYpos = 107;
	} else if (pYpos<=162 && pYpos>77 && pXpos<=762 && pXpos>=709){
		pYpos = 162;
	} else if (pYpos<=400 && pYpos>377 && pXpos>=805 && pXpos<=986){
		pYpos = 400;
	} else if (pYpos<=476 && pYpos>458 && pXpos> 343 && pXpos< 430){
	    pYpos = 476;
	} else if (pYpos <= 476 && pYpos > 458 && pXpos >= 470 && pXpos <= 766) {
	    pYpos = 476;
	//} else if (pYpos<=672 && pYpos>617 && pXpos>=343 && pXpos<=469){
		//pYpos = 672;
	} else if (pYpos< 635 && pYpos>617 && pXpos> 667 && pXpos <1099){
	    pYpos = 635;
	} else if (pYpos <= 287 && pYpos > 0 && pXpos >= 77 && pXpos <= 199) {
	    pYpos = 287;
	} else if (pYpos <= 720 && pYpos > 635 && pXpos >= 235 && pXpos < 600) {
	    pYos = 720;
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
	} else if (pXpos<=600 && pYpos>=617 && pXpos>235 && pYpos<= 712){
		pXpos = 600;
	//} else if (pXpos<=654 && pYpos>=459 && pYpos<513 && pXpos>288){
		//pXpos = 654;
	} else if (pXpos<=784 && pYpos>=220 && pYpos<=617 && pXpos>765){
		pXpos = 784;
	} else if (pXpos<=784 && pYpos>=90 && pYpos<=150 && pXpos>765){
		pXpos = 784;
	} else if (pXpos<=957 && pYpos>=78 && pYpos<=377 && pXpos>939){
		pXpos = 957;
	//} else if (pXpos<=987 && pYpos>=378 && pYpos<=431 && pXpos>804){
		//pXpos = 987;
	} else if (pXpos<=1183 && pYpos>=90 && pYpos<=626 && pXpos>1170){
	    pXpos = 1183;
	} else if (pXpos <= 204 && pYpos >= 0 && pYpos <= 286 && pXpos > 60) {
	    pXpos = 204;
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
	} else if (pXpos >= 232 && pYpos < 720 && pYpos > 210 && pXpos < 343) {
	    pXpos = 232;
	} else if (pXpos>=529 && pYpos<672 && pYpos>617 && pXpos<599){
		pXpos = 529;
	} else if (pXpos> 754 && pYpos > 220 && pXpos < 780 && pYpos < 625){
	    pXpos = 754;
	} else if (pXpos > 754 && pYpos > 95 && pXpos < 780 && pYpos < 150) {
	    pXpos = 754;
	} else if (pXpos>700 && pYpos< 800 && pYpos>640 && pXpos<763){
		pXpos = 700;
	//} else if (pXpos>=708 && pYpos<162 && pYpos>=132 && pXpos<763){
		//pXpos = 708;
	//} else if (pXpos>=804 && pYpos>377 && pYpos<432 && pXpos<987){
		//pXpos = 804;
	} else if (pXpos>930 && pYpos> 99 && pYpos< 383 && pXpos<953){
		pXpos = 930;
	} else if (pXpos>976 && pYpos>77 && pYpos<132 && pXpos<1102){
		pXpos = 976;
	} else if (pXpos>=1167 && pYpos>=99 && pYpos<=617 && pXpos<1184){
	    pXpos = 1167;
	} else if (pXpos <= 204 && pYpos >= 0 && pYpos <= 270 && pXpos > 60) {
	    pXpos = 76;
	} else if (pXpos>=canvas.width-32){
		pXpos = canvas.width-32;
	} else {
		pXpos += ms;
	}
};
function moveDown(){
	isSprinting();
	if (pYpos > 590 && pYpos < 710 && pXpos > 340 && pXpos < 600) {
	    pYpos = 590;
	} else if (pYpos > 590 && pYpos < 672 && pXpos > 667 && pXpos < 764) {
	    pYpos = 590;
	//} else if (pYpos < 474 && pYpos > 430 && pXpos > 343 && pXpos < 430) {
	   // pYpos = 430;
	//} else if (pYpos < 474 && pYpos > 430 && pXpos >= 470 && pXpos <= 766) {
	   // pYpos = 430;
	} else if (pYpos>360 && pYpos<402 && pXpos> 847 && pXpos< 1090){
		pYpos = 360;
	} else if (pYpos>=207 && pYpos<672 && pXpos>=707 && pXpos<=762){
		pYpos = 207;
	} else if (pYpos>=90 && pYpos<107 && pXpos>=343 && pXpos<=953){
		pYpos = 90;
	} else if (pYpos>=90 && pYpos<107 && pXpos>=1023 && pXpos<1181){
	    pYpos = 90;
	} else if (pYpos >= 220 && pYpos < 720 && pXpos > 232 && pXpos < 325) {
	    pYpos = 220;

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
	document.getElementById('playerClipAmmo').innerHTML="Clip Ammo: "+gunEquipped().clipAmmo;
	document.getElementById('playerAmmo').innerHTML="Ammo: "+gunEquipped().maxAmmo;
	document.getElementById('playerStamina').innerHTML="Stamina: "+stamina;
	if(fLO){
		document.getElementById('playerFlashLight').style.color="yellow";
	} else {
		document.getElementById('playerFlashLight').style.color="black";
	}
	switch (gunEquipped().name){
		case "pistol":1
			document.getElementById('pistolHUD').style.color="green";
			document.getElementById('smgHUD').style.color="black";
			document.getElementById('sgHUD').style.color="black";
			document.getElementById('arHUD').style.color="black";
			document.getElementById('sniperHUD').style.color="black";
			break;
		case "smg":
			document.getElementById('pistolHUD').style.color="black";
			document.getElementById('smgHUD').style.color="green";
			document.getElementById('sgHUD').style.color="black";
			document.getElementById('arHUD').style.color="black";
			document.getElementById('sniperHUD').style.color="black";
			break;
		case "sg":
			document.getElementById('pistolHUD').style.color="black";
			document.getElementById('smgHUD').style.color="black";
			document.getElementById('sgHUD').style.color="green";
			document.getElementById('arHUD').style.color="black";
			document.getElementById('sniperHUD').style.color="black";
			break;
		case "ar":
			document.getElementById('pistolHUD').style.color="black";
			document.getElementById('smgHUD').style.color="black";
			document.getElementById('sgHUD').style.color="black";
			document.getElementById('arHUD').style.color="green";
			document.getElementById('sniperHUD').style.color="black";
			break;
		case "sniper":
			document.getElementById('pistolHUD').style.color="black";
			document.getElementById('smgHUD').style.color="black";
			document.getElementById('sgHUD').style.color="black";
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
		context.save();
    	context.translate(enemies[0].xPos+16, enemies[0].yPos+16); // change origin
    	context.rotate(180*Math.PI/180+Math.atan2(((pYpos+16) - enemies[0].yPos+16), ((pXpos+16) - enemies[0].xPos+16)));
		context.translate(-enemies[0].xPos-16, -enemies[0].yPos-16);
		context.drawImage(enemy1IMG, enemies[0].xPos, enemies[0].yPos);
		context.restore();
		context.fillText("Health: " + enemies[0].health, enemies[0].xPos-14, enemies[0].yPos-10);
	} else if(enemies[0].health<=0){
		enemies[0].isAlive=false;
	}
	//Enemy 2
	if(enemies[1].health>0){
		context.save();
    	context.translate(enemies[1].xPos+16, enemies[1].yPos+16); // change origin
    	context.rotate(180*Math.PI/180+Math.atan2(((pYpos+16) - enemies[1].yPos+16), ((pXpos+16) - enemies[1].xPos+16)));
		context.translate(-enemies[1].xPos-16, -enemies[1].yPos-16);
		context.drawImage(enemy2IMG, enemies[1].xPos, enemies[1].yPos);
		context.restore();
		context.fillText("Health: " + enemies[1].health, enemies[1].xPos-14, enemies[1].yPos-10);
	} else if(enemies[1].health<=0){
		enemies[1].isAlive=false;
	}
	//Enemy 3
	if(enemies[2].health>0){
		context.save();
    	context.translate(enemies[2].xPos+16, enemies[2].yPos+16); // change origin
    	context.rotate(Math.atan2(((pYpos+16) - enemies[2].yPos+16), ((pXpos+16) - enemies[2].xPos+16)));
		context.translate(-enemies[2].xPos-16, -enemies[2].yPos-16);
		context.drawImage(enemy3IMG, enemies[2].xPos, enemies[2].yPos);
		context.restore();
		context.fillText("Health: " + enemies[2].health, enemies[2].xPos-14, enemies[2].yPos-32);
	} else if(enemies[2].health<=0){
		enemies[2].isAlive=false;
	}
	//Enemy 4
	if(enemies[3].health>0){
		context.save();
    	context.translate(enemies[3].xPos+16, enemies[3].yPos+16); // change origin
    	context.rotate(180*Math.PI/180+Math.atan2(((pYpos+16) - enemies[3].yPos+16), ((pXpos+16) - enemies[3].xPos+16)));
		context.translate(-enemies[3].xPos-16, -enemies[3].yPos-16);
		context.drawImage(enemy4IMG, enemies[3].xPos, enemies[3].yPos);
		context.restore();
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
	context.save();
    context.translate(pXpos+16,pYpos+16); // change origin
    context.rotate(lookAngle());
	context.translate(-pXpos-16,-pYpos-16);
	//context.rotate(3);
    context.drawImage(playerIMG,pXpos,pYpos);
	//context.drawImage(fowIMG,0,0);
	if(fLO){
		context.translate(pXpos+16,pYpos+16);
		context.rotate(90*Math.PI/180);
		context.translate(-pXpos-16,-pYpos-16);	
		context.drawImage(fLLIMG,pXpos-102,pYpos-256);
	}
    context.restore();
	//context.drawImage(playerIMG, pXpos,pYpos);
	console.log(pXpos,pYpos);
	lostGame();
	wonGame();
	console.log(pST());
	// BULLETS
	bulletsMove();
	bulletsDraw();
	//checkBulletHits();
};
function lookAngle(){
	var a = pXpos - mx;
	var b = pYpos - my;
	var c = Math.sqrt(((a*2)+(b*2)));
	var tan = b/a;
	var cos = a/c;
	var sin = b/c;
	var angle = Math.atan2((my - (pYpos+16)), (mx - (pXpos+16)));
	console.log(angle);
	return angle;
};
function sgSpread(iA){
	var inAccuracyModifier = iA;
	var ttl=0;
	var avg=0;
	var temp=0;
	var nop=0;
	for(var i=0;i<4;i++){
		ttl+=Math.ceil(Math.random()*inAccuracyModifier);
	}
	for(var i=0;i<4;i++){
		temp=Math.ceil(Math.random()*100);
		if (temp>50){
			nop++;
		} else {
			nop--;
		}
	}
	if (nop>-1){
		avg=Math.ceil(ttl/5);
	} else {
		avg=Math.ceil(ttl/5)*-1;
	}
	console.log(avg);
	return avg;
};
function shoot(px,py,mx,my){
	if(gunEquipped().clipAmmo>0){
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
		if (gunEquipped().name=="sg"){
			createBullet(mx, my+sgSpread(gunEquipped().accuracyModifier), pXpos + (32 / 2), pYpos + (32 / 2));
			createBullet(mx, my+sgSpread(gunEquipped().accuracyModifier), pXpos + (32 / 2), pYpos + (32 / 2));
			createBullet(mx, my+sgSpread(gunEquipped().accuracyModifier), pXpos + (32 / 2), pYpos + (32 / 2));
			createBullet(mx, my+sgSpread(gunEquipped().accuracyModifier), pXpos + (32 / 2), pYpos + (32 / 2));
			createBullet(mx, my+sgSpread(gunEquipped().accuracyModifier), pXpos + (32 / 2), pYpos + (32 / 2));
			createBullet(mx, my+sgSpread(gunEquipped().accuracyModifier), pXpos + (32 / 2), pYpos + (32 / 2));
			createBullet(mx, my+sgSpread(gunEquipped().accuracyModifier), pXpos + (32 / 2), pYpos + (32 / 2));
			createBullet(mx, my+sgSpread(gunEquipped().accuracyModifier), pXpos + (32 / 2), pYpos + (32 / 2));
			createBullet(mx, my+sgSpread(gunEquipped().accuracyModifier), pXpos + (32 / 2), pYpos + (32 / 2));
			createBullet(mx, my+sgSpread(gunEquipped().accuracyModifier), pXpos + (32 / 2), pYpos + (32 / 2));
		} else {
			createBullet(mx, my, pXpos + (32 / 2), pYpos + (32 / 2));
		}
		ammo--;
		gunEquipped().clipAmmo--;
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
// function animateFromTo(cx,cy,tx,ty){
// 	b={
// 		cx:cx,
// 		cy:cy,
// 		tx:tx,
// 		ty:ty
// 	}
// 	createjs.Tween.get(bulletIMG, {loop: true})
//           .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
//           .to({alpha: 0, y: 75}, 500, createjs.Ease.getPowInOut(2))
//           .to({alpha: 0, y: 125}, 100)
//           .to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))
//           .to({x: 100}, 800, createjs.Ease.getPowInOut(2));
//     createjs.Ticker.setFPS(60);
//     createjs.Ticker.addEventListener("tick", canvas);
// };
function pST (){
	if(tTD>0&&tTD-20>0){
		tTD -= 20;
	} else {
		tTD=0;
	}
	return tTD;
};
function createBullet(targetX, targetY, shooterX, shooterY) {
	if (!(enemies[0].isAlive==false && enemies[1].isAlive==false && enemies[2].isAlive==false && enemies[3].isAlive==false&&health>0)) {
		console.log (!(enemies[0].isAlive==false && enemies[1].isAlive==false && enemies[2].isAlive==false && enemies[3].isAlive==false&&health>0));
		deltaX = targetX - shooterX;
		deltaY = targetY - shooterY;
		rotation = Math.atan2(deltaY, deltaX);
		xtarget = Math.cos(rotation);
		ytarget = Math.sin(rotation);
		
		theBullets.push({
			active:true,
			x: shooterX, //updates
			y: shooterY,
			speed: 10,
			xtarget: xtarget,
			ytarget: ytarget,
			w: 5,
			h: 5,
			color: 'red',
			angle: rotation
		});
		
		// if (shotSwitcher === 1) {
		// 	laser1.currentTime = 0.1;
		// 	laser1.play();
		// }
		
		// if (shotSwitcher === 2) {
		// laser2.currentTime = 0.1;
		// 	laser2.play();
		// }
		
		// if (shotSwitcher === 3) {
		// laser3.currentTime = 0.1;
		// 	laser3.play();
		// }
		// if (shotSwitcher === 4) {
		// laser4.currentTime = 0.1;
		// 	laser4.play();
		// }
		// if (shotSwitcher === 5) {
		// laser5.currentTime = 0.1;
		// 	laser5.play();
		// }
		// if (shotSwitcher === 6) {
		// laser6.currentTime = 0.1;
		// 	laser6.play();
		// }

		// shotSwitcher++;
		
		// if (shotSwitcher === 7) {
		// 	shotSwitcher = 1;
		// }
		
	}
}

function bulletsMove() {
	theBullets.forEach( function(i, j) {
		i.x += i.xtarget * i.speed;
		i.y += i.ytarget * i.speed;
	});
}

function bulletsDraw() {
	theBullets.forEach( function(i, j) {
		context.beginPath();
		context.save();
		context.fillStyle = i.color;
		context.drawImage(bulletIMG,i.x,i.y);
		//context.rect(i.x, i.y, i.w, i.h);
		//context.fill();
	});
}

// function checkBulletHits() {
// 	if (theBullets.length > 0 && theBadGuys.length > 0) {
// 		for (j = theBullets.length - 1; j >= 0; j--) {
// 			for (k = theBadGuys.length - 1; k >= 0; k--) {
// 				if (collides(theBadGuys[k], theBullets[j])) {
// 					console.log("collides");
// 					theBadGuys.splice(k, 1);
// 					theBullets.splice(j, 1);
// 					Player1.points += 1;	
					
// 					if (boomSwitcher === 1) {
// 					boom1.play();
// 					}
					
// 					if (boomSwitcher === 2) {
// 					boom2.play();
// 					}
					
// 					if (boomSwitcher === 3) {
// 					boom3.play();
// 					}
// 					if (boomSwitcher === 4) {
// 					boom4.play();
// 					}
// 					if (boomSwitcher === 5) {
// 					boom5.play();
// 					}
// 					if (boomSwitcher === 6) {
// 					boom6.play();
// 					}

// 					boomSwitcher++;
					
// 					if (boomSwitcher === 7) {
// 					boomSwitcher = 1;
// 					}	
// 				}
// 			}
// 		}
// 	}
// }

//TO DO
/*
1. fix all the collisions to make it so you cant go into a wall and glitch through by moving in the opposite direction ....I know how to fix this but its way too tedious and time consuming for friday
2. fix the shooting
4. make the bullets stop when they hit a wall
*/