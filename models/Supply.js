const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Supply = sequelize.define("Supply", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING
  },
  supplier: {
    type: DataTypes.STRING
  },
  stock: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.DECIMAL(10, 2)
  }
});

module.exports = Supply;
