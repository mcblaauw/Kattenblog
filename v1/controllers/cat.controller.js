const Cat = require('../models/cat.model');

// ----------- Routes -------------------
exports.cat_home = function(req,res,next) {
    // Import all cats from database
    Cat.find({}, function(err, cats) {
        if (err) {
            return next(err);
        } else {
            res.render("cats/home",{cats: cats});
        }
    });
};

exports.cat_create_get = function (req,res) {
    res.render("cats/create");
};

exports.cat_create_post = function (req,res,next) {
    newCat = {name: req.body.name, image: req.body.image};
    let MakeCat = new Cat(newCat);

    MakeCat.save(function (err) {
        if (err) return next(err);
        console.log('Cat added to database');
        res.redirect("/cats/home");
    });
};

exports.cat_read = function(req,res,next) {
    Cat.findById(req.params.id, function(err, cat) {
        if (err) {
            return next(err);
        } else {
            res.render('cats/show',{cats: cat});
        }
    });
};


exports.cat_update = function(req,res,next) {
    Cat.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, cat) {
        if (err) { 
            return next(err);
        } else {
            console.log('Cat info has been updated!');
            res.redirect('/cats/home');  
        }
    });
};

exports.cat_delete = function(req,res,next) {
    Cat.findByIdAndDelete(req.params.id, function(err) {
        if (err) {
            return next(err);
        } else {
            console.log('Cat info has been deleted!');   
            res.redirect('/cats/home');
        }
    });
};