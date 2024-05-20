const mongoose = require('mongoose');

const candidateschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  job: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;