const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Add Transaction
router.post('/', async (req, res) => {
    const { userId, amount, type } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.transactions.push({ amount, type });
        await user.save();
        res.status(201).json({ message: 'Transaction added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding transaction' });
    }
});

// Get All Transactions
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('transactions');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user.transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
});

module.exports = router;