//"window.onload" ---meaning--> when the page loads
window.onload = function() {

  var canvas;
  var ctx;
  var delay = 100;
  var xCoord = 0;
  var yCoord = 0;

  init();

  function init() {
    canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 600;
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas); // attaches a tag to this body

    ctx = canvas.getContext('2d'); // specifies the dimension we're drawing in
    refreshCanvas();
  }

  function refreshCanvas() {
    xCoord += 2;
    yCoord += 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // resets(deletes) the previous rectangle
    ctx.fillStyle = "#919611"; // gives a color to the drawing
    ctx.fillRect(xCoord, yCoord, 100, 50); // (x, y, longueur, largeur), the left top-corner as origin
    setTimeout(refreshCanvas, delay); // executes a function (first parameter) after a certain time (second parameter)

  }
}
