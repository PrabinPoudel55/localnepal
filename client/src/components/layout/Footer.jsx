import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Local<span>Nepal</span>
          </Link>

          <p>
            Find trusted local services near you.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/register">Become a Provider</Link>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Kathmandu, Nepal</p>
          <p>Email: support@localnepal.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 LocalNepal. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;