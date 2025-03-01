const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const router = express.Router();

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Expect token as "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Save the decoded user info to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
}

// Example of a protected route
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;