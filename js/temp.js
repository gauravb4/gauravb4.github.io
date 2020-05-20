var numCircles = 0
let circless = []
var diam = 1000;
var inOut = true;

function setup() { 
    createCanvas(windowWidth, windowHeight);
    
  } 
  
function draw() { 

	ellipse(windowWidth / 2, windowHeight / 2,diam)
	
	if(diam > 900){
	inOut = false;
	}
	
	if(diam < 10){
	inOut = true;
	}
	
	if(inOut){
	diam++
	}
	
	if(!inOut){
	diam--
	}
}