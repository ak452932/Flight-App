import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Signup Route: /api/auth/signup
router.post('/signup', signup);

// Login Route: /api/auth/login
router.post('/login', login);

export default router;
