// routes/register.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const metadata = require('../metadata');

// Render registration page
router.get('/', (req, res) => {
    // Define metadata for the registration page
    const registerMetadata = { pageTitle: 'Register | ' + metadata.siteTitle, ...metadata };
    res.render('register', { registerMetadata, user: req.user });
});

// Handle registration form submission
router.post('/', async (req, res) => {
    try {
        // Extract form data
        const { username, password, fullName, role, area } = req.body;

        // Validate username format
        const usernameRegex = /^[a-z0-9_-]+$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).send('Invalid username format. Use only lowercase letters, numbers, underscores, and hyphens.');
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance and save it to the database
        const user = new User({ username, password: hashedPassword, fullName, role, area });
        await user.save();

        // Redirect to the login page after successful registration
        res.redirect('/login');
    } catch (error) {
        // Log and handle registration failure
        console.error(error);
        res.status(500).send('Registration failed');
    }
});

// Export the router for use in the main application
module.exports = router;
