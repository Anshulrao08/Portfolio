import type { ProfileData } from "./types";

export const profile: ProfileData = {
  name: "Anshul Yadav",
  monogram: "AY",
  location: "Baghpat, Uttar Pradesh, India",
  email: "anshulydv08@gmail.com",
  primaryTagline: "I Develop. I Innovate. I Lead.",
  secondaryTagline: "Building Technology. Connecting People. Creating Impact.",
  identityLine: "MCA Student | Aspiring Web Developer | Tech Community Leader | AI Enthusiast",
  animatedRoles: [
    "Aspiring Web Developer",
    "MCA Student",
    "Tech Community Leader",
    "AI Enthusiast",
    "Technical Mentor",
  ],
  heroSupporting:
    "I build digital experiences, explore emerging technologies and lead communities that turn ideas into meaningful impact.",
  currentFocus: {
    label: "Current Focus",
    items: [
      "Master of Computer Applications (MCA)",
      "Web Development & AI Systems",
      "President, FOSS Club",
    ],
  },
  // Set `src` to "/images/profile/anshul-yadav.jpg" once the photograph is added to public/images/profile/
  profileImage: {
    src: null,
    alt: "Portrait of Anshul Yadav",
  },
  // Set to "/documents/anshul-yadav-resume.pdf" once an uploaded PDF is placed in public/documents/
  resumePdfPath: null,
  aboutIntro: [
    "I am Anshul Yadav, a passionate technology enthusiast, aspiring web developer and student leader currently pursuing a Master of Computer Applications at SRM University Delhi-NCR, Sonepat. I completed my Bachelor of Computer Applications from the same university, where I developed a strong interest in programming, software development, artificial intelligence, automation and emerging technologies.",
    "My journey in technology goes beyond writing code. I enjoy exploring new technologies, developing practical applications, solving real-world problems, leading teams, organizing technical events and creating opportunities for students to learn and grow together. I have worked on multiple technical projects, including S.A.R.A., an AI-powered desktop assistant, Pursuit, a mobile fitness tracking application, and Jaarvis, a Python-based desktop voice assistant.",
    "Alongside my technical journey, leadership has been an important part of my university life. I currently serve as the President of FOSS Club and previously served as the Founder and President of TechSpace, a university technical society focused on innovation, collaboration and practical learning. Through these roles, I have gained experience in team management, event planning, technical mentorship, workshop coordination and community development.",
    "I have also contributed to the Internal Committee as a Gender Champion, supporting initiatives that promote awareness, equality, respect and a positive campus environment. My goal is to build a successful career in web development while continuing to explore opportunities in technology management and leadership. Beyond technology, I enjoy gaming, travelling, exploring new places and continuously learning new things.",
  ],
  pillars: [
    {
      code: "01 / BUILD",
      title: "Development & Technology",
      subtitle: "From desktop AI assistants to mobile apps and the web",
      description:
        "Translating curiosity in Python, Java, AI APIs, automation, and web development into functional, user-focused software.",
    },
    {
      code: "02 / LEAD",
      title: "Leadership & Community",
      subtitle: "FOSS Club, TechSpace, and campus initiatives",
      description:
        "Founding student societies, guiding teams, coordinating workshops and hackathons, and cultivating collaborative spaces on campus.",
    },
    {
      code: "03 / GROW",
      title: "Continuous Learning & Exploration",
      subtitle: "Workshops, mentorship, and life beyond the screen",
      description:
        "Staying curious across cybersecurity, DevOps, AI, travel, and interactive gaming—treating every initiative as a chance to learn.",
    },
  ],
  homepageStats: [
    {
      value: 3,
      label: "Technical Projects",
      detail: "S.A.R.A., Pursuit & Jaarvis",
    },
    {
      value: 2,
      label: "Club Presidencies",
      detail: "FOSS Club & TechSpace",
    },
    {
      value: 1,
      label: "Technical Club Founded",
      detail: "TechSpace, SRM University",
    },
    {
      value: 4,
      label: "Recognition Certificates",
      detail: "Appreciation & Mentorship",
    },
  ],
  secondaryStats: [
    {
      value: 3,
      label: "Technical Workshops Attended",
      context: "Ethical Hacking, Java GUI & DevOps",
    },
    {
      value: 1,
      label: "Technical Mentorship Experience",
      context: "DSA Using Java Bootcamp",
    },
    {
      value: 36,
      suffix: "h",
      label: "Hackathon Participation",
      context: "SRM Builds 4.0 (CIIE)",
    },
    {
      value: 6,
      suffix: "d",
      label: "DSA Workshop",
      context: "Three-phase Java & DSA initiative",
    },
    {
      value: 3,
      label: "VERGE Events Coordinated",
      context: "CodeBlitz, Memeocracy & ArtisticAura",
    },
  ],
  lifeBeyondCode: [
    {
      title: "Gaming",
      tag: "Strategy & Interactive Worlds",
      description:
        "I enjoy gaming as a way to relax, explore interactive experiences and challenge my strategic thinking.",
    },
    {
      title: "Travelling",
      tag: "New Places & Perspectives",
      description:
        "I enjoy exploring new places, experiencing different environments and creating memorable experiences.",
    },
    {
      title: "Technology",
      tag: "Experimentation & Curiosity",
      description:
        "I enjoy experimenting with new technologies, artificial intelligence and software development tools.",
    },
    {
      title: "Community",
      tag: "People & Shared Growth",
      description:
        "I enjoy connecting with people, leading teams and creating opportunities for collaborative learning.",
    },
  ],
  careerGoals: {
    headline: "Technology, innovation, and leadership working in stride.",
    paragraphs: [
      "My primary career objective is to become a skilled web developer capable of creating innovative, responsive, user-friendly and impactful digital experiences. I aim to continuously improve my technical knowledge in web development, programming, artificial intelligence and modern software technologies.",
      "Alongside my technical aspirations, I am interested in management and leadership opportunities. My experience as a club president, founder, event coordinator and technical mentor has developed my interest in managing teams, coordinating projects and transforming ideas into successful outcomes.",
      "In the long term, I aspire to build a career that combines technology, innovation and leadership.",
    ],
  },
  philosophy: {
    statement:
      "Technology is not just about writing code. It is about solving problems, connecting people and creating meaningful impact.",
    supporting:
      "Every project is an opportunity to innovate, every challenge is an opportunity to grow, and every leadership experience is an opportunity to inspire others.",
  },
};
