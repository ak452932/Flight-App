import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';

// Load Environment Variables
dotenv.config();

const app = express();

// 1. Middlewares
// JSON body parser
app.use(express.json());

// CORS configuration (Deployment aur security ke liye optimized)
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 2. Database Connection Logic
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); // Failure par process stop karne ke liye
    }
};

// Database Connect karein
connectDB();

// 3. API Routes
app.use('/api/auth', authRoutes);

// 4. Health Check / Root Route
app.get('/', (req, res) => {
    res.status(200).send('MERN Auth API is running successfully!');
});

// 5. Global Error Handler (Optional but Recommended)
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// 6. Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
