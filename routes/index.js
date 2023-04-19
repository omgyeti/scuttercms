const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
    const postsContent = fs.readFileSync(path.join(__dirname, '..', 'views', 'posts.ejs'), 'utf-8');
    res.render('template', { pageTitle: 'Home', activePage: 'home', content: ejs.render(postsContent, { posts }) });
  } catch (error) {
    res.status(500).send('Error fetching posts: ' + error.message);
  }
});


module.exports = router;
