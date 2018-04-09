var express = require("express");
var app = express();

var request = require('request');

app.set("view engine", "ejs");









app.listen(8080, function(){
    console.log("Server has started!");
});