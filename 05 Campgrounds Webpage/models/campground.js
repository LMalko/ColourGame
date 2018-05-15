var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);