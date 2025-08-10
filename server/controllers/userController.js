const User = require('../models/userModel');
const cloudinary = require('../config/cloudinary');

const getLoggedInUser = async(req, res) => {
  try {
    const {id} = req.user;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ success:true,user });
    console.log("Full user response:", user);

  } catch (error) {
    console.error('Error fetching logged in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, location, about, education, skills, experience, phone } = req.body;

    const updates = {
      name,
      email,
      location,
      bio: about,
      education,
      skills,
      experience,
      phone,
    };

    // Image Upload
    if (req.files?.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          resource_type: 'image',
          folder: 'profile_images',
        }
      );
      updates.image = result.secure_url;
    }

    // Resume Upload
    if (req.files?.resume) {
      const result = await cloudinary.uploader.upload(
        req.files.resume.tempFilePath,
        {
          resource_type: 'raw',
          folder: 'resumes',
        }
      );
      updates.resume = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.status(200).json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getLoggedInUser,
  updateProfile,
  getAllStudents
};