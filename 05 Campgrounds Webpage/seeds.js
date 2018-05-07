var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Sosnowiec",
        image: "1.jpg",
        author: {
            username: "admin",
            id: "5ae4fa1736273b2468e3c92f"
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Radom",
        image: "2.jpg",
        author: {
            username: "admin",
            id: "5ae4fa1736273b2468e3c92f"
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Kielce",
        image: "3.jpg",
        author: {
            username: "admin",
            id: "5ae4fa1736273b2468e3c92f"
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

function seedDB(){
    // Remove all.
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }
        // Add new campgrounds after removal.
        data.forEach(function(seed){

            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                }
            //    Create a comment.
                Comment.create(
                    {
                        text: "This place is great for vacation.",
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        } else{
                            comment.author.username = "admin";
                            comment.author.id = "5ae4fa1736273b2468e3c92f";
                            comment.save();
                            campground.comments.push(comment);
                            campground.save();
                        }
                    }
                );
            });
        });
    });

}

module.exports = seedDB;

