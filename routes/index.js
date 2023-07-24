const express = require('express');
const router = express.Router();

// Default page - login
router.get('/', (req, res) => {
  res.render('login');
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(); // Assuming you are using Passport.js for authentication
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      // Handle the error accordingly
    }
    res.redirect('/'); // Redirect to the desired page after successful logout
  });
});

module.exports = router;
