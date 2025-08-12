import { createContext, useEffect, useState, useCallback } from "react";
import { categories } from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const AppContext = createContext();
const URI = import.meta.env.VITE_BACKEND_URL;

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [query, setQuery] = useState('');
  const [isJobApplied, setIsJobApplied] = useState(false);
  const [applicantsArr, setApplicants] = useState([]);
  const [employerCompanies, setEmployerCompanies] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [reload, setReload] = useState(false);

  // helper to trigger reload from anywhere
  const triggerReload = useCallback(() => {
    setReload(prev => !prev);
  }, []);

  const fetchLoggedInUser = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/user/me`, { withCredentials: true });
      setUser(data.success ? data.user : false);
    } catch (error) {
      console.error('Error fetching logged in user:', error);
    } finally {
      setLoadingUser(false);
    }
  };

  const getEmployerCompanies = async (showToast = false) => {
    setLoadingJobs(true);
    try {
      const { data } = await axios.get(`${URI}/api/company/get-employer-companies`, { withCredentials: true });
      if (data.success) {
        setEmployerCompanies(data.companies);
        if (showToast) toast.success(data.message);
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchApplicants = async (showToast = false) => {
    try {
      const { data } = await axios.get(`${URI}/api/applications/applicants`, { withCredentials: true });
      if (data.success) {
        setApplicants(data.applications);
        if (showToast) toast.success("Applicants loaded");
      } else toast.error(data.message || "Failed to fetch applicants");
    } catch {
      toast.error("Error fetching applicants");
    }
  };

  const updateApplicantStatus = async (applicantId, status) => {
    try {
      const { data } = await axios.patch(
        `${URI}/api/applications/${applicantId}/status`,
        { status },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Status updated");
        triggerReload();
      } else toast.error(data.message || "Failed to update status");
    } catch {
      toast.error("Error updating status");
    }
  };

  const fetchCategories = () => setCategoriesData(categories);

  const fetchAppliedJobs = async (showToast = false) => {
    try {
      const { data } = await axios.get(`${URI}/api/applications/applied-jobs`, { withCredentials: true });
      if (data.success) {
        setAppliedJobs(data.applications);
        if (showToast) toast.success("Applied jobs loaded");
      } else toast.error(data.message || "Failed to fetch applied jobs");
    } catch {
      toast.error("Error fetching applied jobs");
    }
  };

  const fetchJobList = async (showToast = false) => {
    setLoadingJobs(true);
    try {
      const { data } = await axios.get(`${URI}/api/jobs/all`, { withCredentials: true });
      if (data.success) {
        setJobList(data.jobs);
        if (showToast) toast.success(data.message);
      } else toast.error(data.message || "Failed to fetch jobs");
    } catch {
      toast.error("Error fetching jobs");
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchAllJobs = async (showToast = false) => {
    try {
      const { data } = await axios.get(`${URI}/api/jobs/all-jobs`);
      if (data.success) {
        setAllJobs(data.jobs);
        if (showToast) toast.success(data.message);
      } else toast.error(data.message || "Failed to fetch jobs");
    } catch {
      toast.error("Error fetching all jobs");
    }
  };

  const fetchAllCompanies = async (showToast = false) => {
    setLoadingJobs(true);
    try {
      const { data } = await axios.get(`${URI}/api/company/all`, { withCredentials: true });
      if (data.success) {
        setJobsData(data.companies);
        if (showToast) toast.success(data.message);
      } else toast.error(data.message || "Failed to fetch jobs");
    } catch {
      toast.error("Error fetching jobs");
    } finally {
      setLoadingJobs(false);
    }
  };

  // Example of add/update/delete functions with reload
  const addJob = async (jobData) => {
    try {
      const { data } = await axios.post(`${URI}/api/jobs`, jobData, { withCredentials: true });
      if (data.success) {
        toast.success("Job added");
        triggerReload();
      } else toast.error(data.message);
    } catch {
      toast.error("Error adding job");
    }
  };

  const addCompany = async (companyData) => {
    try {
      const { data } = await axios.post(`${URI}/api/company`, companyData, { withCredentials: true });
      if (data.success) {
        toast.success("Company added");
        triggerReload();
      } else toast.error(data.message);
    } catch {
      toast.error("Error adding company");
    }
  };

  const applyJob = async (jobId) => {
    try {
      const { data } = await axios.post(`${URI}/api/applications/apply`, { jobId }, { withCredentials: true });
      if (data.success) {
        toast.success("Applied to job");
        triggerReload();
      } else toast.error(data.message);
    } catch {
      toast.error("Error applying to job");
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (user?._id) {
      fetchApplicants();
      getEmployerCompanies();
      fetchAppliedJobs();
      fetchJobList();
      fetchAllCompanies();
      fetchAllJobs();
    }
  }, [reload, user]);

  const value = {
    user, setUser, jobsData, setJobsData,
    query, setQuery, isJobApplied, setIsJobApplied,
    applicantsArr, setApplicants, axios, URI,
    employerCompanies, setEmployerCompanies,
    loadingJobs, setLoadingJobs, jobList, setJobList,
    categoriesData, setCategoriesData, allJobs, setAllJobs,
    fetchApplicants, updateApplicantStatus,
    appliedJobs, loadingUser, triggerReload,
    addJob, addCompany, applyJob
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
