const express = require("express");
const userRoutes = require("./userRoutes.js");
const productRoutes = require("./productRoutes.js");
const orderRoutes = require("./orderRoutes.js");
const categoryRoutes = require("./categoryRoutes.js");
const supplierRoutes = require("./supplierRoutes.js");
const product = require("../controllers/productController.js");
const category = require("../controllers/categoryController.js");
const order = require("../controllers/orderController.js");
const user = require("../controllers/userController.js");
const supplier = require("../controllers/supplierController.js");
const DeviceController = require("../controllers/DeviceController.js");
const Device = require("../models/Device.js");
const Supply = require("../models/Supply.js");
const supply = require("../controllers/SupplyController.js");
const { insert } = require("../controllers/productController.js");

const router = express.Router();

router.get("/", supply.index);
router.get("/add", supply.add);
router.post("/insert", supply.insert);
router.get("/edit/:id", supply.edit);
router.post("/update", supply.update);
router.get("/delete/:id", supply.delete);

router.get("/supplies", async (req, res) => {
	const data = await Supply.findAll();
	res.json(data);
});

router.get("/product", product.index);
router.get("/product/:id", product.show);
router.post("/product", product.insert);

router.get("/category", category.index);
router.get("/category/:id", category.show);
router.post("/category", category.insert);

router.get("/order", order.index);
router.get("/order/:id", order.show);
router.post("/order", order.insert);

router.get("/user", user.index);
router.get("/user/:id", user.show);
router.post("/user", user.insert);

router.get("/supplier", supplier.index);
router.get("/supplier/:id", supplier.show);
router.post("/supplier", supplier.insert);


router.get("/devices", DeviceController.all);
router.post("/devices", DeviceController.insert);
router.get("/devices/:id", DeviceController.show);
router.put("/devices/:id", DeviceController.update);
router.delete("/devices/:id", DeviceController.delete);

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/product", productRoutes);
router.use("/orders", orderRoutes);
router.use("/categories", categoryRoutes);
router.use("/suppliers", supplierRoutes);

module.exports = router;
