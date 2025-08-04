const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({
                success:false,
                message:'Unauthorized access'
            });
        }
        req.user=decode;
        next();

    }
    catch(error){
         console.error('Error in auth middleware:', error);
        res.status(500).json({success:false, message: 'Internal server error'});
    }
}
