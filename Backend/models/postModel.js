const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  selectedImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: false,
  }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema)
