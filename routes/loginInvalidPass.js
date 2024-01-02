// routes/loginFailed.js

const express = require('express');
const router = express.Router();
const metadata = require('../config/metadata');

// Render login failed page
router.get('/', (req, res) => {
    // Define metadata for the login failed page
    const loginInvalidPassMetadata = { pageTitle: 'Invalid Password | ' + metadata.siteTitle, ...metadata };
    res.render('loginInvalidPass', { loginInvalidPassMetadata, user: req.user });
});

// Export the router for use in the main application
module.exports = router;