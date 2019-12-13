var mongoose = require("mongoose");

var ImageSchema = new mongoose.Schema({
  name: String,
  location: String,
  creationDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Image", ImageSchema);