const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  imageName: {
    type: String,
    default: "none",
    required: true
  },
  imageData: {
    type: String,
    required: true
  },
  title: {
    type: String,
    maxlength: 22,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: false
  },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;