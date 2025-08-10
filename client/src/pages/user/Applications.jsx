import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Applications = () => {
  const { appliedJobs } = useContext(AppContext);
  const navigate = useNavigate();

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-600',
    Rejected: 'bg-red-100 text-red-600',
    Accepted: 'bg-green-200 text-green-700'
  };

  return (
    <div className="px-4 py-10 sm:px-10 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Applied Jobs</h1>

      {appliedJobs.length > 0 ? (
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
              {appliedJobs.map((app, index) => {
                const status = app.status || 'pending';
                return (
                  <tr
                    key={index}
                    onClick={() => navigate(`/job-details/${app.job?._id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition"
                  >
                    <td className="px-6 py-4 text-gray-800 truncate">{app.job?.title || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-700">{app.job?.company || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                        ${app.job?.type === 'Full-time' ? 'bg-cyan-100 text-cyan-600' :
                          app.job?.type === 'Part-time' ? 'bg-indigo-100 text-indigo-600' :
                          'bg-gray-200 text-gray-600'}`}>
                        {app.job?.type || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{app.job?.location || "N/A"}</td>
                    <td className="px-6 py-4">{app.job?.salary || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                        ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
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
