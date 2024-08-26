const otpService = require('../services/otpServices');
const User = require('../models/User');

exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const otp = otpService.generateOtp();
        await otpService.sendOtp(email, otp);

        res.status(200).json({ msg: 'OTP sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const isValidOtp = otpService.verifyOtp(email, otp);
        if (!isValidOtp) {
            return res.status(400).json({ msg: 'Invalid or expired OTP' });
        }

        res.status(200).json({ msg: 'OTP verified' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
