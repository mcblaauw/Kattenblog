var Cat = require('./models/cat.model');
var Comment = require('./models/comment.model');
var faker = require("faker/locale/nl"); 

var Catdata = [
    {
        name: faker.name.firstName(),
        image: faker.image.cats(),
        description: faker.lorem.paragraph()
    },
    {
        name: faker.name.firstName(),
        image: faker.image.cats(),
        description: faker.lorem.paragraph()
    },
    {
        name: faker.name.firstName(),
        image: faker.image.cats(),
        description: faker.lorem.paragraph()
    },
    {
        name: faker.name.firstName(),
        image: faker.image.cats(),
        description: faker.lorem.paragraph()
    },
    {
        name: faker.name.firstName(),
        image: faker.image.cats(),
        description: faker.lorem.paragraph()
    },
    {
        name: faker.name.firstName(),
        image: faker.image.cats(),
        description: faker.lorem.paragraph()
    }
];

function seedDB() {
    // Remove all cats from database!
    Cat.remove({},function(err){
        if(err){
            console.log(err);
        } 
        console.log("Cats removed from database!");

        // Remove all comments from database!
        Comment.remove({},function(err){
            if(err){
                console.log(err);
            }
            console.log("Comments removed from database!");
            // Start seeding new cat entrees
            Catdata.forEach(function(Catseed){
                Cat.create(Catseed, function(err,cat){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Cat "+cat.name+ " added to database");
                        // Start seeding new comments
                        let Commentdata = [
                            {
                                name: "Marten Blaauw",
                                message: cat.name + " looks really cute on this photo!"
                            }
                        ];

                        Commentdata.forEach(function(Commentseed){
                            Comment.create(Commentseed, function(err,comment){
                                if(err) {
                                    console.log(err);
                                } else {
                                    cat.comments.push(comment);
                                    cat.save();
                                    console.log("Comment created by: "+comment.name);
                                }
                            });
                        }); 
                    } 
                });
            });
        });     
    });
};

module.exports = seedDB;