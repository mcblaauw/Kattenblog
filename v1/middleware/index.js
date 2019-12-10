var Cat = require('../models/cat.model');
var Comment = require('../models/comment.model');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

middlewareObj.checkCatOwnership = function(req, res, next) {
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

middlewareObj.checkCommentOwnership = function(req, res, next) {
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

module.exports = middlewareObj;