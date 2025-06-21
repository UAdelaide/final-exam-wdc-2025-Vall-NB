const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { response } = require('../../part1/app');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

// POST login (dummy version)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Get user info
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE email = ? AND password_hash = ?
    `, [email, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Session Login
    req.session.user = rows[0].user_id;
    req.session.username = rows[0].username;
    res.json({ message: 'Login successful', user: rows[0]});
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});


router.get('/test', async(req, res) => {
  res.send("Acknowledge");
});

router.get('/logout', async(req, res) => {
  req.session.destroy();
  res.send("Acknowledge");
});

// Getting List for q15
router.get('/userdogList', async (req, res) => {
  try {
    // Gets all dogs associated with user session
    const [rows] = await db.query(`
      SELECT Dogs.name, Dogs.dog_id FROM Dogs INNER JOIN Users ON
      Dogs.owner_id = Users.user_id WHERE Users.username = ?`, [req.session.username]);
    if (rows.length === 0) {
      // returns empty if no results
      res.status(200);
    }
    // Returns list
    response.send(rows);
  } catch (error) {
    res.status(500).json({ error: 'List Get Failed' });
  }
});

// Copied from part 1
router.get('/api/dogs', async (req, res) => {
  try {
    const [doglist] = await db.query('SELECT name AS dog_name, size, username AS owner_username FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id');
    response.send(doglist);
  } catch (error) {
    console.error("DB Error.");
  }
});

module.exports = router;
