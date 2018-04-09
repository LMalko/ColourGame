var express = require("express");
var app = express();

var request = require('request');

app.set("view engine", "ejs");

app.get("/results", function(req, res){
    request("http://www.omdbapi.com/?s=hellraiser&apikey=thewdb", function(error, response, body){
        if(!error && response.statusCode == 200){
            res.send(body);
        }
    });
});









app.listen(8080, function(){
    console.log("MovieApp has started!");
});