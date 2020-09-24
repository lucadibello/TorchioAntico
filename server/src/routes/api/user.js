// Require modules
const express = require('express');
const UserControllerPolicy = require('../../policies/UserControllerPolicy')

// Get router
const router = express.Router()
const UserController = require('../../controllers/UserController')

// Require JWT Token middleware
const JwtChecker = require('../jwt')

// Check JWT Token
router.use(JwtChecker.authenticateToken)

// Update user information
router.post('/', UserControllerPolicy.create, UserController.create);
router.patch('/:email', UserControllerPolicy.update, UserController.update);

// Export router
module.exports = router;