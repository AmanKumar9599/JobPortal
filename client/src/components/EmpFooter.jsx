import { Link } from "react-router-dom";

const EmpFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-10 px-6 md:px-20 py-8 mb-0">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Jobpilot Employer</h2>
          <p className="text-sm">
            Manage your company profile, post jobs, and view applicants with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Employer Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/employer" className="hover:underline">Dashboard</Link></li>
            <li><Link to="/add-company" className="hover:underline">Add Company</Link></li>
            <li><Link to="/post-job" className="hover:underline">Post Job</Link></li>
            <li><Link to="/applicants" className="hover:underline">Applicants</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
          <p className="text-sm">Email: employer@jobpilot.com</p>
          <p className="text-sm">Phone: +91 8475847784</p>
          <p className="text-sm mt-1">Support Center: Mathura, India</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-xs text-gray-500 mt-6 border-t pt-4">
        © {new Date().getFullYear()} Jobpilot Employer. All rights reserved.
      </div>
    </footer>
  );
};

export default EmpFooter;
