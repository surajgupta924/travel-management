import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';

const BlogCard = ({ blog }) => (
  <Link to={`/blog/${blog.slug || blog._id}`} className="card blog-card">
    <div className="blog-card-image">
      <img src={blog.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600'} alt={blog.title} loading="lazy" />
      <span className="blog-category">{blog.category?.replace('-', ' ')}</span>
    </div>
    <div className="card-body">
      <span className="blog-date"><FiCalendar /> {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      <h3>{blog.title}</h3>
      <p>{blog.excerpt}</p>
      <span className="read-more">Read Article →</span>
    </div>
  </Link>
);

export default BlogCard;
