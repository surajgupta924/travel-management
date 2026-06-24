const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, authorize('admin', 'agent'), inquiryController.getInquiries);
router.post('/', inquiryController.createInquiry);
router.put('/:id', protect, authorize('admin', 'agent'), inquiryController.updateInquiry);
router.delete('/:id', protect, authorize('admin'), inquiryController.deleteInquiry);

module.exports = router;
