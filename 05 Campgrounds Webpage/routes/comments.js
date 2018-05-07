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
                delete req.session.returnTo;
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

// Edit route.
router.get("/:comment_id/edit",
    checkCommentOwnership,
    function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            Comment.findById(req.params.comment_id, function (err, foundComment) {
                if (err) {
                    res.redirect("back");
                } else {
                    res.render("comments/edit",
                        {campground_id: req.params.id, comment: foundComment, campground: campground});
                }
            });
        }
    });
});

// Update route.

router.put("/:comment_id", function(req, res){
    // comment is an entire comment[text] object because it has only one attribute here - text
    Comment.findByIdAndUpdate(req.params.comment_id,
        req.body.comment,
        function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Destroy comment route.
router.delete("/:comment_id", function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.returnTo = req.originalUrl; //Store users current session
    res.redirect("/login");
}

function checkCommentOwnership(req, res, next){
    // Check if user is logged in.
    if(req.isAuthenticated()){

        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else{
                // Does user own comment.
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect("back");
                }
            }
        });
        //  If not - redirect.
    } else {
        res.redirect("back");
    }
}
module.exports = router;