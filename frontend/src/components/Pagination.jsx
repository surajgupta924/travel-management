import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const nums = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= page - 1 && i <= page + 1)) nums.push(i);
    else if (nums[nums.length - 1] !== '...') nums.push('...');
  }

  return (
    <div className="pagination">
      <button className="pagination-btn" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <FiChevronLeft />
      </button>
      {nums.map((n, i) =>
        n === '...' ? (
          <span key={`e${i}`} className="pagination-ellipsis">…</span>
        ) : (
          <button
            key={n}
            className={`pagination-btn ${page === n ? 'active' : ''}`}
            onClick={() => onPageChange(n)}
          >
            {n}
          </button>
        )
      )}
      <button className="pagination-btn" disabled={page >= pages} onClick={() => onPageChange(page + 1)}>
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
