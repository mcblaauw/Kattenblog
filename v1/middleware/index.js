var Cat = require('../models/cat.model');
var Comment = require('../models/comment.model');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged first!");  //define an "error" flash handler BEFORE login redirect
    res.redirect("/login");
}

middlewareObj.checkCatOwnership = function(req, res, next) {
    //Is user logged in?
    if(req.isAuthenticated()){
        Cat.findById(req.params.id, function(err,foundCat){
            if(err) {
                req.flash("error","Could not find cat in database.");
                res.redirect("back");
            } else {
                // did user created page and has permission to change it?
                if(foundCat.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error","You need to be logged in first!");
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
                    req.flash("error","You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error","You need to be logged in first!");
        res.redirect("back");
    }
}

module.exports = middlewareObj;