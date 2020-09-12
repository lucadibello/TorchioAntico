// Require modules
const express = require('express');
const AuthControllerPolicy = require('../../policies/AuthControllerPolicy')

// Get router
const router = express.Router()
const AuthController = require('../../controllers/AuthController')

// Login user
router.post('/', AuthControllerPolicy.login, AuthController.login);
router.post('/alive', AuthControllerPolicy.isAlive, AuthController.isAlive);


module.exports = router;