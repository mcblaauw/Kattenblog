const Comment = require('../models/comment.model');
const Cat = require('../models/cat.model');

// ----------- Routes -------------------
exports.create = function (req,res,next) {
    let newComment = req.body.comments;

    // Push comment to Cat collection
    Cat.findById(req.params.id, function(err, cat) {
        if (err) {
            return next(err); 
        } else {
            //new comment to Db
            let MakeComment = new Comment(newComment);
            MakeComment.save();
            //update cat Db
            cat.comments.push(MakeComment);
            cat.save();
            res.redirect("/cats/"+req.params.id);
        }
    });
};

exports.delete = function (req,res,next) {
    Comment.findByIdAndDelete(req.params.comment_id, function(err) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log('Comment has been deleted!');   
            res.redirect('back');
        }
    });
};