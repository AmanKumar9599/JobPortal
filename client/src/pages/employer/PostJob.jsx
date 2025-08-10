import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
//   const [companies, setCompanies] = useState(["ABC Company", "XYZ Tech", "DataWorks"]); // Replace with API call if needed
    const {jobsData,URI} =useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    salary: '',
    type: 'Full-time',
    requirements: '',
    benefits: '',
    jobLevel: 'Senior',
    education: '',
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${URI}/api/jobs/post-job`, formData, {
      withCredentials: true,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      navigate('/employer/jobs-list');
      // Optionally reset form here
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error('Failed to post job');
    console.error(error);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Post a Job</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          required
          value={formData.title}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <select
          name="company"
          required
          value={formData.company}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Select Company</option>
          {jobsData.map((job) => (
            <option key={job._id} value={job.name}>
              {job.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          value={formData.location}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          required
          value={formData.salary}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <select
          name="type"
          required
          value={formData.type}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>

        <select
          name="jobLevel"
          required
          value={formData.jobLevel}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Select Level</option>
          <option value="Junior">Junior</option>
          <option value="Medium">Medium</option>
          <option value="Senior">Senior</option>
        </select>

        <input
          type="text"
          name="education"
          placeholder="Education"
          required
          value={formData.education}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g. 5 years)"
          required
          value={formData.experience}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          required
          value={formData.description}
          onChange={handleChange}
          className="border rounded p-2 col-span-1 md:col-span-2"
        />

        <textarea
          name="requirements"
          placeholder="Requirements (comma separated)"
          required
          value={formData.requirements}
          onChange={handleChange}
          className="border rounded p-2 col-span-1 md:col-span-2"
        />

        <textarea
          name="benefits"
          placeholder="Benefits (comma separated)"
          required
          value={formData.benefits}
          onChange={handleChange}
          className="border rounded p-2 col-span-1 md:col-span-2"
        />


        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer col-span-1 md:col-span-2"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
