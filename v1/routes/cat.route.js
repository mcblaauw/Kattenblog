var express = require('express'),
    router  = express.Router()

//Require models and controllers 
const Cat = require('../models/cat.model');
const cat_controller = require('../controllers/cat.controller');

// Cats overview
router.get('/',cat_controller.cat_home);
// Create cat
router.get('/create', isLoggedIn, cat_controller.cat_create_get);
router.post('/', isLoggedIn, cat_controller.cat_create_post);
// Read cat from database
router.get('/:id',cat_controller.cat_read);
// Update existing cat from database
router.put('/:id', checkCatOwnership, cat_controller.cat_update);
// Delete existing cat from database
router.delete('/:id', checkCatOwnership, cat_controller.cat_delete);

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCatOwnership(req, res, next) {
    //Is user logged in?
    if(req.isAuthenticated()){
        Cat.findById(req.params.id, function(err,foundCat){
            if(err) {
                res.redirect("back");
            } else {
                // did user created page and has permission to change it?
                if(foundCat.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;