colours = [
	"rgb(139, 0, 0)",
	"rgb(178, 34, 34)",
	"rgb(255, 0, 0)",
	"rgb(205, 92, 92)",
	"rgb(240, 128, 128)",
	"rgb(250, 128, 114)"
];

var squares = document.querySelectorAll(".square");
var goal = colours[2];
var colorDisplay = document.getElementById("colorDisplay");


for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colours[i];
}