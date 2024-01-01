// routes/login.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const metadata = require('../metadata');

// Render login page
router.get('/', (req, res) => {
    // Define metadata for the login page
    const loginMetadata = { pageTitle: 'Login | ' + metadata.siteTitle, ...metadata };
    res.render('login', { loginMetadata, user: req.user });
});

// Handle login form submission using Passport authentication
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true  
    })
);

// Export the router for use in the main application
module.exports = router;
