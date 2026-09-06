export const portfolio = {
  profile: {
    name: 'Raj Srivastava',
    title: 'Full Stack Developer | MERN Stack',
    shortTitle: 'MERN Stack Developer',
    tagline:
      'I design interfaces like scenes, build APIs like systems, and turn coursework curiosity into products that feel intentional.',
    intro:
      'Fourth-year IT student at LPU. I spend most of my time building MERN apps, grinding DSA, and figuring out why my code works before it ships.',
    location: 'India',
    availability: 'Open to internships and freelance builds',
    email: 'ggrajsrivastav0@gmail.com',
    displayEmail: 'contact@rajsrivastava.in',
    resume:
      'https://rajsrivastava-resume.s3.ap-south-1.amazonaws.com/CV.pdf',
    social: {
      github: 'https://github.com/RAJ200X',
      linkedin: 'http://www.linkedin.com/in/rajsrivastava0',
      leetcode: 'https://leetcode.com/u/RAJ200X/',
      codechef: 'https://www.codechef.com/users/raj200x',
      gfg: 'https://www.geeksforgeeks.org/profile/ggrajsri5l4l?tab=activity',
      code360: 'https://www.naukri.com/code360/profile/RAJSRIVASTAVA',
      codolio: 'https://codolio.com/profile/Raj200x',
      hackerrank: 'https://www.hackerrank.com/profile/RAJ200X',
    },
  },
  quickStats: [
    { label: 'Current Focus', value: 'MERN + DSA' },
    { label: 'Primary Strength', value: 'Frontend systems with clean APIs' },
    { label: 'Mindset', value: 'Build, test, refine, repeat' },
  ],
  achievements: [
    {
      index: '01',
      title: '600+ Problems Solved',
      description: 'Solved across all major platforms, establishing a deep foundation in problem-solving.',
    },
    {
      index: '02',
      title: '400+ LeetCode Solutions',
      description: 'Consistent focus on optimal time & space complexity using clean, idiomatic C++.',
    },
    {
      index: '03',
      title: 'Competitive Ratings',
      description: 'Attained peak ratings of 1610 (2★) on CodeChef and 1465 on LeetCode.',
    },
    {
      index: '04',
      title: '20+ Live Contests',
      description: 'Active participant in real-time competitive challenges (15 on LeetCode, 5 on CodeChef).',
    },
  ],
  skills: [
    {
      category: 'Frontend',
      summary: 'Narrative flow, responsiveness, and motion that supports the content.',
      accent: '#e85d3d',
      skills: [
        { name: 'React', level: 'Advanced', x: '54%', y: '18%' },
        { name: 'TailwindCSS', level: 'Advanced', x: '76%', y: '38%' },
        { name: 'JavaScript', level: 'Advanced', x: '31%', y: '72%' },
      ],
    },
    {
      category: 'Backend',
      summary: 'APIs that stay straightforward, predictable, and easy to extend.',
      accent: '#7b9362',
      skills: [
        { name: 'Node.js', level: 'Advanced', x: '17%', y: '54%' },
        { name: 'Express.js', level: 'Advanced', x: '25%', y: '29%' },
        { name: 'REST Design', level: 'Intermediate', x: '52%', y: '84%' },
      ],
    },
    {
      category: 'Database',
      summary: 'Data modeling around product needs instead of abstract complexity.',
      accent: '#c7a15c',
      skills: [
        { name: 'MongoDB', level: 'Advanced', x: '84%', y: '54%' },
        { name: 'Mongoose', level: 'Intermediate', x: '14%', y: '81%' },
      ],
    },
    {
      category: 'Tools',
      summary: 'Workflow tools that keep projects moving from idea to deployment.',
      accent: '#6f8587',
      skills: [
        { name: 'Git & GitHub', level: 'Advanced', x: '58%', y: '46%' },
        { name: 'Vite', level: 'Advanced', x: '41%', y: '26%' },
        { name: 'Postman', level: 'Intermediate', x: '84%', y: '82%' },
      ],
    },
    {
      category: 'Problem Solving',
      summary: 'Structured algorithms, core computer science, and daily platform challenges.',
      accent: '#FFED29',
      skills: [
        { name: 'C++', level: 'Advanced' },
        { name: 'DSA', level: 'Advanced' },
        { name: 'LeetCode', level: 'Advanced' },
        { name: 'CodeChef', level: 'Advanced' },
        { name: 'GeeksforGeeks', level: 'Advanced' },
        { name: 'HackerRank', level: 'Advanced' },
      ],
    },
  ],
  projects: [
    {
      title: 'Cohort',
      summary:
        'A structured learning and community platform centred on progress visibility, study rooms, and smooth user flow across views.',
      stack: ['React', 'TailwindCSS', 'Express', 'MongoDB'],
      githubUrl: 'https://github.com/Raj200X/Cohort',
      liveUrl: 'https://cohort-zeta.vercel.app',
      status: 'Community platform',
      image: '/images/cohort-preview.png',
    },
    {
      title: 'QuickKart',
      summary:
        'A full-stack e-commerce app with real-time cart, product search, and secure checkout — built on the MERN stack with wallet and order management.',
      stack: ['React', 'Node.js', 'Express', 'MongoDB'],
      githubUrl: 'https://github.com/Raj200X/QuickKart',
      liveUrl: 'https://quick-kart-beige.vercel.app',
      status: 'E-commerce build',
      image: '/images/quickkart-preview.png',
    },
    {
      title: 'Plagiarism Detector',
      summary:
        'An algorithm-first plagiarism detection system using Rolling Hash and KMP to compare content efficiently and identify similarity at scale.',
      stack: ['JavaScript', 'Rolling Hash', 'KMP', 'Algorithms'],
      githubUrl:
        'https://github.com/Raj200X/PLAGIARISM-DETECTION-SYSTEM-USING-ROLLING-HASH-AND-KMP-ALGORITHM',
      liveUrl:
        'https://github.com/Raj200X/PLAGIARISM-DETECTION-SYSTEM-USING-ROLLING-HASH-AND-KMP-ALGORITHM',
      status: 'Algorithm build',
      image: '/images/plagiarism-preview.png',
    },
  ],
  principles: [
    {
      title: 'I read the error first',
      body: 'Errors tell you exactly what is wrong. I read them fully before looking for answers elsewhere.',
    },
    {
      title: 'I grind DSA daily',
      body: 'LeetCode, CodeChef, GFG — because structured logic carries over directly to real features.',
    },
    {
      title: 'I ship, then improve',
      body: 'A working, live deployment beats a perfect local build every single time.',
    },
    {
      title: 'UI details matter',
      body: 'Spacing, alignment, clean motion. Premium visual polish is never optional for me.',
    },
  ],
  credentials: {
    education: [
      {
        degree: 'Bachelor of Technology - Information Technology',
        institution: 'Lovely Professional University, Punjab, India',
        period: 'Aug 2023 - Present',
        result: 'CGPA: 8.04',
      },
      {
        degree: 'Intermediate (PCM)',
        institution: 'Gorakhpur Public School, Gorakhpur, U.P.',
        period: 'Apr 2021 - Mar 2022',
        result: 'Percentage: 67.2%',
      },
      {
        degree: 'Matriculation',
        institution: 'Gorakhpur Public School, Gorakhpur, U.P.',
        period: 'Apr 2019 - Mar 2020',
        result: 'Percentage: 86%',
      },
    ],
    certifications: [
      {
        title: 'Developing Back-End Apps with Node.js and Express',
        issuer: 'Coursera',
        credentialId: 'YAXJ3IE0YEUR',
        link: 'http://coursera.org/verify/HW9VK7G2KPV6',
        pdf: '/Certificates/backend.pdf',
      },
      {
        title: 'Advanced React',
        issuer: 'Coursera',
        credentialId: 'HW9VK7G2KPV6',
        link: 'http://coursera.org/verify/YAXJ3IE0YEUR',
        pdf: '/Certificates/react.pdf',
      },
      {
        title: 'Data Structures and Algorithms Using C++',
        issuer: 'CipherSchools',
        credentialId: 'AUG 2024',
        link: 'https://drive.google.com/file/d/13vXLmMLnZHXeheXCRErwyUWsy2V7tvcp/view',
        pdf: '/Certificates/dsa.pdf',
      },
    ],
  },
};
