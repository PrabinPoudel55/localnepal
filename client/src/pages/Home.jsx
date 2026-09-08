const Home = () => {
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

    <div className="categories-grid">

      <div className="category-card">
        <div className="category-icon">💻</div>
        <h3>IT & Technology</h3>
        <p>Web development, software and IT services.</p>
      </div>

      <div className="category-card">
        <div className="category-icon">📈</div>
        <h3>Digital Marketing</h3>
        <p>SEO, social media and online marketing.</p>
      </div>

      <div className="category-card">
        <div className="category-icon">🎨</div>
        <h3>Graphic Design</h3>
        <p>Creative designs for businesses and brands.</p>
      </div>

      <div className="category-card">
        <div className="category-icon">📷</div>
        <h3>Photography</h3>
        <p>Professional photography and videography.</p>
      </div>

      <div className="category-card">
        <div className="category-icon">📚</div>
        <h3>Education & Tutoring</h3>
        <p>Find tutors and educational services.</p>
      </div>

      <div className="category-card">
        <div className="category-icon">🔧</div>
        <h3>Repair & Maintenance</h3>
        <p>Reliable repair and maintenance services.</p>
      </div>

    </div>

    <div className="categories-action">
      <button className="btn btn-outline">
        View All Categories
      </button>
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

            <button className="btn btn-primary">
              View Details
            </button>
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

            <button className="btn btn-primary">
              View Details
            </button>
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

            <button className="btn btn-primary">
              View Details
            </button>
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
    </div>
  );
};

export default Home;