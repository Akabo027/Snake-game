//"window.onload" ---meaning--> when the page loads
window.onload = function() {

  const canvas = document.getElementById("canvas");
  var canvasWidth = 900;
  var canvasHeight = 600;
  var blockSize = 30;
  var ctx;
  var delay = 100;
  var snakyy;
  var apple;
  var score;

  init();

  function init() {
    canvas.width = canvasWidth ;
    canvas.height = canvasHeight;
    canvas.style.border = "5px solid";
    //document.body.appendChild(canvas); // attaches a tag to this body
    ctx = canvas.getContext('2d'); // specifies the dimension we're drawing in
    snakyy = new Snake([[2,0],[1,0],[0,0]]);
    apple = new Apple();
    score = 0;
    refreshCanvas();
  }

  function refreshCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // resets(deletes) the previous rectangle
    // ctx.fillStyle = "#919611"; // gives a color to the drawing
    // ctx.fillRect(xCoord, yCoord, 100, 50); // (x, y, longueur, largeur), the left top-corner as origin
    snakyy.advance();
    if (snakyy.body[0][0] == apple.position[0] && snakyy.body[0][1] == apple.position[1]) {
      snakyy.eat();
      score++;
      apple.newPos();
    }
    snakyy.check();
    snakyy.draw();
    apple.draw();
    drawScore();
    setTimeout(refreshCanvas, delay); // executes a function (first parameter) after a certain time (second parameter)
  }

  function drawBlock(ctx, position) {
    var x = position[0] * blockSize;
    var y = position[1] * blockSize;
    ctx.fillRect(x, y, blockSize, blockSize);
  }

  function drawScore() {
    ctx.save();
    ctx.fillText(score.toString(), canvasWidth - 20, canvasHeight - 3);
    ctx.restore();
  }

  function Snake(body)
  {
    this.body = body;
    this.direction = "right";

    this.draw = function()
    {
      ctx.save();
      ctx.fillStyle = "#008000";
      for (var i = 0; i < this.body.length; i++) {
        drawBlock(ctx, this.body[i]);
        this.body[i]
      }
      ctx.restore(); // allows us to draw on the context (ctx) and restore it as it was before
    };

    this.advance = function()
    {
      var nextPosition = this.body[0].slice(); // slice() makes a copy of the element

      switch (this.direction) {
        case "left":
          nextPosition[0]--;
        break;
        case "right":
          nextPosition[0]++;
        break;
        case "up":
          nextPosition[1]--;
        break;
        case "down":
          nextPosition[1]++;
        break;
        default:
          throw('Invalid direction');
      };

      // if ((nextPosition[0] * blockSize) >= canvasWidth)  {
      //   nextPosition[0] = 0;
      // }
      // else if ((nextPosition[1] * blockSize) >= canvasHeight) {
      //   nextPosition[1] = 0;
      // }
      // else if (this.direction == "left" && nextPosition[0] == -1) {
      //   nextPosition[0] = (canvasWidth/blockSize);
      // }
      // else if (this.direction == "up" && nextPosition[1] == -1){
      //   nextPosition[1] = (canvasHeight/blockSize);
      // }


      this.body.unshift(nextPosition); // add the new position at the first position of the body (the array)
      this.body.pop();
      //nextPosition[1]++;
    };

    // ***A part of the second way of doing key down direction***
    // Validates the direction
    this.setDirection = function (newDirection)
    {
      var allowedDir;
      switch (this.direction) {
        case 'left':
        case 'right':
          allowedDir = ['up', 'down'];
          break;
        case 'up':
        case 'down':
          allowedDir = ['left', 'right'];
          break;
        default:
          throw('Invalid direction');
      }
      if (allowedDir.indexOf(newDirection)> -1) { //if the element does not exist, indexOf(...) returns -1
        this.direction = newDirection;
      }
    };

    this.check = function ()
    {
      var head = this.body[0];
      var tail = this.body.slice(1);
      for (var i = 0; i < tail.length; i++) {
        if ((head[0] == tail[i][0]) && (head[1] == tail[i][1])){
          alert('YOU LOST! Your score is ' + score);
          window.location.reload();
        }
        else if ((head[0]*blockSize < 0 || head[0]*blockSize == canvasWidth) || (head[1]*blockSize < 0 || head[1]*blockSize == canvasHeight)) {
          alert('YOU LOST! Your score is ' + score);
          window.location.reload();
        }
      }
    };

    this.eat = function ()
    {
      switch (this.direction) {
        case "left":
          this.body.push([this.body[this.body.length-1][0]+1, this.body[this.body.length-1][1]]);
          break;
        case "right":
          this.body.push([this.body[this.body.length-1][0]-1, this.body[this.body.length-1][1]]);
          break;
        case "up":
          this.body.push([this.body[this.body.length-1][0], this.body[this.body.length-1][1]-1]);
          break;
        case "down":
          this.body.push([this.body[this.body.length-1][0], this.body[this.body.length-1][1]+1]);
          break;
        default:
          throw('Invalid direction');
      }
      //drawBlock(ctx, this.body[this.body.length]);
    };
  }

  function Apple()
  {
    this.position = [Math.floor(Math.random()*29), Math.floor(Math.random()*19)];

    this.newPos = function() {
      this.position = [Math.floor(Math.random()*29), Math.floor(Math.random()*19)];
    };

    this.draw = function() {
      ctx.save();
      ctx.fillStyle = "#fe0b04";
      ctx.beginPath();
      var rayon = blockSize/2;
      var x = this.position[0]*blockSize + rayon;
      var y = this.position[1]*blockSize + rayon;
      ctx.arc(x,y, rayon, 0, Math.PI*2, true);
      ctx.fill();
      ctx.restore();
    };
  }


  // ***A part of the second way of doing key down direction***

  // handling the entered keys
  document.onkeydown = function (e)
  {
    var key = e.key;
    console.log(key);
    var newDir;
    switch (key) {
      case "ArrowLeft":
        newDir = 'left';
        break;
      case "ArrowUp":
        newDir = 'up';
        break;
      case "ArrowRight":
        newDir = 'right';
        break;
      case "ArrowDown":
        newDir = 'down';
        break;
      default:
        return;
    }
    console.log(newDir);
    snakyy.setDirection(newDir);
  };
};
