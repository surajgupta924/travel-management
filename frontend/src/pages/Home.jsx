import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import API from '../services/api';
import PackageCard from '../components/PackageCard';
import DestinationCard from '../components/DestinationCard';
import BlogCard from '../components/BlogCard';
import HomeHero from '../components/HomeHero';
import ServicesGrid from '../components/ServicesGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import CallbackBanner from '../components/CallbackBanner';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import FAQ from '../components/FAQ';
import Loading from '../components/Loading';
import PageWrapper from '../components/PageWrapper';

const homeFaq = [
  { q: 'Do you provide customized tour packages?', a: 'Yes! We create fully customized packages based on your budget, travel duration, preferred destinations, and travel style.' },
  { q: 'Do you offer visa assistance?', a: 'We provide complete visa documentation guidance, appointment support, and step-by-step assistance for international travel.' },
  { q: 'Can I book flights and hotels separately?', a: 'Yes. We offer standalone flight bookings, hotel reservations, and airport transfers even without a full tour package.' },
  { q: 'Do you arrange last-minute travel?', a: 'We can arrange last-minute packages based on flight, hotel, and destination availability. Contact our team for quick assistance.' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [domestic, setDomestic] = useState([]);
  const [international, setInternational] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/packages?featured=true&limit=3'),
      API.get('/packages?tourType=domestic&limit=3'),
      API.get('/packages?tourType=international&limit=3'),
      API.get('/destinations?popular=true'),
      API.get('/blogs?limit=3'),
      API.get('/gallery?featured=true'),
      API.get('/public/stats'),
    ])
      .then(([feat, dom, intl, dest, blog, gal, statsRes]) => {
        setFeatured(feat.data.data);
        setDomestic(dom.data.data);
        setInternational(intl.data.data);
        setDestinations(dest.data.data.slice(0, 4));
        setBlogs(blog.data.data || []);
        setGallery((gal.data.data || []).slice(0, 6));
        setStats(statsRes.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading your travel experience..." />;

  return (
    <PageWrapper>
      <HomeHero stats={stats} />
      <ServicesGrid />

      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Featured</span>
            <h2>Top Tour Packages</h2>
            <p>Hand-picked adventures for unforgettable experiences</p>
          </div>
          <div className="grid-3">
            {featured.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)}
          </div>
          <div className="section-cta center">
            <Link to="/packages" className="btn btn-primary btn-lg">View All Packages <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tour-type-tabs">
            <div className="section-header">
              <span className="section-tag">Explore</span>
              <h2>Domestic & International Tours</h2>
            </div>
          </div>
          <div className="grid-2 tour-type-grid">
            <div>
              <h3 className="tour-type-title">🗺️ Domestic Tours</h3>
              <div className="grid-1">
                {domestic.slice(0, 2).map((pkg) => <PackageCard key={pkg._id} pkg={pkg} listView />)}
              </div>
              <Link to="/packages?tourType=domestic" className="btn btn-outline">All Domestic Tours</Link>
            </div>
            <div>
              <h3 className="tour-type-title">✈️ International Tours</h3>
              <div className="grid-1">
                {international.slice(0, 2).map((pkg) => <PackageCard key={pkg._id} pkg={pkg} listView />)}
              </div>
              <Link to="/packages?tourType=international" className="btn btn-outline">All International Tours</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Destinations</span>
            <h2>Popular Destinations</h2>
            <p>Discover the world's most beautiful places</p>
          </div>
          <div className="grid-4">
            {destinations.map((dest) => <DestinationCard key={dest._id} dest={dest} />)}
          </div>
          <div className="section-cta center">
            <Link to="/destinations" className="btn btn-outline btn-lg">Explore All Destinations</Link>
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header center">
              <span className="section-tag">Gallery</span>
              <h2>Travel Moments</h2>
              <p>Glimpses from our travelers' adventures around the world</p>
            </div>
            <div className="gallery-preview">
              {gallery.map((g) => (
                <div key={g._id} className="gallery-preview-item">
                  <img src={g.image} alt={g.title} loading="lazy" />
                  <div className="gallery-preview-overlay"><span>{g.title}</span></div>
                </div>
              ))}
            </div>
            <div className="section-cta center">
              <Link to="/gallery" className="btn btn-outline btn-lg">View Full Gallery</Link>
            </div>
          </div>
        </section>
      )}

      <WhyChooseUs />
      <CallbackBanner />
      <Testimonials />

      {blogs.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header center">
              <span className="section-tag">Blog</span>
              <h2>Travel Tips & Guides</h2>
              <p>Expert advice to help you plan better trips</p>
            </div>
            <div className="grid-3">
              {blogs.map((b) => <BlogCard key={b._id} blog={b} />)}
            </div>
            <div className="section-cta center">
              <Link to="/blog" className="btn btn-outline btn-lg">Read All Articles</Link>
            </div>
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container">
          <FAQ items={homeFaq} title="Frequently Asked Questions" />
        </div>
      </section>

      <Newsletter />
    </PageWrapper>
  );
};

export default Home;
