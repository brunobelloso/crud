const express = require('express');
const router = express.Router();
const Area = require('../models/Area');
const metadata = require('../config/metadata');

router.get('/', (req, res) => {
    // Your logic for rendering the registration form for areas
    const registerAreaMetadata = { pageTitle: 'Register New Area | ' + metadata.siteTitle, ...metadata };
    res.render('registerArea', { registerAreaMetadata, user: req.user });
});

router.post('/', async (req, res) => {
    try {
        const { areaName, description } = req.body;

        // Create a new area instance and save it to the database
        const area = new Area({ areaName, description });
        await area.save();

        // Log successful area registration
        console.log(`Area registered: ${area.areaName}`);

        res.redirect('/areas'); 
    } catch (error) {
        // Log and handle area registration failure
        console.error('Area registration failed:', error);
        res.status(500).send('Area registration failed');
    }
});

module.exports = router;
