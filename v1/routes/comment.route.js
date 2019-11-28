const express = require('express');
const router = express.Router({ mergeParams: true }); 
// mergeParams important! use :id parameter from parent route (cats)

//Require the controllers 
const comment_controller = require('../controllers/comment.controller');

// Cats overview
router.post('/', comment_controller.create);
router.put('/',comment_controller.update);
router.delete('/:comment_id',comment_controller.delete);

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;