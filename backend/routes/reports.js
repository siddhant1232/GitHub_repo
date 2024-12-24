const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get Expense and Budget Reports
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('transactions');
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Calculate total income, expenses, and budget here
        const totalIncome = user.transactions
            .filter(tx => tx.type === 'income')
            .reduce((sum, tx) => sum + tx.amount, 0);
        
        const totalExpenses = user.transactions
            .filter(tx => tx.type === 'expense')
            .reduce((sum, tx) => sum + tx.amount, 0);

        res.json({ totalIncome, totalExpenses, budget: user.budget });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports' });
    }
});

module.exports = router;