var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var faker = require("faker/locale/nl");
//socket.io experiment (server-client realtime communication)
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const Cats = require('./models/cat.model');

// ----------- Routes -------------------
app.get("/", function(req,res) {
    //Random cat for homepage
    var acat = faker.image.cats();
    res.render("home",{cats: acat});
});

app.get("/cats", function(req,res,next) {
    // Import all cats from database
    Cats.find({}, function(err, cats) {
        if (err) {
            return next(err);
        } else {
            res.render("cats",{cats: cats});
        }
    });
});

app.post("/cats/create", function (req,res) {
    newCat = {name: req.body.name, image: req.body.image};
    let Cat = new Cats(newCat);

    Cat.save(function (err) {
        if (err) return next(err);
        console.log('Cat added to database');
    });
    
    res.redirect("/cats");
});

app.get("/cats/create", function (req,res) {
    //render to new cat page
    res.render("cats/create");
});

app.get("*", function(req,res) {
    res.send("The requested website does not exist!");
});

// --------- Socket.io ------------------
io.on('connection', function(socket) {
    console.log('a user has connected');
    socket.on('disconnect', function(){
        console.log('a user has disconnected');
    });
    socket.on('cat-event', function() {
        var caturl = faker.image.cats();
        console.log('random cat image generated');
        io.emit('message', caturl);
    });
});


// ---------- set up port and broadcast ------------
let port = 3000;

server.listen(port,function(){
	console.log("App running on: "+port);
});