const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Update Budget
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { budget } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.budget = budget;
        await user.save();
        res.json({ message: 'Budget updated successfully', budget });
    } catch (error) {
        res.status(500).json({ message: 'Error updating budget' });
    }
});

// Get Current Budget
router.get('/:userId/current', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ budget: user.budget });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching budget' });
    }
});

module.exports = router;