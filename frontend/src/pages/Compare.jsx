import { Link } from 'react-router-dom';
import { FiX, FiCheck, FiMinus } from 'react-icons/fi';
import { useCompare } from '../context/CompareContext';
import PageWrapper from '../components/PageWrapper';
import EmptyState from '../components/EmptyState';

const Compare = () => {
  const { items, removeFromCompare, clearCompare } = useCompare();

  const fields = [
    { key: 'price', label: 'Price', render: (p) => `$${p.price}` },
    { key: 'duration', label: 'Duration', render: (p) => `${p.duration} days` },
    { key: 'category', label: 'Category', render: (p) => p.category },
    { key: 'difficulty', label: 'Difficulty', render: (p) => p.difficulty },
    { key: 'rating', label: 'Rating', render: (p) => `★ ${p.rating || 'N/A'}` },
    { key: 'maxGroupSize', label: 'Max Group', render: (p) => p.maxGroupSize },
    { key: 'destination', label: 'Destination', render: (p) => `${p.destination?.city}, ${p.destination?.country}` },
  ];

  return (
    <PageWrapper>
      <div className="page-wrap">
        <div className="page-hero page-hero-large">
          <div className="container">
            <span className="section-tag">Compare</span>
            <h1>Package Comparison</h1>
            <p>Compare up to 3 tour packages side by side</p>
          </div>
        </div>
        <div className="container section">
          {items.length === 0 ? (
            <EmptyState message="No packages to compare. Add packages using the compare button.">
              <Link to="/packages" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Packages</Link>
            </EmptyState>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={clearCompare}>Clear All</button>
              </div>
              <div className="compare-table-wrap">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      {items.map((p) => (
                        <th key={p._id}>
                          <button type="button" className="compare-remove" onClick={() => removeFromCompare(p._id)}><FiX /></button>
                          <img src={p.images?.[0] || p.destination?.image} alt={p.title} />
                          <h4>{p.title}</h4>
                          <Link to={`/packages/${p._id}`} className="btn btn-primary btn-sm">View</Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((f) => (
                      <tr key={f.key}>
                        <td className="compare-label">{f.label}</td>
                        {items.map((p) => (
                          <td key={p._id}>{f.render(p)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Compare;
