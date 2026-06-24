const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    highlights: [{ type: String }],
    bestTimeToVisit: { type: String, default: '' },
    climate: { type: String, default: '' },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Destination', destinationSchema);
