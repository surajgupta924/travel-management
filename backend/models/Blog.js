const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    category: {
      type: String,
      enum: ['travel-tips', 'destination-guide', 'news', 'visa-guide'],
      default: 'travel-tips',
    },
    author: { type: String, default: 'TravelEase Team' },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
