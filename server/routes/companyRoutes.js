const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {getAllCompanies,deleteCompany,getEmployerCompanies,addCompany} = require('../controllers/companyController');

router.post('/add',auth, addCompany);
router.get('/get-employer-companies',auth, getEmployerCompanies);
router.get('/all',auth, getAllCompanies);
router.delete('/delete/:id',auth,deleteCompany);

module.exports = router;
