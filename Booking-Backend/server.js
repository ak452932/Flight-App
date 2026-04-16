import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // dotenv import zaroori hai production ke liye
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middlewares - Isse Vercel aur Render ke beech security block nahi hogi
app.use(cors({
  origin: "*", // production mein ye allow karna zaroori hai
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

// Basic Health Check - Isse Render ko pata chalta hai ki server zinda hai
app.get('/', (req, res) => res.send('API is running successfully!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
