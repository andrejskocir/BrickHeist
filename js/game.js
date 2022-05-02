var canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
function drawIt() {
  var x;
  var y;
  var dx = 0;
  var dy = 0;
  var f = 5;
  var tntWidth = 40;
  var tntHeight = 40;
  var zivljenja = 3;
  var totalScore = 0;
  var tv;
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
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
  var PADDING = 3;
  var interval = 10;
  //var BRICKWIDTH = 100;
  var BRICKWIDTH = WIDTH / NCOLS - PADDING;
  var BRICKHEIGHT = 50;
  var pause = false;
  var start = false;

  //timer
  var sekunde;
  var sekundeI;
  var minuteI;
  var intTimer;
  var izpisTimer;
  //
  const pauseGame = document.querySelector(".pauseGame");
  const backdrop = document.querySelector(".backdrop");
  //nastavljanje slik

  var twenty = new Image();
  var hundred = new Image();
  var Fhundred = new Image();
  twenty.src = "./img/20_1_50.jpeg";
  hundred.src = "./img/100.jpg";
  Fhundred.src = "./img/500.jpg";
  let cash = new Audio("./audio/cash.mp3");
  let lose = new Audio("./audio/lose.m4a");

  //nastavljanje leve in desne tipke
  function onKeyDown(evt) {
    if (evt.keyCode == 39) rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;
    else if (evt.keyCode == 80) {
      //P  pause

      pause_game();
    } else if (evt.keyCode == 32 && !start) {
      dy = 3;
      start = true;
    }
  }

  function onKeyUp(evt) {
    if (evt.keyCode == 39) rightDown = false;
    else if (evt.keyCode == 37) leftDown = false;
  }
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp);

  //nastavljanje miške
  function init_mouse() {
    canvasMinX = $("canvas").offset().left;
    canvasMaxX = canvasMinX + WIDTH;
  }

  function onMouseMove(evt) {
    if (
      evt.pageX - $("#canvas").offset().left - paddlew / 2 + f / 2 > 0 &&
      evt.pageX - $("#canvas").offset().left + paddlew / 2 - f / 2 < WIDTH
    ) {
      paddlex = evt.pageX - $("#canvas").offset().left - paddlew / 2;
    }
  }
  $(document).mousemove(onMouseMove);

  //inicializacija opek - polnjenje v tabelo
  function initbricks() {
    bricks = new Array(NROWS);
    for (i = 0; i < NROWS; i++) {
      bricks[i] = new Array(NCOLS);
      for (j = 0; j < NCOLS; j++) {
        console.log(level);
        //odvisno glede na izbiro
        switch (level) {
          case 1:
            bricks[i][j] = Math.floor(Math.random() * 2 + 1);
            break;
          case 2:
            if (i == 0) bricks[i][j] = 3;
            else bricks[i][j] = Math.floor(Math.random() * 2 + 1);
            break;
          case 3:
            if (i == 0 || i == 1 || i == 2) bricks[i][j] = 3;
            else bricks[i][j] = Math.floor(Math.random() * 2 + 1);
            break;
        }
      }
    }
  }

  function init() {
    x = WIDTH / 2;
    y = HEIGHT / 2.15;
    tocke = 0;
    $("#tocke").html(tocke);
    $("#zivljenja").html(zivljenja);
    sekunde = 200;
    intTimer = setInterval(timer, 1000);
    return setInterval(draw, interval);
  }

  var tnt = new Image(40, 40);
  tnt.src = "./img/tnt.png";
  var tank = new Image(paddleh, paddlew);
  tank.src = "./img/tank.png";


  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  function init_paddle() {
    paddlex = WIDTH / 2;
    paddleh = 60;
    paddlew = 150;
  }

  function timer() {
    if (start) {
      sekunde--;
      $("#cas").text(sekunde+ " s");
    }
    if(sekunde == 0)
    konec()
  }

  function pause_game() {
    //pause
    if (!pause) {
      pauseGame.style.visibility = "visible";
      backdrop.style.display = "block";

      pause = true;
      clearInterval(drawInterval);
      clearInterval(intTimer);
    } else {
      pauseGame.style.visibility = "hidden";
      backdrop.style.display = "none";

      pause = false;
      drawInterval = setInterval(draw, 10);
      intTimer = setInterval(timer, 1000);
    }
  }

  function checkTable() {
    tv = 0;
    for (i = 0; i < NROWS; i++) {
      for (j = 0; j < NCOLS; j++) {
        tv += bricks[i][j];
      }
    }

    if (tv == 0) return true;
    else return false;
  }
  function draw() {
    clear();
    ctx.drawImage(tnt, x, y, tntWidth, tntHeight);
    ctx.drawImage(tank, paddlex, HEIGHT - paddleh, paddlew, paddleh);
    //premik ploščice levo in desno
    if (rightDown) {
      if (paddlex + paddlew < WIDTH) {
        paddlex += 5;
      } else {
        paddlex = WIDTH - paddlew;
      }
    } else if (leftDown) {
      if (paddlex > 0) {
        paddlex -= 5;
      } else {
        paddlex = 0;
      }
    }

    //riši opeke
    for (i = 0; i < NROWS; i++) {
      for (j = 0; j < NCOLS; j++) {
        if (bricks[i][j] == 1) {
          ctx.drawImage(
            twenty,
            j * (BRICKWIDTH + PADDING) + PADDING,
            i * (BRICKHEIGHT + PADDING) + PADDING,
            BRICKWIDTH,
            BRICKHEIGHT
          );
        } else if (bricks[i][j] == 2) {
          ctx.drawImage(
            hundred,
            j * (BRICKWIDTH + PADDING) + PADDING,
            i * (BRICKHEIGHT + PADDING) + PADDING,
            BRICKWIDTH,
            BRICKHEIGHT
          );
        } else if (bricks[i][j] == 3) {
          ctx.drawImage(
            Fhundred,
            j * (BRICKWIDTH + PADDING) + PADDING,
            i * (BRICKHEIGHT + PADDING) + PADDING,
            BRICKWIDTH,
            BRICKHEIGHT
          );
        }
      }
    }

    rowheight = BRICKHEIGHT + PADDING + f / 2; //Smo zadeli opeko?
    colwidth = BRICKWIDTH + PADDING + f / 2;
    row = Math.floor(y / rowheight);
    col = Math.floor(x / colwidth);
    //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
    //štetje zadetih opek
    if (
      y < NROWS * rowheight &&
      row >= 0 &&
      col >= 0 &&
      bricks[row][col] >= 1
    ) {
      cash.play();
      dy = -dy;
      switch (bricks[row][col]) {
        case 3:
          tocke += 400;
          bricks[row][col] -= 1
          break;
        case 2:
          tocke += 100;
          bricks[row][col] = 0
          break;
        case 1:
          tocke += 20;
          bricks[row][col] = 0
          break;
      }
      
      $("#tocke").html(tocke);
    }

    if (checkTable()) {
      zmaga();
    }

    //odboj
    if (x + dx > WIDTH - tntWidth / 2 || x + dx < 0) dx = -dx;
    if (y + dy < 0) dy = -dy;
    else if (
      y + dy > HEIGHT - (paddleh + f) &&
      y + dy < HEIGHT + dy - (paddleh + f)
    ) {
      if (x > paddlex && x < paddlex + paddlew) {
        dx = (level + 7) * ((x - (paddlex + paddlew / 2)) / paddlew);
        dy = -dy;
        if (y + dy > HEIGHT - paddleh && y + dy < HEIGHT - tntHeight / 2) {
          dx = -dx;
          dy = -dy;
        }
      }
    } else if (y + dy > HEIGHT) {
      lose.play();
      if (zivljenja == 1) konec();
      else {
        zivljenja--;
        tocke -= 200;
        $("#tocke").html(tocke);
        $("#zivljenja").html(zivljenja);
      }
      x = WIDTH / 2;
      y = HEIGHT / 2.15;
      dx = 0;
    }
    x += dx;
    y += dy;
  }
  function zmaga() {
    start = false;
    clearInterval(intTimer);
    clearInterval(drawInterval);
    swal
      .fire({
        title: "VICTORY!",
        imageUrl: "./img/win.jpg",
        imageWidth: 400,
        imageHeight: 200,
        text: "MONEY: " + tocke + "€",
        confirmButtonColor: "rgb(103, 9, 29)",
      })
      .then((value) => {
        difficulty.style.display = "flex";
        select.style.visibility = "hidden";
        hard.classList.remove("active");
        medium.classList.remove("active");
        easy.classList.remove("active");
        window.scrollTo({
          top: container.offsetHeight,
          left: 100,
          behavior: "smooth",
        });
        setTimeout(function () {
          game.style.display = "none";
        }, 750);
      });
    x = 275;
    y = 150;
    dy = 0;
  }

  function konec() {
    $("#zivljenja").html("0");
    clearInterval(intTimer);
    clearInterval(drawInterval);
    swal
      .fire({
        title: "GAME OVER",
        imageUrl: "./img/lose.jpg",
        imageWidth: 400,
        imageHeight: 200,
        confirmButtonColor: "rgb(103, 9, 29)",

      })
      .then((value) => {
        location.reload();
        /**************************
		difficulty.style.display = "flex"
		select.style.visibility = "hidden"
		hard.classList.remove("active")
		medium.classList.remove("active")
		easy.classList.remove("active")
		window.scrollTo({
			top: container.offsetHeight,
			left: 100,
			behavior: 'smooth'
		  });

	  	**************************/
      });
    dy = 0;
  }

  drawInterval = init();
  init_paddle();
  init_mouse();
  initbricks();
}
