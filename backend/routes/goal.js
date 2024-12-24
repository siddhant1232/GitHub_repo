const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Set Goals
router.post('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { goals } = req.body; // Expecting an array of goals
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.goals = goals;
        await user.save();
        res.json({ message: 'Goals set successfully', goals });
    } catch (error) {
        res.status(500).json({ message: 'Error setting goals' });
    }
});

// Get Goals
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ goals: user.goals });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching goals' });
    }
});

module.exports = router;