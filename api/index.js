require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../backend/config/db');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('../backend/routes/authRoutes'));
app.use('/api/leaves', require('../backend/routes/leaveRoutes'));
app.use('/api/reimbursements', require('../backend/routes/reimbursementRoutes'));
app.use('/api/users', require('../backend/routes/userRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
