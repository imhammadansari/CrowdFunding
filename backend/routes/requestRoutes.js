const express = require('express');
const router = express.Router();
const FundingRequest = require('../models/fundingRequest.js');
const IsLoggedIn = require('../middlewares/IsLoggedIn.js');

router.post('/requests', IsLoggedIn, async (req, res) => {
    try {
        const newRequest = await FundingRequest.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit request', error: error.message });
    }
});

router.get('/getRequests', async (req, res) => {
    try {
        const requests = await FundingRequest.find({ status: 'Pending' }); 
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch funding requests', error: error.message });
    }
});

router.get('/user/requests', IsLoggedIn, async (req, res) => {
    try {
        const userId = req.user._id;
        
        const requests = await FundingRequest.find({ user: userId }).sort({ createdAt: -1 });
        
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to fetch user requests', 
            error: error.message 
        });
    }
});

router.get('/approvedRequests', async (req, res) => {
    try {
        const requests = await FundingRequest.find({ status: 'Approved' }); 
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch funding requests', error: error.message });
    }
});

router.get('/getAllRequests', async (req, res) => {
    try {
        const requests = await FundingRequest.find(); 
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch funding requests', error: error.message });
    }
});

router.post('/updateStatus/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedRequest = await FundingRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ success: true, request: updatedRequest });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update request status', error: error.message });
    }
});

router.get('/requests/:id', async (req, res) => {
    try {
        const request = await FundingRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch request details', error: error.message });
    }
});

module.exports = router;