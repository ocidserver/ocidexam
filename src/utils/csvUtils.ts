
import { Question, QuestionCategory, QuestionDifficulty } from "@/components/admin/types/question-types";
import { parse } from "papaparse";

// Template headers for Question Bank CSV
export const QUESTION_CSV_HEADERS = [
  'title',
  'content', 
  'category',
  'question_type',
  'difficulty',
  'options', // JSON string format: {"A": "Option text", "B": "Option text"}
  'correct_answer',
  'explanation',
  'topic_tags', // Comma separated tags
  'active'
];

// Generate empty template data
export const generateQuestionTemplateData = (): string[][] => {
  // Headers row
  const headers = QUESTION_CSV_HEADERS;
  
  // Example row
  const exampleRow = [
    'Sample Multiple Choice Question',
    'What is the correct answer to this question?',
    'reading',
    'multiple_choice',
    'medium',
    '{"A": "First option", "B": "Second option", "C": "Third option", "D": "Fourth option"}',
    'A',
    'This is an explanation of why A is correct',
    'grammar,vocabulary',
    'true'
  ];
  
  return [headers, exampleRow];
};

// Convert questions to CSV format
export const questionsToCSV = (questions: Question[]): string[][] => {
  const headers = QUESTION_CSV_HEADERS;
  
  const rows = questions.map(question => [
    question.title,
    question.content,
    question.category,
    question.question_type,
    question.difficulty,
    JSON.stringify(question.options),
    question.correct_answer,
    question.explanation || '',
    question.topic_tags?.join(',') || '',
    question.active.toString()
  ]);
  
  return [headers, ...rows];
};

// Convert CSV data to question format
export const parseQuestionCSV = (csvText: string): {
  valid: boolean;
  questions?: Partial<Question>[];
  errors?: string[];
} => {
  const errors: string[] = [];
  
  // Parse CSV
  const { data, errors: parseErrors } = parse(csvText, {
    skipEmptyLines: true,
  });
  
  if (parseErrors.length > 0) {
    return {
      valid: false,
      errors: parseErrors.map(err => `CSV parse error: ${err.message} at row ${err.row}`)
    };
  }
  
  if (data.length < 2) { // Headers + at least one row
    return {
      valid: false,
      errors: ['CSV file must contain headers and at least one data row']
    };
  }
  
  // Validate headers
  const headers = data[0];
  const expectedHeaders = QUESTION_CSV_HEADERS;
  
  const missingHeaders = expectedHeaders.filter(
    header => !headers.includes(header)
  );
  
  if (missingHeaders.length > 0) {
    return {
      valid: false,
      errors: [`Missing required headers: ${missingHeaders.join(', ')}`]
    };
  }
  
  // Convert rows to questions
  const questions: Partial<Question>[] = [];
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const rowNum = i + 1;
    
    if (row.length !== headers.length) {
      errors.push(`Row ${rowNum}: Expected ${headers.length} columns but found ${row.length}`);
      continue;
    }
    
    // Map row to question object
    try {
      const questionData: Record<string, any> = {};
      
      headers.forEach((header, index) => {
        questionData[header] = row[index];
      });
      
      // Validate and convert types
      const category = questionData.category;
      if (!['listening', 'reading', 'writing', 'speaking'].includes(category)) {
        errors.push(`Row ${rowNum}: Invalid category "${category}". Must be one of: listening, reading, writing, speaking`);
      }
      
      const difficulty = questionData.difficulty;
      if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        errors.push(`Row ${rowNum}: Invalid difficulty "${difficulty}". Must be one of: easy, medium, hard`);
      }
      
      // Parse JSON options
      let options;
      try {
        options = JSON.parse(questionData.options);
        if (typeof options !== 'object' || options === null) {
          throw new Error('Not an object');
        }
      } catch (err) {
        errors.push(`Row ${rowNum}: Invalid options format. Must be a valid JSON object`);
      }
      
      // Parse topic tags
      const topicTags = questionData.topic_tags ? 
        questionData.topic_tags.split(',').map((tag: string) => tag.trim()).filter(Boolean) : 
        [];
      
      // Parse active status
      const active = questionData.active === 'true';
      
      // Create question object
      const question: Partial<Question> = {
        title: questionData.title,
        content: questionData.content,
        category: category as QuestionCategory,
        question_type: questionData.question_type,
        difficulty: difficulty as QuestionDifficulty,
        options: options || {},
        correct_answer: questionData.correct_answer,
        explanation: questionData.explanation || null,
        topic_tags: topicTags.length > 0 ? topicTags : null,
        active: active
      };
      
      questions.push(question);
      
    } catch (err) {
      errors.push(`Row ${rowNum}: Error parsing data: ${(err as Error).message}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    questions,
    errors: errors.length > 0 ? errors : undefined
  };
};

// Helper to download data as a file
export const downloadCSV = (data: string[][], filename: string): void => {
  const csvContent = data.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
