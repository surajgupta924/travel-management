const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', testimonialController.getTestimonials);
router.get('/admin/all', protect, authorize('admin', 'agent'), testimonialController.getAllTestimonials);
router.post('/', protect, authorize('admin', 'agent'), testimonialController.createTestimonial);
router.put('/:id', protect, authorize('admin', 'agent'), testimonialController.updateTestimonial);
router.delete('/:id', protect, authorize('admin'), testimonialController.deleteTestimonial);

module.exports = router;
