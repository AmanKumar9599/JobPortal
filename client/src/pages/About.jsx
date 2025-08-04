import React from 'react'
import { assets } from '../assets/assets' // adjust path if needed

const About = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-10 bg-white">
      
      {/* Text Section */}
      <div className="md:w-1/2 mt-8 md:mt-0">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">About Us</h2>
        <p className="text-gray-600 mb-4">
          Welcome to our job portal where we connect talented individuals with top companies across different industries. Our goal is to provide the best opportunities for job seekers and the best talent for recruiters.
        </p>
        <p className="text-gray-600">
          We focus on simplicity, trust, and efficiency. Whether you're looking for your dream job or the perfect candidate — you're in the right place!
        </p>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center">
        <img src={assets.hero_img} alt="About us" className="max-w-full h-auto rounded-xl shadow-lg" />
      </div>
    </div>
  )
}

export default About
