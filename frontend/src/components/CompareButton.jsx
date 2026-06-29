import { useState } from 'react';
import { FiLayers } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCompare } from '../context/CompareContext';

const CompareButton = ({ pkg, size = 'md' }) => {
  const { addToCompare, removeFromCompare, isInCompare, max, items } = useCompare();
  const active = isInCompare(pkg._id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (active) {
      removeFromCompare(pkg._id);
      toast.success('Removed from compare');
      return;
    }
    if (items.length >= max) {
      toast.error(`Compare up to ${max} packages only`);
      return;
    }
    if (addToCompare(pkg)) toast.success('Added to compare');
  };

  return (
    <button
      type="button"
      className={`compare-btn ${size} ${active ? 'active' : ''}`}
      onClick={handleClick}
      aria-label="Add to compare"
    >
      <FiLayers />
    </button>
  );
};

export default CompareButton;
