import logo from "./logo.png";
import bag_icon from "./bag_icon.png";
import code_icon from "./code_icon.png";
import correct_icon from "./correct_icon.png";
import data_icon from "./data_icon.png";
import user_icon from "./user_icon.png";
import digital_marketing_icon from "./digital_marketing_icon.png";
import facebook_icon from "./facebook_icon.png";
import finance_icon from "./finance_icon.png";
import google_icon from "./google_icon.png";
import graphic_icon from "./graphic_icon.png";
import hero_img from "./hero_img.png";
import upload_icon from "./upload_icon.png";
import user_img from "./user_img.png";
import mobile_icon from "./mobile_icon.png";
import music_icon from "./music_icon.png";
import save_icon from "./save_icon.png";
import search_icon from "./search_icon.png";
import user_profile from "./user_profile.png";
import video_icon from "./video_icon.png";
import save_later_icon from "./save_later_icon.png";

export const assets = {
  logo,
  save_later_icon,
  hero_img,
  user_profile,
  google_icon,
  facebook_icon,
};
export const companies = [
  {
    _id: 1,
    name: "Tech Solutions Pvt. Ltd.",
    logo: google_icon,
    about:
      "Tech Solutions is a leading provider of innovative software solutions for businesses worldwide.",
  },
  {
    _id: 2,
    name: "Innovatech Inc.",
    logo: facebook_icon,
    about:
      "Innovatech specializes in cutting-edge AI and machine learning solutions for global clients.",
  },
];

export const heroData = [
  {
    _id: 1,
    icon: bag_icon,
    count: "10k",
    title: "Live Jobs",
  },
  {
    _id: 2,
    icon: mobile_icon,
    count: "24k",
    title: "Companies",
  },
  {
    _id: 3,
    icon: user_icon,
    count: "56k",
    title: "Candidates",
  },
  {
    _id: 4,
    icon: bag_icon,
    count: "7k",
    title: "New Jobs",
  },
];

export const vacancies = [
  {
    _id: 1,
    count: "45,600",
    title: "Web Development",
  },
  {
    _id: 2,
    count: "32,800",
    title: "Mobile App Development",
  },
  {
    _id: 3,
    count: "27,400",
    title: "UI/UX Design",
  },
  {
    _id: 4,
    count: "22,900",
    title: "Data Science",
  },
  {
    _id: 5,
    count: "19,700",
    title: "Digital Marketing",
  },
  {
    _id: 6,
    count: "15,200",
    title: "Cybersecurity",
  },
  {
    _id: 7,
    count: "12,500",
    title: "Project Management",
  },
  {
    _id: 8,
    count: "10,300",
    title: "Cloud Computing",
  },
  {
    _id: 9,
    count: "8,900",
    title: "Content Writing",
  },
  {
    _id: 10,
    count: "7,800",
    title: "Accounting & Finance",
  },
];

export const howWorks = [
  {
    _id: 1,
    icon: user_img,
    title: "Create account",
    desc: "Sign up with your email and password",
  },
  {
    _id: 2,
    icon: upload_icon,
    title: "Upload resume",
    desc: "Upload your resume in PDF format",
  },
  {
    _id: 3,
    icon: search_icon,
    title: "Find job",
    desc: "Search for your dream job",
  },
  {
    _id: 4,
    icon: correct_icon,
    title: "Apply Job",
    desc: "Apply for the job you like",
  },
];
export const categories = [
  {
    _id: 1,
    name: "Digital Marketing",
    icon: digital_marketing_icon,
    positions: "20",
  },
  { _id: 2, name: "Finance", icon: finance_icon, positions: "30" },
  { _id: 3, name: "Graphic Design", icon: graphic_icon, positions: "20" },
  { _id: 4, name: "Music", icon: music_icon, positions: "70" },
  { _id: 5, name: "Video", icon: video_icon, positions: "40" },
  { _id: 6, name: "Web Development", icon: code_icon, positions: "100" },
  { _id: 7, name: "Health & Care", icon: save_icon, positions: "48" },
  { _id: 8, name: "Data Science", icon: data_icon, positions: "103" },
];

