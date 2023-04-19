const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  name: { type: String } // Add this line to include the 'name' field
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
