const mongoose = require('mongoose')

const contributionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    accomplished: {
        type: Boolean,
        required: true
    },
    picked: {
        type: Boolean,
        required: true
    },
    pending: {
        type: Boolean,
        required: true
    }
})

module.exports = new mongoose.model ('contribution', contributionSchema);
