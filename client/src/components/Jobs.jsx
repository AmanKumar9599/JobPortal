import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const { allJobs } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-white via-indigo-50 to-white pt-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-indigo-700">Featured Jobs</h1>

      <div className="w-full flex flex-wrap justify-center gap-6 px-4 md:px-10">
        {allJobs.map((job) => (
          <div
            key={job._id}
            onClick={() => navigate(`/job-details/${job._id}`)}
            className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] bg-gradient-to-r from-indigo-100 to-white border border-indigo-200 shadow hover:shadow-xl rounded-xl p-5 cursor-pointer transition duration-300"
          >
            <h2 className="text-xl font-semibold text-indigo-800 mb-2">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full">
                {job.type}
              </span>
              <span className="text-gray-700 font-medium">{job.salary}</span>
            </div>
            <div className='flex items-center gap-2 mt-3 text-gray-600'>
                <img src={job.image} alt={job.title} className="w-10 h-10 rounded-lg"/>
                <span>{job.company}</span>
                <span>{job.location}</span>
            </div>    
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
