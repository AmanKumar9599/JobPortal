import { Link, useNavigate } from "react-router-dom";
import {  FaBars, FaTimes } from "react-icons/fa";
import { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import {toast} from 'react-hot-toast';
import axios from 'axios';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { setQuery, user,setUser,URI } = useContext(AppContext);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      setQuery(input);
      navigate('/all-jobs');
    }
    if (e.key === 'Enter') {
      setQuery(input);
      navigate('/all-jobs');
    }
  };

  const logout = async()=>{
    try {
      const { data } = await axios.post(`${URI}/api/auth/logout`, {}, {
        withCredentials: true
      });
        localStorage.removeItem('user');

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
  }

  return (
    <nav className="w-full shadow px-4 md:px-10 py-4 bg-white">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src={assets.logo} alt="logo" className="w-26 h-6" />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 ml-30">
          <Link to="/" className="hover:text-blue-600 duration-200">Home</Link>
          <Link to="/all-jobs" className="hover:text-blue-600 duration-200">Jobs</Link>
          <Link to="/about" className="hover:text-blue-600 duration-200">About</Link>
        </div>

        {/* Desktop Search + Login/Profile */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center border rounded-full px-3 py-1 bg-white shadow-sm">
            <input
              type="text"
              placeholder="Search Jobs...."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSearch}
              className="outline-none px-2 text-sm w-32"
            />
          </div>

          {!user && (
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
                Login
              </button>
            </Link>
          )}

          {user && (
            <div onClick={() => setShow(!show)} className="rounded-full cursor-pointer">
              <img src={user.image||assets.user_profile} alt="User Profile" className="w-8 h-8 rounded-full" />
            </div>
          )}
        </div>

        {/* User Dropdown (Responsive) */}
        {show && (
          <div className="fixed md:absolute top-16 right-5 z-50 bg-white shadow-xl rounded-lg p-4 w-[85%] md:w-48 transition duration-300">
            <Link
              to="/my-profile"
              onClick={() => setShow(false)}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              to="/my-applications"
              onClick={() => setShow(false)}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              My Applications
            </Link>
            <p
              onClick={logout}
              className="block px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </p>
            
          </div>
        )}

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">Home</Link>
          <Link to="/all-jobs" onClick={() => setMenuOpen(false)} className="block">Jobs</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block">About</Link>


          {!user && (
            <Link to="/login">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full mt-2"
              >
                Login
              </button>
            </Link>
          )}

          {user && (
            <div className="mt-2 space-y-2">
              <Link
                to="/my-profile"
                onClick={() => { setMenuOpen(false); setShow(false); }}
                className="block hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/my-applications"
                onClick={() => { setMenuOpen(false); setShow(false); }}
                className="block hover:bg-gray-100"
              >
                My Applications
              </Link>
              <p
                onClick={logout}
                className="block text-red-500 hover:bg-gray-100"
              >
                Logout
              </p>
            </div>
          )}
          <div className="flex items-center border rounded-full px-3 py-1 bg-white shadow-sm mt-2">
            <input
              type="text"
              placeholder="Search Jobs...."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSearch}
              className="outline-none px-2 text-sm w-full"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
