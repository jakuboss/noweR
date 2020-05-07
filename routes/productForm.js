const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const productionOrder = require('../models/productionOrder')

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


router.post('/', ensureAuthenticated, async (req, res) => {
    const productOrder = new productionOrder({
        index: req.body.index,
        name: req.body.name,
        piecesInCarton: req.body.piecesInCarton
    })
    try {
        const newProductOrder = await productOrder.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`productsForm`)
    } catch {
        res.render('products/new', {
            productOrder: productOrder,
            errorMessage: 'Error creating Product'
        })
    }
})



module.exports = router;