// routes/home.js

const express = require('express');
const router = express.Router();
const metadata = require('../metadata');

// Render home page
router.get('/', (req, res) => {
    // Define metadata for the home page
    const homeMetadata = { pageTitle: 'Home | ' + metadata.siteTitle, ...metadata };
    res.render('home', { homeMetadata, user: req.user });
});

// Export the router for use in the main application
module.exports = router;
