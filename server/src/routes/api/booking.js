// Require modules
const express = require('express');
const BookingControllerPolicy = require('../../policies/BookingControllerPolicy')

// Get router
const router = express.Router()
const BookingController = require('../../controllers/BookingController')

// Require JWT Token middleware
const JwtChecker = require('../jwt')

// Check JWT Token
router.use(JwtChecker.authenticateToken)

// Get available rooms in a certain timespan (used for booking checks)
router.get('/available/:start/:end',BookingControllerPolicy.getAvailables, BookingController.getAvailables)

module.exports = router;