const fs        = require("fs"),
      multer    = require("multer"),
      Image     = require('../models/image.model');

// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({storage: storage});



exports.post = function (req,res,next) {
    var newImage = new Image({location: "images/" + req.file.filename, name: req.file.filename});
    Image.create(newImage, function(err){
      if(err){
        res.send(err);
      } else {
        res.redirect("back");
      }
    });
};
