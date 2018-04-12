var circles = [];

paper.install(window);

var keyData = {
	q:{"sound": new Howl({src: ['assets/sounds/bubbles.mp3']}),
	},
	a:{"sound": new Howl({src: ['assets/sounds/clay.mp3']}),
	},
	z:{"sound": new Howl({src: ['assets/sounds/confetti.mp3']}),
	},
	w:{"sound": new Howl({src: ['assets/sounds/corona.mp3']}),
	},
	s:{"sound": new Howl({src: ['assets/sounds/dotted-spiral.mp3']}),
	},
	x:{"sound": new Howl({src: ['assets/sounds/flash-1.mp3']}),
	},
	e:{"sound": new Howl({src: ['assets/sounds/flash-2.mp3']}),
	},
	d:{"sound": new Howl({src: ['assets/sounds/flash-3.mp3']}),
	},
	c:{"sound": new Howl({src: ['assets/sounds/glimmer.mp3']}),
	},
	r:{"sound": new Howl({src: ['assets/sounds/moon.mp3']}),
	},
	f:{"sound": new Howl({src: ['assets/sounds/pinwheel.mp3']}),
	},
	v:{"sound": new Howl({src: ['assets/sounds/piston-1.mp3']}),
	},
	t:{"sound": new Howl({src: ['assets/sounds/piston-2.mp3']}),
	},
	g:{"sound": new Howl({src: ['assets/sounds/piston-3.mp3']}),
	},
	b:{"sound": new Howl({src: ['assets/sounds/prism-1.mp3']}),
	},
	y:{"sound": new Howl({src: ['assets/sounds/prism-2.mp3']}),
	},
	h:{"sound": new Howl({src: ['assets/sounds/prism-3.mp3']}),
	},
	n:{"sound": new Howl({src: ['assets/sounds/splits.mp3']}),
	},
	u:{"sound": new Howl({src: ['assets/sounds/squiggle.mp3']}),
	},
	j:{"sound": new Howl({src: ['assets/sounds/strike.mp3']}),
	},
	m:{"sound": new Howl({src: ['assets/sounds/suspension.mp3']}),
	},
	i:{"sound": new Howl({src: ['assets/sounds/timer.mp3']}),
	},
	k:{"sound": new Howl({src: ['assets/sounds/ufo.mp3']}),
	},
	o:{"sound": new Howl({src: ['assets/sounds/veil.mp3']}),
	},
	l:{"sound": new Howl({src: ['assets/sounds/wipe.mp3']}),
	},
	p:{"sound": new Howl({src: ['assets/sounds/zig-zag.mp3']}),
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
