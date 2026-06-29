import { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext(null);
const MAX_COMPARE = 3;

export const CompareProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('compare_packages') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('compare_packages', JSON.stringify(items));
  }, [items]);

  const addToCompare = (pkg) => {
    if (items.find((i) => i._id === pkg._id)) return false;
    if (items.length >= MAX_COMPARE) return false;
    setItems([...items, pkg]);
    return true;
  };

  const removeFromCompare = (id) => setItems(items.filter((i) => i._id !== id));
  const clearCompare = () => setItems([]);
  const isInCompare = (id) => items.some((i) => i._id === id);

  return (
    <CompareContext.Provider value={{ items, addToCompare, removeFromCompare, clearCompare, isInCompare, max: MAX_COMPARE }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
