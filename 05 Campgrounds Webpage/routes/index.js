var express = require("express");
var router = express.Router();

var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

router.get("/", function(req, res){
    res.render("landing");
});

// forgot password
router.get('/forgot', function(req, res) {
    res.render('forgot');
});



module.exports = router;
