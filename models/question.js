const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: true
  }
},
  { timestamps : true }
);

module.exports = mongoose.model('Question', questionSchema);
