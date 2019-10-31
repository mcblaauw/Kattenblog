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
const cat = require('./routes/cat.route'); 
app.use('/cats/', cat);

// ----------- General Routes -------------------
app.get("/home", function (req,res) {
    //landing page
    res.render("home");
});

app.get("*", function (req,res) {
    res.send("404 error! You entered the wrong page!");
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