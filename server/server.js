const express = require('express');
const app = express();
const cors = require ('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')

const fileUpload = require("express-fileupload");

app.use(fileUpload({
  useTempFiles: true
}));


app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

app.use('/api/auth',authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.get('/',(req,res)=>{
    res.send('welcome to the server')
})

connectDB();