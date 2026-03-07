const app = require('express').Router();
const { Category } = require('../models');

app.post('/', async (req, res) => {
    try {
        const {category_name} = req.body;
        const categoryData = await Category.create({category_name});
        res.json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll();
        res.json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/:id', async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id);
        if (!categoryData) {
            res.status(404).json({ message: 'No category found with this id!' });
            return;
        }
        res.json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.put('/:id', async (req, res) => {
    try {
        const {category_name} = req.body;
        const categoryData = await Category.update(
            {category_name},
            {where: {id: req.params.id}}
        );
        res.json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const categoryData = await Category.destroy({where: {id: req.params.id}});
        res.json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = app;