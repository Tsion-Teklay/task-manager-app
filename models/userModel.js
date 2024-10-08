const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ // Email validation regex
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true }
});

module.exports = mongoose.model('User', userSchema);
