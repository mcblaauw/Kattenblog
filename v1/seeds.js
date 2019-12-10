var Cat     = require('./models/cat.model');
var Comment = require('./models/comment.model');
var User    = require('./models/user.model');
var faker   = require('faker');

Smokey_imgs = [
    "https://i.imgur.com/3YRlUQCh.jpg",
    "https://i.imgur.com/0cyi8gLh.jpg",
    "https://i.imgur.com/o0MO3xTh.jpg",
    "https://i.imgur.com/CntgSL9h.jpg",
    "https://i.imgur.com/JYp8rsUh.jpg",
    "https://i.imgur.com/XlwNznuh.jpg",
    "https://i.imgur.com/0S628WAh.jpg",
    "https://i.imgur.com/n4AtTOlh.jpg",
    "https://i.imgur.com/LFvtT1Bh.jpg",
    "https://i.imgur.com/EGuna2Ah.jpg",
    "https://i.imgur.com/JHwPEvOh.jpg",
    "https://i.imgur.com/WZRDsbhh.jpg",
    "https://i.imgur.com/PdfjuJXh.jpg",
    "https://i.imgur.com/eawpHOGh.jpg",
    "https://i.imgur.com/LjWVUhnh.jpg",
    "https://i.imgur.com/PGpdRyTh.jpg",
    "https://i.imgur.com/4azjIzdh.jpg",
    "https://i.imgur.com/Jz9r6tbh.jpg",
    "https://i.imgur.com/BKMdcIuh.jpg",
    "https://i.imgur.com/56cA7soh.jpg",
    "https://i.imgur.com/zb3topRh.jpg",
    "https://i.imgur.com/66ROH7Hh.jpg",
    "https://i.imgur.com/VbbH4dkh.jpg"
];

//User data
let Userdata = new User({
    username: "MB"
});

//Cat data 
var Catdata = [];
var count = 1;
Smokey_imgs.forEach(img => {
    Catdata.push({
        name: "Smokey - "+count,
        image: img,
        description: "\u20AC"+faker.commerce.price()
    });
    count++;
});

// =========================================
// Feedback function loop from >>hell<<
// =========================================

function seedDB() {
// 0. Start removing all previous entrees!
    // A. Remove all cats from database!
    Cat.remove({},function(err){
        if(err){
            console.log(err);
        } 
        console.log("Cats removed from database!");

        // B. Remove all comments from database!
        Comment.remove({},function(err){
            if(err){
                console.log(err);
            }
            console.log("Comments removed from database!");

            // C. Remove all users from database!
            User.remove({},function(err){
                if(err){
                    console.log(err);
                }
                console.log("Users removed from database!");

                // 1. Start seeding new user
                User.register(Userdata, "1234", function(err, user){
                    if(err) {
                        console.log(err);
                    }
                    console.log("User added to database: "+user.username);

                    // 2. Start seeding new cat entrees!
                    Catdata.forEach(function(Catseed){
                        Cat.create(Catseed, function(err,cat){
                            if(err){
                                console.log(err);
                            } else {
                                console.log("Cat "+cat.name+ " added to database");

                                // 3. Start seeding new comments
                                let Commentdata = [
                                    {
                                        message: cat.name + " looks really cute on this photo!"
                                    }
                                ];
                                Commentdata.forEach(function(Commentseed){
                                    Comment.create(Commentseed, function(err,comment){
                                        if(err) {
                                            console.log(err);
                                        } else {
                                            comment.author.id = user._id;
                                            comment.author.username = user.username;
                                            comment.save();

                                            cat.author.id = user._id;
                                            cat.author.username = user.username;
                                            cat.comments.push(comment);
                                            cat.save();

                                            

                                            console.log("Comment created by: "+cat.author.username);
                                        }
                                    });
                                });
                                // end of 3.
                            }   
                        });  
                    });
                    // end of 2.
                });
            });
            // end of 1.
        });     
    });
};

module.exports = seedDB;