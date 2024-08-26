const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware'); 
const UserController = require('../controllers/userController');

router.get('/info', authenticateToken, UserController.getUserInfo);

module.exports = router;
