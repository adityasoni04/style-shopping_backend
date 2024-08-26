const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: "adityasoni2140@gmail.com", 
        pass: "bcwo mgdm dmjv uits" 
    }
});

// Generate a new OTP
// exports.generateOtp = () => {
//     return otpGenerator.generate(6, { specialChars: false, upperCaseAlphabets: false, upperCaseAlphabets: false});
// };

exports.generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


exports.sendOtp = async (email) => {
    const otp = this.generateOtp();

    const mailOptions = {
        from: "adityasoni2140@gmail.com", 
        to: email,
        subject: 'Your OTP Code',
        html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 5 minutes.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);

        const user = await User.findOne({ email });
        console.log(user,"hejkvbrjhvbrj")
        if (!user) {
            throw new Error('User not found');
        }

        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000; 
        await user.save();

    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};

exports.verifyOtp = async (email, otp) => {
    try {
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return false;
        }

        user.otp = null;
        user.otpExpires = null;
        await user.save();

        return true;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw new Error('Failed to verify OTP');
    }
};
