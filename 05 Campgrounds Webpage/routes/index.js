var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});



// AUTHENTICATION ROUTES.
router.get("/register", function(req, res){
    // req.flash("error", "Sign-in was unsuccessful.");
    res.render("register");
});

// HANDLE SIGN-UP LOGIC.
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            // req.flash("error", "Sign-in was unsuccessful.");

            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", req.body.username + " has successfully signed up");

            //Ensure that after successful sign-in the user will not go back to sign-in page.
            if(beforePreviousURL === "/register"){
                res.redirect("/campgrounds")
            }
            res.redirect(req.session.returnTo || beforePreviousURL);

            delete req.session.returnTo;
        });
    });
});

// SHOW LOGIN FORM.
router.get("/login", function(req, res){
    if(previousURL === "/login" && beforePreviousURL === "/login"){
        res.render("login", {error: "Invalid username or password"});
    }else{
        res.render("login");
    }
});


// HANDLING LOGIN LOGIC
//  app.post("/login", middleware, callback)
router.post("/login",
    passport.authenticate("local", {
        // successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        req.flash("success", req.body.username + " has successfully logged in");

        if(beforePreviousURL === "/login"){
            beforePreviousURL = "/campgrounds"
        }

        res.redirect(beforePreviousURL);
        delete req.session.returnTo;
    });

// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.flash("success", "Successful log out");

    req.logout();
    res.redirect(previousURL);
});


module.exports = router;