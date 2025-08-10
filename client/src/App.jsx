import React from 'react'
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

const App = () => {
  const employerPath=useLocation().pathname.includes('/employer');
  return (
    <div >
      <div className='sticky top-0 z-50 bg-white shadow-md'>
      {(employerPath)? <EmpNavbar/> : <Navbar/>}
      
      </div>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/all-jobs' element={<AllJobs/>}/>
        <Route path='/job-details/:id' element={<JobDetails/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>

        {/* user routes */}
        <Route path='/my-profile' element={<Profile/>}/>
        <Route path='/my-applications' element={<Applications/>}/>

        {/* employer layout */}
        <Route path='/employer' element={<EmployerLayout/>}>
        <Route index element={<AllCompanies/>}/>
        <Route path='add-company' element={<AddCompany/>}/>
        <Route path='post-job' element={<PostJob/>}/>
        <Route path='applicants' element={<Applicants/>}/>
        <Route path='jobs-list' element={<JobList/>}/>
        <Route path='companies' element={<CompaniesList/>}/>
        </Route>
      </Routes>

      {(employerPath)? <EmpFooter/> : <Footer/>} 
      <Toaster/>
    </div>
  )
}

export default App
