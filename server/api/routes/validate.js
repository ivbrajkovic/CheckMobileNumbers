// Test mobile number

const express = require('express');
const router = express.Router();
const numberController = require('../controller/numberController');

// Test single number
router.get('/:number', numberController.checkNumber);

// Test multiple number in .csv file
router.post('/file', numberController.checkFile);

module.exports = router;
