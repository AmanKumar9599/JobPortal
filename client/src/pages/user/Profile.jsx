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
    resume: '',
    image: null,
  });

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
        resume: user.resume || '',
        image: user.image || null,
      });
    }
  }, [user]);



  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image" && files && files[0]) {
    setFormData({ ...formData, image: files[0] });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formPayload = new FormData();

    if (formData.image instanceof File) {
      formPayload.append("image", formData.image);
    }

    // Add all other fields (resume as URL string)
    for (const key in formData) {
      if (key !== "image" && formData[key]) {
        formPayload.append(key, formData[key]);
      }
    }

    const { data } = await axios.put(
      `${URI}/api/user/update-profile`,
      formPayload,
      {
        withCredentials: true,
        // ❌ don’t manually set content-type, axios handles it
      }
    );

    setUser(data.user);
    toast.success("Profile updated successfully!");
  } catch (error) {
    toast.error("Failed to update profile");
    console.error(error);
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
          <label className="block text-gray-700">Resume (Google Drive Link)</label>
          <input
            type="url"
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Share your resume (Google Drive link)"
          />
          {formData.resume && (
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
