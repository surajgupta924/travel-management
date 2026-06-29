import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';
import PageWrapper from '../components/PageWrapper';
import { GridSkeleton } from '../components/Skeleton';
import EmptyState from '../components/EmptyState';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 9 });
    if (category) params.set('category', category);
    API.get(`/blogs?${params}`)
      .then((res) => {
        setBlogs(res.data.data);
        setPagination(res.data.pagination || { page: 1, pages: 1 });
      })
      .finally(() => setLoading(false));
  }, [page, category]);

  const categories = ['travel-tips', 'destination-guide', 'news', 'visa-guide'];

  return (
    <PageWrapper>
      <div className="page-wrap">
        <div className="page-hero page-hero-large">
          <div className="container">
            <span className="section-tag">Blog</span>
            <h1>Travel Tips & Guides</h1>
            <p>Expert advice, destination guides, and travel news from our team</p>
          </div>
        </div>
        <div className="container section">
          <div className="category-chips" style={{ marginBottom: 32 }}>
            <button type="button" className={`chip ${!category ? 'active' : ''}`} onClick={() => { setCategory(''); setPage(1); }}>All</button>
            {categories.map((c) => (
              <button key={c} type="button" className={`chip ${category === c ? 'active' : ''}`} onClick={() => { setCategory(c); setPage(1); }}>{c.replace('-', ' ')}</button>
            ))}
          </div>
          {loading ? <GridSkeleton count={6} /> : blogs.length === 0 ? (
            <EmptyState message="No articles yet"><Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Back Home</Link></EmptyState>
          ) : (
            <>
              <div className="grid-3">{blogs.map((b) => <BlogCard key={b._id} blog={b} />)}</div>
              <Pagination page={pagination.page} pages={pagination.pages} onPageChange={setPage} />
            </>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Blog;
