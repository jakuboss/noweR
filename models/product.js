const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    index: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    piecesInCarton: {
        type: Number,
        required: true
    },
    weightOfPiece: {
        type: Number,
        required: true
    },
    piecesOnPallet: {
        type: Number,
        required: true
    },
    typeOfPackaging: {
        type: Number,
        required: true
    },
    typeOfCarton: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)