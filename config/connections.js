require('dotenv').config();

const Sequelize = require('sequelize');

if (process.env.DB_PASSWORD === "ChangeME!") {
  console.error("Please change the DB_PASSWORD environment variable in your .env file.");
  process.exit(1);
}

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
        process.env.DB_DATABASE,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            port: process.env.DB_PORT,
        }
    );

module.exports = sequelize;