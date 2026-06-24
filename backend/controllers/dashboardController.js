const User = require('../models/User');
const Destination = require('../models/Destination');
const Hotel = require('../models/Hotel');
const TourPackage = require('../models/TourPackage');
const Booking = require('../models/Booking');
const Inquiry = require('../models/Inquiry');

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalDestinations,
      totalHotels,
      totalPackages,
      totalBookings,
      pendingBookings,
      totalRevenue,
      newInquiries,
    ] = await Promise.all([
      User.countDocuments({ role: 'customer' }),
      Destination.countDocuments({ isActive: true }),
      Hotel.countDocuments({ isActive: true }),
      TourPackage.countDocuments({ isActive: true }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      Inquiry.countDocuments({ status: 'new' }),
    ]);

    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .populate('tourPackage', 'title')
      .sort('-createdAt')
      .limit(5);

    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const topPackages = await TourPackage.find({ isActive: true })
      .populate('destination', 'name')
      .sort('-rating')
      .limit(5)
      .select('title rating reviewCount price destination');

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalDestinations,
          totalHotels,
          totalPackages,
          totalBookings,
          pendingBookings,
          totalRevenue: totalRevenue[0]?.total || 0,
          newInquiries,
        },
        recentBookings,
        bookingsByStatus,
        topPackages,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
