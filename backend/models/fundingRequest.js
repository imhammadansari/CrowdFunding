// models/FundingRequest.js
import mongoose from 'mongoose';

const fundingRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    cnic: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    roll_no: { type: String, required: true },
    father_name: { type: String, required: true },
    father_income: { type: Number, required: true },
    university_name: { type: String, required: true },
    text: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // Default status is 'Pending'
    createdAt: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.model('FundingRequest', fundingRequestSchema);
