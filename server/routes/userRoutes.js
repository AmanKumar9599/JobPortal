const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {getLoggedInUser,getAllStudents,updateProfile} = require('../controllers/userController');

router.get('/me',auth, getLoggedInUser);
router.put('/update-profile',auth, updateProfile);
router.get('/all-students',auth, getAllStudents);

module.exports = router;
