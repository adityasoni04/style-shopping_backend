const express = require('express');
const router = express.Router();
const { signup, login, forgotPassword, resetPassword, logout } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', verifyToken, logout);

//export
module.exports = router;
