//"window.onload" ---meaning--> when the page loads
window.onload = function() {

  var canvasWidth = 900;
  var canvasHeight = 600;
  var blockSize = 30;
  var ctx;
  var delay = 100;
  var snakyy;
  var previous;

  init();

  function init() {
    canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas); // attaches a tag to this body

    ctx = canvas.getContext('2d'); // specifies the dimension we're drawing in
    snakyy = new Snake([[2,0],[1,0],[0,0]]);
    previous = snakyy.direction;
    refreshCanvas();
  }

  function refreshCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // resets(deletes) the previous rectangle
    // ctx.fillStyle = "#919611"; // gives a color to the drawing
    // ctx.fillRect(xCoord, yCoord, 100, 50); // (x, y, longueur, largeur), the left top-corner as origin
    snakyy.advance();
    snakyy.draw();
    setTimeout(refreshCanvas, delay); // executes a function (first parameter) after a certain time (second parameter)
  }

  function drawBlock(ctx, position) {
    var x = position[0] * blockSize;
    var y = position[1] * blockSize;
    ctx.fillRect(x, y, blockSize, blockSize);
  }

  function Snake(body) {
    this.body = body;
    this.direction = "ArrowRight";
    this.draw = function() {
      ctx.save();
      ctx.fillStyle = "#919611";
      for (var i = 0; i < this.body.length; i++) {
        drawBlock(ctx, this.body[i]);
        this.body[i]
      }
      ctx.restore(); // allows us to draw on the context (ctx) and restore it as it was before
    };

    this.advance = function(){
      var nextPosition = this.body[0].slice(); // slice() makes a copy of the element

      const bod = document.querySelector("#b");
      bod.addEventListener('keydown', (event) => this.direction = event.key);
      //console.log(this.direction);
      switch (this.direction) {
        case "ArrowLeft":
          // if already in the horizontale position, it continues in the same direction
          if (previous != "ArrowRight") {
            nextPosition[0]--;
          }
          break;
        case "ArrowRight":
          // if already in the horizontale position, it continues in the same direction
          if (previous != "ArrowLeft") {
            nextPosition[0]++;
          }
          break;
        case "ArrowUp":
          // if already in the vertical position, it continues in the same direction
          if (previous != "ArrowDown") {
            nextPosition[1]--;
          }
          break;
        case "ArrowDown":
          // if already in the vertical position, it continues in the same direction
          if (previous != "ArrowUp") {
            nextPosition[1]++;
          }
          break;
      };

      previous = this.direction;

      if ((nextPosition[0] * blockSize) >= canvasWidth)  {
        nextPosition[0] = 0;
      }
      else if ((nextPosition[1] * blockSize) >= canvasHeight) {
        nextPosition[1] = 0;
      }
      else if (this.direction == "ArrowLeft" && nextPosition[0] == 0) {
        nextPosition[0] = canvasWidth;
      }
      else if (this.direction == "ArrowUp" && nextPosition[1] == 0){
        nextPosition[1] = canvasHeight;
      }

      this.body.unshift(nextPosition); // add the new position at the first position of the body (the array)
      this.body.pop();
      //nextPosition[1]++;
    };
  }
}
