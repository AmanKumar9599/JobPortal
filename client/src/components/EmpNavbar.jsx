import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-hot-toast";

const EmpNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser(false);
    navigate('/');
    toast.success('Logged out successfully');
    setShow(false);
  };

  return (
    <nav className="w-full shadow px-4 md:px-10 py-4 bg-white">
      <div className="flex justify-evenly items-center">
        {/* Logo */}
        <div>
        <Link to="/employer">
          <img src={assets.logo} alt="logo" className="w-26 h-6" />
        </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/employer" className="hover:text-blue-600">Companies</Link>
          <Link to="/employer/add-company" className="hover:text-blue-600">Add Company</Link>
          <Link to="/employer/post-job" className="hover:text-blue-600">Post Job</Link>
          <Link to="/employer/applicants" className="hover:text-blue-600">Applicants</Link>
          <Link to="/employer/jobs-list" className="hover:text-blue-600">Jobs</Link>
        </div>

        {/* Profile */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <div onClick={() => setShow(!show)} className="cursor-pointer">
              <img src={assets.user_profile} alt="User" className="w-8 h-8 rounded-full" />
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Dropdown Profile (Desktop) */}
      {show && (
        <div className="fixed md:absolute top-16 right-5 z-50 bg-white shadow-lg rounded-lg p-4 w-[85%] md:w-48">
          <p
            onClick={logout}
            className="block px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
          >
            Logout
          </p>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3">
          <Link to="/employer" onClick={() => setMenuOpen(false)} className="block">Companies</Link>
          <Link to="/employer/add-company" onClick={() => setMenuOpen(false)} className="block">Add Company</Link>
          <Link to="/employer/post-job" onClick={() => setMenuOpen(false)} className="block">Post Job</Link>
          <Link to="/employer/applicants" onClick={() => setMenuOpen(false)} className="block">Applicants</Link>
          <Link to="/employer/jobs-list" className="hover:text-blue-600">Jobs</Link>

          {user && (
            <p
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
              className="block text-red-500 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </p>
          )}
        </div>
      )}
    </nav>
  );
};

export default EmpNavbar;
