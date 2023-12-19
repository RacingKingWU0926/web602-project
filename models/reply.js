const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  author: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  discussionID: {
    type: Number
  }
},
  { timestamps : true }
);

module.exports = mongoose.model('reply', replySchema);
