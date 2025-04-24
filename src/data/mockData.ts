
// Mock user data
export const currentUser = {
  id: "user-1",
  name: "John Doe",
  email: "johndoe@example.com",
  avatarUrl: "",
  role: "student"
};

// Mock test types
export const testTypes = [
  { id: "toefl-itp", name: "TOEFL ITP", color: "toefl" },
  { id: "ielts", name: "IELTS", color: "ielts" }
];

// Mock test sections
export const testSections = {
  "toefl-itp": [
    { id: "listening", name: "Listening Comprehension", questionCount: 50, timeMinutes: 35 },
    { id: "structure", name: "Structure and Written Expression", questionCount: 40, timeMinutes: 25 },
    { id: "reading", name: "Reading Comprehension", questionCount: 50, timeMinutes: 55 }
  ],
  "ielts": [
    { id: "listening", name: "Listening", questionCount: 40, timeMinutes: 30 },
    { id: "reading", name: "Reading", questionCount: 40, timeMinutes: 60 },
    { id: "writing", name: "Writing", questionCount: 2, timeMinutes: 60 },
    { id: "speaking", name: "Speaking", questionCount: 3, timeMinutes: 14 }
  ]
};

// Mock practice tests
export const practiceTests = [
  {
    id: "toefl-1",
    name: "TOEFL ITP Practice Test 1",
    type: "toefl-itp",
    sections: ["listening", "structure", "reading"],
    difficulty: "Medium",
    completionRate: 0,
    lastAttempt: null
  },
  {
    id: "toefl-2",
    name: "TOEFL ITP Practice Test 2",
    type: "toefl-itp",
    sections: ["listening", "structure", "reading"],
    difficulty: "Hard",
    completionRate: 0,
    lastAttempt: null
  },
  {
    id: "ielts-1",
    name: "IELTS Academic Test 1",
    type: "ielts",
    sections: ["listening", "reading", "writing", "speaking"],
    difficulty: "Medium",
    completionRate: 0,
    lastAttempt: null
  },
  {
    id: "ielts-2",
    name: "IELTS General Training Test 1", 
    type: "ielts",
    sections: ["listening", "reading", "writing", "speaking"],
    difficulty: "Medium",
    completionRate: 0,
    lastAttempt: null
  }
];

// Mock self-study topics
export const studyTopics = [
  {
    id: "listening-basics",
    name: "Listening Basics",
    description: "Fundamental listening skills for English tests",
    category: "Listening",
    level: "Beginner",
    completionRate: 0
  },
  {
    id: "advanced-listening",
    name: "Advanced Listening Techniques",
    description: "Complex listening strategies for high scores",
    category: "Listening",
    level: "Advanced",
    completionRate: 0
  },
  {
    id: "grammar-essentials",
    name: "Grammar Essentials",
    description: "Core grammar concepts for TOEFL and IELTS",
    category: "Grammar",
    level: "Intermediate",
    completionRate: 0
  },
  {
    id: "reading-strategies",
    name: "Reading Strategies",
    description: "Effective approaches for reading comprehension",
    category: "Reading",
    level: "Intermediate",
    completionRate: 0
  },
  {
    id: "writing-structure",
    name: "Essay Structure",
    description: "Learn how to structure effective essays",
    category: "Writing",
    level: "Intermediate",
    completionRate: 0
  },
  {
    id: "speaking-fluency",
    name: "Speaking Fluently",
    description: "Techniques to improve speaking fluency",
    category: "Speaking",
    level: "All Levels",
    completionRate: 0
  }
];

// Mock performance data for charts
export const performanceData = [
  { 
    test: "TOEFL ITP Practice Test 1", 
    date: "2023-01-10", 
    scores: {
      listening: 45,
      structure: 38,
      reading: 46,
      total: 530
    }
  },
  { 
    test: "TOEFL ITP Practice Test 2", 
    date: "2023-02-15", 
    scores: {
      listening: 47,
      structure: 39,
      reading: 48,
      total: 560
    }
  },
  { 
    test: "TOEFL ITP Practice Test 3", 
    date: "2023-03-20", 
    scores: {
      listening: 49,
      structure: 40,
      reading: 49,
      total: 580
    }
  }
];

