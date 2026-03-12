const sequelize = require("../config/connections");

const { Post, User, Category } = require("../models");


const userData = require("./users.json");
const categoryData = require("./categories.json");
const postData = require("./posts.json");


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {individualHooks: true});
  await Category.bulkCreate(categoryData);
  await Post.bulkCreate(postData);


  process.exit(0);
};

seedDatabase();