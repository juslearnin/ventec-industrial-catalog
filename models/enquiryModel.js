const mongoose = require('mongoose');
const validator = require('validator');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: String,
  message: {
    type: String,
    required: [true, 'Please provide a message']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;