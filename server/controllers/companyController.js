const Company = require('../models/companyModel');
const cloudinary = require('../config/cloudinary');

const addCompany = async (req, res) => {
  try {
    const { name, about } = req.body;

    if (!name || !about) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all details',
      });
    }

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: 'Company already exists',
      });
    }

    if (!req.files || !req.files.logo) {
      return res.status(400).json({
        success: false,
        message: 'Logo is required',
      });
    }

    const logoFile = req.files.logo;
    let uploadResult;

    if (logoFile.tempFilePath) {
      uploadResult = await cloudinary.uploader.upload(logoFile.tempFilePath, {
        folder: 'company-logos'
      });
    }

    const newCompany = new Company({
      name,
      about,
      logo: uploadResult.secure_url,
      createdBy: req.user._id
    });

    await newCompany.save();

    return res.status(201).json({
      success: true,
      message: 'Company added successfully',
      company: newCompany,
    });

  } catch (error) {
    console.error('Error in addCompany:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



const getEmployerCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ createdBy: req.user._id });
    // console.log("User in getEmployerCompanies:", req.user._id);
    // console.log(req.user);
    // console.log(companies);
    res.status(200).json({
      success: true,
      companies: companies || [], // always return an array
    });

  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};




const getAllCompanies =async (req,res)=>{
    try{
        const companies = await Company.find();
        if(!companies){
            return res.status(401).json({success:false,message:"No companies found"});
        }
        return res.json({success:true,companies});
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


const deleteCompany = async(req,res)=>{
    try{
        const {id} = req.params;
        const company = await Company.findByIdAndDelete(id);
        if(!company){
            return res.json({success:false, message:"company not found"});
        }
        return res.json({
            success:true,
            message:"Company deleted successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


module.exports={
    getAllCompanies,
    getEmployerCompanies,
    deleteCompany,
    addCompany
}