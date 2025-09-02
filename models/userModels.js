// mongoose determines data structure
// User model. This is important because it enforces data structure and validation rules for users in MongoDB.
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

// Create User model (MongoDB will create `users` collection)
const User = mongoose.model('user', userSchema);
module.exports = User;