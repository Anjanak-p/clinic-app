const Service = require('../models/Service');


const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });

    res.json({
      success: true,
      data: services
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = {
  getAllServices
};