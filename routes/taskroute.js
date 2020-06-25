//zlecenia produkcyjne routing
const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const ProductOrder = require('../models/productionOrder')
const {
    ROLE
} = require('../data.js')
const {
    ensureAuthenticated,
    authenticationRole

} = require('../config/auth');


router.get('/', ensureAuthenticated, authenticationRole([ROLE.PLAN, ROLE.ADMIN]), async (req, res) => {

    const products = await Product.find({})

    res.render('productForm/newProdOrder', {
        productOrder: new ProductOrder(),
        product: products //
    })
})

router.get('/readproducts/:id', authenticationRole([ROLE.PLAN, ROLE.ADMIN]), ensureAuthenticated, (req, res) => {
    const id = req.params.id
    // Odwołanie do mongo w celu znalezenia
    //let product = ProductSchema.findById({id})

    Product.findById(id, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

})

router.post('/test', authenticationRole([ROLE.PLAN, ROLE.ADMIN]), ensureAuthenticated, (req, res) => {

    var cos = req.body.data

    console.log('Czy działa ? :' + cos);

    ProductOrder.insertMany(req.body.data)

        .then(function () {
            console.log('Wstawiono dane')
            res.redirect('/')
        }).catch(function (error) {
            console.log(error)
        })

})

router.get('/active', authenticationRole([ROLE.BRYG, ROLE.ADMIN]), async (req, res) => {
    let searchOptions = {}

    if (req.query.prodOrder != null && req.query.prodOrder !== '') {
        searchOptions.prodOrder = new RegExp(req.query.prodOrder, 'i')
    }
    if (req.query.prodLine != null && req.query.prodLine !== '') {
        searchOptions.prodLine = new RegExp(req.query.prodLine, 'i')
    }
    if (req.query.prodDate != null && req.query.prodDate !== '') {
        searchOptions.prodDate = new RegExp(req.query.prodDate, 'i')
    }
    if (req.query.productName != null && req.query.productName !== '') {
        searchOptions.productName = new RegExp(req.query.productName, 'i')
    }

    searchOptions.status = new RegExp("aktywny", 'i')

    const products = await Product.find()
    const productorders = await ProductOrder.find(searchOptions)
    try {
        res.render('productForm/active', {
            products: products,
            productorders: productorders,
            searchOptions: req.query,

        })
    }
    catch {
        res.redirect('/')
    }

})

router.get('/orderList', async (req, res) => {
    let searchOptions = {}

    if (req.query.prodOrder != null && req.query.prodOrder !== '') {
        searchOptions.prodOrder = new RegExp(req.query.prodOrder, 'i')
    }
    if (req.query.prodLine != null && req.query.prodLine !== '') {
        searchOptions.prodLine = new RegExp(req.query.prodLine, 'i')
    }
    if (req.query.prodDate != null && req.query.prodDate !== '') {
        searchOptions.prodDate = new RegExp(req.query.prodDate, 'i')
    }
    if (req.query.productName != null && req.query.productName !== '') {
        searchOptions.productName = new RegExp(req.query.productName, 'i')
    }

    if (req.query.status != null && req.query.status !== '') {
        searchOptions.status = new RegExp(req.query.status, 'i')
    }

    const products = await Product.find()
    const productorders = await ProductOrder.find(searchOptions)
    try {
        res.render('productForm/orderList', {
            products: products,
            productorders: productorders,
            searchOptions: req.query,

        })
    }
    catch {
        res.redirect('/')
    }

})

router.get('/:id/active', authenticationRole([ROLE.BRYG, ROLE.ADMIN]), async (req, res) => {
    try {
        const productorders = await ProductOrder.findById(req.params.id)
        res.render('productForm/edit', {
            productorders: productorders,
        })
    } catch {
        res.redirect('/')
    }
})

router.post('/:id', authenticationRole([ROLE.BRYG, ROLE.ADMIN]), async (req, res) => {

    let productorders
    try {
        productorders = await ProductOrder.findById(req.params.id)
        productorders.status = req.body.status,
            productorders.realQty = req.body.realQty,
            productorders.realProdTime = req.body.realProdTime,
            await productorders.save()
        res.redirect(`/productForm/active`)
    } catch{
        res.render('productForm/active', {
            productorders: productorders,
        })
    }
})



router.get('/:id/view', async (req, res) => {
    try {
        const productorders = await ProductOrder.findById(req.params.id)
        res.render('productForm/view', {
            productorders: productorders,
        })
    } catch {
        res.redirect('/')
    }
})

module.exports = router;
