const express = require('express');
const enquiryController = require('./../controllers/enquiryController');

const router = express.Router();

router.route('/').post(enquiryController.createEnquiry);

module.exports = router;