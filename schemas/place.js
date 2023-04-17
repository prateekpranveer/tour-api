const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    slug: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    
    checkPoints: {
        type: [
            {
                type: String,
                required: true
            }
        ],
    }
})

placeSchema.index({name: "text"})
module.exports = new mongoose.model ('place', placeSchema);
