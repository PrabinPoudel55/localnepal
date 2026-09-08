import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Local<span>Nepal</span>
        </Link>

        {/* Navigation */}
        <nav className="navbar-menu">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;