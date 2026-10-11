const { Sequelize } = require("sequelize");
const inquirer = require("inquirer");
const sequelize = require("./config/database.js");
require("./models/User.js");
require("./models/Product.js");
require("./models/Category.js");
require("./models/Order.js");
require("./models/Supplier.js");
require("./models/Device.js");
require("./models/Supply.js");

const databaseName = "supplies_db";
const rootSequelize = new Sequelize("", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false
});

async function createDatabase() {
  const { createDb } = await inquirer.prompt([
    {
      type: "confirm",
      name: "createDb",
      message: `Database '${databaseName}' may not exist. Create it?`,
      default: true
    }
  ]);

  if (createDb) {
    await rootSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
    console.log("Database created (if it did not exist).");
  }
}

async function migrate() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  console.log("Database synchronized with Supply schema.");
}

createDatabase()
  .then(migrate)
  .catch((error) => {
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await rootSequelize.close();
    await sequelize.close();
  });
