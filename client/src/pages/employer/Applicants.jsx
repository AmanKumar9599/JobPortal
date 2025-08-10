import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const Applicants = () => {
  const { applicantsArr, fetchApplicants, updateApplicantStatus } = useContext(AppContext);

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Applicants List</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Applied Job</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Resume</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicantsArr.map((applicant) => (
              <tr key={applicant._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{applicant.user?.name}</td>
                <td className="px-4 py-3">{applicant.user?.email}</td>
                <td className="px-4 py-3">{applicant.user?.phone}</td>
                <td className="px-4 py-3">{applicant.job?.title}</td>
                <td className="px-4 py-3">
                  {applicant.appliedAt.substring(0,10)}
                </td>
                <td className="px-4 py-3">
                  <a href={applicant.user?.resume} target="_blank" className="text-blue-600 underline">
                    View
                  </a>
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[applicant.status?.toLowerCase()] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {applicant.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                 <select
  value={applicant.status}
  onChange={(e) => {
    const newStatus = e.target.value;
    updateApplicantStatus(applicant._id, newStatus);
  }}
  className="border px-2 py-1 rounded"
>
  <option value="Pending">Pending</option>
  <option value="Accepted">Accepted</option>
  <option value="Rejected">Rejected</option>
</select>

                </td>
              </tr>
            ))}
            {applicantsArr.length === 0 && (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No applicants yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicants;
