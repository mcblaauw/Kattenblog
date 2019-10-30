var express = require('express');
var app = express();

const faker = require("faker/locale/nl");
app.set("view engine","ejs");
const Cats = require('./models/cat.model'); 

// new cat in database
/*
Smokey = {
    name: "Smokey",
    image: faker.image.cats()
};
*/

//let Cat = new Cats(Smokey);

/*
Cat.save(function (err) {
    if (err) return next(err);
    console.log('Cat added to database');
});
*/

// Routes
app.get("/", function(req,res) {
    var cats = faker.image.cats();
    res.render("home",{cats: cats});
});

app.get("/cats", function(req,res,next) {
    Cats.find({}, function(err, cats) {
        console.log(cats);
        if (err) {
            return next(err);
        } else {
            res.render("cats",{cats: cats});
        }
    });
});

app.get("*", function(req,res) {
    res.send("The requested website does not exist!");
});

let port = 3000;

app.listen(port,function(){
	console.log("Connecting to new server on port: "+port);
});