require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../backend/config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Add a flag to track if DB is connected
let dbConnected = false;

// Middleware to check DB connection
app.use((req, res, next) => {
    if (!dbConnected && req.path !== '/') {
        return res.status(503).json({ message: 'Database not connected yet. Please try again.' });
    }
    next();
});

// Connect to Database immediately
(async () => {
    try {
        await connectDB();
        dbConnected = true;
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Failed to connect to database:', error.message);
    }
})();

// Routes
app.use('/api/auth', require('../backend/routes/authRoutes'));
app.use('/api/leaves', require('../backend/routes/leaveRoutes'));
app.use('/api/reimbursements', require('../backend/routes/reimbursementRoutes'));
app.use('/api/users', require('../backend/routes/userRoutes'));

// Basic Route
app.get('/', (req, res) => {
    if (dbConnected) {
        res.send('API is running and database is connected...');
    } else {
        res.send('API is running but database is still connecting...');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: err.message || 'Internal server error' });
});

module.exports = app;
