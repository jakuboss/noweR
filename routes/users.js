const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const {
  forwardAuthenticated,
  ensureAuthenticated
} = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('user/login', {
  // layout: 'layouts/layoutUnlogged',
  user: req.user
}));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('user/register', {
  // layout: 'layouts/layoutUnlogged'
}));

// Register
router.post('/register', (req, res) => {
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: 'Wypełnij wszystkie pola'
    });
  }

  if (password != password2) {
    errors.push({
      msg: 'Niepoprawne hasło'
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: 'Hasło musi się składać z co najmniej 6 znaków'
    });
  }

  if (errors.length > 0) {
    res.render('user/register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({
      email: email
    }).then(user => {
      if (user) {
        errors.push({
          msg: 'Istnieje konto z takim adresem email'
        });
        res.render('user/register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Twoje konto zostało utworzone. Możesz się zalogować'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Wylogowano');
  res.redirect('/users/login');
});





module.exports = router;