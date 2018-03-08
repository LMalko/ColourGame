var squares = document.querySelectorAll(".square");
var squaresHard = document.querySelectorAll(".hard");
var colourDisplay = document.getElementById("colourDisplay");
var messageDispaly = document.querySelector("#message");
var titleH1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");

start(6);

function start(coloursNumber){
	colours = generateRandomColours(coloursNumber);
	goal = pickColour(colours);
	colourDisplay.textContent = goal;
	colourDisplay.textContent = "RGB" + goal.split("b")[1];
	titleH1.style.backgroundColor = "#232323";
	gameFlow();
}


function gameFlow(){
	colourDisplay.textContent = "RGB" + goal.split("b")[1];
	for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colours[i];

	squares[i].addEventListener("click", function(){
	var clickedColour = this.style.backgroundColor;
		if(clickedColour === goal){
			messageDispaly.textContent = "Correct!";
			changeColours(clickedColour);
			titleH1.style.backgroundColor = goal;
			resetButton.textContent = "Play again ?"
		}else{
			this.style.background = "#232323";
			messageDispaly.textContent = "Try Again";
			}
		})
	}
}

function changeColours(colour){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colour;
	}
}

function pickColour(colours){
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

resetButton.addEventListener("click", function(){
	squares = document.querySelectorAll(".square");
	start(6);
});

