import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const JobList = () => {
  const { jobsData } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-purple-100 p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">All Jobs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Job Details</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Salary</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobsData.map((job, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{job.title}</td>
                <td className="px-4 py-3">{job.company}</td>
                <td className="px-4 py-3">{job.type}</td>
                <td className="px-4 py-3">{job.location}</td>
                <td className="px-4 py-3 text-green-700 font-medium">{job.salary}</td>
                <td className="px-4 py-3">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {jobsData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No jobs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;
