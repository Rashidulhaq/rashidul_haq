export const PORTFOLIO_DATA = {
  profile: {
    name: "MD. RASHIDUL HAQ",
    role: "B.Sc in Computer Science and Engineering",
    image: "/images/aboutme.png",
    resumeImage: "/CV/profilecv.jpg",
    github: "https://github.com/Rashidulhaq",
    linkedin: "https://www.linkedin.com/in/rashidulhaq/",
    portfolio: "rashidulhaq.github.io",
    facebook: "https://www.facebook.com/rashidul.haq0",
    instagram: "https://www.instagram.com/md.rashidul.haq/",
    phone: "+8801912-196464",
    email: "rashidulhaq015@gmail.com",
    address: "Mirpur-2, Dhaka 1216",
    overview: "To become a successful expert in the field of Computer Technology by challenging my technical knowledge and skills to ensure personal and professional growth and to contribute to the prosperity of the organization."
  },
  title_skills: ["Software Engineer", "Frontend Developer", "BSc. Engineer", "Tech Enthusiast"],
  bio: "Passionate Software Engineer with a focus on building scalable web applications and AI-driven solutions. Experienced in full-stack development and quality assurance.",
  stats: [
    { label: "TOTAL PROJECTS", value: 23, suffix: "+", desc: "Innovative web solutions crafted" },
    { label: "CERTIFICATES", value: 12, suffix: "+", desc: "Professional skills validated" },
    { label: "YEARS OF EXPERIENCE", value: 1, suffix: "+", desc: "Active in Tech & IT" },
  ],
  experience: [
    {
      role: "Digital Marketing and IT Executive",
      company: "Tahmid IT Park",
      location: "Dhaka, Bangladesh",
      period: "Nov 2025 - Present",
      type: "Full-Time",
      current: true,
      description: "Spearheading digital marketing campaigns, SEO growth, and managing IT infrastructure & tech support.",
      responsibilities: [
        "Digital Marketing & SEO: Execute targeted campaigns, social media growth, and organic search optimization.",
        "IT Operations: Manage workstation setups, system administration, and technical network troubleshooting.",
        "Performance & Analytics: Track user engagement, conversion metrics, and optimize technical workflows."
      ],
      skills: ["Digital Marketing", "IT Operations", "SEO", "System Admin", "Social Strategy", "Analytics", "Tech Support"]
    }
  ],
  education: [
    { 
      degree: "B.Sc Engineering in CSE", 
      institution: "Bangladesh University of Business and Technology (BUBT)", 
      year: "2020 - 2024", 
      description: "Successfully completed the four-year program with core focus on software engineering. Major in Software Engineering. Thesis: A Deep Learning Approach to Emotion Based Music Recommendations.",
      gpa: "CGPA: 3.63 / 4.00"
    },
    { 
      degree: "Kamil (Tafsir)", 
      institution: "Bethuliya Borolahuriya Kamil Madrasha", 
      year: "2022 - 2023", 
      description: "Session 2022-2023. Specialization in Tafsir. Advanced Islamic theological studies and exegesis.",
      gpa: "1st Year GPA: 3.81 / 4.00"
    },
    { 
      degree: "Fazil", 
      institution: "Bethuliya Borolahuriya Kamil Madrasha", 
      year: "2019 - 2020", 
      description: "Session 2019-2020. Advanced Islamic studies and humanities.",
      gpa: "Result: 4.50 / 5.00"
    },
    { 
      degree: "Alim", 
      institution: "Hogladangi Mohammadia Kamil Madrasha", 
      year: "2019", 
      description: "Higher Secondary level equivalent (HSC).",
      gpa: "GPA: 4.50"
    },
    { 
      degree: "Dakhil", 
      institution: "Hogladangi Mohammadia Kamil Madrasha", 
      year: "2017", 
      description: "Secondary level equivalent (SSC).",
      gpa: "GPA: 5.00"
    },
  ],
  skills: [
    { category: "Testing", items: ["Manual Testing", "STLC", "SDLC", "Agile Methodology"] },
    { category: "Development", items: ["HTML", "CSS", "JAVASCRIPT", "Software Development", "OOP"] },
    { category: "Databases & AI", items: ["MySQL", "Artificial Intelligence", "GitHub"] }
  ],
  projects: [
    { 
      title: "Ecommerce Website Start Your Business", 
      category: "E-Commerce platform", 
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      liveLink: "https://star-your-business.vercel.app/", // Example link, user can change
      description: "A modern e-commerce solution designed for startups, featuring product lists, cart systems, and integrated payment gateways to launch businesses fast.",
      tags: ["Full Stack", "PHP", "MySQL"],
      features: ["Comprehensive Product Catalog", "Secure Checkout Flow", "User Authentication", "Order Tracking", "Admin Dashboard", "Inventory Alerts"]
    },
    { 
      title: "AI Summit Rajbari", 
      category: "Event & Ticketing (PWA)", 
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      liveLink: "https://ai-summit-rajbari.vercel.app/", // Example link
      description: "A specialized platform for AI Summit events featuring secure ticket booking, transaction management, and real-time updates. Designed to handle high-traffic event registrations with precision.",
      tags: ["React", "Firebase", "Node.js"],
      features: ["Real-time Ticket Booking", "QR Code Generation", "Secure Payment Integration", "Event Schedule Management", "User Profile Dashboard", "Admin Analytics Panel"]
    },
    { 
      title: "My Note Website", 
      category: "Productivity (Offline Support)", 
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      liveLink: "https://my-note-pwa.vercel.app/",
      description: "A fast, minimalist note-taking website with full offline capabilities, ensuring your data is accessible even without an internet connection. Built with local-first principles.",
      tags: ["PWA", "JavaScript", "IndexedDB"],
      features: ["Offline-first Architecture", "Rich Text Editing (Markdown)", "Auto-sync with Cloud", "Categorization & Tagging", "Dark Mode Support", "Instant Search"]
    },
    { 
      title: "Khorcha AI (Expense Tracker)", 
      category: "AI & FinTech Application", 
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq/khorcha.ai",
      liveLink: "https://khorchaai.vercel.app/",
      description: "Intelligent, privacy-first personal money management application built for Bangladeshi users. Features natural language Bengali/Banglish NLP expense parsing, Gemini 3.8 Flash dual-engine AI, real-time 50/30/20 budgeting health analytics, and instant client-side PDF statements.",
      tags: ["React 19", "TypeScript", "Bangla NLP", "Google Gemini", "Tailwind CSS", "Express.js"],
      features: [
        "Bangla & Banglish NLP Natural Language Expense Parsing",
        "Dual-Engine AI (Google Gemini 3.8 Flash + Heuristic Bangla NLP)",
        "Fault-Tolerant Circuit Breaker with 100% Offline-First Mode",
        "Localized for BD: bKash, Nagad, Rocket & Bengali Numerals (১,২৩৪)",
        "Real-Time Financial Health Analytics (50/30/20 Budgeting Rule)",
        "Client-Side Instant PDF Financial Statement Generation (jsPDF)",
        "Privacy-First Architecture (100% LocalStorage, Zero Remote Tracking)"
      ]
    },
    { 
      title: "To-Do List Website", 
      category: "Personal Management (Offline)", 
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      liveLink: "https://to-do-list-offline.vercel.app/",
      description: "High-performance task management website with offline synchronization features and intuitive drag-and-drop interface for maximum productivity.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      features: ["Drag & Drop Sorting", "Task Priority Levels", "DueDate Reminders", "Offline Persistence", "Quick Search Filters", "Dark/Light Modes"]
    },
    { 
      title: "Hishab Calculator", 
      category: "Web Application (Utility)", 
      image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq/Hishab-Calculator",
      liveLink: "https://hishab-calculator.vercel.app/",
      description: "A fast, responsive, and precision-engineered web calculator designed for instant arithmetic operations, keyboard shortcut navigation, memory recall, and smooth tactile glassmorphic interactions.",
      tags: ["JavaScript", "HTML5", "CSS3", "Responsive UI"],
      features: [
        "Instant Arithmetic Operations (+, -, ×, ÷, %, √)",
        "Full Keyboard Input & Quick Shortcut Navigation",
        "Calculation History Tracking & Memory Recall",
        "Zero-Latency Real-Time Calculation Engine",
        "Responsive Mobile-Friendly Touch Keypad",
        "Clean Glassmorphic Dark Theme Styling"
      ]
    },
    { 
      title: "Emotion Based Music Recommendation", 
      category: "AI / Deep Learning", 
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      description: "A deep learning model developed to predict facial expressions and recommend music accordingly with high accuracy. Bridging emotion and entertainment seamlessly.",
      tags: ["Python", "TensorFlow", "OpenCV"],
      features: ["Real-time Facial Recognition", "Emotion Detection Algorithm", "Personalized Music Playlists", "High Accuracy Model", "Cross-platform Integration", "Dynamic UI Feedback"]
    },
    { 
      title: "E-Commerce Application", 
      category: "Java Desktop / Full Stack", 
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      description: "Comprehensive e-commerce solution built with Java, featuring secure transactions, inventory management, and a user-friendly interface. A robust desktop commerce engine.",
      tags: ["Java", "Swing", "MySQL"],
      features: ["Multi-user Access Control", "Inventory Tracking System", "Integrated Billing Engine", "Robust Database Backend", "Sales Reporting Module", "PDF Invoice Generation"]
    },
    { 
      title: "Airline Reservation System", 
      category: "Java (J-Frame) Application", 
      image: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      description: "Sophisticated airline booking and management system with a GUI built using Java JFrame, enabling flight scheduling and ticket reservations globally.",
      tags: ["Java", "JFrame", "Database"],
      features: ["Flight Scheduling API", "Interactive Seat Selection", "Automated E-ticket Generation", "Cancellation Workflow", "Real-time Availability Search", "Passenger Record Management"]
    },
    { 
      title: "Library Management System", 
      category: "Database Management", 
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      description: "Advanced database-driven system for efficient library operations, handling book cataloging, member management, and circulation with ease.",
      tags: ["Database", "SQL", "Management"],
      features: ["Book Barcode Scanning", "Fine Calculation Logic", "Multi-criteria Search", "Member Attendance Log", "Automated Notifications", "Dynamic Report Generation"]
    },
    { 
      title: "Home Appliances Control", 
      category: "Internet of Things (IoT)", 
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      description: "Smart home solution integrating hardware and software for remote monitoring and control of domestic appliances using IoT protocols. The future of home automation.",
      tags: ["IoT", "Arduino", "Sensors"],
      features: ["Remote Device Control", "Power Consumption Analytics", "Schedule Automation", "Mobile App Compatibility", "Hardware-Software Handshaking", "Voice Control Compatibility"]
    },
    { 
      title: "E-Commerce Website", 
      category: "Web Development (Full Stack)", 
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      description: "A feature-rich gift shop interface and e-commerce platform developed with PHP, JavaScript, and CSS. Optimized for conversion and user engagement.",
      tags: ["PHP", "JavaScript", "CSS", "MySQL"],
      features: ["Responsive Grid Layout", "AJAX-powered Shopping Cart", "Admin Product Management", "SMTP Email Integration", "Wishlist Functionality", "Product Review System"]
    },
    { 
      title: "Fire Alarm System", 
      category: "IoT / Microprocessor", 
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      description: "Real-time fire detection and alert system using microprocessor technology and IoT protocols for enhanced safety monitoring in industrial environments.",
      tags: ["Arduino", "Embedded C++", "Sensors"],
      features: ["Instant SMS Alerts", "Multi-sensor Data Fusion", "Threshold Configuration", "Historical Log Persistence", "Emergency Contact Routing", "Self-diagnostic System"]
    },
    { 
      title: "Pharmacy Management System", 
      category: "Software Development", 
      image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/Rashidulhaq",
      description: "A comprehensive C# based management system for both users and admins, handling inventory, prescription tracking, and administration efficiently.",
      tags: ["C#", "MySQL", ".NET"],
      features: ["Medicine Inventory Expiry Alerts", "Supplier Chain Management", "Prescription Database", "Sales Analytics Dashboard", "Barcode Integration", "Financial Audit Reports"]
    }
  ],
  certificates: [
    { 
      title: "Problem Solving (Basic)", 
      issuer: "HackerRank", 
      category: "Problem Solving",
      year: "2023",
      credentialId: "HKR-PS-BASIC",
      image: "/images/certificates/hacker_rank_ps.jpg",
      skills: ["Data Structures", "Algorithms", "C++", "Problem Solving"],
      description: "Demonstrated fundamental problem-solving skills, algorithmic thinking, and data structure manipulation on the HackerRank platform."
    },
    { 
      title: "Python (Basic)", 
      issuer: "HackerRank", 
      category: "Programming",
      year: "2023",
      credentialId: "HKR-PY-BASIC",
      image: "/images/certificates/hacker_rank_python.jpg",
      skills: ["Python 3", "Data Types", "OOP", "Control Flow"],
      description: "Validated proficiency in Python syntax, object-oriented principles, list comprehensions, and functional programming concepts."
    },
    { 
      title: "BUBT ICPC Preli- CHALLENGE 2023", 
      issuer: "ICPC Foundation", 
      category: "Competitive Programming",
      year: "2023",
      credentialId: "ICPC-BUBT-2023",
      image: "/images/certificates/bubt_icpc_challenge.jpg",
      skills: ["Competitive Programming", "Graph Theory", "Dynamic Programming", "Teamwork"],
      description: "Participated in the prestigious national ICPC Preliminary Challenge representing BUBT, solving complex algorithmic problems under strict contest constraints."
    },
    { 
      title: "Innovative Research Idea Competition 2023", 
      issuer: "Organized by BUBT", 
      category: "Research & Innovation",
      year: "2023",
      credentialId: "BUBT-RES-2023",
      image: "/images/certificates/research_competition.jpg",
      skills: ["Deep Learning Research", "Emotion Recognition", "AI Presentation"],
      description: "Awarded recognition for proposing a deep learning methodology for emotion-based music recommendation based on real-time facial expression analysis."
    },
  ],
  extra_curriculum: [
    { role: "Treasurer", organization: "BUBT Social Welfare Club" }
  ],
  volunteer: [
    { role: "Volunteer Teacher (1 Year)", organization: "Priofull (Non-profit Organization for underprivileged slum children)" }
  ],
  achievements: [
    { title: "Innovative Research Idea Competition 2023", organizer: "BUBT" }
  ],
  references: [
    { name: "Md. Mamun Hossain", role: "Assistant Professor, Dept. of CSE, BUBT", email: "mamun.h@bubt.edu.bd" },
    { name: "T.M. Amir-Ul-Haque Bhuiyan", role: "Assistant Professor, Dept. of CSE, BUBT", email: "amir@bubt.edu.bd" }
  ],
  techStack: [
    { name: "ReactJS", category: "Frontend", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", category: "Languages", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", category: "Languages", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Tailwind CSS", category: "Frontend", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "HTML5", category: "Frontend", level: "Expert", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", category: "Frontend", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Vite", category: "Frontend", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
    { name: "Node JS", category: "Backend", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", category: "Backend", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "Firebase", category: "Backend & Cloud", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
    { name: "MySQL", category: "Backend & Cloud", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Python", category: "Languages", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "PHP", category: "Backend", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "C#", category: "Languages", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { name: "Bootstrap", category: "Frontend", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "Material UI", category: "Frontend", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
    { name: "GitHub", category: "Tools & DevOps", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Git", category: "Tools & DevOps", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Vercel", category: "Tools & DevOps", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    { name: "SweetAlert2", category: "Frontend", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" },
  ],
  qaSkills: [
    { name: "Manual Testing", description: "Comprehensive functional, regression, sanity, and exploratory testing" },
    { name: "STLC & SDLC", description: "Software Testing Life Cycle execution, requirements analysis, test planning" },
    { name: "Agile & Scrum", description: "Sprint planning, backlog grooming, daily standups, and retrospective workflows" },
    { name: "Bug Tracking & JIRA", description: "Detailed defect reporting with reproduction steps, severity, and logs" },
    { name: "Test Case Design", description: "Boundary value analysis, equivalence partitioning, and decision tables" },
    { name: "API Testing (Postman)", description: "Endpoint verification, payload validation, and HTTP status verification" },
  ],
  gallery: {
    "Dhaka": [
      "/images/gallery/Dhaka/dhaka1.jpg",
      "/images/gallery/Dhaka/dhaka2.jpg",
    ],
    "My village": [
      "/images/gallery/Afra/afra1.jpg",
      "/images/gallery/Afra/afra2.jpg",
    ],
    "Cox’s Bazar": [
      "/images/gallery/CoxsBazar/cox1.jpg",
      "/images/gallery/CoxsBazar/cox2.jpg",
      "/images/gallery/CoxsBazar/cox3.jpg",
    ],
    "Bandarban": [
      "/images/gallery/Bandarban/ban1.jpg",
      "/images/gallery/Bandarban/ban2.jpg",
      "/images/gallery/Bandarban/ban3.jpg",
    ],
    "Saint Martin": [
      "/images/gallery/SaintMartin/sm1.jpg",
      "/images/gallery/SaintMartin/sm2.jpg",
      "/images/gallery/SaintMartin/sm3.jpg",
    ],
    "Kuakata": [
      "/images/gallery/Kuakata/kua1.jpg",
      "/images/gallery/Kuakata/kua2.jpg",
    ],
    "Sundarbans": [
      "/images/gallery/Sundarbans/sun1.jpg",
      "/images/gallery/Sundarbans/sun2.jpg",
    ],
    "Priofull": [
      "/images/gallery/Priofull/prio1.jpg",
      "/images/gallery/Priofull/prio2.jpg",
    ],
    "Rangamati": [
      "https://drive.google.com/file/d/1pAHt4K881xbEjDdK8BmqrDp8kLo0qh4z/view?usp=drive_link",
      "https://drive.google.com/file/d/1XhX1p5DvcTCQoK4u2e4IzYPvg0pwu5sx/view?usp=sharing",
      "https://drive.google.com/file/d/1pAHt4K881xbEjDdK8BmqrDp8kLo0qh4z/view?usp=drive_link",
      "/images/gallery/Rangamati/ran2.jpg",
      "/images/gallery/Rangamati/ran2.jpg",
      "/images/gallery/Rangamati/ran2.jpg",
      "/images/gallery/Rangamati/ran2.jpg",
      "/images/gallery/Rangamati/ran2.jpg",
      "/images/gallery/Rangamati/ran2.jpg",
      "/images/gallery/Rangamati/ran2.jpg",
      "/images/gallery/Rangamati/ran2.jpg",

    ],
  },
  galleryDescriptions: {
    "Dhaka": "Exploring the vibrant life and heritage of Bangladesh's capital city.",
    "Afra": "Capturing beautiful moments and cherished memories at Afra.",
    "Cox’s Bazar": "Relaxing by the world's longest natural sea beach and its golden sands.",
    "Bandarban": "Adventure through the majestic mountains and serene nature of Bandarban.",
    "Saint Martin": "Experiences on the beautiful coral island with crystal clear blue waters.",
    "Kuakata": "Witnessing the rare beauty of both sunrise and sunset from the same shore.",
    "Sundarbans": "A mystical journey into the world's largest mangrove forest and its wildlife.",
    "Priofull": "Volunteered as a teacher for 1 year at Priofull, a non-profit organization dedicated to educating underprivileged children from slums.",
    "Rangamati": "Exploring the serene beauty of the hills and the mesmerizing Kaptai Lake in Rangamati.",
  } as Record<string, string>,
  socials: [
    { platform: "LinkedIn", link: "https://www.linkedin.com/in/rashidulhaq/", handle: "@rashidulhaq", icon: "Linkedin" },
    { platform: "Instagram", link: "https://www.instagram.com/md.rashidul.haq/", handle: "@md.rashidul.haq", icon: "Instagram" },
    { platform: "Facebook", link: "https://www.facebook.com/rashidul.haq0", handle: "@rashidul.haq0", icon: "Facebook" },
    { platform: "GitHub", link: "https://github.com/Rashidulhaq", handle: "@Rashidulhaq", icon: "Github" },
    { platform: "Youtube", link: "#", handle: "@rashidul", icon: "Youtube" },
  ],
  whatsapp: "+8801912196464",
  email: "rashidulhaqofficial@gmail.com"
};
