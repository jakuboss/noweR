const express = require('express')
const router = express.Router()
const Product = require('../models/product')

const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        res.render('productForm/index')
    } catch {
        res.redirect('/')
    }
})

module.exports = router;