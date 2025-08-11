const express = require('express');
const {
  applyForJob,
  getApplications,
  updateApplicationStatus,
  fetchAppliedJobs,
  checkIfApplied
} = require('../controllers/applicantController');

const auth= require('../middleware/auth'); // to get req.user
const router = express.Router();

router.post('/apply', auth, applyForJob);
router.get('/applicants', auth, getApplications);
router.patch('/:id/status', auth, updateApplicationStatus);
router.get('/applied-jobs',auth,fetchAppliedJobs);
router.get('/check/:id',auth,checkIfApplied);

module.exports = router;
