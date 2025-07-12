const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Get all reviews for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const db = req.app.locals.db;
    
    const [reviews] = await db.execute(
      `SELECT r.*, 
              reviewer.name as reviewerName 
       FROM reviews r 
       LEFT JOIN users reviewer ON r.reviewerId = reviewer.id 
       WHERE r.reviewedId = ?
       ORDER BY r.createdAt DESC`,
      [userId]
    );
    
    res.json({ reviews });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Create a new review
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { rating, comment, isAnonymous, reviewedId, swapId } = req.body;
    const db = req.app.locals.db;
    
    if (!rating || !reviewedId || !swapId) {
      return res.status(400).json({ error: 'Rating, reviewed user ID, and swap ID are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    // Check if user is reviewing themselves
    if (parseInt(reviewedId) === req.user.userId) {
      return res.status(400).json({ error: 'Cannot review yourself' });
    }
    
    // Check if swap exists and user participated in it
    const [swaps] = await db.execute(
      'SELECT * FROM swaps WHERE id = ? AND (senderId = ? OR receiverId = ?) AND status = "completed"',
      [swapId, req.user.userId, req.user.userId]
    );
    
    if (swaps.length === 0) {
      return res.status(404).json({ error: 'Swap not found or not completed' });
    }
    
    // Check if user already reviewed this swap
    const [existingReviews] = await db.execute(
      'SELECT * FROM reviews WHERE swapId = ? AND reviewerId = ?',
      [swapId, req.user.userId]
    );
    
    if (existingReviews.length > 0) {
      return res.status(400).json({ error: 'You have already reviewed this swap' });
    }
    
    // Create the review
    const [result] = await db.execute(
      'INSERT INTO reviews (rating, comment, isAnonymous, reviewerId, reviewedId, swapId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [rating, comment || null, isAnonymous || false, req.user.userId, reviewedId, swapId]
    );
    
    // Update the reviewed user's average rating
    const [reviews] = await db.execute(
      'SELECT AVG(rating) as avgRating FROM reviews WHERE reviewedId = ?',
      [reviewedId]
    );
    
    const avgRating = parseFloat(reviews[0].avgRating).toFixed(2);
    
    await db.execute(
      'UPDATE users SET rating = ? WHERE id = ?',
      [avgRating, reviewedId]
    );
    
    res.status(201).json({ 
      message: 'Review created successfully',
      reviewId: result.insertId
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

module.exports = router; 