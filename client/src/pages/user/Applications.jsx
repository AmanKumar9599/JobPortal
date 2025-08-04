import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Applications = () => {
  const { jobsData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="px-4 py-10 sm:px-10 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Applied Jobs</h1>

      {jobsData.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
          <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Job Profile</th>
                <th className="px-6 py-4 text-left font-semibold">Company</th>
                <th className="px-6 py-4 text-left font-semibold">Type</th>
                <th className="px-6 py-4 text-left font-semibold">Location</th>
                <th className="px-6 py-4 text-left font-semibold">Salary</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobsData.map((job, index) => (
                <tr
                  key={index}
                  onClick={() => navigate(`/job-details/${job._id}`)}
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-6 py-4 text-gray-800 truncate">{job.title}</td>
                  <td className="px-6 py-4 text-gray-700">{job.company}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${job.type === 'Full-time' ? 'bg-cyan-100 text-cyan-600' :
                        job.type === 'Part-time' ? 'bg-indigo-100 text-indigo-600' :
                        'bg-gray-200 text-gray-600'}`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{job.location}</td>
                  <td className="px-6 py-4">{job.salary}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${job.status === 'Accepted' ? 'bg-green-100 text-green-600' :
                        job.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'}`}>
                      {job.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">You haven’t applied for any jobs yet.</p>
      )}
    </div>
  );
};

export default Applications;
