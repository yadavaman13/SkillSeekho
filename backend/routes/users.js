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

// Get all users (public profiles only)
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const [users] = await db.execute(
      'SELECT id, name, location, bio, rating, totalSwaps, createdAt FROM users WHERE isPublic = 1'
    );
    
    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.app.locals.db;
    
    const [users] = await db.execute(
      'SELECT id, name, location, bio, rating, totalSwaps, createdAt FROM users WHERE id = ? AND isPublic = 1',
      [id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user: users[0] });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, location, bio, isPublic } = req.body;
    const db = req.app.locals.db;
    
    const [result] = await db.execute(
      'UPDATE users SET name = ?, location = ?, bio = ?, isPublic = ?, updatedAt = NOW() WHERE id = ?',
      [name, location, bio, isPublic, req.user.userId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user's skills
router.get('/:id/skills', async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.app.locals.db;
    
    const [skills] = await db.execute(
      'SELECT * FROM skills WHERE userId = ?',
      [id]
    );
    
    res.json({ skills });
  } catch (error) {
    console.error('Get user skills error:', error);
    res.status(500).json({ error: 'Failed to fetch user skills' });
  }
});

// Get user's swap history
router.get('/:id/swaps', async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.app.locals.db;
    
    const [swaps] = await db.execute(
      `SELECT s.*, 
              sender.name as senderName, 
              receiver.name as receiverName 
       FROM swaps s 
       LEFT JOIN users sender ON s.senderId = sender.id 
       LEFT JOIN users receiver ON s.receiverId = receiver.id 
       WHERE s.senderId = ? OR s.receiverId = ?`,
      [id, id]
    );
    
    res.json({ swaps });
  } catch (error) {
    console.error('Get user swaps error:', error);
    res.status(500).json({ error: 'Failed to fetch user swaps' });
  }
});

module.exports = router; 