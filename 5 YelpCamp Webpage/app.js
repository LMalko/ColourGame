var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon's Creek", image: "1.jpg"},
        {name: "Granite Hill", image: "2.jpeg"},
        {name: "Mountain Goat's Rest", image: "3.jpeg"}
    ];
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){

}


app.listen(8080, function(){
    console.log("YelpCamp server has started!");
});