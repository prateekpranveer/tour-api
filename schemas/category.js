const mongoose = require('mongoose')
const place = require('./place')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    items: {
        type: [place],
        required: true
    }
})

module.exports = new mongoose.model ('category', categorySchema);
