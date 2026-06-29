const Notification = require('../models/Notification');

const createNotification = async ({ userId, title, message, type = 'system', link = '' }) => {
  try {
    await Notification.create({ user: userId, title, message, type, link });
  } catch (err) {
    console.error('Notification error:', err.message);
  }
};

module.exports = createNotification;
