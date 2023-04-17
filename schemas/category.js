const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    places: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'place',
            required: true
        }
    ]
})

module.exports = new mongoose.model ('category', categorySchema);
