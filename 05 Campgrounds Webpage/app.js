const express = require("express");
          app = express();
          bodyParser = require("body-parser");
          mongoose = require("mongoose");
          Campground = require("./models/campground");
          Comment = require("./models/comment");
          seedDB = require("./seeds");

// Clear database.
seedDB();

mongoose.connect("mongodb://localhost:/campgroundsDB");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    })
});

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new")
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(
        function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    req.params.id
});



app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground})
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            // Use dictionary comment[] from input name in new.ejs.
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

app.listen(8080, function(){
    console.log("Campgrounds server has started!");
});