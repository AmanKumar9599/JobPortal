import React, { useState } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    education: "",
    experience: "",
    skills: "",
    about: "",
    resume: null,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    console.log("FormData ready to be sent:", formData);
    // Axios or fetch logic to send `data` goes here
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text inputs */}
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

        {/* About */}
        <div>
          <label className="block text-gray-700">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Write something about yourself"
          ></textarea>
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-gray-700">Resume (PDF)</label>
          <input
            type="file"
            name="resume"
            accept=".pdf"
            onChange={handleChange}
            className="w-full mt-1"
          />
        </div>

        {/* Image Upload */}
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
              src={URL.createObjectURL(formData.image)}
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
