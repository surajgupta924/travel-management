import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CompareProvider } from './context/CompareContext';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CompareBar from './components/CompareBar';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Gallery from './pages/Gallery';
import FAQPage from './pages/FAQPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import ManagePackages from './pages/dashboard/ManagePackages';
import ManageDestinations from './pages/dashboard/ManageDestinations';
import ManageHotels from './pages/dashboard/ManageHotels';
import ManageBookings from './pages/dashboard/ManageBookings';
import ManageUsers from './pages/dashboard/ManageUsers';
import ManageInquiries from './pages/dashboard/ManageInquiries';
import ManageBlogs from './pages/dashboard/ManageBlogs';
import ManageGallery from './pages/dashboard/ManageGallery';
import ManageTestimonials from './pages/dashboard/ManageTestimonials';
import ManageNewsletter from './pages/dashboard/ManageNewsletter';
import ManageReviews from './pages/dashboard/ManageReviews';

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  if (isAuthPage) return children;

  return (
    <>
      <TopBar />
      <Navbar />
      {children}
      <CompareBar />
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CompareProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Toaster position="top-right" />
            <Routes>
              <Route path="/dashboard/*" element={
                <ProtectedRoute staffOnly>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardHome />} />
                <Route path="packages" element={<ManagePackages />} />
                <Route path="destinations" element={<ManageDestinations />} />
                <Route path="hotels" element={<ManageHotels />} />
                <Route path="bookings" element={<ManageBookings />} />
                <Route path="inquiries" element={<ManageInquiries />} />
                <Route path="blogs" element={<ManageBlogs />} />
                <Route path="gallery" element={<ManageGallery />} />
                <Route path="testimonials" element={<ManageTestimonials />} />
                <Route path="newsletter" element={<ManageNewsletter />} />
                <Route path="reviews" element={<ManageReviews />} />
                <Route path="users" element={<ManageUsers />} />
              </Route>

              <Route path="*" element={
                <PublicLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/packages/:id" element={<PackageDetail />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/destinations/:id" element={<DestinationDetail />} />
                    <Route path="/hotels" element={<Hotels />} />
                    <Route path="/hotels/:id" element={<HotelDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
                  </Routes>
                </PublicLayout>
              } />
            </Routes>
          </BrowserRouter>
        </CompareProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
