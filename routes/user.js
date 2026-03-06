const router = require('express').Router();
const { User } = require('../models');
const { signToken, authMiddleware} = require('../utils/auth');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    const token = signToken(userData);
    res.json({ token, user: userData });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Read all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.getOne(req.params.id);
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.updateOne(req.params.id, req.body);
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.deleteOne(req.params.id);
    res.json(userData);
    } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const token = signToken(userData);
    res.json({ token, user: userData });
    } catch (err) {
    res.status(500).json(err);
    }
});

router.post("/logout", (req, res) => {
    res.status(204).end();
});

module.exports = router;