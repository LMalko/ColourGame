var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});



// AUTHENTICATION ROUTES.
router.get("/register", function(req, res){
    res.render("register");
});
// HANDLE SIGN-UP LOGIC.
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// SHOW LOGIN FORM.
router.get("/login", function(req, res){
    res.render("login");
});

// HANDLING LOGIN LOGIC
//  app.post("/login", middleware, callback)
router.post("/login",
    passport.authenticate("local", {
        // successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        res.redirect(req.session.returnTo || '/campgrounds');
        delete req.session.returnTo;
    });

// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.returnTo = req.originalUrl; //Store users current session
    res.redirect("/login");
}


module.exports = router;