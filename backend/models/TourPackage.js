const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
    description: { type: String, required: true },
    duration: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    maxGroupSize: { type: Number, default: 20 },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'challenging'],
      default: 'easy',
    },
    category: {
      type: String,
      enum: ['adventure', 'cultural', 'beach', 'wildlife', 'luxury', 'budget', 'honeymoon', 'pilgrimage'],
      default: 'cultural',
    },
    tourType: {
      type: String,
      enum: ['domestic', 'international'],
      default: 'international',
    },
    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      },
    ],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    images: [{ type: String }],
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    startDates: [{ type: Date }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TourPackage', tourPackageSchema);
