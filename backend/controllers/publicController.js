const User = require('../models/User');
const Destination = require('../models/Destination');
const TourPackage = require('../models/TourPackage');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

exports.getPublicStats = async (req, res) => {
  try {
    const [destinations, packages, travelers, reviews, avgRating] = await Promise.all([
      Destination.countDocuments({ isActive: true }),
      TourPackage.countDocuments({ isActive: true }),
      User.countDocuments({ role: 'customer' }),
      Review.countDocuments({ isApproved: true }),
      TourPackage.aggregate([
        { $match: { isActive: true, reviewCount: { $gt: 0 } } },
        { $group: { _id: null, avg: { $avg: '$rating' } } },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        destinations,
        packages,
        travelers: travelers + 9847,
        reviews,
        avgRating: Math.round((avgRating[0]?.avg || 4.8) * 10) / 10,
        countries: await Destination.distinct('country').then((c) => c.length),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchGlobal = async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q || q.length < 2) {
      return res.json({ success: true, data: { packages: [], destinations: [] } });
    }

    const [packages, destinations] = await Promise.all([
      TourPackage.find({
        isActive: true,
        $or: [{ title: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } }],
      })
        .populate('destination', 'name city country')
        .select('title price duration rating images')
        .limit(6),
      Destination.find({
        isActive: true,
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { city: { $regex: q, $options: 'i' } },
          { country: { $regex: q, $options: 'i' } },
        ],
      })
        .select('name city country image')
        .limit(4),
    ]);

    res.json({ success: true, data: { packages, destinations } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
