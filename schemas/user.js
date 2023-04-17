const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userLevel: {
        type: Number,
        required: true,
        default: 3
    },
    contributions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'contribution'
            }
        ],
    writeUps: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'place'
            }
        ]
    ,
    rating: {
        type: Number,
    },
    img: {
        data: Buffer,
        contentType: String
    },
    phone: {
        type: Number,
        required: true,
    },
    
})

module.exports = new mongoose.model('user', userSchema);