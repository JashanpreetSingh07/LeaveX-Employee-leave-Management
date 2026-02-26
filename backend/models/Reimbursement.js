const mongoose = require('mongoose');

const reimbursementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    receiptUrl: {
        type: String, // Can be a URL if uploading to S3, or simply a text placeholder for now
        default: '',
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    managerComment: {
        type: String,
        default: '',
    }
}, { timestamps: true });

module.exports = mongoose.model('Reimbursement', reimbursementSchema);
