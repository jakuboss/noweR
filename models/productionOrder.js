//model dla zleceń produkcyjnych
const mongoose = require('mongoose')
var Float = require('mongoose-float').loadType(mongoose);
Schema = mongoose.Schema
const Product = require('../models/product')

const productOrderSchema = mongoose.Schema({
    prodOrder: {
        type: String,
        required: true
    },
    prodLine: {
        type: String,
        required: true
    },
    prodDate: {
        type: String,
        required: true
    },
    sequence: {//
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId, ref: 'Product',
        required: true
    },
    orderQty: {//
        type: Number,
        required: true
    },
    orderWeight: {//
        type: Float,
        required: true
    },
    cartonQty: {//
        type: Number,
        required: true
    },
    palletQty: {//
        type: Number,
        required: true
    },
    planProdTime: {//
        type: String,
        required: true
    },
    planPartStart: {//
        type: String,
        required: true
    },
    realQty: {
        type: Number,

    },
    realProdTime: {
        type: String
    },
    addDate: {//
        type: String,
        //default: Date.now
    },
    status: {
        type: String
    },
    useOfA: {
        type: Float

    },
    useOfB: {
        type: Float

    },
    useOfC: {
        type: Float

    },
    useOfD: {
        type: Float

    }

})

module.exports = mongoose.model('ProductOrder', productOrderSchema)