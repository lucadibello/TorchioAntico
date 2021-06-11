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

// Get API endpoints
router.get('/available/:start/:end',BookingControllerPolicy.getAvailables, BookingController.getAvailables) // Get available rooms in a certain timespan (used for booking checks)
router.get('/', BookingController.get) // Get all bookings
router.get('/monthly', BookingController.getMonthly) // Get all monthly bookings
router.get('/stats', BookingController.getStatistics) // Get all bookings statistics

// Post API endpoints
router.post('/',BookingControllerPolicy.add, BookingController.add)
// Delete API endpoints
router.delete('/:id', BookingController.delete)

// Export module
module.exports = router;