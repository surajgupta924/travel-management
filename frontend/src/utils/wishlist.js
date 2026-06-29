const KEY = 'travel_wishlist';

export const getWishlist = () => JSON.parse(localStorage.getItem(KEY) || '[]');

export const toggleWishlist = (packageId) => {
  const list = getWishlist();
  const exists = list.includes(packageId);
  const updated = exists ? list.filter((id) => id !== packageId) : [...list, packageId];
  localStorage.setItem(KEY, JSON.stringify(updated));
  return { list: updated, added: !exists };
};

export const isWishlisted = (packageId) => getWishlist().includes(packageId);
