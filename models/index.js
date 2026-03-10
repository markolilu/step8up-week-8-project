const Post = require('./post');
const Category = require('./category');
const User = require('./user');

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
});

Category.hasMany(Post, {
    foreignKey: 'category_id',
    as: 'posts'
});

module.exports = {Post, Category, User};