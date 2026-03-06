const Appointment = require('../models/Appointment');


const createAppointment = async (req, res) => {
  try {
    const { patientName, email, phone, service, doctor, date, message } = req.body;

    if (!patientName || !email || !phone || !service || !doctor || !date) {
      return res.status(400).json({
        success: false,
        error: 'All required fields must be filled'
      });
    }

    const appointment = new Appointment({
      patientName,
      email,
      phone,
      service,
      doctor,
      date,
      message
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      data: appointment,
      message: 'Appointment booked successfully!'
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};


const getAppointments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Appointment.countDocuments();

    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus
};