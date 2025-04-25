
export const studyTopics = [
  {
    id: '1',
    name: 'Short Conversations',
    description: 'Practice understanding brief exchanges between two speakers',
    category: 'Listening',
    level: 'Beginner' as const,
    completionRate: 75,
    quizScore: 80,
    lastAccessed: '2024-04-15',
  },
  {
    id: '2',
    name: 'Long Lectures',
    description: 'Learn to identify key points in academic lectures',
    category: 'Listening',
    level: 'Intermediate' as const,
    completionRate: 30,
    lastAccessed: '2024-04-20',
  },
  {
    id: '3',
    name: 'Main Idea Questions',
    description: 'Identify the central theme of passages',
    category: 'Reading',
    level: 'Beginner' as const,
    completionRate: 100,
    quizScore: 95,
    lastAccessed: '2024-04-10',
  },
  {
    id: '4',
    name: 'Detail Questions',
    description: 'Answer questions about specific information in text',
    category: 'Reading',
    level: 'Intermediate' as const,
    completionRate: 0,
  },
  {
    id: '5',
    name: 'Writing Task 1',
    description: 'Learn to describe charts and graphs effectively',
    category: 'Writing',
    level: 'Intermediate' as const,
    completionRate: 50,
    quizScore: 60,
    lastAccessed: '2024-04-22',
  },
  {
    id: '6',
    name: 'Speaking Part 1',
    description: 'Practice answering common interview questions',
    category: 'Speaking',
    level: 'Beginner' as const,
    completionRate: 0,
  },
];

export const performanceData = [
  {
    date: '2023-01-15',
    scores: {
      listening: 25,
      structure: 22,
      reading: 24,
      total: 530
    }
  },
  {
    date: '2023-02-15',
    scores: {
      listening: 26,
      structure: 23,
      reading: 25,
      total: 560
    }
  },
  {
    date: '2023-03-20',
    scores: {
      listening: 27,
      structure: 24,
      reading: 26,
      total: 580
    }
  }
];

export const currentUser = {
  id: '1',
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  avatarUrl: null,
  role: 'student'
};

export const practiceTests = [
  {
    id: 'test-1',
    name: 'TOEFL ITP Practice Test 1',
    type: 'toefl-itp',
    sections: ['listening', 'structure', 'reading'],
    difficulty: 'Medium',
    completionRate: 75,
    lastAttempt: '2023-03-15'
  },
  {
    id: 'test-2',
    name: 'TOEFL ITP Practice Test 2',
    type: 'toefl-itp',
    sections: ['listening', 'structure', 'reading'],
    difficulty: 'Hard',
    completionRate: 0,
    lastAttempt: null
  },
  {
    id: 'test-3',
    name: 'IELTS Academic Practice Test 1',
    type: 'ielts',
    sections: ['listening', 'reading', 'writing', 'speaking'],
    difficulty: 'Hard',
    completionRate: 30,
    lastAttempt: '2023-02-20'
  },
  {
    id: 'test-4',
    name: 'IELTS General Practice Test 1',
    type: 'ielts',
    sections: ['listening', 'reading', 'writing', 'speaking'],
    difficulty: 'Medium',
    completionRate: 0,
    lastAttempt: null
  }
];

export const testTypes = [
  {
    id: 'toefl-itp',
    name: 'TOEFL ITP',
    color: 'blue-600'
  },
  {
    id: 'ielts',
    name: 'IELTS',
    color: 'emerald-600'
  }
];

export const testSections = {
  'toefl-itp': [
    { id: 'listening', name: 'Listening Comprehension', timeMinutes: 35 },
    { id: 'structure', name: 'Structure and Written Expression', timeMinutes: 25 },
    { id: 'reading', name: 'Reading Comprehension', timeMinutes: 55 }
  ],
  'ielts': [
    { id: 'listening', name: 'Listening', timeMinutes: 30 },
    { id: 'reading', name: 'Reading', timeMinutes: 60 },
    { id: 'writing', name: 'Writing', timeMinutes: 60 },
    { id: 'speaking', name: 'Speaking', timeMinutes: 15 }
  ]
};

export const adminStats = {
  totalUsers: 450,
  activeUsers: 312,
  testsCompleted: 1256,
  averageScore: {
    "toefl-itp": 540,
    "ielts": 6.5
  }
};
