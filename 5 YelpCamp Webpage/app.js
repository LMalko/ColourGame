var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon's Creek", image: ""},
        {name: "Granite Hill", image: ""},
        {name: "Mountain Goat's Rest", image: ""}
    ];
    res.render("campgrounds");
});



app.listen(8080, function(){
    console.log("YelpCamp server has started!");
});