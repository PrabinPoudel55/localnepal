import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../services/serviceService";

function Services() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data.services);
      } catch (error) {
        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return true;
    }

    return (
      service.title?.toLowerCase().includes(search) ||
      service.description?.toLowerCase().includes(search) ||
      service.category?.name?.toLowerCase().includes(search)
    );
  });

  return (
    <section className="services-page">
      <div className="container">
        <div className="page-header">
          <p className="section-label">LOCAL SERVICES</p>

          <h1>Find Local Services</h1>

          <p>
            Discover trusted local service providers across Nepal.
          </p>
        </div>

        <div className="service-search">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
          )}
        </div>

        {loading ? (
          <p className="service-message">Loading services...</p>
        ) : error ? (
          <p className="service-message service-error">{error}</p>
        ) : services.length === 0 ? (
          <p className="service-message">
            No services available at the moment.
          </p>
        ) : filteredServices.length === 0 ? (
          <p className="service-message">
            No services found for "{searchTerm}".
          </p>
        ) : (
          <div className="services-grid">
            {filteredServices.map((service) => (
              <div className="service-card" key={service._id}>
                <div className="service-image">
                  {service.images && service.images.length > 0 ? (
                    <img
                      src={service.images[0]}
                      alt={service.title}
                    />
                  ) : (
                    <span>{service.title}</span>
                  )}
                </div>

                <div className="service-content">
                  <p className="service-category">
                    {service.category?.name || "Service"}
                  </p>

                  <h3>{service.title}</h3>

                  <p className="service-location">
                    📍 {service.location?.city || "Nepal"}
                  </p>

                  <div className="service-footer">
                    <span className="service-rating">
                      ⭐ {service.rating > 0 ? service.rating : "New"}
                    </span>

                    <Link
                      to={`/services/${service._id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;