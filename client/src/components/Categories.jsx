import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
// import { categories } from '../assets/assets'

const Categories = () => {
  const { categoriesData } = useContext(AppContext);
  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10 ">Popular Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categoriesData.map((cat) => (
          <div key={cat._id} className="bg-gradient-to-b from-white via-indigo-50 to-white rounded-2xl shadow p-4 hover:shadow-md transition">
            <img src={cat.icon} alt={cat.name} className="w-10 h-10 mb-3" />
            <h3 className="text-lg font-semibold">{cat.name}</h3>
            <p className="text-sm text-gray-500">{cat.positions}+ open positions</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