// Mock question data
export const sampleQuestions = {
  "toefl-itp": {
    "listening": [
      {
        id: "q1",
        audioUrl: "",
        questionText: "What is the topic of the lecture?",
        options: [
          "Marine biology",
          "Climate change",
          "Coral reef ecosystems",
          "Ocean pollution"
        ],
        correctAnswer: 2
      },
      {
        id: "q2",
        audioUrl: "",
        questionText: "What does the professor imply about coral bleaching?",
        options: [
          "It's a natural process that occurs regularly",
          "It's primarily caused by pollution",
          "It's reversible if conditions improve quickly",
          "It only affects certain species of coral"
        ],
        correctAnswer: 2
      }
    ],
    "structure": [
      {
        id: "q1",
        questionText: "_____ the discovery of penicillin, many bacterial infections were untreatable.",
        options: [
          "Prior to",
          "As a result of",
          "In addition to",
          "In spite of"
        ],
        correctAnswer: 0
      },
      {
        id: "q2",
        questionText: "The research paper was so poorly written ____ the professor had difficulty understanding its main points.",
        options: [
          "as",
          "whether",
          "that",
          "when"
        ],
        correctAnswer: 2
      }
    ],
    "reading": [
      {
        id: "q1",
        passageText: "The importance of sleep has been a subject of scientific study for decades. Recent research indicates that sleep plays a critical role in immune function, metabolism, memory, learning, and other vital functions. Most adults need between seven and nine hours of sleep per night, although this requirement varies between individuals.",
        questionText: "According to the passage, which of the following is true about sleep?",
        options: [
          "All adults need exactly eight hours of sleep",
          "Sleep requirements are the same for everyone",
          "Sleep affects multiple bodily functions",
          "Scientists have fully understood sleep for many years"
        ],
        correctAnswer: 2
      }
    ]
  },
  "ielts": {
    "listening": [
      {
        id: "q1",
        audioUrl: "",
        questionText: "The man is looking for a room that is available from:",
        options: [
          "early January",
          "mid-January",
          "early February",
          "mid-February"
        ],
        correctAnswer: 2
      }
    ],
    "reading": [
      {
        id: "q1",
        passageText: "Renewable energy sources—such as wind power, solar energy, and hydroelectric power—are quickly gaining ground as alternatives to fossil fuel consumption. This transition is driven by growing awareness of climate change, technological advancements that have reduced costs, and government policies encouraging sustainable development.",
        questionText: "What is the main factor driving the increase in renewable energy use?",
        options: [
          "A single dominant factor is not specified",
          "Technological advancements alone",
          "Government subsidies exclusively",
          "Climate change awareness only"
        ],
        correctAnswer: 0
      }
    ],
    "writing": [
      {
        id: "task1",
        taskType: "Task 1",
        prompt: "The graph below shows the consumption of renewable energy in the United States from 2000 to 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        imageUrl: ""
      },
      {
        id: "task2",
        taskType: "Task 2",
        prompt: "Some people believe that university students should focus on academic subjects that will prepare them directly for their future careers. Others think students should study a broad range of subjects. Discuss both views and give your opinion."
      }
    ],
    "speaking": [
      {
        id: "part1",
        questionText: "Do you prefer to read books or watch films?",
        followUpQuestions: [
          "What kind of books/films do you enjoy?",
          "How often do you read books or watch films?",
          "Do you think reading habits have changed in your country in recent years?"
        ]
      }
    ]
  }
};

// Mock admin data
export const adminStats = {
  activeUsers: 1250,
  testsCompleted: 3750,
  averageScore: {
    "toefl-itp": 520,
    "ielts": 6.5
  },
  popularSections: [
    {
      name: "Listening Practice",
      users: 850
    },
    {
      name: "Reading Comprehension",
      users: 720
    },
    {
      name: "Grammar Review",
      users: 550
    }
  ]
};
