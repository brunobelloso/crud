// routes/logout.js

const express = require('express');
const router = express.Router();

// Handle logout
router.get('/', (req, res) => {
  // Log out the current user
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    // Redirect to the home page after successful logout
    res.redirect('/');
  });
});

// Export the router for use in the main application
module.exports = router;