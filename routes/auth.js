const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Authentication routes
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/onecrm',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = router;

