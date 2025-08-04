import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-10 px-6 md:px-20 py-8 mb-0">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Jobpilot</h2>
          <p className="text-sm">
            Your trusted platform to find jobs, hire talents, and explore careers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/all-jobs" className="hover:underline">Jobs</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Email: support@jobpilot.com</p>
          <p className="text-sm">Phone: +91 8475847784</p>
          <p className="text-sm mt-1">Address: Mathura, Uttar Pradesh, India</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-xs text-gray-500 mt-6 border-t pt-4">
        © {new Date().getFullYear()} Jobpilot. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
