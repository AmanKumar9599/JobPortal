import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


const AllJobs = () => {
const {jobsData,query} = useContext(AppContext);

let filteredJobs = jobsData.filter(job =>{
  return job.title.toLowerCase().includes(query.toLowerCase()) || job.company.toLowerCase().includes(query.toLowerCase()) || job.location.toLowerCase().includes(query.toLowerCase()) || Number(job.salary.replace('$', '').replace(',',''))>= Number(query);

})



const navigate = useNavigate();
  return (
    <div>
      <h1 className='m-10 text-3xl font-bold text-center'>Available Jobs</h1>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:m-15 sm:m-10 px-4 md:px-10'>

      {
        filteredJobs.length===0?<p>No jobs available</p>:
        filteredJobs.map((job) => (
          <div
          key={job._id}
            onClick={() => navigate(`/job-details/${job._id}`)}
            className="w-full  bg-gradient-to-r from-indigo-100 to-white border border-indigo-200 shadow hover:shadow-xl rounded-xl p-5 cursor-pointer transition duration-300"
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
        ))
        
      }
      </div>
    </div>
  )
}

export default AllJobs
