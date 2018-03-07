colours = [
	"rgb(139, 0, 0)",
	"rgb(178, 34, 34)",
	"rgb(255, 0, 0)",
	"rgb(205, 92, 92)",
	"rgb(240, 128, 128)",
	"rgb(250, 128, 114)"
];

var squares = document.querySelectorAll(".square");
var goal = pickColour();
var colourDisplay = document.getElementById("colourDisplay");
colourDisplay.textContent = "RGB" + goal.split("b")[1];


var messageDispaly = document.querySelector("#message");

for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colours[i];

	squares[i].addEventListener("click", function(){
	var clickedColour = this.style.backgroundColor;
		if(clickedColour === goal){
			messageDispaly.textContent = "Correct!";
			changeColours(clickedColour);
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