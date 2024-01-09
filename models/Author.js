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

authorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 8);
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
