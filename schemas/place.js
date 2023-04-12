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

module.exports = new mongoose.model ('place', placeSchema);
