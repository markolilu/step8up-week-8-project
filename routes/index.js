const router = require('express').Router();

const userRoutes = require('./user');
const postRoutes = require('./post');
const categoryRoutes = require('./category');

router.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/categories', categoryRoutes);

module.exports = router;