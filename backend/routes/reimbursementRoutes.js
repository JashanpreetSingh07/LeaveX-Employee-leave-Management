const express = require('express');
const router = express.Router();
const { getReimbursements, submitReimbursement, updateReimbursementStatus } = require('../controllers/reimbursementController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getReimbursements)
    .post(protect, submitReimbursement);

router.route('/:id')
    .put(protect, authorize('Manager', 'Admin'), updateReimbursementStatus);

module.exports = router;
