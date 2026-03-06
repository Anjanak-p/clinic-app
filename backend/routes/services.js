const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const {
  getAllServices
} = require('../controllers/service.controller');


router.get('/', getAllServices);


module.exports = router;