const express = require('express');
const router = express.Router();

const {
  getDoctors
} = require('../controllers/doctor.controller');


router.get('/', getDoctors);


module.exports = router;