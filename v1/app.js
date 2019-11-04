// The APP
const express = require('express');
const app = express();
// Additional NPM packages
const mongoose = require('mongoose');
const bodyParser = require("body-parser"); //POST request handler, puts it inside req.body from forms.
const methodOverride = require("method-override"); //HTML PUT and DELETE requests handling
const expressSanitizer = require("express-sanitizer");
const faker = require("faker/locale/nl");
//socket.io experiment (server-client realtime communication)
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// MongoDB database
const connectionString = "mongodb+srv://mcblaauw:pqgCU3ex0XHNDkLY@cluster0-kwpgf.azure.mongodb.net/Yelpcamp?retryWrites=true&w=majority";
mongoose.connect(connectionString,{ 
    useFindAndModify: false, 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, function(err) {
    if (err) { return console.log('Can not connect to the database: '+ err); } 
    else {console.log("MongoDB connection established!")};
});

// Routes import
const commentRoutes = require('./routes/comment.route'); 
const catRoutes = require('./routes/cat.route'); 

// APP settings and uses
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Routes URL settings
app.use('/cats/', catRoutes);
app.use('/cats/:id/comments', commentRoutes);

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