import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


const Signup = () => {
  const {axios,URI} = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    password: '',
    image: null,
  });

  const changeHandler = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('email',formData.email);
    formPayload.append('role',formData.role);
    formPayload.append('password',formData.password);
    if (formData.image) {
      formPayload.append('image', formData.image);
    }
    try{

      const {data} = await axios.post(`${URI}/api/auth/register`, formPayload,{
       withCredentials: true,
       headers: {
         'Content-Type': 'multipart/form-data'
       }
      });
      console.log("Signup response:", data);
      if(data.success){
        toast.success(data.message);
        navigate('/login');
      }
      else{
        toast.success("user already exists");
        console.log('eror in signup:', data);
      }
    }
    catch(err){
      console.log(err)
      toast.error("user already exists");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        {/* Name */}
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={changeHandler}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={changeHandler}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={changeHandler}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="student">Student</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={changeHandler}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       {/* Image Upload */}
<div>
  <label className="block text-sm mb-1 font-medium text-gray-700">Profile Image</label>

  <div className="flex items-center gap-4">
    {/* Image preview (if selected) */}
    {formData.image && (
      <img
        src={URL.createObjectURL(formData.image)}
        alt="Preview"
        className="w-20 h-20 rounded-full object-cover border"
      />
    )}
    {/* File input */}
    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
      choose file
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={changeHandler}
        className="hidden"
      />
    </label>
  </div>

  <p className="text-xs text-gray-500 mt-1">Optional. JPG, PNG under 2MB.</p>
</div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

         <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
