import React, { useState } from 'react';

const AddCompany = () => {
  const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [about, setAbout] = useState('');

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    // Add your logic to handle submit (API or state update)
    console.log('Company Name:', companyName);
    console.log('About:', about);
    console.log('Logo:', logo);
    alert('Company added successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Company</h2>

        {/* Logo Upload */}
        <div className="mb-4 ">
          <label className="block mb-2 text-sm font-medium text-gray-700">Company Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 cursor-pointer"
          />
          {logo && <img src={logo} alt="Company Logo" className="h-20 mx-auto mt-2 rounded-full object-cover" />}
        </div>

        {/* Company Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company name"
          />
        </div>

        {/* About */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write something about the company"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
          Add Company
        </button>
      </div>
    </div>
  );
};

export default AddCompany;
