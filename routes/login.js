// routes/login.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const metadata = require('../config/metadata');

// Render login page
router.get('/', (req, res) => {
    const loginMetadata = { pageTitle: 'Login | ' + metadata.siteTitle, ...metadata };
    res.render('login', { loginMetadata, user: req.user });
});

// Handle login form submission
router.post('/', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await User.findOne({ username: username });

        if (!user) {
            // User does not exist, redirect or respond accordingly
            return res.redirect('/login-invalid-user');
        }

        // If the user exists, proceed with Passport authentication
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login-invalid-pass',
        })(req, res, next);

    } catch (error) {
        // Handle potential errors during the database query
        next(error);
    }
});

module.exports = router;
