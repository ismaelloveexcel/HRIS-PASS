import { useState } from 'react';

interface TutorialOverlayProps {
  onDismiss: () => void;
}

const STEPS = [
  {
    title: 'Roll or Shake',
    detail: 'Tap roll or physically shake your phone to send the die flying. Mobile haptics let you feel each throw.',
  },
  {
    title: 'Face the Quiz Rooms',
    detail: 'Snakes trigger neon quiz pods. Answer fast to flip the snake into a ladder and earn bonus glass tokens.',
  },
  {
    title: 'Bank Power Ups',
    detail: 'Mystery tiles grant immunity, teleports, and streak multipliers. Keep runs short to set a new fastest win.',
  },
];

export const TutorialOverlay = ({ onDismiss }: TutorialOverlayProps) => {
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  return (
    <div className="tutorial-overlay" role="dialog" aria-modal="true">
      <div className="tutorial-card">
        <p className="tutorial-badge">Neon primer</p>
        <h2>{current.title}</h2>
        <p className="tutorial-detail">{current.detail}</p>
        <div className="tutorial-progress">
          {STEPS.map((descriptor, index) => (
            <span
              key={descriptor.title}
              className={['tutorial-dot', index === step ? 'dot-active' : ''].join(' ').trim()}
            />
          ))}
        </div>
        <div className="tutorial-actions">
          <button type="button" className="ghost" onClick={onDismiss}>
            Skip tour
          </button>
          <button
            type="button"
            onClick={() => (isLast ? onDismiss() : setStep((prev) => Math.min(prev + 1, STEPS.length - 1)))}
          >
            {isLast ? 'Let me play' : 'Next hint'}
          </button>
        </div>
      </div>
    </div>
  );
};
