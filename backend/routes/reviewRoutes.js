const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', reviewController.getReviews);
router.post('/', protect, reviewController.createReview);
router.delete('/:id', protect, authorize('admin'), reviewController.deleteReview);

module.exports = router;
