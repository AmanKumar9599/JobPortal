import React, { useContext,useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';

const CompaniesList = () => {
  const { employerCompanies, setEmployerCompanies, URI, loadingJobs } = useContext(AppContext);

  if (loadingJobs) {
    return <Loading />;
  }

  const handleDelete = async (companyId) => {
    try {
      const { data } = await axios.delete(`${URI}/api/company/delete/${companyId}`, {
        withCredentials: true
      });

      if (data.success) {
        setEmployerCompanies(prev => prev.filter(c => c._id !== companyId)); // ✅ latest state
        toast.success(data.message || "Company deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete company");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting company");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Companies</h2>
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
            {employerCompanies.length>0?employerCompanies.map((company) => (
              <tr key={company._id} className="border-t">
                <td className="px-4 py-3">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-10 h-10 object-contain"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{company.name}</td>
                <td className="px-4 py-3 text-gray-600">{company.about}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(company._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )):(
              <tr>
                <td colSpan="4" className="text-center py-4">No companies found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompaniesList;
