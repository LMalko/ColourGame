var express = require("express");
var app = express();

app.set("view engine", "ejs");





app.listen(8080, function(){
    console.log("MovieApp has started!");
});