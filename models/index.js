// // import all models
// const Post = require("./post");
// const Category = require("./category");
// const User = require("./user");

// use above as reference for how to set up foreign key relationships betweem

// Post, Category and User models
// consider adding more later.

const Post = require('./post');
const Category = require('./category');
const User = require('./user');

Post.BelongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.HasMany(Post, {
    foreignKey: 'user_id'
});

Post.BelongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
});

Category.HasMany(Post, {
    foreignKey: 'category_id',
    as: 'posts'
});

module.exports = {Post, Category, User};