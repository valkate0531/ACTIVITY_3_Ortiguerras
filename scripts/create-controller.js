const fs = require("fs");
const path = require("path");

const name = process.argv[2];

if (!name) {
  console.error("Usage: npm run create:controller -- <name>");
  process.exit(1);
}

const controllerName = `${name.charAt(0).toUpperCase()}${name.slice(1)}Controller`;
const filePath = path.join(__dirname, "..", "controllers", `${controllerName}.js`);

if (fs.existsSync(filePath)) {
  console.error(`Controller already exists: controllers/${controllerName}.js`);
  process.exit(1);
}

const content = `exports.index = async (req, res) => {
  res.json({ message: "${controllerName} is working" });
};
`;

fs.writeFileSync(filePath, content);
console.log(`Created controllers/${controllerName}.js`);
