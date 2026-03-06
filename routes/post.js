const app = require('express').Router();
const { Post } = require('../models');

app.post('/', async (req, res) => {
  try {
    const {title, content, createdOn, postedBy} = req.body;
    const postData = await Post.create({title, content, createdOn, postedBy});
    res.json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.json(postData);
    } catch (err) {
    res.status(500).json(err);
    }
});

app.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
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
        const {title, content, createdOn, postedBy} = req.body;
        const postData = await Post.update(
            {title, content, createdOn, postedBy},
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