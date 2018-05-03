const express = require("express");
          app = express();
          bodyParser = require("body-parser");
          mongoose = require("mongoose");

          seedDB = require("./seeds");

          passport = require("passport");
          localStrategy = require("passport-local");

          Campground = require("./models/campground");
          Comment = require("./models/comment");
          User = require("./models/user");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");


// Clear database.
seedDB();

mongoose.connect("mongodb://localhost:/campgroundsDB");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


// PASSPORT CONFIGURATION.
app.use(require("express-session")({
    secret: "This is the express-session secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass current user to all templates.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next()
});

// Use routes.

app.use(indexRoutes);
// Make all campground routes start with "/campgrounds/"
app.use("/campgrounds", campgroundRoutes);
// Same for comments, index doesn't have common address.
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(8080, function(){
    console.log("Campgrounds server has started!");
});