export const jobs = [
  {
    _id: 1,
    title: "Data Scientist",
    company: "ABC Company",
    description:
      "We are looking for a talented data scientist to join our team.",
    location: "New York, USA",
    salary: "$80,000",
    type: "Full-time",
    image: facebook_icon,
    requirements: [
      "Proficiency in Python and R",
      "Experience with machine learning models",
      "Strong analytical skills",
    ],
    benefits: ["Health insurance", "Flexible working hours", "Annual bonus"],
    postedDate: "2 days ago",
    jobLevel: "Senior",
    education: "Bachelor's degree",
    experience: "5 years",
  },
  {
    _id: 2,
    title: "Frontend Developer",
    company: "Tech Solutions",
    description:
      "We are looking for a creative and passionate Frontend Developer skilled in Reactjs You will be responsible for building engaging, responsive, and user-friendly web interfaces. Strong understanding of modern JavaScript, component-based architecture, and UI/UX design is essential. Join our team to create impactful digital experiences that users love",
    location: "San Francisco, USA",
    salary: "$95,000",
    type: "Full-time",
    image: google_icon,
    requirements: [
      "Strong knowledge of React.js",
      "Experience with Tailwind CSS",
      "Familiarity with REST APIs",
    ],
    benefits: [
      "Remote work options",
      "Health and dental insurance",
      "Stock options",
    ],
    postedDate: "1 week ago",
    jobLevel: "Mid-level",
    education: "Bachelor's degree",
    experience: "3 years",
  },
  {
    _id: 3,
    title: "Backend Developer",
    company: "Innovatech",
    description:
      "Looking for a skilled Node.js developer to work on scalable APIs.",
    location: "London, UK",
    salary: "$85,000",
    type: "Full-time",
    image: facebook_icon,
    requirements: [
      "Proficiency in Node.js and Express.js",
      "Experience with MongoDB",
      "Understanding of microservices",
    ],
    benefits: [
      "Flexible schedule",
      "Paid vacations",
      "Professional development",
    ],
    postedDate: "5 days ago",
    jobLevel: "Mid-level",
    education: "Bachelor's degree",
    experience: "4 years",
  },
  {
    _id: 4,
    title: "UI/UX Designer",
    company: "Creative Minds",
    description:
      "We are hiring a UI/UX designer with a passion for modern web design.",
    location: "Toronto, Canada",
    salary: "$70,000",
    type: "Part-time",
    image: google_icon,
    requirements: [
      "Strong portfolio of UI/UX projects",
      "Proficiency in Figma or Adobe XD",
      "Good understanding of user-centered design",
    ],
    benefits: ["Remote flexibility", "Wellness programs", "Team retreats"],
    postedDate: "3 days ago",
    jobLevel: "Junior",
    education: "Bachelor's degree",
    experience: "2 years",
  },
  {
    _id: 5,
    title: "Digital Marketing Specialist",
    company: "MarketPro",
    description: "Join our marketing team to boost brand awareness and leads.",
    location: "Berlin, Germany",
    salary: "$60,000",
    type: "Contract",
    image: facebook_icon,
    requirements: [
      "SEO and SEM experience",
      "Content creation skills",
      "Familiarity with Google Analytics",
    ],
    benefits: [
      "Work-from-home allowance",
      "Training programs",
      "Performance incentives",
    ],
    postedDate: "1 day ago",
    jobLevel: "Mid-level",
    education: "Bachelor's degree",
    experience: "3 years",
  },
  {
    _id: 6,
    title: "Project Manager",
    company: "AgileWorks",
    description:
      "Seeking a project manager to lead software development teams.",
    location: "Sydney, Australia",
    salary: "$100,000",
    type: "Full-time",
    image: google_icon,
    requirements: [
      "PMP certification preferred",
      "Agile/Scrum knowledge",
      "Excellent communication skills",
    ],
    benefits: ["Company laptop", "Paid parental leave", "Annual salary review"],
    postedDate: "4 days ago",
    jobLevel: "Senior",
    education: "Master's degree",
    experience: "6 years",
  },
];
export const applicants = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    appliedJob: "Frontend Developer",
    applicationDate: "2025-06-28",
    resume: "https://example.com/resume/john_doe.pdf",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sarah Khan",
    email: "sarahkhan@example.com",
    phone: "+1 987 654 321",
    appliedJob: "Backend Developer",
    applicationDate: "2025-06-25",
    resume: "https://example.com/resume/sarah_khan.pdf",
    status: "Reviewed",
  },
  {
    id: 3,
    name: "Ali Hassan",
    email: "alihassan@example.com",
    phone: "+92 300 1234567",
    appliedJob: "UI/UX Designer",
    applicationDate: "2025-06-30",
    resume: "https://example.com/resume/ali_hassan.pdf",
    status: "Shortlisted",
  },
  {
    id: 4,
    name: "Emma Watson",
    email: "emmawatson@example.com",
    phone: "+44 7700 900123",
    appliedJob: "Full Stack Developer",
    applicationDate: "2025-06-20",
    resume: "https://example.com/resume/emma_watson.pdf",
    status: "Pending",
  },
  {
    id: 5,
    name: "Bilal Ahmed",
    email: "bilalahmed@example.com",
    phone: "+92 333 6547890",
    appliedJob: "Data Analyst",
    applicationDate: "2025-06-22",
    resume: "https://example.com/resume/bilal_ahmed.pdf",
    status: "Rejected",
  },
];
