var express = require("express");
var app = express();

var request = require('request');

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
});


app.get("/results", function(req, res){
    request("http://www.omdbapi.com/?s=centipede&apikey=thewdb", function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {results: data});
        }
    });
});



app.listen(8080, function(){
    console.log("MovieApp has started!");
});