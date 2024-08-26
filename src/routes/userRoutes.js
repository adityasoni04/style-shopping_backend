const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware'); 
const {getUserInfo} = require("../controllers/userController")

router.get('/info', authenticateToken, getUserInfo);

module.exports = router;
