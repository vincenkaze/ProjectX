import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5 className="mb-4"><i className="fas fa-shield-alt me-2"></i>TruthGuard</h5>
            <p>Combating misinformation with artificial intelligence and media literacy education.</p>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white-50">Home</Link></li>
              <li><a href="#about" className="text-white-50">About</a></li>
              <li><a href="#how-it-works" className="text-white-50">How It Works</a></li>
              <li><a href="#faq" className="text-white-50">FAQ</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="mb-4">Resources</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50">Media Literacy Guide</a></li>
              <li><a href="#" className="text-white-50">Fact-Checking Sources</a></li>
              <li><a href="#" className="text-white-50">Research Papers</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4">Connect With Us</h5>
            <div className="social-icons mb-3">
              <a href="#" className="text-white-50 me-3"><i className="fab fa-twitter fa-lg" /></a>
              <a href="#" className="text-white-50 me-3"><i className="fab fa-facebook-f fa-lg" /></a>
              <a href="#" className="text-white-50 me-3"><i className="fab fa-linkedin-in fa-lg" /></a>
              <a href="#" className="text-white-50"><i className="fab fa-github fa-lg" /></a>
            </div>
            <p className="mb-2">Subscribe to our newsletter</p>
            <div className="input-group">
              <input type="email" className="form-control" placeholder="Your email" />
              <button className="btn btn-primary" type="button">Subscribe</button>
            </div>
          </div>
        </div>

        <hr className="my-4 bg-secondary" />
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="small mb-0">&copy; 2025 TruthGuard. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="small mb-0">
              <Link to="/privacy" className="text-white-50">Privacy Policy</Link> |{" "}
              <Link to="/terms" className="text-white-50">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}