import React from 'react';
import { assets } from '../assets/assets';
import  {heroData}  from '../assets/assets';


const Hero = () => {
  return (
    <div className="w-full bg-gray-100 p-10">
      {/* Top Banner Image */}

          <div className='md:flex justify-evenly items-center p-5'>
      <div >
        <img
          src={assets.hero_img}
          alt="Hero"
          className="w-full h-auto object-cover rounded-xl"
          />
          </div>
        <div className='md:w-[40%]'>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 ali">Find a Job that suits your interest & skills</h1>
            <p className='text-gray-600'>Explore thousands of job opportunities tailored for you.</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 px-4 sm:px-12">
        {heroData.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-center bg-white shadow-md rounded-xl p-4 text-center"
          >
            <img src={item.icon} alt={item.title} className="w-10 h-10 mb-2" />
            <h2 className="text-xl font-bold text-blue-600">{item.count}</h2>
            <p className="text-sm text-gray-600">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
