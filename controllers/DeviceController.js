const Device = require("../models/Device.js");

exports.insert = async (req, res) => {
  try {
    const { c1, c2, c3, c4, c5 } = req.body;
    const data = await Device.create({
      c1,
      c2,
      c3,
      c4,
      c5
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.all = async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.index = exports.all;

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { c1, c2, c3, c4, c5 } = req.body;
    const result = await Device.update(
      { c1, c2, c3, c4, c5 },
      { where: { id } }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Device.destroy({ where: { id } });
    res.json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.show = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (!device) return res.status(404).json({ message: "Device not found" });
    res.json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
