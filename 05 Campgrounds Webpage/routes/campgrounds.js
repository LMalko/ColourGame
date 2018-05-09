var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
// If we don't write the name of the file,
// it will automatically search for index.js.
var middleware = require("../middleware");

// Show all campgrounds.

router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    })
});

// NEW - Show form to create new campground.
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
});

// CREATE - Add new campground to DB.
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    delete req.session.returnTo;

    // Assign current user to this new campground.
    var thisAuthor = {
        id: req.user._id,
        username: req.user.username
    };

    var newCampground = {name: name, image: image,
        description: description, author: thisAuthor};
    Campground.create(newCampground, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - shows more info about one campground.
router.get("/:id", function(req, res){
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

// Edit campground route, submits the form.
// Pass campground to edit.

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});
// Update campground route, receives the form.

router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    // Find and update the correct campground and redirect.
    // Use mongoose built-in function.

    Campground.findByIdAndUpdate(req.params.id,
        req.body.campground,
        function(err, updatedCampground){
            if(err){
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds/" + req.params.id)
            }
    });
});

// Destroy campground route.
router.delete("/:id",
    middleware.checkCampgroundOwnership,
    function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;