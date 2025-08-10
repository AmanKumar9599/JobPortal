const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const cloudinary = require('../config/cloudinary');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all details',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log("Checking for existing user:", existingUser);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default empty image URL
    let imageUrl = "";

    // Image upload (optional)
    if (req.files && req.files.image) {
      try {
        const uploadResult = await cloudinary.uploader.upload(
          req.files.image.tempFilePath,
          { folder: "user-profiles" }
        );
        imageUrl = uploadResult.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr);
        return res.status(500).json({
          success: false,
          message: 'Image upload failed',
        });
      }
    }

    // Create and save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      image: imageUrl,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        image: newUser.image,
      },
    });

  } catch (error) {
    console.error('Error in registerUser:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};






const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all details'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // ✅ Corrected: Store user._id in the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    console.log("Generated token:", token);

   res.cookie('token', token, {
  httpOnly: true,
  path: '/',
  maxAge: 24 * 60 * 60 * 1000,
});

    console.log("cookie set with token:", token);

    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user,
      token
    });

  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};




const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      path: '/', // very important to specify path if set in cookie
    });
    
    return res.status(200).json({
      success: true,
      message: 'User logged out successfully'
    });
  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



module.exports = {
    registerUser,
    loginUser,
    logout
};