var player1Button = document.getElementById("Player1Button");
var player2Button = document.getElementById("Player2Button");

var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
 
var reset = document.getElementById("Reset");
var score = document.querySelector("h1")

var input = document.querySelector("input[type = 'number']")
var para = document.querySelector("p span")

var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 8

// player1Button.addEventListener("click", function(){
// 	p1Score++;
// 	score.textContent = p1Score + " to " + p2Score;
// })

player1Button.addEventListener("click", function(){
	if(!gameOver){
		p1Score++;
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!2 a nie 3 znaki równości bo z inputu dostaniemy inny typ danych chyba że 
		// rzucimy na number linijka 67
		if(p1Score === winningScore){
			gameOver = true;
			p1Display.classList.add("winner");
			console.log("Koniec!")
		}
		p1Display.textContent = p1Score;
	}
})

// player2Button.addEventListener("click", function(){
// 	p2Score++;
// 	score.textContent = p1Score + " to " + p2Score;
// })

player2Button.addEventListener("click", function(){
	if(!gameOver){
		p2Score++;
		if(p2Score === winningScore){
			p2Display.classList.add("winner");
			gameOver = true;
			console.log("Koniec!")
		}
		p2Display.textContent = p2Score;
	}
})

reset.addEventListener("click", function(){
	resetuj();
});

function resetuj(){
		p1Score = 0;
		p2Score = 0;
		p2Display.classList.remove("winner");
		p1Display.classList.remove("winner");
		p1Display.textContent = 0;
		p2Display.textContent = 0;
		// to niżej nie działa
		// score.textContent = p1Score + " to " + p2Score;
		gameOver = false;
	}

input.addEventListener("change", function(){
	para.textContent = input.value;
	winningScore = Number(input.value);
	resetuj();
});

