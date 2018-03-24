var circles = [];

paper.install(window);

var keyData = {
	a:{
		"sound": new Howl({src: ['assets/sounds/bubbles.mp3']}),
	}
}


window.onload = function() {

	var canvas = document.getElementById('myCanvas');
	paper.setup(canvas);

	var tool = new Tool();
 
	tool.onKeyDown = function(event) {

		keyData[event.key]["sound"].play();

		var randomWidth = Math.random() * window.innerWidth;
		var randomHeight = Math.random() * window.innerHeight;

		var circle = new paper.Path.Circle(new paper.Point(randomWidth, randomHeight), 180);
		// Alternatively:
		// var maxPoint = new paper.Point(view.size.width, view.size.height);
		// var randomPoint = paper.Point.random();
		// var point = new paper.Point(maxPoint * randomPoint);
		// var circle = new paper.Path.Circle(point, 50);

		// Get random color.
		circle.fillColor = "#"+((1<<24)*Math.random()|0).toString(16);

		circles.push(circle);
	}


	view.onFrame = function(event) {

		for(var i = 0; i < circles.length; i++){

			// Change colors.
			circles[i].fillColor.hue += 1;

			// Minimize.
			circles[i].scale(.97);
			}
	}

	paper.view.draw();
}
