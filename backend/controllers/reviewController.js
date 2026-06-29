const Review = require('../models/Review');
const TourPackage = require('../models/TourPackage');

const updatePackageRating = async (packageId) => {
  const reviews = await Review.find({ tourPackage: packageId, isApproved: true });
  const count = reviews.length;
  const avg = count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
  await TourPackage.findByIdAndUpdate(packageId, {
    rating: Math.round(avg * 10) / 10,
    reviewCount: count,
  });
};

exports.getReviews = async (req, res) => {
  try {
    const { tourPackage, all } = req.query;
    const filter = all === 'true' ? {} : { isApproved: true };
    if (tourPackage) filter.tourPackage = tourPackage;

    const reviews = await Review.find(filter)
      .populate('user', 'name avatar')
      .populate('tourPackage', 'title')
      .sort('-createdAt');

    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { tourPackage, rating, title, comment } = req.body;
    const review = await Review.create({
      user: req.user._id,
      tourPackage,
      rating,
      title,
      comment,
    });
    await updatePackageRating(tourPackage);
    const populated = await Review.findById(review._id).populate('user', 'name avatar');
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this package' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    const packageId = review.tourPackage;
    await review.deleteOne();
    await updatePackageRating(packageId);
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).populate('user', 'name avatar').populate('tourPackage', 'title');
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    await updatePackageRating(review.tourPackage._id || review.tourPackage);
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
