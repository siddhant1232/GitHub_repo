const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get User Profile
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).select('name email');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ name: user.name, email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

// Update User Profile
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, email } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
});

module.exports = router;