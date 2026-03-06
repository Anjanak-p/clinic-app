const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialization: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, default: '' }
  },
  { timestamps: true }
); 

module.exports = mongoose.model('Doctor', doctorSchema);
