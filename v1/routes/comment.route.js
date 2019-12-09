const express = require('express');
const router = express.Router({ mergeParams: true }); 
// mergeParams important! using :id parameter from parent route (cats)

//Require the controllers 
const Comment = require('../models/comment.model');
const comment_controller = require('../controllers/comment.controller');

// Cats overview
router.post('/', isLoggedIn, comment_controller.create);
router.put('/:comment_id', checkCommentOwnership, comment_controller.update);
router.delete('/:comment_id', checkCommentOwnership, comment_controller.delete);

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCommentOwnership(req, res, next) {
    //Is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err) {
                res.redirect("back");
            } else {
                // did user created page and has permission to change it?
                if(foundComment.author.id.equals(req.user._id)) {
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