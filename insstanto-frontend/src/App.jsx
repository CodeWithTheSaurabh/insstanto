import { useState, useEffect } from 'react'
import { FaStar, FaSearch, FaMapMarkerAlt, FaChevronDown, FaShoppingCart, FaHome, FaClipboardList, FaUser, FaQuoteLeft, FaQuoteRight, FaMoon, FaSun, FaArrowRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt as FaLocation, FaFacebook, FaTwitter, FaInstagram, FaBars, FaTimes, FaCog, FaInfoCircle, FaHeadset, FaSignOutAlt } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import TypeWriter from './components/TypeWriter'
import SearchBar from './components/SearchBar'
import MobileSearchBar from './components/MobileSearchBar'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

// Import SVG images
import cleaningImg from './assets/images/cleaning.svg'
import plumbingImg from './assets/images/plumbing.svg'
import electricalImg from './assets/images/electrical.svg'
import securityImg from './assets/images/security.svg'
import nursingImg from './assets/images/nursing.svg'
import summerOfferImg from './assets/images/summer-offer.svg'
import hero1Img from './assets/images/hero-1.svg'
import hero2Img from './assets/images/hero-2.svg'
import hero3Img from './assets/images/hero-3.svg'
import avatar1Img from './assets/images/avatar-1.svg'
import avatar2Img from './assets/images/avatar-2.svg'
import appMockupImg from './assets/images/app-mockup.svg'
import appStoreImg from './assets/images/app-store.svg'
import playStoreImg from './assets/images/play-store.svg'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Toggle premium modal
  const togglePremiumModal = () => {
    setShowPremiumModal(!showPremiumModal);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Prevent body scrolling when sidebar is open
    if (!sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Close sidebar when clicking outside
  const closeSidebar = (e) => {
    if (sidebarOpen && e.target.classList.contains('sidebar-overlay')) {
      setSidebarOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  // Effect to check system preference for dark mode
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Handle scroll to update active section in quick access menu
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for header

      // Get all sections with IDs
      const sections = [
        document.getElementById('hero-section'),
        document.getElementById('featured-services'),
        document.getElementById('new-noteworthy'),
        document.getElementById('trending-section'),
        document.getElementById('testimonials'),
        document.getElementById('download-app')
      ].filter(Boolean); // Filter out any null values

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          // Update active class in quick access menu
          const quickAccessItems = document.querySelectorAll('.quick-access-item');
          quickAccessItems.forEach(item => {
            if (item.getAttribute('href') === `#${section.id}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });

          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set active section on page load
    setTimeout(handleScroll, 500);

    // Add event listener to close quick access menu when clicking outside
    const handleClickOutside = (e) => {
      if (document.body.classList.contains('quick-menu-open') &&
          !e.target.closest('.quick-access-menu') &&
          !e.target.closest('.quick-access-btn')) {
        document.body.classList.remove('quick-menu-open');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Sample data for service categories
  const serviceCategories = [
    { id: 1, name: 'Cleaning', image: cleaningImg, description: 'Professional home cleaning services for a spotless living space.' },
    { id: 2, name: 'Plumbing', image: plumbingImg, description: 'Expert plumbing solutions for all your repair and installation needs.' },
    { id: 3, name: 'Electrical', image: electricalImg, description: 'Reliable electrical services by certified professionals.' },
    { id: 4, name: 'Private Security', image: securityImg, description: 'Trained security personnel for your home and business.' },
    { id: 5, name: 'Nursing/Caretaker', image: nursingImg, description: 'Compassionate care services for your loved ones.' },
  ];

  // Sample data for trending items
  const trendingItems = [
    { id: 1, name: 'Home Deep Cleaning', image: cleaningImg, price: '₹1,499', rating: 4.8, reviews: 245 },
    { id: 2, name: 'AC Repair & Service', image: electricalImg, price: '₹799', rating: 4.7, reviews: 189 },
    { id: 3, name: 'Bathroom Cleaning', image: cleaningImg, price: '₹699', rating: 4.6, reviews: 156 },
    { id: 4, name: 'Electrical Wiring', image: electricalImg, price: '₹1,299', rating: 4.9, reviews: 112 },
  ];

  // Sample data for testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      avatar: avatar1Img,
      rating: 5,
      text: 'Excellent service! The cleaning team was professional and thorough. My house has never looked better. Will definitely use Insstanto Plus again.',
      service: 'Home Cleaning',
      date: '15 April 2025',
      verified: true
    },
    {
      id: 2,
      name: 'Priya Patel',
      avatar: avatar2Img,
      rating: 4,
      text: 'Very satisfied with the plumbing service. The technician arrived on time and fixed the issue quickly. Reasonable pricing too!',
      service: 'Plumbing',
      date: '22 April 2025',
      verified: true
    },
    {
      id: 3,
      name: 'Amit Kumar',
      avatar: avatar1Img,
      rating: 5,
      text: 'The electrical service was outstanding. The technician was knowledgeable and fixed all issues promptly. Highly recommend their services!',
      service: 'Electrical',
      date: '28 April 2025',
      verified: true
    },
  ];

  // Slider settings for hero carousel
  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Slider settings for testimonials
  const testimonialSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    pauseOnHover: true,
    adaptiveHeight: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Handle service card click
  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  // Close service modal
  const closeServiceModal = () => {
    setSelectedService(null);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      {showLoading && <LoadingScreen />}
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-logo">
            <h1>insstanto<span>+</span></h1>
          </div>

          {/* Desktop Search and Location */}
          <div className="header-center desktop-only">
            <div className="location-selector-header">
              <FaMapMarkerAlt color="#666" size={16} />
              <span>63, Maharani Rd-...</span>
              <FaChevronDown color="#666" size={12} />
            </div>
            <SearchBar />
          </div>

          {/* Mobile Search Button */}
          <button className="mobile-search-btn mobile-only">
            <FaSearch color="#666" size={20} />
          </button>

          <div className="header-actions">
            <button className="user-profile-btn">
              <FaUser color="#666" size={18} />
            </button>
            <button className="cart-btn">
              <FaShoppingCart color="#666" size={18} />
              <span className="cart-badge-header">1</span>
            </button>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              {darkMode ? <FaSun color="#666" size={18} /> : <FaMoon color="#666" size={18} />}
            </button>
            <button className="hamburger-menu desktop-only" onClick={toggleSidebar}>
              <FaBars color="#666" size={18} />
            </button>
            <button className="quick-access-btn mobile-only" onClick={() => document.body.classList.toggle('quick-menu-open')}>
              <FaBars color="#666" size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (initially hidden) */}
        <div className="mobile-search-container mobile-only">
          <div className="mobile-search-wrapper">
            <div className="mobile-location-selector">
              <FaMapMarkerAlt color="#666" size={16} />
              <span>63, Maharani Rd-...</span>
              <FaChevronDown color="#666" size={12} />
            </div>
            <MobileSearchBar />
          </div>
        </div>
      </header>

      {/* Sidebar Navigation (Desktop) */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={closeSidebar}>
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <FaStar color="#FFD700" size={24} />
              <h2>Insstanto Plus</h2>
            </div>
            <button className="close-sidebar" onClick={toggleSidebar}>
              <FaTimes size={20} />
            </button>
          </div>

          <div className="sidebar-user">
            <div className="user-avatar">
              <FaUser size={20} />
            </div>
            <div className="user-info">
              <h3>Welcome</h3>
              <p>Sign in for personalized experience</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            <ul>
              <li className="active">
                <FaHome size={18} />
                <span>Home</span>
              </li>
              <li>
                <FaClipboardList size={18} />
                <span>My Bookings</span>
              </li>
              <li>
                <FaUser size={18} />
                <span>My Account</span>
              </li>
              <li>
                <FaCog size={18} />
                <span>Settings</span>
              </li>
              <li>
                <FaInfoCircle size={18} />
                <span>About Us</span>
              </li>
              <li>
                <FaHeadset size={18} />
                <span>Support</span>
              </li>
            </ul>
          </nav>

          <div className="sidebar-footer">
            <button className="sidebar-logout">
              <FaSignOutAlt size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Premium Features Banner */}
      <div className="premium-banner">
        <div className="premium-banner-inner">
          <div className="premium-banner-icon">
            <FaStar color="#FFD700" size={16} />
          </div>
          <p>Exclusive Premium Features Available</p>
          <button className="premium-learn-more" onClick={togglePremiumModal}>Learn More</button>
        </div>
      </div>

      {/* Location Selector */}


      <div className="main-content">

        {/* Quick Access Menu (Mobile Only) */}
        <div className="quick-access-menu mobile-only">
          <div className="quick-access-header">
            <h3>Jump to Section</h3>
            <button className="quick-access-close" onClick={() => document.body.classList.remove('quick-menu-open')}>
              <FaTimes size={18} />
            </button>
          </div>
          <div className="quick-access-items">
            <a href="#hero-section" className="quick-access-item active" onClick={() => document.body.classList.remove('quick-menu-open')}>
              <div className="quick-access-icon">
                <FaHome size={18} />
              </div>
              <span>Home</span>
            </a>
            <a href="#featured-services" className="quick-access-item" onClick={() => document.body.classList.remove('quick-menu-open')}>
              <div className="quick-access-icon">
                <FaStar size={18} />
              </div>
              <span>Featured Services</span>
            </a>
            <a href="#new-noteworthy" className="quick-access-item" onClick={() => document.body.classList.remove('quick-menu-open')}>
              <div className="quick-access-icon">
                <FaArrowRight size={18} />
              </div>
              <span>New & Noteworthy</span>
            </a>
            <a href="#trending-section" className="quick-access-item" onClick={() => document.body.classList.remove('quick-menu-open')}>
              <div className="quick-access-icon">
                <FaShoppingCart size={18} />
              </div>
              <span>Trending Services</span>
            </a>
            <a href="#testimonials" className="quick-access-item" onClick={() => document.body.classList.remove('quick-menu-open')}>
              <div className="quick-access-icon">
                <FaQuoteLeft size={18} />
              </div>
              <span>Customer Reviews</span>
            </a>
            <a href="#download-app" className="quick-access-item" onClick={() => document.body.classList.remove('quick-menu-open')}>
              <div className="quick-access-icon">
                <FaPhoneAlt size={18} />
              </div>
              <span>Mobile App</span>
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <div id="hero-section" className="hero-section">
          <div className="hero-content-wrapper">
            <h1 className="hero-title">Home services at your doorstep</h1>
            <div className="hero-subtitle">
              We provide <TypeWriter
                texts={[
                  "professional cleaning services",
                  "expert plumbing solutions",
                  "reliable electrical repairs",
                  "premium salon services",
                  "quality appliance repairs",
                  "trusted home maintenance"
                ]}
                delay={80}
                pauseTime={2000}
              />
            </div>
            <div className="service-categories-grid">
              <div className="service-category-item">
                <div className="category-icon">
                  <img src={cleaningImg} alt="Women's Salon & Spa" />
                </div>
                <p>Women's Salon & Spa</p>
              </div>
              <div className="service-category-item">
                <div className="category-icon">
                  <img src={plumbingImg} alt="Men's Salon & Massage" />
                </div>
                <p>Men's Salon & Massage</p>
              </div>
              <div className="service-category-item">
                <div className="category-icon">
                  <img src={electricalImg} alt="AC & Appliance Repair" />
                </div>
                <p>AC & Appliance Repair</p>
              </div>
              <div className="service-category-item">
                <div className="category-icon">
                  <img src={cleaningImg} alt="Cleaning" />
                </div>
                <p>Cleaning</p>
              </div>
              <div className="service-category-item">
                <div className="category-icon">
                  <img src={electricalImg} alt="Electrician, Plumber & Carpenter" />
                </div>
                <p>Electrician, Plumber & Carpenter</p>
              </div>
              <div className="service-category-item">
                <div className="category-icon">
                  <img src={securityImg} alt="Native Water Purifier" />
                </div>
                <p>Native Water Purifier</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Services */}
        <div id="featured-services" className="featured-services">
          <div className="featured-service-card">
            <div className="featured-service-content">
              <h3>Deep clean with foam-jet AC service</h3>
              <p>AC service & repair</p>
              <button className="book-now-btn">Book now</button>
            </div>
            <div className="featured-service-image">
              <img src={electricalImg} alt="AC Service" />
            </div>
          </div>

          <div className="featured-service-card sale-card">
            <div className="sale-badge">Sale live</div>
            <div className="featured-service-content">
              <h3>NATIVE</h3>
              <h2>RO Water Purifiers</h2>
              <button className="buy-now-btn">Buy now</button>
            </div>
            <div className="featured-service-image">
              <img src={securityImg} alt="Water Purifier" />
            </div>
          </div>

          <div className="featured-service-card green-card">
            <div className="featured-service-content">
              <h3>Shine your bathroom deserves</h3>
              <button className="book-now-btn">Book now</button>
            </div>
            <div className="featured-service-image">
              <img src={cleaningImg} alt="Bathroom Cleaning" />
            </div>
          </div>
        </div>

        {/* New and Noteworthy */}
        <div id="new-noteworthy" className="section-title">
          <h2>New and noteworthy</h2>
        </div>
        <div className="noteworthy-services">
          <div className="noteworthy-service-card">
            <div className="noteworthy-service-image">
              <img src={securityImg} alt="Native Water Purifier" />
            </div>
            <h3>Native Water Purifier</h3>
          </div>
          <div className="noteworthy-service-card">
            <div className="noteworthy-service-image">
              <img src={cleaningImg} alt="Bathroom & Kitchen Cleaning" />
            </div>
            <h3>Bathroom & Kitchen Cleaning</h3>
          </div>
          <div className="noteworthy-service-card">
            <div className="noteworthy-service-image">
              <img src={nursingImg} alt="Hair Studio for Women" />
            </div>
            <h3>Hair Studio for Women</h3>
          </div>
          <div className="noteworthy-service-card">
            <div className="noteworthy-service-image">
              <img src={electricalImg} alt="AC Service and Repair" />
            </div>
            <h3>AC Service and Repair</h3>
          </div>
        </div>

        {/* Banner */}
        <div className="banner">
          <img
            src={summerOfferImg}
            alt="Swachh Summer Offer"
          />
        </div>

        {/* Trending Section */}
        <div id="trending-section" className="section-title">
          <h2>Trending Now</h2>
          <p>Most popular services this month</p>
        </div>
        <div className="trending-section">
          <div className="trending-items">
            {trendingItems.map(item => (
              <div key={item.id} className="trending-item">
                <div className="trending-item-image">
                  <img src={item.image} alt={item.name} />
                  <div className="trending-item-rating">
                    <FaStar color="#FFD700" />
                    <span>{item.rating} ({item.reviews})</span>
                  </div>
                </div>
                <div className="trending-item-info">
                  <h3>{item.name}</h3>
                  <p className="trending-item-price">{item.price}</p>
                  <button className="book-now-btn">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="testimonials-wrapper">
          <div className="section-title">
            <h2>What Our Customers Say</h2>
            <p>Read testimonials from our satisfied customers</p>
          </div>
          <div className="testimonials-section">
            <Slider {...testimonialSliderSettings}>
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-header">
                      <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                      <div className="testimonial-info">
                        <div className="testimonial-name-wrapper">
                          <h3>{testimonial.name}</h3>
                          {testimonial.verified && (
                            <span className="verified-badge">
                              <FaStar size={12} /> Verified
                            </span>
                          )}
                        </div>
                        <p className="testimonial-service">
                          <span className="service-label">Service:</span> {testimonial.service}
                        </p>
                        <p className="testimonial-date">{testimonial.date}</p>
                        <div className="testimonial-rating">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} size={16} color={i < testimonial.rating ? "#FFD700" : "#e0e0e0"} />
                          ))}
                          <span className="rating-text">{testimonial.rating}.0/5.0</span>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-content">
                      <FaQuoteLeft className="quote-icon" />
                      <p>{testimonial.text}</p>
                      <FaQuoteRight className="quote-icon right" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Download App Section */}
        <div id="download-app" className="download-app-section">
          <div className="download-app-content">
            <h2>Download Our Mobile App</h2>
            <p>Get exclusive offers and book services on the go with our mobile app</p>
            <div className="app-store-buttons">
              <a href="#" className="app-store-btn">
                <img src={appStoreImg} alt="Download on App Store" />
              </a>
              <a href="#" className="app-store-btn">
                <img src={playStoreImg} alt="Get it on Google Play" />
              </a>
            </div>
          </div>
          <div className="app-mockup">
            <img src={appMockupImg} alt="Insstanto Plus Mobile App" />
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Insstanto</h3>
              <p>Professional home services at your doorstep.</p>
              <div className="social-icons">
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaInstagram /></a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Links</h3>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p><FaPhoneAlt /> +91 1234567890</p>
              <p><FaEnvelope /> support@insstanto.com</p>
              <p><FaLocation /> Indore, MP, India</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Insstanto. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Bottom Navigation (Mobile Only) */}
      <div className="bottom-nav mobile-only">
        <div className="nav-item active">
          <FaHome size={20} />
          <span>Home</span>
        </div>
        <div className="nav-item">
          <FaClipboardList size={20} />
          <span>Bookings</span>
        </div>
        <div className="nav-item">
          <FaShoppingCart size={20} />
          <span>Cart</span>
          <span className="nav-badge">1</span>
        </div>
        <div className="nav-item">
          <FaUser size={20} />
          <span>Account</span>
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={closeServiceModal}>
          <div className="service-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeServiceModal}>×</button>
            <div className="service-modal-content">
              <div className="service-modal-image">
                <img src={selectedService.image} alt={selectedService.name} />
              </div>
              <h2>{selectedService.name}</h2>
              <p>{selectedService.description}</p>
              <div className="service-features">
                <h3>Features</h3>
                <ul>
                  <li>Professional service providers</li>
                  <li>Quality assured service</li>
                  <li>Affordable pricing</li>
                  <li>Timely service delivery</li>
                  <li>100% customer satisfaction</li>
                </ul>
              </div>
              <button className="book-service-btn">Book This Service</button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Features Modal */}
      {showPremiumModal && (
        <div className="modal-overlay premium-modal-overlay" onClick={togglePremiumModal}>
          <div className="premium-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={togglePremiumModal}>×</button>
            <div className="premium-modal-content">
              <div className="premium-modal-header">
                <div className="premium-modal-badge">
                  <FaStar color="#FFD700" size={18} />
                  <h2>Insstanto <span>PLUS</span></h2>
                </div>
              </div>

              <p className="premium-description">
                Upgrade to Insstanto Plus for exclusive benefits and premium features that enhance your home service experience.
              </p>

              <div className="premium-features-list">
                <h3>Premium Features</h3>
                <div className="premium-feature">
                  <div className="premium-feature-icon">
                    <FaStar color="#FFD700" />
                  </div>
                  <div className="premium-feature-text">
                    <h4>Priority Booking</h4>
                    <p>Get priority access to service providers even during peak hours</p>
                  </div>
                </div>

                <div className="premium-feature">
                  <div className="premium-feature-icon">
                    <FaStar color="#FFD700" />
                  </div>
                  <div className="premium-feature-text">
                    <h4>Dedicated Customer Support</h4>
                    <p>24/7 dedicated customer support for all your service needs</p>
                  </div>
                </div>

                <div className="premium-feature">
                  <div className="premium-feature-icon">
                    <FaStar color="#FFD700" />
                  </div>
                  <div className="premium-feature-text">
                    <h4>Exclusive Discounts</h4>
                    <p>Special discounts and offers only available to Plus members</p>
                  </div>
                </div>

                <div className="premium-feature">
                  <div className="premium-feature-icon">
                    <FaStar color="#FFD700" />
                  </div>
                  <div className="premium-feature-text">
                    <h4>Free Cancellation</h4>
                    <p>Cancel bookings up to 1 hour before the scheduled time with no charges</p>
                  </div>
                </div>
              </div>

              <div className="premium-pricing">
                <div className="premium-price">
                  <span className="price-amount">₹499</span>
                  <span className="price-period">/month</span>
                </div>
                <p className="price-save">Save 20% with annual subscription</p>
              </div>

              <button className="premium-subscribe-btn">Subscribe Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
