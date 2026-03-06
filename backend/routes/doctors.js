const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const {
  getDoctors,
  createDoctor
} = require('../controllers/doctor.controller');


router.get('/', getDoctors);


module.exports = router;