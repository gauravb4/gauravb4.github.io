var numCircles = 0

function setup() { 
    createCanvas(windowWidth, windowHeight);
    
  } 
  
function draw() { 

    if (mouseIsPressed && numCircles < 5) {
        ellipse(mouseX, mouseY, 80, 80);
        numCircles++;
    }
}