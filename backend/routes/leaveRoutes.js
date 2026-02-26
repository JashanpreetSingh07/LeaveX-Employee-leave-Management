const express = require('express');
const router = express.Router();
const { getLeaves, applyLeave, updateLeaveStatus } = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getLeaves)
    .post(protect, applyLeave);

router.route('/:id')
    .put(protect, authorize('Manager', 'Admin'), updateLeaveStatus);

module.exports = router;
