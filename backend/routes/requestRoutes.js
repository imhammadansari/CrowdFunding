// routes/requestRoutes.js
import express from 'express';
const router = express.Router();
import FundingRequest from '../models/fundingRequest.js';
import IsLoggedIn from '../middlewares/IsLoggedIn.js';

// POST: Create a new funding request
router.post('/requests', IsLoggedIn, async (req, res) => {
    try {
        const newRequest = await FundingRequest.create({...req.body, user: req.user._id});
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit request', error: error.message });
    }
});

router.get('/userRequests/:userId', IsLoggedIn, async (req, res) => {
    try {
        // Verify the requested userId matches the authenticated user
        if (req.params.userId !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const requests = await FundingRequest.find({ user: req.user._id })
            .sort({ createdAt: -1 });
            
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user requests', error: error.message });
    }
});

// GET: Fetch all pending funding requests
router.get('/getRequests', async (req, res) => {
    try {
        const requests = await FundingRequest.find({ status: 'Pending' }); // Fetch only pending requests
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch funding requests', error: error.message });
    }
});

router.get('/approvedRequests', async (req, res) => {
    try {
        const requests = await FundingRequest.find({ status: 'Approved' }); // Fetch only pending requests
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch funding requests', error: error.message });
    }
});

router.get('/getAllRequests', async (req, res) => {
    try {
        const requests = await FundingRequest.find(); // Fetch only pending requests
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

// GET: Fetch a specific funding request by ID
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

export default router;