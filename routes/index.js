const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');

//wyświetlenie strony powitalnej
router.get('/', forwardAuthenticated, (req, res) => res.render('user/welcome', {
}));

router.get('/mainpage', ensureAuthenticated, (req, res) =>
  res.render('mainPage', {
    user: req.user
  })
);

module.exports = router;