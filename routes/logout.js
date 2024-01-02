// routes/logout.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
