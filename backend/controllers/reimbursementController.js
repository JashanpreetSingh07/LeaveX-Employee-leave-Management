const Reimbursement = require('../models/Reimbursement');

// @desc    Get user reimbursements (Employee) or all reimbursements (Manager/Admin)
// @route   GET /api/reimbursements
// @access  Private
const getReimbursements = async (req, res) => {
    try {
        let reimbursements;
        if (req.user.role === 'Employee') {
            reimbursements = await Reimbursement.find({ user: req.user.id }).populate('user', 'name email department').sort('-createdAt');
        } else {
            reimbursements = await Reimbursement.find().populate('user', 'name email department').sort('-createdAt');
        }
        res.status(200).json(reimbursements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit a reimbursement request
// @route   POST /api/reimbursements
// @access  Private/Employee
const submitReimbursement = async (req, res) => {
    try {
        const { amount, description, receiptUrl } = req.body;

        if (!amount || !description) {
            return res.status(400).json({ message: 'Please add amount and description' });
        }

        const reimbursement = await Reimbursement.create({
            user: req.user.id,
            amount,
            description,
            receiptUrl,
        });

        res.status(201).json(reimbursement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update reimbursement status
// @route   PUT /api/reimbursements/:id
// @access  Private/Manager, Admin
const updateReimbursementStatus = async (req, res) => {
    try {
        const { status, managerComment } = req.body;

        const reimbursement = await Reimbursement.findById(req.params.id);

        if (!reimbursement) {
            return res.status(404).json({ message: 'Reimbursement not found' });
        }

        // Prevent managers from approving/rejecting their own reimbursements
        if (req.user.role === 'Manager' && reimbursement.user.toString() === req.user.id) {
            return res.status(403).json({ message: 'Managers cannot approve or reject their own reimbursements. Please contact an Admin.' });
        }

        reimbursement.status = status || reimbursement.status;
        reimbursement.managerComment = managerComment || reimbursement.managerComment;

        const updatedReimbursement = await reimbursement.save();

        res.status(200).json(updatedReimbursement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReimbursements,
    submitReimbursement,
    updateReimbursementStatus,
};
