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

    </div>
  );
};

export default Home;