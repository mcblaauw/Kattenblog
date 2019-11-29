const mongoose = require('mongoose');

// create new schema blueprint
let CatsSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    image: {type: String, required: true, max: 200},
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }]
});

module.exports = mongoose.model('Cats', CatsSchema);