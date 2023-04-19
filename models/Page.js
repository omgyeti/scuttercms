const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const Page = mongoose.model('Pages', pageSchema);

module.exports = Page;
