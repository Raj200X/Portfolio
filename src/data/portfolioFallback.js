export const portfolioFallback = {
  profile: {
    name: "Raj Srivastava",
    title: "Full Stack Developer | MERN Stack",
    tagline:
      "I design interfaces like scenes, build APIs like systems, and turn coursework curiosity into products that feel intentional.",
    location: "India",
    availability: "Open to internships and freelance builds",
    intro:
      "A third-year Computer Science student shaping minimal, high-performance web products with React, Node.js, Express, and MongoDB.",
    social: {
      github: "https://github.com/RAJ200X",
      linkedin: "http://www.linkedin.com/in/rajsrivastava0",
      email: "mailto:ggrajsrivastav0@gmail.com",
      leetcode: "https://leetcode.com/u/RAJ200X/",
      codechef: "https://www.codechef.com/users/raj200x",
      gfg: "https://www.geeksforgeeks.org/profile/ggrajsri5l4l?tab=activity"
    }
  },
  quickStats: [
    { label: "Current Focus", value: "MERN + DSA" },
    { label: "Primary Strength", value: "Frontend systems with clean APIs" },
    { label: "Mindset", value: "Build, test, refine, repeat" }
  ],
  story: [
    {
      year: "Chapter 01",
      title: "Curiosity became a system",
      description:
        "What started as fascination with how digital products behave turned into a habit of reverse-engineering interfaces, layouts, and interactions.",
      accent: "from-white/70 to-white/10"
    },
    {
      year: "Chapter 02",
      title: "Programming stopped being theory",
      description:
        "Computer Science gave structure to the curiosity. JavaScript and the MERN stack became the fastest way to ship ideas and learn by building.",
      accent: "from-[#6EA8FE] to-[#5B63F6]"
    },
    {
      year: "Chapter 03",
      title: "Projects became experiments",
      description:
        "Each project became a lab for architecture, state management, and product decisions: how to keep code modular while still making the experience feel alive.",
      accent: "from-[#FFCA7A] to-[#D47D31]"
    },
    {
      year: "Chapter 04",
      title: "The next step is depth",
      description:
        "Now the work is about stronger system design, sharper DSA thinking, and building products that feel handcrafted instead of assembled from patterns.",
      accent: "from-[#E48BFF] to-[#9257F4]"
    }
  ],
  skills: [
    {
      category: "Frontend",
      summary: "Interfaces with narrative flow, responsiveness, and motion that supports the content.",
      orbitColor: "#FFFFFF",
      skills: [
        { name: "React", level: "Advanced", description: "Component architecture, state-driven UI, reusable systems.", x: "52%", y: "18%" },
        { name: "TailwindCSS", level: "Advanced", description: "Fast iteration with intentional spacing, typography, and theming.", x: "75%", y: "35%" },
        // { name: "Framer Motion", level: "Advanced", description: "Scroll choreography, reveals, and premium micro-interactions.", x: "70%", y: "68%" },
        { name: "JavaScript", level: "Advanced", description: "Strong foundation in interactive browser logic and SPA behavior.", x: "32%", y: "72%" }
      ]
    },
    {
      category: "Backend",
      summary: "APIs that stay straightforward, predictable, and easy to extend.",
      orbitColor: "#7AA2FF",
      skills: [
        { name: "Node.js", level: "Advanced", description: "Server-side JavaScript for app logic and tooling.", x: "18%", y: "56%" },
        { name: "Express.js", level: "Advanced", description: "REST APIs, middleware flow, and route organization.", x: "24%", y: "30%" },
        { name: "REST Design", level: "Intermediate", description: "Resource-based endpoints, validation, and clean payload design.", x: "50%", y: "84%" }
      ]
    },
    {
      category: "Database",
      summary: "Data modeling around product needs rather than abstract complexity.",
      orbitColor: "#F7B267",
      skills: [
        { name: "MongoDB", level: "Advanced", description: "Document schemas for rapid product iteration.", x: "84%", y: "54%" },
        { name: "Mongoose", level: "Intermediate", description: "Validation, relations, and structured persistence.", x: "12%", y: "80%" }
      ]
    },
    {
      category: "Tools",
      summary: "Workflow tools that keep projects moving from idea to deployment.",
      orbitColor: "#D792FF",
      skills: [
        { name: "Git & GitHub", level: "Advanced", description: "Version control, iteration, and source collaboration.", x: "57%", y: "46%" },
        { name: "Vite", level: "Advanced", description: "Fast local development and clean React builds.", x: "40%", y: "26%" },
        { name: "Postman", level: "Intermediate", description: "API debugging, contract checks, and endpoint validation.", x: "84%", y: "82%" }
      ]
    }
  ],
  projects: [
    {
      title: "Convo",
      eyebrow: "Project Orbit 01",
      summary:
        "A communication-focused web experience built to make conversation flow feel natural and immediate, with an emphasis on interface clarity and responsive interactions.",
      stack: ["React", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/Raj200X/Convo",
      liveUrl: "https://convo-raj-sri.vercel.app",
      status: "Interactive product build",
      accent: "linear-gradient(135deg, rgba(255,255,255,0.18), transparent 48%, rgba(255,255,255,0.06))"
    },
    {
      title: "Cohort",
      eyebrow: "Project Orbit 02",
      summary:
        "A structured learning/community concept where the product thinking centered on organization, progress visibility, and smooth user flow across views.",
      stack: ["React", "TailwindCSS", "Express", "MongoDB"],
      githubUrl: "https://github.com/Raj200X/Cohort",
      liveUrl: "https://cohort-zeta.vercel.app",
      status: "Community platform concept",
      accent: "linear-gradient(135deg, rgba(255,255,255,0.16), transparent 45%, rgba(255,255,255,0.08))"
    },
    {
      title: "Plagiarism Detection System",
      eyebrow: "Project Orbit 03",
      summary:
        "A plagiarism detection system built using rolling hash and the KMP algorithm to compare content efficiently and identify similarity with an algorithm-first approach.",
      stack: ["JavaScript", "Rolling Hash", "KMP", "Algorithms"],
      githubUrl: "https://github.com/Raj200X/PLAGIARISM-DETECTION-SYSTEM-USING-ROLLING-HASH-AND-KMP-ALGORITHM",
      liveUrl: "https://github.com/Raj200X/PLAGIARISM-DETECTION-SYSTEM-USING-ROLLING-HASH-AND-KMP-ALGORITHM",
      status: "Algorithm-focused system build",
      accent: "linear-gradient(135deg, rgba(255,255,255,0.15), transparent 50%, rgba(255,255,255,0.05))"
    }
  ],
  mindset: {
    principles: [
      {
        title: "Problem Solving",
        body: "I prefer decomposing a problem into smaller predictable units first, then tightening implementation after the mental model is stable."
      },
      {
        title: "DSA Journey",
        body: "LeetCode, CodeChef, and GeeksforGeeks are part of my routine because algorithmic thinking improves the quality of product code too."
      },
      {
        title: "Learning Roadmap",
        body: "Current growth areas are advanced React patterns, backend robustness, and system design fundamentals for larger applications."
      },
      {
        title: "Tech Interests",
        body: "Motion systems, premium UI engineering, API design, and products that turn utility into something memorable."
      }
    ],
    roadmap: [
      "Sharpen DSA consistency and contest problem speed.",
      "Build deeper full-stack products with auth, dashboards, and real data pipelines.",
      "Learn production architecture patterns beyond student-scale applications.",
      "Create interfaces that feel premium without becoming heavy."
    ]
  },
  credentials: {
    education: [
      {
        degree: "Bachelor of Technology – Information Technology",
        institution: "Lovely Professional University, Punjab, India",
        period: "Aug 2023 – Present",
        result: "CGPA: 8.04",
        description: ""
      },
      {
        degree: "Intermediate (PCM)",
        institution: "Gorakhpur Public School, Gorakhpur, U.P.",
        period: "Apr 2021 – Mar 2022",
        result: "Percentage: 67.2%",
        description: ""
      },
      {
        degree: "Matriculation",
        institution: "Gorakhpur Public School, Gorakhpur, U.P.",
        period: "Apr 2019 – Mar 2020",
        result: "Percentage: 86%",
        description: ""
      }
    ],
    certifications: [
      {
        title: "Developing Back-End Apps with Node.js and Express",
        issuer: "Coursera",
        credentialId: "YAXJ3IE0YEUR",
        link: "http://coursera.org/verify/HW9VK7G2KPV6"
      },
      {
        title: "Advanced React",
        issuer: "Coursera",
        credentialId: "HW9VK7G2KPV6",
        link: "http://coursera.org/verify/YAXJ3IE0YEUR"
      },
      {
        title: "Data Structures and Algorithms Using C++",
        issuer: "CipherSchools",
        credentialId: "AUG 2024",
        link: "https://drive.google.com/file/d/13vXLmMLnZHXeheXCRErwyUWsy2V7tvcp/view"
      }
    ]
  },
  contact: {
    terminalPrompt: "Type `help` to navigate the final chapter.",
    email: "ggrajsrivastav0@gmail.com",
    github: "https://github.com/RAJ200X",
    linkedin: "http://www.linkedin.com/in/rajsrivastava0",
    leetcode: "https://leetcode.com/u/RAJ200X/",
    gfg: "https://www.geeksforgeeks.org/profile/ggrajsri5l4l?tab=activity",
    code360: "https://www.naukri.com/code360/profile/RAJSRIVASTAVA",
    codolio: "https://codolio.com/profile/Raj200x",
    hackerrank: "https://www.hackerrank.com/profile/RAJ200X",
    codechef: "https://www.codechef.com/users/raj200x",
    resume: "https://rajsrivastava-resume.s3.ap-south-1.amazonaws.com/CV.pdf",
    commands: {}
  }
};
