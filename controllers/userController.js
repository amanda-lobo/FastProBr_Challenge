const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const authenticateToken = require('../middleware/auth');
const starWarsService = require('../service/starWarsService');

router.get('/users', userService.getAllUsers);
router.post('/users', userService.createUser);
router.post('/login', userService.loginUser);
router.get('/starwars-data', authenticateToken, starWarsService.getData);

module.exports = router;
