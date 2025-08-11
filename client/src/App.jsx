import React, { useContext } from 'react'
import {Route,Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import AllJobs from './pages/AllJobs'
import About from './pages/About'
import Signup from './pages/auth/Signup'
import JobDetails from './pages/JobDetails'
import Login from './pages/auth/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {Toaster} from 'react-hot-toast'
import Profile from './pages/user/Profile'
import Applications from './pages/user/Applications'
import EmployerLayout from './pages/employer/EmployerLayout'
import AddCompany from './pages/employer/AddCompany'
import PostJob from './pages/employer/PostJob'
import Applicants from './pages/employer/Applicants'
import JobList from './pages/employer/JobList'
import CompaniesList from './pages/employer/CompaniesList'
import EmpNavbar from './components/EmpNavbar'
import EmpFooter from './components/EmpFooter'
import AllCompanies from './pages/employer/AllCompanies'
import ProtectedRoute from './components/ProtectedRoute'; 
import Unauthorized from './pages/Unauthorized'; 
import { AppContext } from './context/AppContext'
import Loading from './components/Loading'
import NotFound from './pages/NotFound'



const App = () => {
  const employerPath = useLocation().pathname.includes('/employer');
  const {loadingUser} = useContext(AppContext);

  if (loadingUser) {
    // Show loading spinner or blank page while fetching user
    return <Loading/>;
  }

  return (
    <div>
      <div className="sticky top-0 z-50 bg-white shadow-md">
        {employerPath ? <EmpNavbar /> : <Navbar />}
      </div>

      <Routes>
  {/* Public routes */}
  <Route element={<ProtectedRoute allowedRoles={['student','guest']} />}>
  <Route path='/' element={<Home />} />
  <Route path='/all-jobs' element={<AllJobs />} />
  <Route path='/job-details/:id' element={<JobDetails />} />
  <Route path='/about' element={<About />} />
  </Route>
  <Route path='/signup' element={<Signup />} />
  <Route path='/login' element={<Login />} />
  <Route path='/unauthorized' element={<Unauthorized />} />

  {/* Student-only routes */}
  <Route element={<ProtectedRoute allowedRoles={['student']} />}>
    <Route path='/my-profile' element={<Profile />} />
    <Route path='/my-applications' element={<Applications />} />
  </Route>

  {/* Employer-only routes */}
  <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
    <Route path='/employer' element={<EmployerLayout />}>
      <Route index element={<AllCompanies />} />
      <Route path='add-company' element={<AddCompany />} />
      <Route path='post-job' element={<PostJob />} />
      <Route path='applicants' element={<Applicants />} />
      <Route path='jobs-list' element={<JobList />} />
      <Route path='companies' element={<CompaniesList />} />
    </Route>
  </Route>

  <Route path="*" element={<NotFound />} />
</Routes>

      {employerPath ? <EmpFooter /> : <Footer />}
      <Toaster />
    </div>
  );
};

export default App;