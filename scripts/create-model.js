const fs = require("fs");
const path = require("path");

const name = process.argv[2];

if (!name) {
  console.error("Usage: npm run create:model -- <name>");
  process.exit(1);
}

const modelName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
const filePath = path.join(__dirname, "..", "models", `${modelName}.js`);

if (fs.existsSync(filePath)) {
  console.error(`Model already exists: models/${modelName}.js`);
  process.exit(1);
}

const content = `const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const ${modelName} = sequelize.define("${modelName}", {
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

module.exports = ${modelName};
`;

fs.writeFileSync(filePath, content);
console.log(`Created models/${modelName}.js`);
