const Supply = require("../models/Supply.js");

exports.index = async (req, res) => {
  const data = await Supply.findAll({ order: [["id", "DESC"]] });
  res.render("index", { data: data.map((item) => item.toJSON()) });
};

exports.add = (req, res) => {
  res.render("add");
};

exports.edit = async (req, res) => {
  const data = await Supply.findByPk(req.params.id);
  if (!data) return res.status(404).send("Supply not found");
  res.render("edit", { data: data.toJSON() });
};

exports.insert = async (req, res) => {
  const { name, category, supplier, stock, price } = req.body;
  await Supply.create({ name, category, supplier, stock, price });
  res.redirect("/");
};

exports.update = async (req, res) => {
  const { id, name, category, supplier, stock, price } = req.body;
  await Supply.update(
    { name, category, supplier, stock, price },
    { where: { id } }
  );
  res.redirect("/");
};

exports.delete = async (req, res) => {
  await Supply.destroy({ where: { id: req.params.id } });
  res.redirect("/");
};
