import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const CompaniesList = () => {
  const { jobsData, setJobsData } = useContext(AppContext);

  // Get unique companies with their logo and about from jobsData
  const uniqueCompanies = [];
  const seen = new Set();

  jobsData.forEach(job => {
    if (!seen.has(job.company)) {
      seen.add(job.company);
      uniqueCompanies.push({
        name: job.company,
        image: job.image,
        description: job.description,
      });
    }
  });

  const handleDelete = (companyName) => {
    const filteredJobs = jobsData.filter(job => job.company !== companyName);
    setJobsData(filteredJobs);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Companies</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr className="text-left text-gray-700">
              <th className="px-4 py-3">Logo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">About</th>
              <th className="px-4 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {uniqueCompanies.map((company, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="w-10 h-10 object-contain"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{company.name}</td>
                <td className="px-4 py-3 text-gray-600">{company.description}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(company.name)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompaniesList;
