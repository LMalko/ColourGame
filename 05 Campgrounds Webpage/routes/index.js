app.get("/", function(req, res){
    res.render("landing");
});



// AUTHENTICATION ROUTES.
app.get("/register", function(req, res){
    res.render("register");
});
// HANDLE SIGN-UP LOGIC.
app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
    res.render("login");
});

// HANDLING LOGIN LOGIC
//  app.post("/login", middleware, callback)
app.post("/login",
    passport.authenticate("local", {
        // successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        res.redirect(req.session.returnTo || '/campgrounds');
        delete req.session.returnTo;
    });

// LOGOUT ROUTE
app.get("/logout", function(req, res){
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