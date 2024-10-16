import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './routes/apiRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

//Connect Backend to Frontend using cors
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


// Use API routes
app.use('/api', apiRoutes);

// Use trip routes
app.use('/api/trips', tripRoutes);

// Basic route to check server status
app.get('/', (req, res) => {
    res.send('Fan Flights API is running');
});

// Server listening on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
