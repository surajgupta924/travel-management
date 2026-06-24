const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, bookingController.getBookings);
router.get('/:id', protect, bookingController.getBooking);
router.post('/', protect, bookingController.createBooking);
router.put('/:id', protect, authorize('admin', 'agent'), bookingController.updateBooking);
router.put('/:id/cancel', protect, bookingController.cancelBooking);

module.exports = router;
