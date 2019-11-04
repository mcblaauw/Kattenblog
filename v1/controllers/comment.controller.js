const Comment = require('../models/comment.model');
const Cat = require('../models/cat.model');

// ----------- Routes -------------------
exports.create = function (req,res,next) {
    newComment = req.body.comments;

    // Push comment to Cat collection
    Cat.findById(req.params.id, function(err, cat) {
        if (err) {
            return next(err); 
        } else {
            console.log(newComment);
            //new comment to Db
            let MakeComment = new Comment(newComment);
            MakeComment.save();
            //update cat Db
            cat.comments.push(newComment);
            cat.save();
            console.log(cat);
            //req.flash("success", "Comment succesfully added.");
            res.redirect("/cats/"+req.params.id);
        }
    });
};