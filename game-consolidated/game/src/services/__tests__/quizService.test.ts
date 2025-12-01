import { describe, expect, it } from 'vitest';
import { quizService, registerQuizService, resetQuizService, type QuizService } from '../quizService';
import type { QuizQuestion } from '../../types';

describe('quizService', () => {
  it('returns a question for a given category', async () => {
    const question = await quizService.fetchQuestion('stem');
    expect(question.category).toBe('stem');
  });

  it('can be overridden for remote sources', async () => {
    const mockQuestion: QuizQuestion = {
      id: 'mock-1',
      category: 'pop',
      difficulty: 'easy',
      prompt: 'Mock?',
      options: ['Yes', 'No', 'Maybe', 'Later'],
      correctIndex: 0,
    };

    const mockService: QuizService = {
      fetchQuestion: async () => mockQuestion,
    };

    try {
      registerQuizService(mockService);
      const question = await quizService.fetchQuestion('pop');
      expect(question).toEqual(mockQuestion);
    } finally {
      resetQuizService();
    }
  });
});
