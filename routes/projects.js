const express = require('express');
const router = express.Router();
const Page = require('../models/Page');

router.get('/projects', async (req, res) => {
  try {
	const allPages = await Page.find({});
    const aboutPage = await Page.findOne({ name: 'projects' });
    if (!aboutPage) {
      throw new Error('About page not found in the database');
    }
    const pageTitle = aboutPage.title;
    const content = aboutPage.content;
    const activePage = 'projects'; // set the active page variable
    res.render('template', { pageTitle, content, activePage });
  } catch (error) {
    res.status(500).send('Error fetching About page: ' + error.message);
  }
});



module.exports = router;
