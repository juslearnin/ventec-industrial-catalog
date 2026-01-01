const Enquiry = require('./../models/enquiryModel');
const sendEmail = require('./../utils/email');

exports.createEnquiry = async (req, res, next) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);

    const message = `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`;
    
    // Attempt to send email, but don't crash if it fails
    try {
      await sendEmail({
        email: process.env.EMAIL_FROM || 'admin@comvent.com',
        subject: 'New Web Enquiry',
        message
      });
    } catch (err) {
      console.log('Email failed, but enquiry saved.');
    }

    res.status(201).json({
      status: 'success',
      message: 'Enquiry received successfully!',
      data: { enquiry: newEnquiry }
    });
  } catch (err) {
    next(err);
  }
};