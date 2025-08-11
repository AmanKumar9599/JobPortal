const Application = require('../models/applicantsModel');
const Job = require('../models/jobModel');
const User = require('../models/userModel');
const mongoose =require('mongoose')

const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.user._id;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const user = await User.findById(userId);
    if (!user.phone || !user.resume) {
      return res.status(400).json({
        success: false,
        message: "Please complete your profile with phone number and resume before applying"
      });
    }

    const existingApplication = await Application.findOne({ job: jobId, user: userId });
    if (existingApplication) {
      return res.status(400).json({ success: false, message: "You have already applied for this job" });
    }

    const application = new Application({
      job: jobId,
      user: userId,
      status: "Pending",
      appliedAt: new Date()
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application
    });
  } catch (error) {
    console.error('Error in applyForJob:', error);
    res.status(500).json({ success: false, message: "Error applying for job", error: error.message });
  }
};




// Get applications for employer's jobs
const getApplications = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id });
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('job', 'title company location')
      .populate('user', 'name email phone resume')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching applications",
      error
    });
  }
};

// Update application status


const updateApplicationStatus = async (req, res) => {
  const { id } = req.params; // applicationId
  const { status } = req.body;

  try {
    // 1. Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid application ID" });
    }

    // 2. Find application and populate job
    const application = await Application.findById(id).populate("job");
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    // 3. Check job exists and belongs to logged-in user
    if (!application.job || !application.job.createdBy) {
      return res.status(400).json({ success: false, message: "Job data missing" });
    }
    if (application.job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this application" });
    }

    // 4. Update status
    application.status = status;
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Status updated",
      application
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



// fetch appliedjobs

const fetchAppliedJobs = async (req,res) =>{
    const userId = req.user._id;
    try{
        const applications = await Application.find({ user: userId })
  .populate('job', 'title company location type salary') // all in one string
  .sort({ appliedAt: -1 });


        return res.status(200).json({
            success: true,
            applications
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Error fetching applied jobs",
            error: err.message
        });
    }
}


const checkIfApplied = async (req, res) => {
  try {
    const userId = req.user.id;  // assuming you get user id from auth middleware
    const jobId = req.params.id;

    // Check if application exists
    const applied = await Application.exists({ user: userId, job: jobId });

    res.status(200).json({ success: true, applied });
  } catch (error) {
    console.error('Error checking application:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



module.exports = {
  applyForJob,
  getApplications,
  updateApplicationStatus,
  fetchAppliedJobs,
  checkIfApplied
};
