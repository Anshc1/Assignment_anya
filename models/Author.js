const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_no: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash password before saving
authorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 8);
});

// Method to check password correctness
authorSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
