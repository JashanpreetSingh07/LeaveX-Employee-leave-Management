const Leave = require('../models/Leave');

// @desc    Get user leaves (Employee) or all leaves (Manager/Admin)
// @route   GET /api/leaves
// @access  Private
const getLeaves = async (req, res) => {
    try {
        let leaves;
        if (req.user.role === 'Employee') {
            leaves = await Leave.find({ user: req.user.id }).populate('user', 'name email department').sort('-createdAt');
        } else {
            leaves = await Leave.find().populate('user', 'name email department').sort('-createdAt');
        }
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Apply for a leave
// @route   POST /api/leaves
// @access  Private/Employee
const applyLeave = async (req, res) => {
    try {
        const { leaveType, fromDate, toDate, reason } = req.body;

        if (!leaveType || !fromDate || !toDate || !reason) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const leave = await Leave.create({
            user: req.user.id,
            leaveType,
            fromDate,
            toDate,
            reason,
        });

        res.status(201).json(leave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update leave status
// @route   PUT /api/leaves/:id
// @access  Private/Manager, Admin
const updateLeaveStatus = async (req, res) => {
    try {
        const { status, managerComment } = req.body;

        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        // Prevent managers from approving/rejecting their own leaves
        if (req.user.role === 'Manager' && leave.user.toString() === req.user.id) {
            return res.status(403).json({ message: 'Managers cannot approve or reject their own leaves. Please contact an Admin.' });
        }

        leave.status = status || leave.status;
        leave.managerComment = managerComment || leave.managerComment;

        const updatedLeave = await leave.save();

        res.status(200).json(updatedLeave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLeaves,
    applyLeave,
    updateLeaveStatus,
};
