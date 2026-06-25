const mongoose = require('mongoose');

const checkDB = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database is not connected. Please verify MongoDB credentials in backend/.env',
    });
  }
  next();
};

module.exports = checkDB;
