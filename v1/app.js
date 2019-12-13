// The APP
var express         = require('express'),
    app             = express(),
    bodyParser      = require("body-parser"), //POST request handler, puts it inside req.body from forms.
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require("method-override"), //HTML PUT and DELETE requests handling
    multer          = require("multer"),
    expressSanitizer = require("express-sanitizer"), //Sanitize user input for invalid js protection
    flash           = require('connect-flash'),
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
    indexRoutes     = require('./routes/index.route')

// Model import
var User            = require('./models/user.model'),
    Image           = require('./models/image.model')

// APP settings and uses
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

// Seeding the file
var seedDB = require('./seeds');
seedDB();

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

// Store global variables inside res.locals for perminent access
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
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
    /*
    socket.on('cat-event', function() {
        var caturl = faker.image.cats();
        console.log('random cat image generated');
        io.emit('message', caturl);
    });
    */
});

// ---------- set up port and broadcast ------------
let port = 3000;

server.listen(port,function(){
	console.log("App running on: "+port);
});