const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    
  },
  logo: {
    type: String,
    required: true,
  },
 
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
