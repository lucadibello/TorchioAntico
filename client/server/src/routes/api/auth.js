// Require modules
const express = require('express');
const AuthControllerPolicy = require('../../policies/AuthControllerPolicy')

// Get router
const router = express.Router()
const AuthController = require('../../controllers/AuthController')

// Get JWT middleware
const JWT = require('../jwt')

// Login user
router.post('/login', AuthControllerPolicy.login, AuthController.login);
router.get('/user', JWT.authenticateToken, AuthController.getUser);
router.post('/alive', AuthControllerPolicy.isAlive, AuthController.isAlive);
router.get('/', AuthController.sample);


module.exports = router;