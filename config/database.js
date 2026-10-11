const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("supplies_db", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false
});

module.exports = sequelize;