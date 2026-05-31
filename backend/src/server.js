const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Test Route
app.get('/api/health', (req, res) => {
    res.json({ message: 'CampusVault API is running perfectly' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.message.includes('Invalid file type')) {
        return res.status(400).json({ message: err.message });
    }
    if (err.message.includes('File too large')) {
        return res.status(400).json({ message: 'File is too large. Max size is 50MB.' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
