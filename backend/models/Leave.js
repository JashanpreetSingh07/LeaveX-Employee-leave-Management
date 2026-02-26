const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    leaveType: {
        type: String,
        required: true,
        enum: ['Sick Leave', 'Casual Leave', 'Paid Leave', 'Maternity/Paternity Leave', 'Other'],
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Leave', leaveSchema);
