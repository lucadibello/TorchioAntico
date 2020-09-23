// Require modules
const express = require('express');
const RoomControllerPolicy = require('../../policies/RoomControllerPolicy')

// Get router
const router = express.Router()
const RoomController = require('../../controllers/RoomController')

// Require JWT Token middleware
const JwtChecker = require('../jwt')

// Check JWT Token
router.use(JwtChecker.authenticateToken)

// Create room
router.post('/', RoomControllerPolicy.create, RoomController.create)

module.exports = router;