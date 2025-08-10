import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaMoneyBillAlt, FaClock, FaBriefcase, FaGraduationCap, FaUserTie } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const JobDetails = () => {
  const { isJobApplied, setIsJobApplied, allJobs, user, axios, URI } = useContext(AppContext);
  const { id } = useParams();
  const job = allJobs.find((job) => job._id === id);

  const [loading, setLoading] = useState(false);

  // Check from backend if already applied
  useEffect(() => {
    const checkIfApplied = async () => {
      if (!user) return;
      try {
        const { data } = await axios.get(`${URI}/api/applications/check/${id}`, {
          withCredentials: true,
        });
        if (data.applied) {
          setIsJobApplied(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkIfApplied();
  }, [id, user, axios, URI, setIsJobApplied]);

  const handleApply = async () => {
    try {
      if (!user) {
        toast.error('You must be logged in to apply for a job');
        return;
      }

      if (!user.phone || !user.resume) {
        toast.error('Please complete your profile before applying');
        return;
      }

      setLoading(true);

      const { data } = await axios.post(
        `${URI}/api/applications/apply`,
        { jobId: id },
        { withCredentials: true }
      );

      if (data.success) {
        setIsJobApplied(true);
        toast.success(data.message || 'Job applied successfully');
      } else {
        toast.error(data.message || 'Failed to apply');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data?.message || 'Error applying for job');
    } finally {
      setLoading(false);
    }
  };

  if (!job)
    return (
      <div className="text-center py-10 text-lg text-red-500">
        Job not found
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
        <img src={job.image} alt={job.company} className="w-20 h-20 object-contain" />
        <div>
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <p className="text-gray-600">{job.company}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1"><FaMapMarkerAlt /> {job.location}</span>
            <span className="flex items-center gap-1"><FaMoneyBillAlt /> {job.salary}</span>
            <span className="flex items-center gap-1"><FaClock /> {job.postedAt.substring(0, 10)}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Job Description</h3>
        <p className="text-gray-700">{job.description}</p>
      </div>

      {/* Requirements & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Requirements</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {job.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Benefits</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {job.benefits.map((ben, idx) => (
              <li key={idx}>{ben}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Extra Info */}
      <div className="bg-white mt-6 p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
        <div className="flex items-center gap-2"><FaBriefcase className="text-blue-600" /> Job Level: {job.jobLevel}</div>
        <div className="flex items-center gap-2"><FaGraduationCap className="text-green-600" /> Education: {job.education}</div>
        <div className="flex items-center gap-2"><FaUserTie className="text-purple-600" /> Experience: {job.experience}</div>
      </div>

      {/* Apply Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleApply}
          disabled={isJobApplied || loading}
          className={`px-6 py-2 rounded-full text-white ${
            isJobApplied || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Applying...' : isJobApplied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
