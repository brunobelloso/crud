// routes/login.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path based on your project structure
const metadata = require('../metadata'); // Adjust the path based on your project structure

// Route to render the login view
router.get('/', (req, res) => {
    res.render('login', { pageTitle: metadata.pageTitle });
});

// Route to handle login form submission using Passport's local strategy
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',        // Redirect to the home page on successful login
        failureRedirect: '/login',    // Redirect back to the login page on failed login
        failureFlash: true            // Enable flash messages for failed login
    })
);

module.exports = router;
