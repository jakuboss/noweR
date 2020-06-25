//routing dodawanie, przegląd, edytowanie i usuwanie produktów
const express = require('express')
const router = express.Router()
const Product = require('../models/product')

const {
    authenticationRole
} = require('../config/auth');
const {
    ROLE
} = require('../data.js')

router.get('/', authenticationRole([ROLE.PLAN, ROLE.ADMIN]), async (req, res) => {
    let searchOptions = {}
    if (req.query.index != null && req.query.index !== '') {
        searchOptions.index = new RegExp(req.query.index, 'i')
    }
    try {
        const products = await Product.find(searchOptions)
        res.render('products/index', {
            products: products,
            searchOptions: req.query,
        })
    } catch {
        res.redirect('/')
    }
})



router.get('/indexView', async (req, res) => {
    let searchOptions = {}
    if (req.query.index != null && req.query.index !== '') {
        searchOptions.index = new RegExp(req.query.index, 'i')
    }
    try {
        const products = await Product.find(searchOptions)
        res.render('products/indexView', {
            products: products,
            searchOptions: req.query,
        })
    } catch {
        res.redirect('/')
    }
})

// New Product Route
router.get('/new', authenticationRole([ROLE.PLAN, ROLE.ADMIN]), (req, res) => {

    res.render('products/new', {
        product: new Product(),

    })
})

// Create Product Route
router.post('/', authenticationRole([ROLE.PLAN, ROLE.ADMIN]), async (req, res) => {
    const product = new Product({
        index: req.body.index,
        name: req.body.name,
        piecesInCarton: req.body.piecesInCarton,
        weightOfPiece: req.body.weightOfPiece,
        piecesOnPallet: req.body.piecesOnPallet,
        typeOfPackaging: req.body.typeOfPackaging,
        typeOfCarton: req.body.typeOfCarton,
        addDate: Date.now(),

        recipe: {
            elementA: req.body.elementA,
            elementB: req.body.elementB,
            elementC: req.body.elementC,
            elementD: req.body.elementD
        },

        packingTimes: {
            packingLineA: req.body.packingLineA,
            packingLineB: req.body.packingLineB,
            packingLineC: req.body.packingLineC
        }
    })
    try {
        const newProduct = await product.save()
        console.info(newProduct);
        res.redirect(`products`)
    } catch {
        res.render('products/new', {
            product: product,
            errorMessage: 'Blad dodawania produktu'
        })
    }
})


//+
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        console.log(product)
        res.render('products/read', {
            product: product,
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/indexView/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        console.log(product)
        res.render('products/read_bryg', {
            product: product,
        })
    } catch {
        res.redirect('/')
    }
})



//+
router.get('/:id/edit', authenticationRole([ROLE.PLAN, ROLE.ADMIN]), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.render('products/edit', {
            product: product
        })
    } catch {
        res.redirect('/products')
    }
})



router.delete('/:id', authenticationRole([ROLE.PLAN, ROLE.ADMIN]), async (req, res) => {
    let product

    try {
        product = await Product.findById(req.params.id)
        await product.remove()
        req.flash('success', 'Registration successfully');
        res.locals.message = req.flash();
        res.redirect('/products')
    } catch {
        if (product == null) {
            res.redirect('/')
        } else {
            res.redirect(`/products`)
        }
    }
})

router.put('/:id', authenticationRole([ROLE.PLAN, ROLE.ADMIN]), async (req, res) => {
    let product
    try {
        product = await Product.findById(req.params.id)
        // product.index = req.body.index,
        product.name = req.body.name,
            product.piecesInCarton = req.body.piecesInCarton,
            product.weightOfPiece = req.body.weightOfPiece,
            product.piecesOnPallet = req.body.piecesOnPallet,
            product.typeOfPackaging = req.body.typeOfPackaging,
            product.typeOfCarton = req.body.typeOfCarton,
            product.recipe.elementA = req.body.elementA,
            product.recipe.elementB = req.body.elementB,
            product.recipe.elementC = req.body.elementC,
            product.recipe.elementD = req.body.elementD,
            product.packingTimes.packingLineA = req.body.packingLineA,
            product.packingTimes.packingLineB = req.body.packingLineB,
            product.packingTimes.packingLineC = req.body.packingLineC,

            product.updateDate = Date.now()

        await product.save()
        res.redirect(`/products`)
    } catch {
        if (author == null) {
            res.redirect('/')
        } else {
            res.render('/products', {
                product: product,
                errorMessage: 'Blad edytowania produktu'
            })
        }
    }
})

module.exports = router