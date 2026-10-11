const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Device = sequelize.define("Device", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  c1: {
    type: DataTypes.STRING
  },
  c2: {
    type: DataTypes.STRING
  },
  c3: {
    type: DataTypes.STRING
  },
  c4: {
    type: DataTypes.STRING
  },
  c5: {
    type: DataTypes.STRING
  }
});

module.exports = Device;
