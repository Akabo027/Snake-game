//"window.onload" ---meaning--> when the page loads
window.onload = function() {

  var canvasWidth = 900;
  var canvasHeight = 600;
  var blockSize = 30;
  var ctx;
  var delay = 100;
  var snakyy;

  init();

  function init() {
    canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas); // attaches a tag to this body

    ctx = canvas.getContext('2d'); // specifies the dimension we're drawing in
    snakyy = new Snake([[5,4],[4,4],[3,4]]);
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
      nextPosition[0]++;
      if ((nextPosition[0] * blockSize) >= canvasWidth)  {
        nextPosition[0] = 0;
      }
      this.body.unshift(nextPosition);
      this.body.pop();
      //nextPosition[1]++;
    };
  }
}
