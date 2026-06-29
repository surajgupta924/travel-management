const Booking = require('../models/Booking');
const TourPackage = require('../models/TourPackage');
const createNotification = require('../utils/createNotification');

exports.getBookings = async (req, res) => {
  try {
    const { status, paymentStatus } = req.query;
    const filter = {};

    if (req.user.role === 'customer') {
      filter.user = req.user._id;
    }
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const bookings = await Booking.find(filter)
      .populate('user', 'name email phone')
      .populate({
        path: 'tourPackage',
        populate: { path: 'destination', select: 'name city country image' },
      })
      .populate('handledBy', 'name email')
      .sort('-createdAt');

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate({
        path: 'tourPackage',
        populate: [{ path: 'destination' }, { path: 'hotel' }],
      })
      .populate('handledBy', 'name email');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (req.user.role === 'customer' && booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { tourPackage, travelDate, numberOfTravelers, specialRequests, travelers } = req.body;

    const pkg = await TourPackage.findById(tourPackage);
    if (!pkg || !pkg.isActive) {
      return res.status(404).json({ success: false, message: 'Tour package not found' });
    }

    const totalAmount = pkg.price * numberOfTravelers;

    const booking = await Booking.create({
      user: req.user._id,
      tourPackage,
      travelDate,
      numberOfTravelers,
      totalAmount,
      specialRequests: specialRequests || '',
      travelers: travelers || [],
    });

    const populated = await Booking.findById(booking._id)
      .populate('user', 'name email')
      .populate({
        path: 'tourPackage',
        populate: { path: 'destination', select: 'name city country' },
      });

    await createNotification({
      userId: req.user._id,
      title: 'Booking Created',
      message: `Your booking ${booking.bookingReference} is pending confirmation.`,
      type: 'booking',
      link: '/bookings',
    });

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { status, paymentStatus, notes, handledBy } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus, notes, handledBy },
      { new: true, runValidators: true }
    )
      .populate('user', 'name email')
      .populate('tourPackage', 'title price');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (req.user.role === 'customer' && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (['completed', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel this booking' });
    }

    booking.status = 'cancelled';
    booking.paymentStatus = booking.paymentStatus === 'paid' ? 'refunded' : booking.paymentStatus;
    await booking.save();

    res.json({ success: true, data: booking, message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { paymentMethod = 'card' } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (booking.paymentStatus === 'paid') {
      return res.status(400).json({ success: false, message: 'Already paid' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Cannot pay for cancelled booking' });
    }

    booking.paymentStatus = 'paid';
    booking.status = 'confirmed';
    booking.notes = booking.notes
      ? `${booking.notes}\nPaid via ${paymentMethod}`
      : `Paid via ${paymentMethod}`;
    await booking.save();

    await createNotification({
      userId: req.user._id,
      title: 'Payment Successful',
      message: `Payment of $${booking.totalAmount} confirmed for ${booking.bookingReference}.`,
      type: 'payment',
      link: '/bookings',
    });

    const populated = await Booking.findById(booking._id)
      .populate('user', 'name email')
      .populate({
        path: 'tourPackage',
        populate: { path: 'destination', select: 'name city country image' },
      });

    res.json({
      success: true,
      data: populated,
      message: 'Payment processed successfully',
      transactionId: `TXN-${Date.now().toString(36).toUpperCase()}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
