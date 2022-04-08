var canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function drawIt() {
    var x = 150;
    var y = 150;
    var dx = 2;
    var dy = 4;
    var WIDTH
    var HEIGHT
    var tntWidth = 40
    var tntHeight = 40
    var iconX
    var iconH = 120
    var iconW = 130
    var rightDown = false;
    var leftDown = false;

    function onKeyDown(e) {
        if (e.keyCode == 39)
            rightDown = true;
        else if (e.keyCode == 37) 
            leftDown = true;
      }
      
      function onKeyUp(e) {
        if (e.keyCode == 39)
            rightDown = false;
        else if (e.keyCode == 37) 
            leftDown = false;
      }

      $(document).keydown(onKeyDown)
      $(document).keyup(onKeyUp)


    function init() {
      ctx.fillStyle="red"
      WIDTH = canvas.width
      HEIGHT= canvas.height 
      return setInterval(draw, 10);
    }
    
    function drawImage(x,y) {
      var tnt = new Image(100,100)
      tnt.src = "../img/tnt.png"
      ctx.drawImage(tnt, x, y, tntWidth , tntHeight)
    }

    function init_icon() {
        var icon = new Image(iconW,iconH)
        icon.src = "../img/character.png"
        iconX = WIDTH / 2;
        ctx.drawImage(icon, iconX, HEIGHT-iconH, iconW, iconH)
      }
    
    function rect(x,y,w,h) {
      ctx.beginPath();
      ctx.rect(x,y,w,h);
      ctx.closePath();
      ctx.fill();
    }
    
    function clear() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }


    function draw() {

      clear();
      drawImage(x,y)
      if (rightDown) iconX += 5;
      else if (leftDown) iconX -= 5;
      init_icon()
      if (x + dx > WIDTH - tntWidth|| x + dx < 0 )
      dx = -dx;

      if(y + dy < 0)
      dy = -dy;
      else if (y + dy > HEIGHT - tntHeight){
        if (x > iconX && x < iconX + iconW)
        dy = -dy;
        else
        dy = -dy;
      }
     
      
      x += dx;
      
      y += dy;
    }
    
    init();


    }

/*if (
    x + swordWidth >= charX &&
    x <= charX + CharaterWidth &&
    y >= canvas.height - CharaterHeight - swordHeight
  ) {
    if (
      x + swordWidth >= charX &&
      y >= canvas.height - CharaterHeight - swordHeight &&
      x <= charX + CharaterWidth / 2 &&
      y >= canvas.height - CharaterHeight - swordHeight
    ) {
      dx = Math.floor(Math.random() * 5) + -7;
      dy = -dy;
    } else if (
      x <= charX + CharaterWidth &&
      y >= canvas.height - CharaterHeight - swordHeight &&
      x >= charX + CharaterWidth / 2 &&
      y >= canvas.height - CharaterHeight - swordHeight
    ) {
      dx = Math.floor(Math.random() * 5) + 2;
      dy = -dy;
    } else {
      dx = Math.floor(Math.random() * 10) + -5;
      dy = -dy;
      if (dx == 0) dx++;
    }
  }*/