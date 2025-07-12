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

// Get all swaps for current user
router.get('/my-swaps', authenticateToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const [swaps] = await db.execute(
      `SELECT s.*, 
              sender.name as senderName, 
              receiver.name as receiverName 
       FROM swaps s 
       LEFT JOIN users sender ON s.senderId = sender.id 
       LEFT JOIN users receiver ON s.receiverId = receiver.id 
       WHERE s.senderId = ? OR s.receiverId = ?
       ORDER BY s.createdAt DESC`,
      [req.user.userId, req.user.userId]
    );
    
    res.json({ swaps });
  } catch (error) {
    console.error('Get my swaps error:', error);
    res.status(500).json({ error: 'Failed to fetch swaps' });
  }
});

// Get swap by ID
router.get('/:id', authenticateToken, async (req, res) => {
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
       WHERE s.id = ? AND (s.senderId = ? OR s.receiverId = ?)`,
      [id, req.user.userId, req.user.userId]
    );
    
    if (swaps.length === 0) {
      return res.status(404).json({ error: 'Swap not found' });
    }
    
    res.json({ swap: swaps[0] });
  } catch (error) {
    console.error('Get swap error:', error);
    res.status(500).json({ error: 'Failed to fetch swap' });
  }
});

// Create a new swap request
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { skillGiven, skillTaken, message, scheduledDate, receiverId } = req.body;
    const db = req.app.locals.db;
    
    if (!skillGiven || !skillTaken || !receiverId) {
      return res.status(400).json({ error: 'Skill given, skill taken, and receiver ID are required' });
    }
    
    // Check if receiver exists
    const [receivers] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [receiverId]
    );
    
    if (receivers.length === 0) {
      return res.status(404).json({ error: 'Receiver not found' });
    }
    
    // Check if user is not sending to themselves
    if (parseInt(receiverId) === req.user.userId) {
      return res.status(400).json({ error: 'Cannot send swap request to yourself' });
    }
    
    const [result] = await db.execute(
      'INSERT INTO swaps (skillGiven, skillTaken, message, scheduledDate, senderId, receiverId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [skillGiven, skillTaken, message || null, scheduledDate || null, req.user.userId, receiverId]
    );
    
    const [newSwap] = await db.execute(
      `SELECT s.*, 
              sender.name as senderName, 
              receiver.name as receiverName 
       FROM swaps s 
       LEFT JOIN users sender ON s.senderId = sender.id 
       LEFT JOIN users receiver ON s.receiverId = receiver.id 
       WHERE s.id = ?`,
      [result.insertId]
    );
    
    res.status(201).json({ 
      message: 'Swap request created successfully',
      swap: newSwap[0]
    });
  } catch (error) {
    console.error('Create swap error:', error);
    res.status(500).json({ error: 'Failed to create swap request' });
  }
});

// Update swap status (accept/reject/complete)
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const db = req.app.locals.db;
    
    if (!['pending', 'accepted', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    // Check if swap exists and user is the receiver
    const [existingSwaps] = await db.execute(
      'SELECT * FROM swaps WHERE id = ? AND receiverId = ?',
      [id, req.user.userId]
    );
    
    if (existingSwaps.length === 0) {
      return res.status(404).json({ error: 'Swap not found or you are not authorized to update it' });
    }
    
    const swap = existingSwaps[0];
    
    // Only allow status updates if current status is pending
    if (swap.status !== 'pending' && status !== 'completed') {
      return res.status(400).json({ error: 'Can only update pending swaps or mark accepted swaps as completed' });
    }
    
    // If accepting, update both users' total swaps
    if (status === 'accepted') {
      await db.execute(
        'UPDATE users SET totalSwaps = totalSwaps + 1 WHERE id IN (?, ?)',
        [swap.senderId, swap.receiverId]
      );
    }
    
    // If completing, update completed date
    const completedDate = status === 'completed' ? new Date() : null;
    
    await db.execute(
      'UPDATE swaps SET status = ?, completedDate = ?, updatedAt = NOW() WHERE id = ?',
      [status, completedDate, id]
    );
    
    res.json({ message: 'Swap status updated successfully' });
  } catch (error) {
    console.error('Update swap status error:', error);
    res.status(500).json({ error: 'Failed to update swap status' });
  }
});

// Delete a swap (only sender can delete pending swaps)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.app.locals.db;
    
    // Check if swap exists and user is the sender
    const [existingSwaps] = await db.execute(
      'SELECT * FROM swaps WHERE id = ? AND senderId = ? AND status = "pending"',
      [id, req.user.userId]
    );
    
    if (existingSwaps.length === 0) {
      return res.status(404).json({ error: 'Swap not found or cannot be deleted' });
    }
    
    await db.execute(
      'DELETE FROM swaps WHERE id = ? AND senderId = ? AND status = "pending"',
      [id, req.user.userId]
    );
    
    res.json({ message: 'Swap deleted successfully' });
  } catch (error) {
    console.error('Delete swap error:', error);
    res.status(500).json({ error: 'Failed to delete swap' });
  }
});

// Get pending swap requests for current user
router.get('/pending/requests', authenticateToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const [swaps] = await db.execute(
      `SELECT s.*, 
              sender.name as senderName 
       FROM swaps s 
       LEFT JOIN users sender ON s.senderId = sender.id 
       WHERE s.receiverId = ? AND s.status = 'pending'
       ORDER BY s.createdAt DESC`,
      [req.user.userId]
    );
    
    res.json({ swaps });
  } catch (error) {
    console.error('Get pending requests error:', error);
    res.status(500).json({ error: 'Failed to fetch pending requests' });
  }
});

module.exports = router; 