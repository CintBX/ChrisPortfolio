const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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

module.exports = Project = mongoose.model('project', ProjectSchema);