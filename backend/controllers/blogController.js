const Blog = require('../models/Blog');
const { paginate, paginatedResponse } = require('../utils/paginate');

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

exports.getBlogs = async (req, res) => {
  try {
    const { category, search } = req.query;
    const { page, limit, skip } = paginate(req.query.page, req.query.limit);
    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort('-createdAt').skip(skip).limit(limit),
      Blog.countDocuments(filter),
    ]);

    res.json({ ...paginatedResponse(blogs, total, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort('-createdAt');
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    let blog = await Blog.findOne({ slug: req.params.id, isPublished: true });
    if (!blog && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findOne({ _id: req.params.id, isPublished: true });
    }
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const slug = req.body.slug || slugify(req.body.title);
    const blog = await Blog.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
