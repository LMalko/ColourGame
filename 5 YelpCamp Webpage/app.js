var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon's Creek", image: "https://adventurehacks-k1cw0wqythfvue.netdna-ssl.com/wp-content/uploads/2014/08/salmon-creek-1-629x420.jpg"},
        {name: "Granite Hill", image: "https://ap.rdcpix.com/1875831382/a087fe9d2ecb81de2d08a21592e53b43l-m0xd-w640_h480_q80.jpg"},
        {name: "Mountain Goat's Rest", image: "https://www.visittheusa.com/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2016-10/HERO%201_Central%20Montana_GettyImages-116363120_CROP_Web72DPI.jpg?itok=UVmCDwUc"}
    ];
    res.render("campgrounds");
});



app.listen(8080, function(){
    console.log("YelpCamp server has started!");
});