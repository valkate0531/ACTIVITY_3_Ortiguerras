const express = require("express");
const path = require("path");
const { create } = require("express-handlebars");
const routes = require("./routes/index.js");
const sequelize = require("./config/database.js");

const app = express();
const PORT = 3000;
const handlebars = create({
  extname: ".xian",
  defaultLayout: false,
  partialsDir: path.join(__dirname, "views", "partials")
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine(".xian", handlebars.engine);
app.set("view engine", ".xian");
app.set("views", path.join(__dirname, "views"));
app.use("/", routes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MySQL connection failed:", error);
  }
})();