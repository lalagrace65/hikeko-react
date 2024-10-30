const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const Package = require('../models/Package.js');
const User = require('../models/User');
const { jwtSecret } = require('../middleware/auth');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

// POST route to create a new package with the selected date (accessible by admin and staff)
router.post('/packages', requireRole(['admin', 'staff']), (req, res) => {
    console.log(req.body); // Log the incoming request body
    const { token } = req.cookies;
    const { 
        packages, 
        trailId, 
        price, 
        paymentOptions, 
        extraInfo, 
        checkIn, 
        checkOut, 
        maxGuests, 
        date, 
        timestamp } = req.body;

    // Check for required fields
    if (!date || !timestamp) {
        return res.status(400).json({ message: 'Date and timestamp are required' });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });

        try {
            let travelAgencyId;

            // If user is staff, retrieve the admin ID from the staff document
            if (userData.role === 'staff') {
                const staffUser = await User.findById(userData.id);
                if (!staffUser) return res.status(404).json({ message: 'Staff user not found' });
                travelAgencyId = staffUser.adminId; // Assuming the staff document has an adminId field
            } else {
                travelAgencyId = userData.id; // Admin creating the package
            }

            // Create a new package document in the database
            const packageDoc = await Package.create({
                trailId,
                travelAgency: travelAgencyId,  // Associate package with the correct admin
                packages,
                price,
                paymentOptions,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                date: new Date(date), 
                timestamp: new Date(timestamp) // Save the timestamp
            });

            res.status(201).json(packageDoc);
        } catch (error) {
            console.error('Error creating package:', error);
            res.status(500).json({ message: 'Error creating package', error: error.message });
        }
    });
});


// GET route to retrieve packages based on the role of the logged-in user
router.get('/packages', async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });

        try {
            let packages;
            if (userData.role === 'admin') {
                // Admin can view all packages created by them
                packages = await Package.find({ travelAgency: userData.id });
            } else if (userData.role === 'staff') {
                // Staff can view packages associated with their admin
                // Assuming you have a way to get the admin ID associated with the staff
                const admin = await User.findById(userData.id).select('adminId'); // Adjust field as necessary
                packages = await Package.find({ travelAgency: admin.adminId });
            } else {
                return res.status(403).json({ message: 'Access denied' });
            }

            res.json(packages);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching packages', error: error.message });
        }
    });
});


// GET route to retrieve a specific package by ID
router.get('/packages/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid package ID format' });
        }

        const packageDoc = await Package.findById(id);
        if (!packageDoc) return res.status(404).json({ message: 'Package not found' });

        res.json(packageDoc);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching package', error: error.message });
    }
});

// PUT route to update a package by ID (accessible by staff and admin)
router.put('/packages/:id', requireRole(['admin', 'staff']), async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    const { packages, price, paymentOptions, extraInfo, checkIn, checkOut, maxGuests } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });

        try {
            const packageDoc = await Package.findById(id);
            if (!packageDoc) return res.status(404).json({ message: 'Package not found' });

            if (packageDoc.travelAgency.toString() !== userData.id) {
                return res.status(403).json({ message: 'You do not have permission to edit this package' });
            }            

            packageDoc.packages = packages || packageDoc.packages;
            packageDoc.price = price || packageDoc.price;
            packageDoc.paymentOptions = paymentOptions || packageDoc.paymentOptions;
            packageDoc.extraInfo = extraInfo || packageDoc.extraInfo;
            packageDoc.checkIn = checkIn || packageDoc.checkIn;
            packageDoc.checkOut = checkOut || packageDoc.checkOut;
            packageDoc.maxGuests = maxGuests || packageDoc.maxGuests;

            await packageDoc.save();
            res.json(packageDoc);
        } catch (err) {
            res.status(500).json({ message: 'Error updating package', error: err.message });
        }
    });
});

// DELETE route to remove a package by ID (only accessible by admin)
router.delete('/packages/:id', requireRole(['admin']), async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid package ID format' });
        }

        const packageDoc = await Package.findById(id);
        if (!packageDoc) return res.status(404).json({ message: 'Package not found' });

        await Package.findByIdAndDelete(id);
        res.json({ message: 'Package deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting package', error: err.message });
    }
});



module.exports = router;