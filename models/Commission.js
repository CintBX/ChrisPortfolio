const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommissionSchema = new Schema({
  title: {
    type: String,
    maxlength: 18,
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
    data: Buffer,
    contentType: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Commission = mongoose.model('commission', CommissionSchema);