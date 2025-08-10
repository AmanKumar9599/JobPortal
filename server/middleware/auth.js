const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("Token received:", token);
    if(!token){
        return res.status(401).json({
            success:false,
            message:'Unauthorized access, please login'
        });
    }   
    try{
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                success:false,
                message:'Unauthorized access'
            });
        }
        const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // ✅ This is the key line
        // req.user=decode;
        console.log("User authenticated:", req.user);
        next();

    }
    catch(error){
         console.error('Error in auth middleware:', error);
        res.status(500).json({success:false, message: 'Internal server error'});
    }
}

module.exports = auth;
