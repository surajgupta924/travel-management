const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    tourPackage: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage' },
    inquiryType: {
      type: String,
      enum: ['general', 'visa', 'quote', 'callback', 'corporate'],
      default: 'general',
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved', 'closed'],
      default: 'new',
    },
    response: { type: String, default: '' },
    handledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
