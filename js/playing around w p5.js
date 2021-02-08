let angle = 0.0;
var len = 500;
let numLevels = 1;
var goingDown = false;
var radi = 270;
var x = radi * cos(PI / 2) + 270;
var y = (radi * sin(PI / 2) * -1) + 270;

function setup() {
  createCanvas(540, 540);
  background(255);
  ellipse(width / 2, height / 2, 540);
  ellipse(x, y, 30);
  //fill(50);
}

function draw() {
  
  if (mouseIsPressed) {
    if (numLevels == 5) {
      goingDown = true;
    }
    if (numLevels == 1) {
      goingDown = false;
    }

    if (goingDown) {
      numLevels = numLevels - 1;
    } else {
      numLevels = numLevels + 1;
    }
  }
  sirp(numLevels);


  
  //radius is 270
  //want to draw the radius with a line to the top point
  angle = angle + (1 / 180);
  //use cosine to get a smooth CW and CCW motion when not jittering
  let c = cos(angle);
  ellipse(width / 2, height / 2, 10);
  var x = radi * cos(PI / 2) + 270;
  var y = (radi * sin(PI / 2) * -1) + 270;
  x = radi * cos((PI/2)-angle) + 270;
  y = (radi * sin((PI/2) -angle) * -1) + 270;
  //top point
  ellipse(radi * cos((PI/2)-angle) + 270, (radi * sin((PI/2) -angle) * -1) + 270, 30);
  //bottom left
  ellipse(radi * cos(210) + 270, (-(radi * sin(PI + (PI /6))) + 270), 30);
  //bottom right
  ellipse(radi * cos(320) + 270, (-(radi * sin(320)) + 270), 30);
  //top to left
  line(radi * cos((PI/2)-angle) + 270, (radi * sin((PI/2) -angle) * -1) + 270, radi * cos(210) + 270, (-(radi * sin(PI + (PI /6))) + 270));
  //top to right
  line(radi * cos((PI/2)-angle) + 270, (radi * sin((PI/2) -angle) * -1) + 270, radi * cos(320) + 270, (-(radi * sin(320)) + 270));
  //left to right
  line(radi * cos(210) + 270, (-(radi * sin(PI + (PI /6))) + 270), radi * cos(320) + 270, (-(radi * sin(320)) + 270));
  translate(width / 2, height / 2);
  //line(width / 2, height / 2, x, y);
  //angle = angle + 0.001
  //divide(width / 2 - len / 2, height / 2 + len * sqrt(3) / 4, len, 1, floor(map(mouseX, 0, width, 1, 5)));
}

function sirp(levels) {

}

function divide(x, y, l, lvl, max) {
  angle = angle + (1 / 180);
  //use cosine to get a smooth CW and CCW motion when not jittering
  let c = cos(angle);
  //move the shape to the center of the canvas
  //translate(width / 2, height / 2);
  //rotate(c);
  if (lvl == max) {
    tri(x, y, l);
  } else {
    divide(x, y, l / 2, lvl + 1, max);
    divide(x + l / 2, y, l / 2, lvl + 1, max);
    divide(x + l / 4, y - l * sqrt(3) / 4, l / 2, lvl + 1, max);
  }
}

function tri(x, y, l) {
  triangle(x, y, x + l / 2, y - l * sqrt(3) / 2, x + l, y);
}

function tris(midPoint) {

}