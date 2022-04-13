var canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
function drawIt() {
var x;
var y;
var dx = 0;
var dy = 0;
var f = 5;
var tntWidth = 40
var tntHeight = 40
var zivljenja = 3;
var totalScore = 0;
var tv;
var WIDTH = canvas.width
var HEIGHT= canvas.height 
var paddlex;
var paddleh;
var paddlew;
var rightDown = false;
var leftDown = false;
var canvasMinX;
var canvasMaxX;
var bricks;
var NROWS = 5;
var NCOLS = 10;
var PADDING = 1.5;
//var BRICKWIDTH = 100;
var BRICKWIDTH = (WIDTH/NCOLS) - PADDING;


var BRICKHEIGHT = 40;
var pause=false;
var start=false;

//timer
var sekunde;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer;




//nastavljanje slik

var twenty = new Image()
var hundred = new Image()
var Fhundred = new Image()
twenty.src = "./img/20.jpg"
hundred.src = "./img/100.jpg"
Fhundred.src = "./img/500.jpg"





//nastavljanje leve in desne tipke
function onKeyDown(evt) {
  if (evt.keyCode == 39) 
rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
  else if(evt.keyCode == 80){ //P  pause
		pause_game()
		}
else if(evt.keyCode == 32&&!start){
			dy=3;
			start=true;
		}
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) 
    rightDown = false;
  else if (evt.keyCode == 37) 
    leftDown = false;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp); 




//nastavljanje miške
function init_mouse() {
  canvasMinX = $("canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
}


function onMouseMove(evt) {
  if (evt.pageX - $('#canvas').offset().left - paddlew/2 > 0 && evt.pageX - $('#canvas').offset().left + paddlew/2 < WIDTH ) {
    paddlex = evt.pageX - $('#canvas').offset().left - paddlew/2
  }
}
$(document).mousemove(onMouseMove)



//inicializacija opek - polnjenje v tabelo
function initbricks() {	

  
  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
		if(i==0)bricks[i][j] = 3;
		else if(i==1||i==2)bricks[i][j] = 2;
		else bricks[i][j] = 1;
    }
  }
}



function init() {

  x=WIDTH/2;
  y=HEIGHT/2.51;
  tocke = 0;
  $("#tocke").html(tocke);
  $("#zivljenja").html(zivljenja);
  sekunde = 0;
  izpisTimer = "00:00";
  intTimer = setInterval(timer, 1000);
  return setInterval(draw, 10);
}


  var tnt = new Image(100,100)
  tnt.src = "./img/tnt.png"



function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fillStyle = "red"
  ctx.fill();
}



function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}



function init_paddle() {
  paddlex = WIDTH / 2;
  paddleh = 15;
  paddlew = 120;
}


//timer
function timer(){
	if(start){
		sekunde++;

		sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
		minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
		izpisTimer = minuteI + ":" + sekundeI;
		$("#cas").html(izpisTimer);
	}else{
		sekunde=0;
		$("#cas").html(izpisTimer);
	}
}


function pause_game(){ //pause
		if(!pause){
		pause=true;
		clearInterval(drawInterval);
		clearInterval(intTimer);
		}
		
		else{
		pause=false;
			drawInterval=setInterval(draw, 10);
			intTimer=setInterval(timer, 1000);
		
		}
	}
	
function checkTable(){
	tv=0;
	for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
      tv += bricks[i][j];
    }
	}
	
	if (tv==0)return true;
	else return false;
}



//END LIBRARY CODE
function draw() {
	clear();
  ctx.drawImage(tnt, x, y, tntWidth, tntHeight)
	rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
	//premik ploščice levo in desno
	if(rightDown){
		if((paddlex+paddlew) < WIDTH){
			paddlex += 5;
		}else{
			paddlex = WIDTH-paddlew;
		}
	}
	else if(leftDown){
		if(paddlex>0){
			paddlex -=5;
		}else{
			paddlex=0;
		}
	}
	


	//riši opeke
	  for (i=0; i < NROWS; i++) {
		for (j=0; j < NCOLS; j++) {
		  if (bricks[i][j] == 1) {
			ctx.drawImage(twenty, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
		  }else if(bricks[i][j] == 2){
			ctx.drawImage(hundred, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
		  }
		  else if(bricks[i][j] == 3){
			ctx.drawImage(Fhundred, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
		  }
		}
	  }
	
	
	rowheight = BRICKHEIGHT + PADDING + f/2; //Smo zadeli opeko?
	colwidth = BRICKWIDTH + PADDING + f/2;
	row = Math.floor(y/rowheight);
	col = Math.floor(x/colwidth);
	//Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
	//štetje zadetih opek
	if (y < NROWS * rowheight && row >= 0 && col >= 0 &&( bricks[row][col] == 1 || bricks[row][col] == 2 || bricks[row][col] == 3)) {
		dy = -dy; 
		tocke += bricks[row][col];
		bricks[row][col] -= 1;
		$("#tocke").html(tocke);
	}
	
	
	if(checkTable()){
		zmaga();
	}
	
	//odboj
	if (x + dx > WIDTH|| x + dx < 0)
		dx = -dx;
	
	if (y + dy < 0)
		dy = -dy;
	else if (y + dy > HEIGHT-(paddleh+f)&&y + dy < HEIGHT +dy -(paddleh+f)){
		if (x > paddlex && x < paddlex + paddlew){
			dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
			dy = -dy;
		if (y + dy > HEIGHT-(paddleh+f)&&y + dy < HEIGHT-(r+f)){ dx = -dx; dy = -dy;}}
	}
	else if (y + dy > HEIGHT) {
			if(zivljenja == 1)
				konec();
			else{
				zivljenja--;
				tocke-=3;
				$("#tocke").html(tocke);
				$("#zivljenja").html(zivljenja);
			}
			x=WIDTH/2;
			y=HEIGHT/3;
			dx=0;
		
	}
	
	x += dx;
	y += dy;
	
	
}
function zmaga()
	{
		start=false;
		clearInterval(intTimer);
		clearInterval(drawInterval);
		totalScore=Math.floor((tocke*1000)/sekunde);
		swal({
		  title: "you won!",
		  icon: "success",
		  text: "Score: "+totalScore,
		  button: "retry!",
		}).then((value) =>{
			location.reload();
		});
		x = 275;
		y = 150;
		dy=0;
		
	}

function konec()
	{
		$("#zivljenja").html("0");
		clearInterval(intTimer);
		clearInterval(drawInterval);
		swal({
		  title: "game over",
		  icon: "error",
		  button: "want to play again?",
		}).then((value) =>{
			location.reload();
		});
		dy=0;
	}



drawInterval=init();
init_paddle();
init_mouse();
initbricks();
}