var i = 10;
var j = 20;

for(var i = 10; i <= 920; i += 40){
	for(var j = 20; j <= 920; j += 40){
		new Path.Circle(new Point(i, j), 10).fillColor = 'purple';
	}
}