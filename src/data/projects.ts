import type { ProjectEntry } from "./types";

export const projects: ProjectEntry[] = [
  {
    slug: "sara",
    number: "01",
    title: "S.A.R.A.",
    fullName: "Smart Automated Response Assistant",
    subtitle: "Artificial Intelligence and Desktop Automation",
    category: "Artificial Intelligence & Desktop Automation",
    projectType: "BCA Major Project",
    statusNote: "Completed alongside BCA (June 2026)",
    description:
      "S.A.R.A. is an AI-powered desktop assistant designed to simplify human-computer interactions through intelligent voice and text commands. It combines artificial intelligence, automation and real-time information retrieval to create an interactive desktop assistant.",
    caseStudy: {
      overview:
        "Built as my BCA Major Project, S.A.R.A. (Smart Automated Response Assistant) explores how conversational AI models, local context storage, and desktop/browser automation can work together inside a unified Python and PyQt5 desktop experience.",
      problemContext:
        "Everyday desktop workflows frequently require switching between search tabs, repetitive GUI actions, and manual lookups. S.A.R.A. addresses this friction by unifying voice commands, text prompts, real-time retrieval, and system automation behind a single assistant interface.",
      approach:
        "The system pairs SpeechRecognition and ElevenLabs for voice input/output with Groq, Cohere, and Hugging Face APIs for reasoning, ChromaDB for contextual memory, and Selenium, Playwright, and PyAutoGUI for browser and OS-level task execution inside a PyQt5 interface.",
    },
    features: [
      "Voice-based interaction",
      "Text-based commands",
      "Context-aware AI responses",
      "Desktop task automation",
      "Real-time information retrieval",
      "Browser automation",
      "Speech recognition",
      "Voice generation",
    ],
    techStack: [
      "Python",
      "PyQt5",
      "Groq API",
      "Cohere API",
      "ChromaDB",
      "Selenium",
      "Playwright",
      "PyAutoGUI",
      "SpeechRecognition",
      "ElevenLabs",
      "Hugging Face",
    ],
    visualTheme: "ai-terminal",
    screenshots: [],
    githubUrl: null,
    githubNote: "GitHub repository is being organized for publication.",
    liveDemoUrl: null,
    architecture: {
      disclaimer:
        "Confirmed technologies are mapped directly from S.A.R.A.'s stack; directional arrows and stage groupings below represent the conceptual interaction flow.",
      nodes: [
        {
          id: "input-layer",
          label: "Multimodal Input & Interface",
          layer: "Input",
          confirmedTech: ["PyQt5", "SpeechRecognition"],
          conceptualRole:
            "Captures spoken commands via microphone or direct text queries inside the desktop window.",
          isConceptualFlow: true,
        },
        {
          id: "intelligence-layer",
          label: "Reasoning & Language Models",
          layer: "Intelligence",
          confirmedTech: ["Groq API", "Cohere API", "Hugging Face"],
          conceptualRole:
            "Interprets user intent, selects response or action paths, and synthesizes answers.",
          isConceptualFlow: true,
        },
        {
          id: "memory-layer",
          label: "Context & Retrieval",
          layer: "Memory",
          confirmedTech: ["ChromaDB"],
          conceptualRole:
            "Stores and retrieves vector-indexed conversation context for context-aware responses.",
          isConceptualFlow: true,
        },
        {
          id: "automation-layer",
          label: "Desktop & Browser Execution",
          layer: "Automation",
          confirmedTech: ["Selenium", "Playwright", "PyAutoGUI"],
          conceptualRole:
            "Executes automated browser navigation, real-time retrieval, and desktop GUI actions.",
          isConceptualFlow: true,
        },
        {
          id: "output-layer",
          label: "Voice & Visual Feedback",
          layer: "Output",
          confirmedTech: ["ElevenLabs", "PyQt5"],
          conceptualRole:
            "Renders text responses in the PyQt5 interface and generates natural spoken feedback.",
          isConceptualFlow: true,
        },
      ],
    },
  },
  {
    slug: "pursuit",
    number: "02",
    title: "Pursuit",
    fullName: "Pursuit — Fitness Tracker App",
    subtitle: "Mobile Application Development",
    category: "Mobile Application Development",
    duration: "February 2025 – May 2025",
    description:
      "Pursuit is a mobile fitness tracking application designed to help users manage workouts, monitor physical activity, track daily nutrition and achieve personalized fitness goals.",
    caseStudy: {
      overview:
        "Built between February and May 2025, Pursuit is a native Android application focused on bringing workout planning, daily nutrition logging, step counting, and personal fitness targets into a clean mobile workflow.",
      problemContext:
        "Many fitness apps scatter exercise guidance, meal calorie tracking, and daily activity monitoring across separate tools or cluttered interfaces. Pursuit brings those daily essentials together in one focused Android experience.",
      approach:
        "Engineered natively with Java and XML layouts on Android, backed by Firebase for persistent user activity, nutrition records, and preference management.",
    },
    features: [
      "Workout tracking",
      "Categorized exercise guides",
      "Nutrition management",
      "Meal calorie tracking",
      "Step counting",
      "Personalized activity preferences",
      "Fitness goal setting",
    ],
    techStack: ["Java", "XML", "Firebase", "Android Development"],
    visualTheme: "mobile-fitness",
    screenshots: [],
    githubUrl: null,
    liveDemoUrl: null,
  },
  {
    slug: "jaarvis",
    number: "03",
    title: "Jaarvis",
    fullName: "Jaarvis — Desktop Voice Assistant",
    subtitle: "Desktop Voice Assistant",
    category: "Desktop Voice Assistant",
    duration: "February 2025 – June 2025",
    description:
      "Jaarvis is a Python-based desktop voice assistant designed to simplify everyday computer interactions through voice commands.",
    caseStudy: {
      overview:
        "Built between February and June 2025, Jaarvis served as an early hands-on exploration of Python voice-command handling and desktop utility automation.",
      problemContext:
        "Launching frequent desktop applications and querying quick daily utilities like time or routine answers through keyboard navigation can interrupt workflow momentum.",
      approach:
        "Implemented a focused Python command loop to listen to spoken instructions, answer questions, announce time information, open desktop applications, and handle routine desktop tasks—laying conceptual groundwork for later AI systems.",
    },
    features: [
      "Voice command interaction",
      "Answering questions",
      "Providing time information",
      "Opening desktop applications",
      "Performing everyday computer tasks",
    ],
    techStack: ["Python"],
    visualTheme: "voice-minimal",
    screenshots: [],
    githubUrl: null,
    liveDemoUrl: null,
  },
];

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return projects.find((project) => project.slug === slug);
}
