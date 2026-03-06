const Doctor = require('../models/Doctor');

// GET ALL DOCTORS
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      data: doctors
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


module.exports = {
  getDoctors
};