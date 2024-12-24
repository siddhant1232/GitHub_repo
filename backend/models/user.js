const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    goals: [{ type: String }],
    budget: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);