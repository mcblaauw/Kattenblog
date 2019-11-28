var express     = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    LocalStrategy   = require('passport-local')

var User            = require('../models/user.model');

// CONFIG
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Require the controllers 
var user_controller = require('../controllers/user.controller');

// Registration
router.get('/register',user_controller.registration);
router.post('/register',user_controller.registered);
// Login
router.get('/login',user_controller.login);
router.post('/login',passport.authenticate("local", {
    successRedirect: "/cats", 
    failureRedirect: "/login"
}), user_controller.loggedin);
// Logout
router.get('/logout',user_controller.logout);

// Check paths
router.stack.forEach(function(r){
    if (r.route && r.route.path) {
        console.log(r.route.path)
    }
});

module.exports = router;