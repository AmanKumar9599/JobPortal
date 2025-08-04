import { createContext, useEffect, useState} from "react";
import { categories } from '../assets/assets'
import { jobs } from '../assets/assets'
import { applicants } from '../assets/assets'
import axios from 'axios';



export const AppContext = createContext();
const URI = import.meta.env.VITE_BACKEND_URL;

export const AppContextProvider = ({children})=>{

    const [user,setUser] = useState(false);
    const[employer,setEmployer] = useState(false);
    const[Admin,setAdmin] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]);
    const [jobsData, setJobsData] = useState([]);
    const [query,setQuery] = useState(''); 
    const [isJobApplied,setIsJobApplied] = useState(false);
    const [applicantsArr,setApplicants] = useState([]);


    const fetchApplicants = () =>{
        setApplicants(applicants);
    }
   

    const fetchCategories =  () => {
      setCategoriesData(categories);
    };

    const fetchJobs =  () => {
      setJobsData(jobs);
    };


    const handleDelete = (id) => {
  setJobsData(prev => prev.filter(job => job._id !== id));
};

    useEffect(() => {
        fetchCategories();
        fetchJobs();
        fetchApplicants();
    }, []);

    const value = {
        user,
        setUser,
        employer,
        setEmployer,
        Admin,
        setAdmin,
        jobsData,
        categoriesData,
        query,
        setQuery,
        isJobApplied,
        setIsJobApplied,
        applicantsArr,
        setApplicants,
        handleDelete,
        axios,
        URI
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}