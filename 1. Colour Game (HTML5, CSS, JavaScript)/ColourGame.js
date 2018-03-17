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
	messageDispaly.textContent = "Good Luck !";
	colours = generateRandomColours(coloursNumber);
	goalColour = pickColour(colours);
	colourDisplay.textContent = goalColour;
	colourDisplay.textContent = "RGB" + goalColour.split("b")[1];
	titleH1.style.backgroundColor = "steelblue";
	gameFlow();
}


function gameFlow(){
	colourDisplay.textContent = "RGB" + goalColour.split("b")[1];
	for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colours[i];

	squares[i].addEventListener("click", function(){
	var clickedColour = this.style.backgroundColor;
		if(clickedColour === goalColour){
			messageDispaly.textContent = "Correct!";
			changeColours(clickedColour);
			titleH1.style.backgroundColor = goalColour;
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
	resetButton.textContent = "New Colours";
	if (easyButton.classList.contains("selected")){
		start(3);
	}else{
		squares = document.querySelectorAll(".square");
		start(6);
	}
});

easyButton.addEventListener("click", function(){
	for(var i = 0; i < squaresHard.length; i++){
		squaresHard[i].style.backgroundColor = "#232323";
	}
	squares = document.querySelectorAll(".easy");
	easyButton.classList.add("selected");
	hardButton.classList.remove("selected");
	start(3);
});

hardButton.addEventListener("click", function(){
	easyButton.classList.remove("selected");
	hardButton.classList.add("selected");
	squares = document.querySelectorAll(".square");
	start(6);

});