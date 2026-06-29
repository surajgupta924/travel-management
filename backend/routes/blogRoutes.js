const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', blogController.getBlogs);
router.get('/admin/all', protect, authorize('admin', 'agent'), blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);
router.post('/', protect, authorize('admin', 'agent'), blogController.createBlog);
router.put('/:id', protect, authorize('admin', 'agent'), blogController.updateBlog);
router.delete('/:id', protect, authorize('admin'), blogController.deleteBlog);

module.exports = router;
