colours = generateRandomColours(6);

var squares = document.querySelectorAll(".square");
var goal = pickColour();
var colourDisplay = document.getElementById("colourDisplay");
colourDisplay.textContent = "RGB" + goal.split("b")[1];


var messageDispaly = document.querySelector("#message");
var titleH1 = document.querySelector("h1");

for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colours[i];

	squares[i].addEventListener("click", function(){
	var clickedColour = this.style.backgroundColor;
		if(clickedColour === goal){
			messageDispaly.textContent = "Correct!";
			changeColours(clickedColour);
			titleH1.style.backgroundColor = goal;
		}else{
			this.style.background = "#232323";
			messageDispaly.textContent = "Try Again";
		}
	})
}

function changeColours(colour){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colour;
	}
}

function pickColour(){
	var random = Math.floor(Math.random() * colours.length);
	return colours[random];
}

function generateRandomColours(coloursNumber){
	var colours = [];
	for(var i = 0; i < coloursNumber; i++){
		colours.push(getRandomColour());
	}
	return colours
}

function getRandomColour(){
	return "rgb(" + Math.floor(Math.random() * 256) + ", " +
				    Math.floor(Math.random() * 256) + ", " +
				    Math.floor(Math.random() * 256) + ")"
}