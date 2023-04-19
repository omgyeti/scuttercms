const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
router.get('/post/:name', async (req, res) => {
  try {
    const postName = req.params.name;
    const post = await Post.findOne({ name: postName });
    if (!post) {
      res.status(404).send('Post not found');
      return;
    }
    const pageTitle = post.title;
    const content = post.content;
    const postsContent = fs.readFileSync(path.join(__dirname, '..', 'views', 'post.ejs'), 'utf-8');
    res.render('template', { pageTitle: 'Home', activePage: 'home', content: ejs.render(postsContent, { post }) });
  } catch (error) {
    res.status(500).send('Error fetching post: ' + error.message);
  }
});

module.exports = router;
