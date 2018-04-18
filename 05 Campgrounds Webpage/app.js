var express = require("express");
var app = express();

var bodyParser = require("body-parser");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:/yelp_camp");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campgrounds = mongoose.model("Campground", campgroundSchema);


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campgrounds.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    })
});

app.get("/campgrounds/new", function(req, res){
    res.render("new")
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campgrounds.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


app.listen(8080, function(){
    console.log("Campgrounds server has started!");
});