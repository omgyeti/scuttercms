const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Page = require('../models/Page');

router.get('/admin/new-post', (req, res) => {
  res.render('new-post');
});

router.post('/admin/new-post', async (req, res) => {
  // Handle saving the new post to the database
});

router.get('/admin/new-page', (req, res) => {
  res.render('new-page');
});

router.post('/admin/new-page', async (req, res) => {
  // Handle saving the new page to the database
});

module.exports = router;
