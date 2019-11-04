const mongoose = require('mongoose');

// create new schema blueprint
let CatsSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    image: {type: String, required: true, max: 200},
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }]
});

//local: var Cats = mongoose.model("Cats", CatsSchema);
module.exports = mongoose.model('Cats', CatsSchema);