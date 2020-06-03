const mongoose = require('mongoose')

const productOrderSchema = new mongoose.Schema({
    index: {
        type: Number
    },
    name: {
        type: Number
    },
    piecesInCarton: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ProductOrder', productOrderSchema)