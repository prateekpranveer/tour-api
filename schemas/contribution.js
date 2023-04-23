const mongoose = require('mongoose')

const contributionSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    accomplished: {
        type: Boolean,
        required: true,
        default: false
    },
    picked: {
        type: Boolean,
        required: true,
        default: false
    },
    Published: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = new mongoose.model ('contribution', contributionSchema);
