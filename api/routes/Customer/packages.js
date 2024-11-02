const mongoose = require('mongoose');
const express = require('express');
const Package = require('../../models/Package.js');


const router = express.Router();

// Route to get packages by trail ID
router.get('/trails/:trailId/packages', async (req, res) => {
    const { trailId } = req.params;
    try {
        const packages = await Package.find({ trailId }).populate('travelAgency'); // populate travel agency if needed
        res.json(packages);
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get a specific package by ID
router.get('/packages/:id', async (req, res) => {
    const { id } = req.params; // Extract package ID from params
    try {
        const package = await Package.findById(id).populate('travelAgency'); // Populate if needed
        console.log('Fetched package:', package);
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(package);
    } catch (error) {
        console.error('Error fetching package details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;