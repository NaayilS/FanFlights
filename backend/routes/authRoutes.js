import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
    const { username, password, favoriteTeam } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const newUser = new User({ username, password, favoriteTeam });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, favoriteTeam: newUser.favoriteTeam }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, favoriteTeam: newUser.favoriteTeam });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, favoriteTeam: user.favoriteTeam }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, favoriteTeam: user.favoriteTeam });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Failed to log in' });
    }
});

export default router;
