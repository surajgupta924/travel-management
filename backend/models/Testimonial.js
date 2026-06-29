const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: 'Traveler' },
    location: { type: String, default: '' },
    text: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    avatar: { type: String, default: '' },
    image: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
