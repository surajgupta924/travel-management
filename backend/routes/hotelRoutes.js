const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', hotelController.getHotels);
router.get('/:id', hotelController.getHotel);
router.post('/', protect, authorize('admin', 'agent'), hotelController.createHotel);
router.put('/:id', protect, authorize('admin', 'agent'), hotelController.updateHotel);
router.delete('/:id', protect, authorize('admin'), hotelController.deleteHotel);

module.exports = router;
