onload = function () {
  canvasPane = document.createElement("canvas");
  
  canvasPane.width = screen.width;
  canvasPane.height = screen.height;
  canvasPane.style = "position:fixed;left:0px;top:0px;z-index:100;pointer-events:none";
  canvasPane.id = "xmas-canvas";

  context = canvasPane.getContext("2d");
  context.globalCompositeOperation = "destination-over";
  context.fillStyle = "#ffffff";
  
  var firstBodyElement = document.body.childNodes[0];
  document.body.insertBefore(canvasPane, firstBodyElement);
  
  numParticles = Math.round(screen.width / 15);
  flakes = [];
  var xOffset = 0;
  var yOffset = 0; 
  var size = 0;
      
  for (var i = 0; i < numParticles; i++) {
    yOffset = Math.floor(Math.random() * screen.height) + 0;
    size = (Math.floor(Math.random() * 2) + 1) == 1 ? 3 : 5;
    flakes.push(
      {x:xOffset, y:yOffset, w:size, h:size}
    );
    xOffset += 15;
  }
  
  drawFlakes();
}

onresize = function () {
  canvasPane.width = screen.width;
  canvasPane.height = screen.height;
  context.fillStyle = "#ffffff";
}

function drawFlakes() {
  for (var j = 0; j < numParticles; j++) {
    context.fillRect(flakes[j].x, flakes[j].y, flakes[j].w, flakes[j].h);
  }
  setTimeout(updateFlakes, 70);
}

function updateFlakes () {
  context.clearRect(0, 0, canvasPane.width, canvasPane.height);
  
  for (var y = 0; y < numParticles; y++) {
    if (flakes[y].y > (screen.height)) {
      flakes[y].y = 0;
    } 
    else {
      var movementX =  Math.floor(Math.random() * 10) + 1;
      movementX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      var movementY = Math.floor(Math.random() * 30) + 5;
    
      var temp = (flakes[y].x += movementX);
      if (temp < 0 || temp > screen.width) {
        flakes[y].x = Math.floor(Math.random() * screen.width) + 0;
      }
      else {
        flakes[y].x = temp;
      }
      flakes[y].y += movementY;
    }
  }
  drawFlakes();
}
