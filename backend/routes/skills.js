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

// Get all skills
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const [skills] = await db.execute(
      'SELECT s.*, u.name as userName, u.location FROM skills s JOIN users u ON s.userId = u.id WHERE u.isPublic = 1'
    );
    
    res.json({ skills });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Get skills by type (offered/wanted)
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const db = req.app.locals.db;
    
    if (!['offered', 'wanted'].includes(type)) {
      return res.status(400).json({ error: 'Invalid skill type' });
    }
    
    const [skills] = await db.execute(
      'SELECT s.*, u.name as userName, u.location FROM skills s JOIN users u ON s.userId = u.id WHERE s.type = ? AND u.isPublic = 1',
      [type]
    );
    
    res.json({ skills });
  } catch (error) {
    console.error('Get skills by type error:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Get user's own skills
router.get('/my-skills', authenticateToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const [skills] = await db.execute(
      'SELECT * FROM skills WHERE userId = ?',
      [req.user.userId]
    );
    
    res.json({ skills });
  } catch (error) {
    console.error('Get my skills error:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Add a new skill
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, type, availability, description, level } = req.body;
    const db = req.app.locals.db;
    
    if (!name || !type || !['offered', 'wanted'].includes(type)) {
      return res.status(400).json({ error: 'Name and valid type are required' });
    }
    
    const [result] = await db.execute(
      'INSERT INTO skills (name, type, availability, description, level, userId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [name, type, availability || null, description || null, level || 'intermediate', req.user.userId]
    );
    
    const [newSkill] = await db.execute(
      'SELECT * FROM skills WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json({ 
      message: 'Skill added successfully',
      skill: newSkill[0]
    });
  } catch (error) {
    console.error('Add skill error:', error);
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

// Update a skill
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, availability, description, level } = req.body;
    const db = req.app.locals.db;
    
    // Check if skill belongs to user
    const [existingSkills] = await db.execute(
      'SELECT * FROM skills WHERE id = ? AND userId = ?',
      [id, req.user.userId]
    );
    
    if (existingSkills.length === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    const [result] = await db.execute(
      'UPDATE skills SET name = ?, type = ?, availability = ?, description = ?, level = ?, updatedAt = NOW() WHERE id = ? AND userId = ?',
      [name, type, availability, description, level, id, req.user.userId]
    );
    
    res.json({ message: 'Skill updated successfully' });
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

// Delete a skill
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.app.locals.db;
    
    // Check if skill belongs to user
    const [existingSkills] = await db.execute(
      'SELECT * FROM skills WHERE id = ? AND userId = ?',
      [id, req.user.userId]
    );
    
    if (existingSkills.length === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    await db.execute(
      'DELETE FROM skills WHERE id = ? AND userId = ?',
      [id, req.user.userId]
    );
    
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

// Search skills
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const db = req.app.locals.db;
    
    const [skills] = await db.execute(
      'SELECT s.*, u.name as userName, u.location FROM skills s JOIN users u ON s.userId = u.id WHERE (s.name LIKE ? OR s.description LIKE ?) AND u.isPublic = 1',
      [`%${query}%`, `%${query}%`]
    );
    
    res.json({ skills });
  } catch (error) {
    console.error('Search skills error:', error);
    res.status(500).json({ error: 'Failed to search skills' });
  }
});

module.exports = router; 