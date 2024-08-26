const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require('../controllers/otpController');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/send-otp', rateLimiter, sendOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;
