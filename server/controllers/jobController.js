const Job = require('../models/jobModel');
const Company = require('../models/companyModel');

const postJob = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      location,
      salary,
      type,
      requirements,
      benefits,
      jobLevel,
      education,
      experience,
    } = req.body;

    // Basic validation
    if (
      !title || !company || !description || !location || !salary || !type ||
      !requirements || !benefits || !jobLevel || !education || !experience
    ) {
      return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    // Convert comma separated strings to arrays for requirements and benefits
    const reqArray = requirements.split(',').map(item => item.trim());
    const benArray = benefits.split(',').map(item => item.trim());

    const companyDoc = await Company.findOne({ name: company });
    if (!companyDoc) {
      return res.status(400).json({ success: false, message: 'Company not found' });
    }


    const newJob = new Job({
      title,
      company,
      description,
      location,
      salary,
      type,
      requirements: reqArray,
      benefits: benArray,
      jobLevel,
      education,
      experience,
      createdBy: req.user._id,
      image:companyDoc.logo, // Assuming companyDoc has a logo field
    });

    await newJob.save();

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      job: newJob,
    });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({createdBy:req.user._id}); // fetch all jobs from DB
    res.status(200).json({
      success: true,
      message: 'Jobs fetched successfully',
        jobs,   
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
    });
  }
};



const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find(); // fetch all jobs from DB
    console.log(jobs);
    res.status(200).json({
      success: true,
      message: 'Jobs fetched successfully',
      jobs,   
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
    });
  }
};




const deleteJob = async(req,res)=>{
    try{
         const {id} = req.params;
        const job = await Job.findByIdAndDelete(id);
        if(!job){
            return res.json({success:false, message:"Job not found"});
        }
        return res.json({
            success:true,
            message:"Job deleted successfully"
        })
    }
    catch(error){
        console.error('Error deleting job:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}










module.exports = { getEmployerJobs ,postJob,deleteJob,getAllJobs};
// module.exports = { postJob };
