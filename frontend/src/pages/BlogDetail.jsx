import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiArrowLeft } from 'react-icons/fi';
import API from '../services/api';
import Loading from '../components/Loading';
import PageWrapper from '../components/PageWrapper';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/blogs/${slug}`)
      .then((res) => setBlog(res.data.data))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading />;
  if (!blog) return <div className="container section"><p>Blog not found.</p></div>;

  return (
    <PageWrapper>
      <article className="blog-detail">
        <div className="blog-detail-hero">
          <img src={blog.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200'} alt={blog.title} />
          <div className="blog-detail-overlay">
            <div className="container">
              <span className="blog-category">{blog.category?.replace('-', ' ')}</span>
              <h1>{blog.title}</h1>
              <div className="blog-meta">
                <span><FiUser /> {blog.author}</span>
                <span><FiCalendar /> {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container blog-detail-content">
          <Link to="/blog" className="btn btn-outline btn-sm" style={{ marginBottom: 24 }}><FiArrowLeft /> Back to Blog</Link>
          <p className="blog-excerpt">{blog.excerpt}</p>
          <div className="blog-body" dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
          {blog.tags?.length > 0 && (
            <div className="blog-tags">
              {blog.tags.map((t) => <span key={t} className="chip sm">{t}</span>)}
            </div>
          )}
        </div>
      </article>
    </PageWrapper>
  );
};

export default BlogDetail;
