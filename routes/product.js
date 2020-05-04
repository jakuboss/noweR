const express = require('express')
const router = express.Router()
const Product = require('../models/product')

const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');


// All Products Route
router.get('/', ensureAuthenticated, async (req, res) => {
    let searchOptions = {}
    if (req.query.index != null && req.query.index !== '') {
        searchOptions.index = new RegExp(req.query.index, 'i')
    }
    try {
        const products = await Product.find(searchOptions)
        res.render('products/index', {
            products: products,
            searchOptions: req.query,
            //layout: 'layouts/layoutLogged'
        })
    } catch {
        res.redirect('/')
    }
})

// New Product Route
router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('products/new', {
        product: new Product()
    })
})

// Create Product Route
router.post('/', ensureAuthenticated, async (req, res) => {
    const product = new Product({
        index: req.body.index,
        name: req.body.name,
        piecesInCarton: req.body.piecesInCarton,
        weightOfPiece: req.body.weightOfPiece,
        piecesOnPallet: req.body.piecesOnPallet,
        typeOfPackaging: req.body.typeOfPackaging,
        typeOfCarton: req.body.typeOfCarton,
    })
    try {
        const newProduct = await product.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`products`)
    } catch {
        res.render('products/new', {
            product: product,
            errorMessage: 'Error creating Product'
        })
    }
})


//+
router.get('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        //   const books = await Book.find({ author: author.id }).limit(6).exec()
        res.render('products/show', {
            product: product,
        })
    } catch {
        res.redirect('/')
    }
})

//+
router.get('/:id/edit', ensureAuthenticated, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.render('products/edit', {
            product: product
        })
    } catch {
        res.redirect('/products')
    }
})


router.put('/:id', ensureAuthenticated, async (req, res) => {
    let product
    try {
        product = await Product.findById(req.params.id)
        product.index = req.body.index,
            product.name = req.body.name,
            product.piecesInCarton = req.body.piecesInCarton,
            product.weightOfPiece = req.body.weightOfPiece,
            product.piecesOnPallet = req.body.piecesOnPallet,
            product.typeOfPackaging = req.body.typeOfPackaging,
            product.typeOfCarton = req.body.typeOfCarton

        await product.save()
        res.redirect(`/products/${product.id}`)
    } catch {
        if (author == null) {
            res.redirect('/')
        } else {
            res.render('products/edit', {
                product: product,
                errorMessage: 'Error updating Author'
            })
        }
    }
})


router.delete('/:id', ensureAuthenticated, async (req, res) => {
    let product

    try {
        product = await Product.findById(req.params.id)
        await product.remove()
        res.redirect('/products')
    } catch {
        if (product == null) {
            res.redirect('/')
        } else {
            res.redirect(`/products`)
        }
    }
})



module.exports = router