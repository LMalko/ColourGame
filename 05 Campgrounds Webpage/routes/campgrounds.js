var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
// If we don't write the name of the file,
// it will automatically search for index.js.
var middleware = require("../middleware");

// For google map API
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);

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
    // Make sure the string 1st letter is Upper & the rest Lower case.
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;

    delete req.session.returnTo;

    // Assign current user to this new campground.
    var thisAuthor = {
        id: req.user._id,
        username: req.user.username
    };

    geocoder.geocode(req.body.location, function (err, data) {
        if (err || !data.length) {
            req.flash('error', 'Invalid address');
            return res.redirect("/campgrounds/new");
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;

        var newCampground = {
            name: name, image: image,
            description: description, author: thisAuthor, price: price,
            location: location, lat: lat, lng: lng
        };

        Campground.create(newCampground, function (err) {
            if (err) {
                req.flash("error", "This name was already taken");
                res.redirect("/campgrounds/new");
                console.log(err);
            } else {
                req.flash("success", "Campground was added");
                res.redirect("/campgrounds");
            }
        });
    });
});

// SHOW - shows more info about one campground.
router.get("/:id", function(req, res){
    var campgroundsContainer = [];
    var users = [];

    // Assign all campgrounds to a variable.
    Campground.find(function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            campgroundsContainer = allCampgrounds;
        }
    });

    // Assign all users to a variable.
    User.find(function(err, allUsers) {
        if (err) {
            console.log(err);
        } else {
            users = allUsers;
        }
    });

    Campground.findById(req.params.id).populate("comments").exec(
        function(err, foundCampground){
            if(err){
                console.log(err);
            } else{
                res.render("campgrounds/show",
                    {campground: foundCampground,
                        campgrounds: campgroundsContainer,
                        users: users});
            }
        });
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

    geocoder.geocode(req.body.location, function (err, data) {
        if (err || !data.length) {
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
        req.body.campground.lat = data[0].latitude;
        req.body.campground.lng = data[0].longitude;
        req.body.campground.location = data[0].formattedAddress;

    // Find and update the correct campground and redirect.
    // Use mongoose built-in function.

        Campground.findByIdAndUpdate(req.params.id,
            req.body.campground,
            function(err, updatedCampground){
                if(err){
                    res.redirect("/campgrounds");
                } else {
                    req.flash("success", "Campground edited");

                    res.redirect("/campgrounds/" + req.params.id)
                }
        });
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
            req.flash("error", "Campground deleted");
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;