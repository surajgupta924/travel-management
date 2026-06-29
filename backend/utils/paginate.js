const paginate = (page = 1, limit = 12) => {
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
  const skip = (p - 1) * l;
  return { page: p, limit: l, skip };
};

const paginatedResponse = (data, total, page, limit) => ({
  success: true,
  data,
  pagination: {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit) || 1,
    hasNext: page * limit < total,
    hasPrev: page > 1,
  },
});

module.exports = { paginate, paginatedResponse };
