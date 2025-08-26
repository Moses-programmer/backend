// mongoose determines data structure
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String

    },
    email: {
        type: String
    },

    password: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('user', userSchema);
module.exports = User;