import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FundingRequest', // Reference to the FundingRequest model
        required: true,
    },
    donorName: {
        type: String,
        required: true,
    },
    donorEmail: {
        type: String,
        required: true,
    },
    donorPhone: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Payment', paymentSchema);

