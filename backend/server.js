require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Track DB connection
let dbConnected = false;

// Middleware to check DB connection
app.use((req, res, next) => {
    if (!dbConnected && req.path !== '/') {
        return res.status(503).json({ message: 'Database not connected yet. Please try again.' });
    }
    next();
});

// Connect to Database
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
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leaves', require('./routes/leaveRoutes'));
app.use('/api/reimbursements', require('./routes/reimbursementRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

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

const PORT = process.env.PORT || 5000;

// When deployed on Vercel, we export the Express app instead of calling listen.
// Vercel will handle the HTTP server and invoke the app for each request.
if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
