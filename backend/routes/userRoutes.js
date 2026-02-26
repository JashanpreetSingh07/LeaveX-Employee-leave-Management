const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('Admin'), getUsers)
    .post(protect, authorize('Admin'), createUser);

router.route('/:id')
    .put(protect, authorize('Admin'), updateUserRole)
    .delete(protect, authorize('Admin'), deleteUser);

module.exports = router;
