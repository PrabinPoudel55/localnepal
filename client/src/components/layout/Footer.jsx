function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">

        <div className="footer-brand">
          <h3>Local<span>Nepal</span></h3>
          <p>
            Find trusted local services near you.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>

          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/register">Become a Provider</a>
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