const Cat = require('../models/cat.model');

// ----------- Routes -------------------
exports.cat_home = function(req,res,next) {
    // Import all cats from database
    Cat.find({}, function(err, cats) {
        if (err) {
            return next(err);
        } else {
            res.render("cats/home",{cats: cats});  //render EJS file
        }
    });
};

exports.cat_create_get = function (req,res) {
    res.render("cats/create");
};

exports.cat_create_post = function (req,res,next) {
    //Sanitize input fields by user >> remove <script> tags and other threads
    req.body.cats.name = req.sanitize(req.body.cats.name);//TODO: put in Middleware later
    var newCat = req.body.cats;
    newCat['author'] = {
        id: req.user._id,
        username: req.user.username
    };
    Cat.create(newCat, function(err){
        if(err) {
            console.log(err);
            res.redirect('/cats');
        } else {
            console.log('Cat added to database');
            res.redirect("/cats"); //redirect to ROUTE
        }
    });
};

exports.cat_read = function(req,res,next) {
    Cat.findById(req.params.id)
        .populate("comments") //TODO: should populate without need of refresh
        .exec(function(err, cat) {
            if (err) {
                return next(err);
            } else {
                console.log(res.locals.currentUser);
                console.log(req.user);
                res.render('cats/show',{cats: cat});
            }
        });
};


exports.cat_update = function(req,res) {
    //Sanitize input fields by user >> remove <script> tags and other threads
    req.body.cats.name = req.sanitize(req.body.cats.name); //TODO: put in Middleware later
    Cat.findByIdAndUpdate(req.params.id, {$set: req.body.cats}, function(err, cat) {
        if (err) { 
            res.redirect('/cats');
        } else {
            console.log('Cat info has been updated!');
            res.redirect('/cats/'+req.params.id);  
        }
    });
};

exports.cat_delete = function(req,res) {
    Cat.findByIdAndDelete(req.params.id, function(err) {
        if (err) {
            res.redirect('/cats');
        } else {
            console.log('Cat info has been deleted!');   
            res.redirect('/cats');
        }
    });
};