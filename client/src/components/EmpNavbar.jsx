import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from 'axios';

const EmpNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { user, setUser,URI } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
  try {
    const { data } = await axios.post(
      `${URI}/api/auth/logout`,
      {}, // empty body
      { withCredentials: true } // config with cookies
    );

    localStorage.removeItem('token');

    if (data.success) {
      toast.success(data.message);
      setUser(false);
      setShow(false);
      setMenuOpen(false);
      navigate('/login');
    }
  } catch (err) {
    toast.error("Logout failed");
    console.log(err);
  }
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
          <Link to="/employer"  className="hover:text-blue-600">All Companies</Link>
          <Link to="/employer/companies" className="hover:text-blue-600"> My Companies</Link>
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
          <Link to="/employer" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 block">All Companies</Link>
          <Link to="/employer/companies" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 block">My Companies</Link>
          <Link to="/employer/add-company" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 block">Add Company</Link>
          <Link to="/employer/post-job" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 block">Post Job</Link>
          <Link to="/employer/applicants" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 block">Applicants</Link>
          <Link to="/employer/jobs-list" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 block">Jobs</Link>

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
