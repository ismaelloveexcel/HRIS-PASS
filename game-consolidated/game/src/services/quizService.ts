import type { QuizDifficulty, QuizQuestion, QuizTheme } from '../types';
import { drawQuestion } from '../data/questions';

export interface QuizService {
  fetchQuestion: (category: QuizTheme, difficulty?: QuizDifficulty) => Promise<QuizQuestion>;
}

const latency = () => 100 + Math.random() * 220;

class LocalQuizService implements QuizService {
  async fetchQuestion(category: QuizTheme, difficulty?: QuizDifficulty): Promise<QuizQuestion> {
    await new Promise((resolve) => setTimeout(resolve, latency()));
    return drawQuestion(category, difficulty);
  }
}

let activeService: QuizService = new LocalQuizService();

export const quizService: QuizService = {
  fetchQuestion: (category, difficulty) => activeService.fetchQuestion(category, difficulty),
};

export const registerQuizService = (service: QuizService) => {
  activeService = service;
};

export const resetQuizService = () => {
  activeService = new LocalQuizService();
};
