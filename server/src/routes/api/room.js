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
router.post('/', RoomControllerPolicy.createUpdate, RoomController.create)
router.delete('/:id', RoomController.delete)
router.get('/', RoomController.get)
router.patch('/:id', RoomControllerPolicy.createUpdate, RoomController.update)

module.exports = router;