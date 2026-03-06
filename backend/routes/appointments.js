const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus
} = require('../controllers/appointment.controller');


router.post('/', createAppointment);

router.get('/', authMiddleware, getAppointments);

router.patch('/:id/status', authMiddleware, updateAppointmentStatus);

module.exports = router;