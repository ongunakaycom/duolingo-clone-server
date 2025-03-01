const express = require('express');
const authRoutes = require('./auth/auth');  // Correct import path
const protectedRoutes = require('./protectedRoute'); // Import protected routes

const app = express();

// Middleware
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

module.exports = app;