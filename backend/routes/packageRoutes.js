const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', packageController.getPackages);
router.get('/:id', packageController.getPackage);
router.post('/', protect, authorize('admin', 'agent'), packageController.createPackage);
router.put('/:id', protect, authorize('admin', 'agent'), packageController.updatePackage);
router.delete('/:id', protect, authorize('admin'), packageController.deletePackage);

module.exports = router;
