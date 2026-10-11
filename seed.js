const sequelize = require("./config/database.js");
const User = require("./models/User.js");
const Product = require("./models/Product.js");
const Order = require("./models/Order.js");
const Category = require("./models/Category.js");
const Supplier = require("./models/Supplier.js");
const Supply = require("./models/Supply.js");

async function seed() {
  await sequelize.authenticate();

  const [user] = await User.findOrCreate({
    where: { email: "admin@example.com" },
    defaults: {
      name: "Admin",
      password: "123456",
      role: "admin",
      status: "active"
    }
  });

  const [category] = await Category.findOrCreate({
    where: { name: "Electronics" },
    defaults: {
      description: "Electronic devices and accessories",
      status: "active",
      createdBy: "Admin"
    }
  });

  const [supplier] = await Supplier.findOrCreate({
    where: { email: "supplier@example.com" },
    defaults: {
      companyName: "Sample Supplies Inc.",
      contactPerson: "Juan Dela Cruz",
      phone: "09123456789",
      address: "Manila, Philippines"
    }
  });

  const [product] = await Product.findOrCreate({
    where: { ProductName: "Wireless Keyboard" },
    defaults: {
      ProductName: "Wireless Keyboard",
      Description: "A sample wireless keyboard",
      Category: category.name,
      Price: 1299.99,
      Quantity: 25,
      ExpirationDate: "N/A"
    }
  });

  const [supply] = await Supply.findOrCreate({
    where: { name: "Office Stationery Kit" },
    defaults: {
      name: "Office Stationery Kit",
      category: "Office",
      supplier: supplier.companyName,
      stock: 40,
      price: 499.99
    }
  });

  await Order.findOrCreate({
    where: { orderNumber: "ORD-1001" },
    defaults: {
      total: product.Price,
      status: "pending",
      userId: user.id,
      productId: product.id
    }
  });

  console.log("Sample supply data inserted successfully.");
}

seed()
  .catch((error) => {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
