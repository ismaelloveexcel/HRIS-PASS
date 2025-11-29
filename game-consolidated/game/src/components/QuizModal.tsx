import { useEffect, useState } from 'react';
import type { ActiveQuiz } from '../types';

interface QuizModalProps {
  quiz: ActiveQuiz;
  onResolve: (choiceIndex: number | null) => void;
}

const QUIZ_DURATION = 15;

export const QuizModal = ({ quiz, onResolve }: QuizModalProps) => {
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);

  useEffect(() => {
    setTimeLeft(QUIZ_DURATION);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onResolve(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quiz.playerId, onResolve]);

  return (
    <div className="quiz-backdrop">
      <div className="quiz-modal">
        <header>
          <p className="quiz-label">Observation Cube Challenge</p>
          <h2>{quiz.question.prompt}</h2>
          {quiz.question.flavor && <p className="quiz-flavor">{quiz.question.flavor}</p>}
        </header>
        <div className="quiz-progress">
          <div className="quiz-progress-bar" style={{ width: `${(timeLeft / QUIZ_DURATION) * 100}%` }} />
          <span>{timeLeft}s</span>
        </div>
        <ul className="quiz-options">
          {quiz.question.options.map((option, index) => (
            <li key={option}>
              <button type="button" onClick={() => onResolve(index)}>
                <span>{String.fromCharCode(65 + index)}</span>
                <p>{option}</p>
              </button>
            </li>
          ))}
        </ul>
        <footer>
          <p>{quiz.playerName} faces {quiz.snake.label}</p>
        </footer>
      </div>
    </div>
  );
};
