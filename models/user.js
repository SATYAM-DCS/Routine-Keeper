const mongoose = require("mongoose");
const path = require('path');

// user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    
    },
    habbits: [
        {
            type: String,
        
        }
    ]
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;