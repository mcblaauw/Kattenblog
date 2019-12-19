const mongoose = require('mongoose');

// create new schema blueprint
let CatsSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    image: {type: String, required: true, max: 200},
    description: String,
    date: { type: Date, default: Date.now },
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
    }],
    meta: {
        votes: Number,
        favs: Number
    }
});

module.exports = mongoose.model('Cats', CatsSchema);