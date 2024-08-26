const otpGenerator = require('otp-generator');

exports.generateOtp = () => {
    return otpGenerator.generate(6, { upperCase: false, specialChars: false });
};

