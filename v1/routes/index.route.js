var express     = require('express'),
    router      = express.Router(),
    passport    = require('passport')

var user_controller = require('../controllers/user.controller');

// Landing page
router.get("/", function (req,res) {
    res.render("home");
});

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

// Non-existing pages >> 404
router.get("*", function (req,res) {
    res.send("404 error! You entered the wrong page!");
});

// Logged in as user
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// Check paths for TESTING
/*
router.stack.forEach(function(r){
    if (r.route && r.route.path) {
        console.log(r.route.path)
    }
});
*/

module.exports = router;