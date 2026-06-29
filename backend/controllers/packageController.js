const TourPackage = require('../models/TourPackage');
const Review = require('../models/Review');
const { paginate, paginatedResponse } = require('../utils/paginate');

exports.getPackages = async (req, res) => {
  try {
    const { destination, category, minPrice, maxPrice, featured, search, difficulty, sort } = req.query;
    const { page, limit, skip } = paginate(req.query.page, req.query.limit);
    const filter = { isActive: true };
    if (destination) filter.destination = destination;
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (featured === 'true') filter.isFeatured = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = { isFeatured: -1, rating: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    if (sort === 'price-desc') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'duration') sortOption = { duration: 1 };

    const [packages, total] = await Promise.all([
      TourPackage.find(filter)
        .populate('destination', 'name city country image')
        .populate('hotel', 'name starRating pricePerNight')
        .sort(sortOption)
        .skip(skip)
        .limit(limit),
      TourPackage.countDocuments(filter),
    ]);

    res.json({ ...paginatedResponse(packages, total, page, limit), count: packages.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPackage = async (req, res) => {
  try {
    const pkg = await TourPackage.findById(req.params.id)
      .populate('destination')
      .populate('hotel')
      .populate('createdBy', 'name email');
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    const reviews = await Review.find({ tourPackage: pkg._id, isApproved: true })
      .populate('user', 'name avatar')
      .sort('-createdAt')
      .limit(10);
    res.json({ success: true, data: { package: pkg, reviews } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const pkg = await TourPackage.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const pkg = await TourPackage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    res.json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const pkg = await TourPackage.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    res.json({ success: true, message: 'Package deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
