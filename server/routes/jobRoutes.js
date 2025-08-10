const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { postJob ,getEmployerJobs,deleteJob,getAllJobs} = require('../controllers/jobController');

// Add authentication middleware here if needed

router.post('/post-job', auth,postJob);
router.get('/all',auth, getEmployerJobs);
router.get('/all-jobs', getAllJobs);
router.delete('/delete-job/:id',auth, deleteJob);

module.exports = router;
