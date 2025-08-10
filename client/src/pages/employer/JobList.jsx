import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';

const JobList = () => {
  const { jobList,setJobList,loadingJobs,URI } = useContext(AppContext);
  if(loadingJobs){
    return <Loading />
  }

  const handleDelete = async (jobId)=>{
    try {
      const { data } = await axios.delete(`${URI}/api/jobs/delete-job/${jobId}`, {
        withCredentials: true
      });

      if (data.success) {
        setJobList(prev => prev.filter(c => c._id !== jobId)); // ✅ latest state
        toast.success(data.message || "Job deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete job");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting job");
    }
  };

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
            {jobList.map((job, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{job.title}</td>
                <td className="px-4 py-3">{job.company}</td>
                <td className="px-4 py-3">{job.type}</td>
                <td className="px-4 py-3">{job.location}</td>
                <td className="px-4 py-3 text-green-700 font-medium">{job.salary}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(job._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {jobList.length === 0 && (
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
