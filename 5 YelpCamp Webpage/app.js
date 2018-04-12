var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {name: "Salmon's Creek", image: "1.jpg"},
    {name: "Granite Hill", image: "2.jpg"},
    {name: "Mountain Goat's Rest", image: "3.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new")
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");

});


app.listen(8080, function(){
    console.log("YelpCamp server has started!");
});