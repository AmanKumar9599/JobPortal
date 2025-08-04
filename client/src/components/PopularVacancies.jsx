import React from 'react';

const vacancies = [
  { _id: 1, count: "45,600", title: "Web Development" },
  { _id: 2, count: "32,800", title: "Mobile App Development" },
  { _id: 3, count: "27,400", title: "UI/UX Design" },
  { _id: 4, count: "22,900", title: "Data Science" },
  { _id: 5, count: "19,700", title: "Digital Marketing" },
  { _id: 6, count: "15,200", title: "Cybersecurity" },
  { _id: 7, count: "12,500", title: "Project Management" },
  { _id: 8, count: "10,300", title: "Cloud Computing" },
  { _id: 9, count: "8,900", title: "Content Writing" },
  { _id: 10, count: "7,800", title: "Accounting & Finance" },
];

const PopularVacancies = () => {
  return (
    <div className="bg-white py-10 px-4 sm:p-6 lg:px-8 ">
      <h2 className="text-3xl font-bold text-center my-10 ">Popular Vacancies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        {vacancies.map((vacancy) => (
          <div
            key={vacancy._id}
            className="bg-gradient-to-b from-white via-indigo-50 to-white p-4 rounded-xl shadow-sm hover:shadow-md transition "
          >
            <p className="text-xl font-bold text-indigo-600 text-center">{vacancy.count}</p>
            <p className="text-gray-700 mt-1 text-center">{vacancy.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularVacancies;
