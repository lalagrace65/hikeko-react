const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const { bcryptSalt } = require('../middleware/auth'); 
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

        // Create new user
        const userDoc = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role
        });

        // Send back created user
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

module.exports = router;
