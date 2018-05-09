
var middlewareObject = {

};

middlewareObject.checkCampgroundOwnership = function(req, res, next){
        // Check if user is logged in.
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    res.redirect("back");
                } else{
                    // Does user own campground.
                    if(foundCampground.author.id.equals(req.user._id)){
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
    };

middlewareObject.checkCommentOwnership = function(req, res, next){
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
    };




module.exports = middlewareObject;