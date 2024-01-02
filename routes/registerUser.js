// Import necessary modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Area = require('../models/Area');
const metadata = require('../config/metadata');

router.get('/', async (req, res) => {
    try {
        // Fetch areas from the database
        const areas = await Area.find({});

        // Prepare data for rendering the registration form
        const registerMetadata = { pageTitle: 'Register | ' + metadata.siteTitle, ...metadata };

        // Pass the areas data to the view along with other metadata
        res.render('registerUser', { registerMetadata, user: req.user, areas });
    } catch (error) {
        console.error('Error fetching areas:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { username, password, fullName, role, area } = req.body;

        // Validate input data
        if (!isValidUsername(username)) {
            return res.status(400).send('Invalid username format. Use only lowercase letters, numbers, underscores, and hyphens.');
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance and save it to the database
        const user = new User({ username, password: hashedPassword, fullName, role, area });
        await user.save();

        // Log successful registration
        console.log(`User registered: ${user.username}`);

        res.redirect('/login');
    } catch (error) {
        // Log and handle registration failure
        console.error('Registration failed:', error);
        res.status(500).send('Registration failed');
    }
});

// Helper function for username validation
function isValidUsername(username) {
    const usernameRegex = /^[a-z0-9_-]+$/;
    return usernameRegex.test(username);
}

module.exports = router;
