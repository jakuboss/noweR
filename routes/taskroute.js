const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const ProductOrder = require('../models/productionOrder')

const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {

    res.render('productForm/test2', {
        productOrder: new ProductOrder()
    })
})


router.post('/', ensureAuthenticated, async (req, res) => {
    const productOrder = new ProductOrder({
        index: req.body.apartments[0][index],
        name: req.body.apartments[0][rooms],
        piecesInCarton: req.body.apartments[0][cos],
    })
    try {
        const newProductOrder = await productOrder.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`products`)
    } catch {
        res.render('products')
    }
})


module.exports = router;

/////////////////////

// var express = require('express');
// var taskModel = require('../models/task');
// const Product = require('../models/product')

// var router = express.Router();

// router.get('/home', async (req, res) => {
//     const products = await Product.find({})


//     res.render('demo', {
//         products: products
//     });
// });


// router.post('/addtask', (req, res) => {
//     var taskk = new taskModel({
//         task: req.body.task,
//         zadanie: req.body.zadanie, //
//         proba: parseInt(req.body.task) + parseInt(req.body.zadanie),
//         amet: 2 * parseInt(req.body.task) + parseInt(req.body.zadanie),
//         produkt: req.body.produkt
//     });
//     taskModel.addTask(taskk, (err, taskData) => {
//         if (err) {
//             res.json({
//                 msg: 'error'
//             });
//         } else {
//             res.json({
//                 msg: 'success'
//             });
//         }
//     });
// });

// router.get('/gettask', (req, res) => {
//     taskModel.getTask((err, taskData) => {
//         if (err) {
//             res.json({
//                 msg: 'error'
//             });
//         } else {
//             res.json({
//                 msg: 'success',
//                 data: taskData
//             });
//         }
//     });
// });

// router.delete('/removetask', (req, res) => {
//     taskModel.removeTask(req.body.id, (err, taskData) => {
//         if (err) {
//             res.json({
//                 msg: 'error'
//             });
//         } else {
//             res.json({
//                 msg: 'success'
//             });
//         }
//     });
// });

// module.exports = router;