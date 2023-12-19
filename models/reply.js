const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    trim: true
  },
  content: {
    type: String,
    trim: true,
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'  // reference the questions collection
  }
},
  { timestamps : true }
);

module.exports = mongoose.model('Reply', replySchema);
