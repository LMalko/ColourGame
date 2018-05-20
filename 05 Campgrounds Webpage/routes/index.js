var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

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
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar
    });

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            // req.flash("error", "Sign-in was unsuccessful.");

            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", req.body.username + " has successfully signed up");

            //Ensure that after successful sign-in the user will not go back to sign-in page.
            if(beforePreviousURL !== "/campgrounds/*"){
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
    res.redirect("/campgrounds");
});

// EDIT user

router.get("/editUser", middleware.isLoggedIn, function(req, res){
    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            if(req.user.isAdmin){
                res.render("editUser", {allUsers: allUsers})
            } else {
                res.redirect("campgrounds/");
            }
        }
    });
});

router.put("/editUser", function(req, res){

    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            allUsers.forEach(function(user){
                if(req.body.userName === user.username && req.body.userRole === "Admin"){
                    user.isAdmin = true;
                    User.findByIdAndUpdate(user._id, user,function(err, updatedUser){
                        if(err){
                            req.flash("error", err);
                            res.redirect("/campgrounds");
                        } else {
                            req.flash("success", "User's role assigned");
                            res.redirect("/campgrounds")
                        }
                    });
                }
            });
        }
    });
});

router.get("/deleteUser", middleware.isLoggedIn, function(req, res){
    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            if(req.user.isAdmin){
                res.render("deleteUser", {allUsers: allUsers})
            } else {
                res.redirect("campgrounds/");
            }
        }
    });
});

// Destroy user route, use PUT.
router.put("/deleteUser", function(req, res){
    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            allUsers.forEach(function(user){
                if(req.body.userName === user.username){
                    User.findByIdAndRemove(user._id,function(err){
                        if(err){
                            req.flash("error", err);
                            res.redirect("/campgrounds");
                        } else {
                            req.flash("success", "User was deleted.");
                            res.redirect("/campgrounds")
                        }
                    });
                }
            });
        }
    });
});


// User profile

router.get("users/:id", function(req, res){
    User.findByID(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error", "Something went wrong with user search.")
            res.redirect(previousURL)
        }
        res.render("users/show", {user: foundUser})
    })
});


module.exports = router;