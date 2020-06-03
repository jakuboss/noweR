const mongoose = require('mongoose')

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
            type: Number
        },
        elementB: {
            type: Number
        },
        elementC: {
            type: Number
        },
        elementD: {
            type: Number
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