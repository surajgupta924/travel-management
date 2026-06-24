const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
    description: { type: String, required: true },
    address: { type: String, required: true },
    starRating: { type: Number, min: 1, max: 5, default: 3 },
    pricePerNight: { type: Number, required: true, min: 0 },
    amenities: [{ type: String }],
    image: { type: String, default: '' },
    contactPhone: { type: String, default: '' },
    contactEmail: { type: String, default: '' },
    totalRooms: { type: Number, default: 10 },
    availableRooms: { type: Number, default: 10 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);
