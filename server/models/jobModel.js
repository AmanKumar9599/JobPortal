const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true 
},
  company: { 
    type: String,
    required: true 
  },
  description: { 
    type: String,
    required: true 
  },
  location: { 
    type: String,
    required: true 
  },
  salary: { 
    type: String,
    required: true 
  },
  type: { 
    type: String,
    required: true 
  },
  requirements: { 
    type: [String],
    required: true 
  },
  benefits: { 
    type: [String],
    required: true 
  },
  jobLevel: { 
    type: String,
    required: true 
  },
  education: { 
    type: String,
    required: true 
  },
  experience: { 
    type: String,
    required: true 
  },
  postedAt: { 
    type: Date,
    default: Date.now 
  },
  image:{
    type:String,
    ref:'Company'
  },
  createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

});

module.exports = mongoose.model('Job', jobSchema);
