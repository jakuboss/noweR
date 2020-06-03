const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

router.get('/', (req, res) =>
    res.render('profile/profile', {
        user: req.user
    })
);

router.get('/newpassword', (req, res) => {
    res.render('profile/newpassword', {
        user: req.user
    })
})



router.post('/newpassword', (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/a',
        failureRedirect: '/b',
        failureFlash: true
    })(req, res, next);
});


module.exports = router;