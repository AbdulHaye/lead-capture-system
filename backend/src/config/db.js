const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./leads.db",
  logging: false,
});

module.exports = sequelize;
