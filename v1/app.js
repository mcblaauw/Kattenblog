// The APP
var express         = require('express'),
    app             = express(),
    bodyParser      = require("body-parser"), //POST request handler, puts it inside req.body from forms.
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require("method-override"), //HTML PUT and DELETE requests handling
    expressSanitizer = require("express-sanitizer"), //Sanitize user input for invalid js protection
    faker           = require("faker/locale/nl"), // faker cats
//socket.io experiment (server-client realtime communication)
    server          = require('http').createServer(app),
    io              = require('socket.io')(server)

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

// Routes requirements
var commentRoutes   = require('./routes/comment.route'), 
    catRoutes       = require('./routes/cat.route'),
    indexRoutes     = require('./routes/index.route'),
    User            = require('./models/user.model')

// APP settings and uses
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Seeding the file
var seedDB = require('./seeds');
//seedDB();

// PASSPORT CONFIGURATION
// open session
app.use(
    require("express-session")({
        secret: "Smokey is a cute cat!",
        resave: false,
        saveUninitialized: false
    })
);
// CONFIG Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Write own Middleware to make currentUser information available on all routes (whole website)
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    next();
});

// ----------- General Routes -------------------
// Routes URL settings
app.use('/cats/', catRoutes);
app.use('/cats/:id/comments', commentRoutes);
app.use(indexRoutes);

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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// ---------- set up port and broadcast ------------
let port = 3000;

server.listen(port,function(){
	console.log("App running on: "+port);
});