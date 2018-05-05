var express = require("express");
//  Use {mergeParams} to receive id after writing
//  app.use("/campgrounds/:id/comments", commentRoutes);
//  line in app.js
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


// When a user asks to post a comment, middleware isLoggedIn will check first.
// Comments new.
router.get("/new",
    isLoggedIn,
    function(req, res){
        Campground.findById(req.params.id, function(err, campground){
            if (err){
                console.log(err);
            } else {
                res.render("comments/new", {campground: campground})
            }
        });
    });

//Comments create.
router.post("/",
    isLoggedIn,
    function(req, res){
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
                        //Add id & username to comment
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        // Save comment.
                        comment.save();

                        campground.comments.push(comment);
                        campground.save();
                        res.redirect("/campgrounds/" + req.params.id);
                    }
                });
            }
        });
    });

router.get("/:comment_id/edit", function(req, res){
    res.render("comments/edit", {campground_id: req.params.id});
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.returnTo = req.originalUrl; //Store users current session
    res.redirect("/login");
}

module.exports = router;