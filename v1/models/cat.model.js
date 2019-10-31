const mongoose = require('mongoose');

// MongoDB database
const connectionString = "mongodb+srv://mcblaauw:pqgCU3ex0XHNDkLY@cluster0-kwpgf.azure.mongodb.net/Yelpcamp?retryWrites=true&w=majority";
mongoose.connect(connectionString,{ useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) { return console.log('Can not connect to the database: '+ err); } 
    else {console.log("MongoDB connection established!")};
});

// create new schema blueprint
let CatsSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    image: {type: String, required: true, max: 200},
});

//local: var Cats = mongoose.model("Cats", CatsSchema);
module.exports = mongoose.model('Cats', CatsSchema);