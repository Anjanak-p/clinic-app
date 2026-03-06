const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Service = require('./models/Service');
const Doctor = require('./models/Doctor');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/clinicdb';

const services = [
  {
    name: 'General Dentistry',
    description: 'Comprehensive oral health care including checkups, cleanings, fillings, and preventive treatments to maintain your dental health.',
  },
  {
    name: 'Teeth Whitening',
    description: 'Professional-grade whitening treatments to brighten your smile by several shades, safely and effectively.',
  },
  {
    name: 'Orthodontics',
    description: 'Braces and aligners to straighten teeth, correct bite issues, and improve your smile and oral function.',
  },
  {
    name: 'Dental Implants',
    description: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth for a lifetime.',
  },
  {
    name: 'Root Canal Therapy',
    description: 'Advanced endodontic treatment to save infected or severely damaged teeth, relieving pain and preserving your natural smile.',
  },
  {
    name: 'Pediatric Dentistry',
    description: 'Specialized dental care for children in a fun, comfortable environment to build positive dental habits from an early age.',
  },
];

const doctors = [
  {
    name: 'Dr. Sarah Mitchell',
    specialization: 'General & Cosmetic Dentistry',
    description: 'Dr. Mitchell brings over 15 years of expertise in cosmetic and restorative dentistry. She is passionate about creating beautiful, healthy smiles with a gentle touch.',
    photo: 'https://i.pravatar.cc/300?img=47',

  },
  {
    name: 'Dr. James Okonkwo',
    specialization: 'Orthodontics',
    description: 'A board-certified orthodontist specializing in clear aligners and traditional braces. Dr. Okonkwo has helped over 3,000 patients achieve their dream smiles.',
    photo: 'https://i.pravatar.cc/300?img=12',

  },
  {
    name: 'Dr. Priya Nair',
    specialization: 'Endodontics & Implantology',
    description: 'Specialist in root canal therapy and dental implants. Dr. Nair uses the latest techniques to ensure pain-free procedures with exceptional results.',
    photo: 'https://i.pravatar.cc/300?img=45',

  },
  {
    name: 'Dr. Carlos Rivera',
    specialization: 'Pediatric Dentistry',
    description: 'Dr. Rivera has a special gift for making children feel at ease. His fun, patient approach helps kids develop healthy dental habits that last a lifetime.',
    photo: 'https://i.pravatar.cc/300?img=14',

  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Service.deleteMany({});
    await Doctor.deleteMany({});

    await Service.insertMany(services);
    await Doctor.insertMany(doctors);

    console.log(' Seed data inserted successfully!');
    console.log(`   - ${services.length} services`);
    console.log(`   - ${doctors.length} doctors`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
