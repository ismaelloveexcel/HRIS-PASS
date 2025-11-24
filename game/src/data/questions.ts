import type { QuizDifficulty, QuizQuestion, QuizTheme } from '../types';

export const QUESTION_BANK: QuizQuestion[] = [
  {
    id: 'stem-1',
    category: 'stem',
    difficulty: 'easy',
    prompt: 'A snake drops you 12 tiles. The island spins once every 3 turns. How many spins happen while you climb those 12 tiles back at 2 tiles per turn?',
    options: ['1 spin', '2 spins', '3 spins', '4 spins'],
    correctIndex: 1,
    flavor: 'Observation Cube math burst',
  },
  {
    id: 'stem-2',
    category: 'stem',
    difficulty: 'medium',
    prompt: 'The neon ladders glow in a Fibonacci rhythm. If the previous ladder pulses 5 times, how many pulses does the next ladder show?',
    options: ['5', '8', '10', '13'],
    correctIndex: 1,
    flavor: 'Bamboo elevator puzzle',
  },
  {
    id: 'stem-3',
    category: 'stem',
    difficulty: 'hard',
    prompt: 'Glass tokens double every successful quiz, starting with 1. After four consecutive wins, how many tokens do you hold?',
    options: ['8', '12', '16', '24'],
    correctIndex: 2,
  },
  {
    id: 'pop-1',
    category: 'pop',
    difficulty: 'easy',
    prompt: 'In Squid Game, which shape do the guards with triangle masks usually act as?',
    options: ['Managers', 'Workers / Enforcers', 'Contestants', 'VIPs'],
    correctIndex: 1,
  },
  {
    id: 'pop-2',
    category: 'pop',
    difficulty: 'medium',
    prompt: 'Which children’s game inspired the “Red Light, Green Light” challenge?',
    options: ['Freeze Tag', 'Statues', 'Mother May I', 'Simon Says'],
    correctIndex: 3,
  },
  {
    id: 'pop-3',
    category: 'pop',
    difficulty: 'hard',
    prompt: 'What song plays during the Squid Game dormitory wake-up call?',
    options: [
      'Blue Danube Waltz',
      'Fly Me to the Moon',
      'Way Back Then',
      'Paradise Lost',
    ],
    correctIndex: 0,
  },
  {
    id: 'lore-1',
    category: 'lore',
    difficulty: 'easy',
    prompt: 'What color do the contest jumpsuits have in Squid Game?',
    options: ['Orange', 'Green', 'Red', 'Yellow'],
    correctIndex: 1,
  },
  {
    id: 'lore-2',
    category: 'lore',
    difficulty: 'medium',
    prompt: 'The Glass Bridge challenge features how many stepping panels in the original show?',
    options: ['14', '16', '20', '24'],
    correctIndex: 2,
  },
  {
    id: 'lore-3',
    category: 'lore',
    difficulty: 'hard',
    prompt: 'What is the prize money displayed in the Squid Game piggy bank?',
    options: ['30 billion won', '40 billion won', '45.6 billion won', '50.1 billion won'],
    correctIndex: 2,
  },
];

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const drawQuestion = (
  category: QuizTheme,
  difficulty: QuizDifficulty = 'medium',
): QuizQuestion => {
  const filtered = QUESTION_BANK.filter(
    (q) => q.category === category && (difficulty ? q.difficulty === difficulty : true),
  );

  if (filtered.length === 0) {
    return pickRandom(QUESTION_BANK);
  }

  return pickRandom(filtered);
};
