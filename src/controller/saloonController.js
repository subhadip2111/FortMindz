const Saloon = require("../models/Saloon");

// Get saloons by beautician ID
exports.getSaloonsByBeautician = async (req, res) => {
  try {
    const saloons = await Saloon.find({ beautician: req.params.beauticianId })
      .populate("services") // Populate services array
      .exec();
    res.json(saloons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all saloons
exports.getAllSaloons = async (req, res) => {
  try {
    const saloons = await Saloon.find()
      .populate("beautician")
      .populate("services")
      .exec();
    return res.status(200).json(saloons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get saloon by ID
exports.getSaloonById = async (req, res) => {
  try {
    const saloon = await Saloon.findById(req.params.saloonId).populate(
      "services"
    );
    if (!saloon) {
      return res.status(404).json({ message: "Saloon not found" });
    }
    return res.status(200).json(saloon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
