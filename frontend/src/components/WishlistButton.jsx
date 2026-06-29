import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { toggleWishlist, isWishlisted } from '../utils/wishlist';

const WishlistButton = ({ packageId, size = 'md' }) => {
  const [active, setActive] = useState(isWishlisted(packageId));

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { added } = toggleWishlist(packageId);
    setActive(added);
    toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  return (
    <button
      type="button"
      className={`wishlist-btn ${size} ${active ? 'active' : ''}`}
      onClick={handleClick}
      aria-label="Add to wishlist"
    >
      <FiHeart fill={active ? 'currentColor' : 'none'} />
    </button>
  );
};

export default WishlistButton;
