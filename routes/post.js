const app = require('express').Router();
const { Post, Category, User } = require('../models');

app.post('/', async (req, res) => {
  try {
    const {title, content, createdOn, postedBy, category_id, user_id} = req.body;
    const postData = await Post.create({title, content, createdOn, postedBy, category_id, user_id});
    res.json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get('/', async (req, res) => {
  try {
    const where = {};
    if (req.query.category) {
        where.category_id = req.query.category;
    }

    const postData = await Post.findAll({
        where,
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['category_name']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    });
    res.json(postData);
    } catch (err) {
    res.status(500).json(err);
    }
});

app.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['category_name']
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.put('/:id', async (req, res) => {
    try {
        const {title, content, createdOn, postedBy, category_id, user_id} = req.body;
        const postData = await Post.update(
            {title, content, createdOn, postedBy, category_id, user_id},
            {where: {id: req.params.id}}
        );
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({where: {id: req.params.id}});
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = app;