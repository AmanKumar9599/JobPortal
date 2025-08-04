const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all details',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let imageUrl = "";

    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path);
      imageUrl = imageUpload.secure_url;
    }

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
      user: newUser,
    });

  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please fill all details'
            });
        }
        const user = await User.findOne({email});

        if(!user){
             return res.status(400).json({
                success:false,
                message:'User not found'
            });
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:'Invalid credentials'
            });
        }
        const token  = jwt.sign({email:user.email},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.cookie('token',token,{
            httpOnly:true,
        })
        return res.status(200).json({
            success:true,
            message:'User logged in successfully',
            user,
            token
        });
    }
    catch(error){
        console.error('Error in loginUser:', error);
        res.status(500).json({success:false, message: 'Internal server error'});
    }
}


const logout = async (req,res) =>{
    try{
        res.clearCookie('token');
        return res.status(200).json({
            success:true,
            message:'User logged out successfully'
        })
    }
    catch(error){
         console.error('Error in loginUser:', error);
        res.status(500).json({success:false, message: 'Internal server error'});
    }
}

module.exports = {
    registerUser,
    loginUser,
    logout
};