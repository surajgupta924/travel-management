import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useCompare } from '../context/CompareContext';

const CompareBar = () => {
  const { items, removeFromCompare, clearCompare } = useCompare();

  if (items.length === 0) return null;

  return (
    <div className="compare-bar">
      <div className="container compare-bar-inner">
        <span className="compare-label">Compare ({items.length}/3)</span>
        <div className="compare-items">
          {items.map((p) => (
            <div key={p._id} className="compare-chip">
              {p.title}
              <button type="button" onClick={() => removeFromCompare(p._id)}><FiX /></button>
            </div>
          ))}
        </div>
        <div className="compare-actions">
          <button type="button" className="btn btn-sm" onClick={clearCompare}>Clear</button>
          <Link to="/compare" className="btn btn-primary btn-sm">Compare Now</Link>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
