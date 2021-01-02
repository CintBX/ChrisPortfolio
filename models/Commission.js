const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommissionSchema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Commission = mongoose.model('commission', CommissionSchema);