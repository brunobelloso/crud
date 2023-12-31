// routes/register.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path based on your project structure
const metadata = require('../metadata'); // Adjust the path based on your project structure

// Register route
router.get('/', (req, res) => {
    // Pass the pageTitle variable from metadata.js when rendering the view
    res.render('register', { pageTitle: metadata.pageTitle });
});

router.post('/', async (req, res) => {
    try {
        const { username, password, fullName, role, area } = req.body;

        // Validate username using a regular expression
        const usernameRegex = /^[a-z0-9_-]+$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).send('Formato de nombre de usuario no válido. Utilice solo letras minúsculas, números, guiones bajos y guiones.');
        }

        // Perform registration logic (hash password, create user, etc.)
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, fullName, role, area });
        await user.save();

        // Redirect to login page after successful registration
        res.redirect('/login');
    } catch (error) {
        // Handle registration errors
        console.error(error);
        res.status(500).send('Registration failed');
    }
});

module.exports = router;
