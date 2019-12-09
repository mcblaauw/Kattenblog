const Comment = require('../models/comment.model');
const Cat = require('../models/cat.model');

// ----------- Routes -------------------
exports.create = function (req,res) {
    Cat.findById(req.params.id, function(err, cat) {
        if (err) {
            console.log(err);
            res.redirect('/cats'); 
        } else {
            //Add new comment to Db
            Comment.create(req.body.comments, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    //add logged-in username and id to comment 
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //push comment into cat Db
                    cat.comments.push(comment);
                    cat.save();
                    console.log('New comment has been added!');  
                    res.redirect("/cats/"+req.params.id);
                }
            })            
        }
    });
};

exports.update = function(req,res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log('Comment has been updated!'); 
            res.redirect("/cats/" + req.params.id );
        }
    });
};

exports.delete = function (req,res) {
    Comment.findByIdAndDelete(req.params.comment_id, function(err) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log('Comment has been deleted!');   
            res.redirect("/cats/" + req.params.id );
        }
    });
};