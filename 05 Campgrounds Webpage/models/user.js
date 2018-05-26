var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    avatar: String,
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: true},
});

userSchema.plugin(passportLocalMongoose);



module.exports = mongoose.model("User", userSchema);