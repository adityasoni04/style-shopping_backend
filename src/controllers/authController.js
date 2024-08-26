const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const nodemailer = require('nodemailer');

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            email,
            password: await bcrypt.hash(password, 10),
        });

        await user.save();

        const token = generateToken(user.id);
        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = generateToken(user.id);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        const token = jwt.sign({ otp, email }, process.env.JWT_SECRET, { expiresIn: '10m' });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}.`
        });

        res.status(200).json({ message: 'OTP sent to email', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.resetPassword = async (req, res) => {
    const { otp, password } = req.body;

    try {
        const user = await User.findOne({ otp });

        if (!user) {
            console.log("no user");
            return res.status(404).json({ msg: 'Invalid or expired OTP' });
        }
        if (!password) {
            return res.status(400).json({ msg: 'New password is required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        console.error('Error in resetPassword:', err.message);
        res.status(500).send('Server Error');
    }
};


exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};