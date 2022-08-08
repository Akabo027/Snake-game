//"window.onload" ---meaning--> when the page loads
window.onload = function() {
  var canvas = document.createElement("canvas")
  canvas.width = 900;
  canvas.height = 600;
  canvas.style.border = "1px solid";
  document.body.appendChild(canvas); // attaches a tag to this body

  var ctx = canvas.getContext('2d'); // specifies the dimension we're drawing in
  ctx.fillStyle = "#919611"; // gives a color to the drawing
  ctx.fillRect(30, 30, 100, 50); // (x, y, longueur, largeur), the left top-corner as origin

}
