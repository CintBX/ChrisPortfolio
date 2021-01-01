const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommissionSchema = new Schema({
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
  image: {
    imageName: {
      type: String,
      default: "none",
      required: false
    },
    imageData: {
      type: String,
      required: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Commission = mongoose.model('commission', CommissionSchema);