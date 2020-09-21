// Require modules
const express = require('express');
const UserControllerPolicy = require('../../policies/UserControllerPolicy')

// Get router
const router = express.Router()
const UserController = require('../../controllers/UserController')

// Update user information
router.patch('/:email', UserControllerPolicy.update, UserController.update);


module.exports = router;