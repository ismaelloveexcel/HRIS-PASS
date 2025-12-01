export type QuizTheme = 'stem' | 'pop' | 'lore';

export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  category: QuizTheme;
  difficulty: QuizDifficulty;
  flavor?: string;
}

export interface Ladder {
  start: number;
  end: number;
  label: string;
  color: string;
}

export interface Snake {
  start: number;
  end: number;
  label: string;
  severity: 'low' | 'medium' | 'high';
  theme: QuizTheme;
}

export interface MysteryTile {
  tile: number;
  effect: 'credits' | 'storm' | 'guard';
  label: string;
}

export interface Player {
  id: number;
  name: string;
  color: string;
  position: number;
  credits: number;
  streak: number;
  immunity: number;
}

export interface EventLogEntry {
  id: string;
  tone: 'info' | 'success' | 'danger';
  message: string;
  timestamp: number;
}

export type TimeOfDay = 'sunrise' | 'daylight' | 'golden' | 'neon';

export interface ActiveQuiz {
  snake: Snake;
  playerId: number;
  playerName: string;
  question: QuizQuestion;
}

export interface SharkAlert {
  playerName: string;
  severity: Snake['severity'];
}

export type ImmersiveEvent =
  | {
      id: string;
      timestamp: number;
      type: 'dice-roll';
      playerName: string;
      value: number;
    }
  | {
      id: string;
      timestamp: number;
      type: 'ladder';
      playerName: string;
      ladderLabel: string;
    }
  | {
      id: string;
      timestamp: number;
      type: 'snake-warning';
      playerName: string;
      snakeLabel: string;
    }
  | {
      id: string;
      timestamp: number;
      type: 'snake-bite';
      playerName: string;
      snakeLabel: string;
    }
  | {
      id: string;
      timestamp: number;
      type: 'quiz-correct';
      playerName: string;
    }
  | {
      id: string;
      timestamp: number;
      type: 'victory';
      playerName: string;
      turns: number;
    };
