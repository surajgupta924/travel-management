const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', galleryController.getGallery);
router.get('/admin/all', protect, authorize('admin', 'agent'), galleryController.getAllGallery);
router.post('/', protect, authorize('admin', 'agent'), galleryController.createGallery);
router.put('/:id', protect, authorize('admin', 'agent'), galleryController.updateGallery);
router.delete('/:id', protect, authorize('admin'), galleryController.deleteGallery);

module.exports = router;
