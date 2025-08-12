import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const Profile = () => {
  const { user, URI, axios, setUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    education: '',
    experience: '',
    skills: '',
    about: '',
    resume: null,
    image: null,
  });

  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        education: user.education || '',
        experience: user.experience || '',
        skills: user.skills || '',
        about: user.bio || '',
        resume: user.resume || null,
        image: user.image || null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          formPayload.append(key, formData[key]);
        }
      }

      const { data } = await axios.put(`${URI}/api/user/update-profile`, formPayload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data?.user) {
        setUser(data.user);
        toast.success('Profile updated successfully!');
      } else {
        toast.error(data?.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while updating profile');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'phone', 'location', 'education', 'experience', 'skills'].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Write something about yourself"
          />
        </div>

        <div>
          <label className="block text-gray-700">Resume (PDF)</label>
          <input
            type="file"
            name="resume"
            accept=".pdf"
            onChange={handleChange}
            className="w-full mt-1"
          />
          {formData.resume && typeof formData.resume === 'string' && (
            <div className="mt-2">
              <a
                href={formData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 inline-block mb-2"
              >
                View Current Resume (Open in new tab)
              </a>

        
                 

            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Profile Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full mt-1"
          />
          {formData.image && (
            <img
              src={
                formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image
              }
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-md border"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full mt-4"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
