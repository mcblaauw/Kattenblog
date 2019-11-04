const mongoose = require('mongoose');

// create new schema blueprint
let CommentsSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    message: {type: String, required: true, max: 200},
});

module.exports = mongoose.model('Comments', CommentsSchema);