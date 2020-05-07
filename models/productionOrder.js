const mongoose = require('mongoose')

const productOrderSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true
    },
    name: {
        type: Number,
        required: true
    },
    piecesInCarton: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('ProductOrder', productOrderSchema)