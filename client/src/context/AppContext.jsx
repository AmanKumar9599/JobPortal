import { createContext, useEffect, useState} from "react";
import { categories } from '../assets/assets'
import { applicants } from '../assets/assets'
import axios, { all } from 'axios';
import { toast } from 'react-toastify';



export const AppContext = createContext();
const URI = import.meta.env.VITE_BACKEND_URL;

export const AppContextProvider = ({children})=>{

    const [user,setUser] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]);
    const [jobsData, setJobsData] = useState([]);
    const [query,setQuery] = useState(''); 
    const [isJobApplied,setIsJobApplied] = useState(false);
    const [applicantsArr,setApplicants] = useState([]);
    const [employerCompanies,setEmployerCompanies] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(false);
    const [jobList,setJobList] = useState([]);
    const [allJobs,setAllJobs] = useState([]);
    const [appliedJobs,setAppliedJobs] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);

    // get logged in user
        const fetchLoggedInUser = async () => {
       try {
         const {data} = await axios.get(`${URI}/api/user/me`, {
              withCredentials: true
         });
         if(data.success){
           setUser(data.user);
         }
         else{
          setUser(false);
         }
     
         console.log("User data:", data.user);
       } catch (error) {
         console.error('Error fetching logged in user:', error);
       }
       finally{
        setLoadingUser(false);
       }
     };

     useEffect(() => {
     fetchLoggedInUser();
    }, []);



    const getEmployerCompanies = async()=>{
      setLoadingJobs(true);
      try{
        const {data} = await axios.get(`${URI}/api/company/get-employer-companies`,{
          withCredentials:true
        });
        
        if(data.success){

          setEmployerCompanies(data.companies);
          setLoadingJobs(false);
          toast.success(data.message);
        }
        else{
          toast.error(data.message);
        }
      }catch(err){
        console.error(err);
        toast.error(err.message);
      }
    }



// Fetch applicants from backend
const fetchApplicants = async () => {
  try {
    const { data } = await axios.get(`${URI}/api/applications/applicants`, {
      withCredentials: true
    });

    if (data.success) {
      setApplicants(data.applications); // from backend controller
    } else {
      toast.error(data.message || "Failed to fetch applicants");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error fetching applicants");
  }
};


// Update status
const updateApplicantStatus = async (applicantId, status) => {
  try {
    const { data } = await axios.patch(
      `${URI}/api/applications/${applicantId}/status`,
      { status },
      { withCredentials: true }
    );

    if (data.success) {
      toast.success("Status updated");
      fetchApplicants();   // Refresh applicants list
      fetchAppliedJobs();  // Refresh applied jobs list instantly
    } else {
      toast.error(data.message || "Failed to update status");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error updating status");
  }
};




    const fetchCategories = ()=>{
      setCategoriesData(categories);
    }

    // fetchAppliedJobs
    const fetchAppliedJobs = async () => {
      try {
        const { data } = await axios.get(`${URI}/api/applications/applied-jobs`, {
          withCredentials: true
        });

        if (data.success) {
          setAppliedJobs(data.applications);
        } else {
          toast.error(data.message || "Failed to fetch applied jobs");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching applied jobs");
      }
    };

    const fetchJobList =  async() => {
      setLoadingJobs(true);
      try{
        const {data} = await axios.get(`${URI}/api/jobs/all`,{
          withCredentials:true
        });
        console.log(" data:", data);
        if(data.success){
          setJobList(data.jobs);
          setLoadingJobs(false);
          toast.success(data.message);
        }
        else{
          toast.error(data.message || "Failed to fetch jobs");
        }

      }catch(err){
        toast.error("Error fetching jobs");
      }
    };


    // fetch all jobs
    const fetchAllJobs = async()=>{
      try{
        const {data} = await axios.get(`${URI}/api/jobs/all-jobs`);
        if(data.success){
          setAllJobs(data.jobs);
          toast.success(data.message);
          console.log(data);
        }
        else{
          toast.error(data.message || "Failed to fetch jobs");
        }

      }
      catch(error){

        console.error("Error fetching all jobs", error);
        toast.error("Error fetching all jobs");
      }
    }



// fetch all companies
    const fetchJobs =  async() => {
      // setJobsData(jobs);
      setLoadingJobs(true);
      try{
        const {data} = await axios.get(`${URI}/api/company/all`,{
          withCredentials: true
        });
        
        if(data.success){
          // console.log("Jobs data:", data.jobs);
          setLoadingJobs(false);
          setJobsData(data.companies);
          toast.success(data.message);
          
        } else{
          toast.error(data.message||"Failed to fetch jobs");
        }
      }
      catch(err){
        console.error("Error fetching jobs",err);
        toast.error("Error fetching jobs");
      }
    };


    useEffect(() => {
        fetchJobs();
        fetchCategories();
        fetchAllJobs();
      }, []);
      
      useEffect(() => {
        if (user && user._id) {
          fetchApplicants();
          getEmployerCompanies();
          fetchAppliedJobs();
    fetchJobList();
  }
}, [user]);




    const value = {
        user,
        setUser,
        jobsData,
        setJobsData,
        query,
        setQuery,
        isJobApplied,
        setIsJobApplied,
        applicantsArr,
        setApplicants,
        axios,
        URI,
        employerCompanies,
        setEmployerCompanies,
        loadingJobs,
        setLoadingJobs,
        jobList,
        setJobList,
        categoriesData,
        setCategoriesData,
        allJobs,
        setAllJobs,
        applicantsArr,
        setApplicants,
        fetchApplicants,
        updateApplicantStatus,
        appliedJobs,
        loadingUser

    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}