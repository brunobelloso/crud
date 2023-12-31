// routes/home.js

const express = require('express');
const router = express.Router();
const metadata = require('../metadata'); // Adjust the path based on your project structure

router.get('/', (req, res) => {
    // Pass the pageTitle variable from metadata.js when rendering the view
    res.render('home', { pageTitle: metadata.pageTitle, user: req.user });
});

module.exports = router;
