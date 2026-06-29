const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const { protect, authorize } = require('../middleware/auth');

router.post('/subscribe', newsletterController.subscribe);
router.get('/', protect, authorize('admin', 'agent'), newsletterController.getSubscribers);
router.delete('/:id', protect, authorize('admin'), newsletterController.deleteSubscriber);

module.exports = router;
