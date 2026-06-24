const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', destinationController.getDestinations);
router.get('/:id', destinationController.getDestination);
router.post('/', protect, authorize('admin', 'agent'), destinationController.createDestination);
router.put('/:id', protect, authorize('admin', 'agent'), destinationController.updateDestination);
router.delete('/:id', protect, authorize('admin'), destinationController.deleteDestination);

module.exports = router;
