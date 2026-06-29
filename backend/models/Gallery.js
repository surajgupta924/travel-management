const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ['destinations', 'culture', 'wildlife', 'hotels', 'adventure'],
      default: 'destinations',
    },
    caption: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
