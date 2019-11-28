var User            = require('../models/user.model'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local')

// CONFIG
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ----------- Routes -------------------
exports.registration = function(req,res) {
    res.render("register");  
};

exports.registered = function(req,res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/cats");
        });
    });
};

exports.login = function(req,res) {
    res.render("login");  
};

exports.loggedin = function(req,res) {
     
};

exports.logout = function(req,res) {
    req.logout();
    res.redirect("/cats");
};
