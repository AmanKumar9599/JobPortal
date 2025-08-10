import React, { useContext,useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loading from '../../components/Loading';

const CompaniesList = () => {
  const { jobsData, loadingJobs } = useContext(AppContext);

  if (loadingJobs) {
    return <Loading />;
  }

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
             
            </tr>
          </thead>
          <tbody>
            {jobsData.length>0?jobsData.map((company) => (
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
