//model dla produktów
const mongoose = require('mongoose')
var Float = require('mongoose-float').loadType(mongoose);

const productSchema = new mongoose.Schema({
    index: {
        type: String,
        unique: true,
        dropDups: true,
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
        type: Float,
        required: true
    },
    piecesOnPallet: {
        type: Number,
        required: true
    },
    typeOfPackaging: {
        type: String,
        required: true
    },
    typeOfCarton: {
        type: String,
        required: true
    },
    packingTimes: {
        packingLineA: {
            type: Number
        },
        packingLineB: {
            type: Number
        },
        packingLineC: {
            type: Number
        }
    },
    recipe: {
        elementA: {
            type: Float
        },
        elementB: {
            type: Float
        },
        elementC: {
            type: Float
        },
        elementD: {
            type: Float
        }
    },
    addDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Product', productSchema)