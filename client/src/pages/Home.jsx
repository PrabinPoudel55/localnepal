import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/categoryService";
const Home = () => {
  const [categories, setCategories] = useState([]);
const [loadingCategories, setLoadingCategories] = useState(true);
const [categoryError, setCategoryError] = useState("");
  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (error) {
      setCategoryError("Unable to load categories.");
    } finally {
      setLoadingCategories(false);
    }
  };

  fetchCategories();
}, []);
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">

          <div className="hero-content">
            <p className="hero-label">
              LOCAL SERVICES DIRECTORY
            </p>

            <h1>
              Find Trusted Local Services in Nepal
            </h1>

            <p className="hero-description">
              Discover reliable service providers near you.
              Search, compare, and connect with local businesses
              across Nepal.
            </p>

            <div className="hero-search">
              <input
                type="text"
                placeholder="What service are you looking for?"
              />

              <input
                type="text"
                placeholder="Location"
              />

              <button className="btn btn-primary">
                Search
              </button>
            </div>

          </div>

        </div>
      </section>
{/* Popular Categories */}
<section className="section categories-section">
  <div className="container">

    <div className="section-header">
      <p className="section-label">EXPLORE SERVICES</p>

      <h2 className="section-title">
        Popular Categories
      </h2>

      <p className="section-subtitle">
        Find the right professionals for your needs from
        popular service categories in Nepal.
      </p>
    </div>

    {loadingCategories ? (
  <p className="category-message">Loading categories...</p>
) : categoryError ? (
  <p className="category-message category-error">
    {categoryError}
  </p>
) : (
  <div className="categories-grid">
    {categories.map((category) => (
      <div className="category-card" key={category._id}>
        <div className="category-icon">
          {category.icon || "📍"}
        </div>

        <h3>{category.name}</h3>

        <p>{category.description}</p>
      </div>
    ))}
  </div>
)}

    <div className="categories-action">
      <Link to="/services" className="btn btn-outline">
  Explore All Services
</Link>
    </div>

  </div>
</section>
{/* Popular Services */}
<section className="section services-section">
  <div className="container">

    <div className="section-header">
      <p className="section-label">DISCOVER LOCAL PROVIDERS</p>

      <h2 className="section-title">
        Popular Services
      </h2>

      <p className="section-subtitle">
        Explore some of the services offered by trusted local
        providers in Nepal.
      </p>
    </div>

    <div className="services-grid">

      <div className="service-card">
        <div className="service-image">
          <span>Web Development</span>
        </div>

        <div className="service-content">
          <p className="service-category">IT & Technology</p>

          <h3>Professional Web Development</h3>

          <p className="service-location">
            📍 Kathmandu
          </p>

          <div className="service-footer">
            <span className="service-rating">
              ⭐ 4.8
            </span>

            <Link to="/services/1" className="btn btn-primary">
  View Details
</Link>
          </div>
        </div>
      </div>

      <div className="service-card">
        <div className="service-image">
          <span>Digital Marketing</span>
        </div>

        <div className="service-content">
          <p className="service-category">Digital Marketing</p>

          <h3>SEO & Digital Marketing</h3>

          <p className="service-location">
            📍 Lalitpur
          </p>

          <div className="service-footer">
            <span className="service-rating">
              ⭐ 4.7
            </span>

            <Link to="/services/2" className="btn btn-primary">
  View Details
</Link>
          </div>
        </div>
      </div>

      <div className="service-card">
        <div className="service-image">
          <span>Photography</span>
        </div>

        <div className="service-content">
          <p className="service-category">Photography</p>

          <h3>Professional Photography</h3>

          <p className="service-location">
            📍 Bhaktapur
          </p>

          <div className="service-footer">
            <span className="service-rating">
              ⭐ 4.9
            </span>

            <Link to="/services/3" className="btn btn-primary">
  View Details
</Link>
          </div>
        </div>
      </div>

    </div>

    <div className="services-action">
      <button className="btn btn-outline">
        View All Services
      </button>
    </div>

  </div>
</section>
{/* How LocalNepal Works */}
<section className="section how-it-works-section">
  <div className="container">

    <div className="section-header how-it-works-header">
      <p className="section-label">SIMPLE & EASY</p>

      <h2 className="section-title">
        How LocalNepal Works
      </h2>

      <p className="section-subtitle">
        Finding the right local service provider is simple.
        Follow three easy steps to get started.
      </p>
    </div>

    <div className="steps-grid">

      {/* Step 1 */}
      <div className="step-card">
        <div className="step-number">1</div>

        <div className="step-icon">🔍</div>

        <h3>Search</h3>

        <p>
          Search for the service you need and choose your
          preferred location.
        </p>
      </div>

      {/* Step 2 */}
      <div className="step-card">
        <div className="step-number">2</div>

        <div className="step-icon">📋</div>

        <h3>Explore</h3>

        <p>
          Compare service providers, ratings, locations,
          and available services.
        </p>
      </div>

      {/* Step 3 */}
      <div className="step-card">
        <div className="step-number">3</div>

        <div className="step-icon">🤝</div>

        <h3>Connect</h3>

        <p>
          Contact the provider directly and get the service
          you need.
        </p>
      </div>

    </div>

  </div>
</section>
{/* Why Choose LocalNepal */}
<section className="section why-section">
  <div className="container">

    <div className="why-grid">

      <div className="why-content">
        <p className="section-label">WHY LOCALNEPAL?</p>

        <h2 className="section-title">
          Everything You Need to Find the Right Local Service
        </h2>

        <p className="section-subtitle">
          LocalNepal makes it easier to discover local service
          providers, compare your options, and connect with the
          right professional.
        </p>

        <div className="benefits-list">

          <div className="benefit-item">
            <div className="benefit-icon">✓</div>

            <div>
              <h3>Trusted Providers</h3>
              <p>
                Discover service providers listed on LocalNepal.
              </p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">🔍</div>

            <div>
              <h3>Easy Discovery</h3>
              <p>
                Quickly find services based on your needs and
                location.
              </p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">⭐</div>

            <div>
              <h3>Ratings & Reviews</h3>
              <p>
                Use ratings and reviews to make better decisions.
              </p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">📍</div>

            <div>
              <h3>Local Services</h3>
              <p>
                Find service providers across Kathmandu Valley
                and beyond.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="why-visual">
        <div className="why-card">
          <div className="why-card-icon">🇳🇵</div>

          <h3>Local Services, Made Simple</h3>

          <p>
            Connecting people with local professionals across
            Nepal.
          </p>
        </div>
      </div>

    </div>

  </div>
</section>
{/* Become a Provider CTA */}
<section className="provider-cta-section">
  <div className="container">
    <div className="provider-cta">

      <div className="provider-cta-content">
        <p className="section-label">
          FOR SERVICE PROVIDERS
        </p>

        <h2>
          Grow Your Business with LocalNepal
        </h2>

        <p>
          List your services on LocalNepal and make it easier
          for people in your area to discover and contact you.
        </p>

        <div className="provider-cta-actions">
          <Link to="/register" className="btn btn-primary">
  Become a Provider
</Link>

<Link to="/services" className="btn btn-outline">
  Explore Services
</Link>
        </div>
      </div>

    </div>
  </div>
</section>
    </div>
  );
};

export default Home;