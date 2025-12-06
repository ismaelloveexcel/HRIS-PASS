import { useMemo } from 'react';

import { useGameStore } from '../../state/useGameStore';

const ParticleField = () => {
  const weather = useGameStore((state) => state.clock.weather);
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, idx) => ({
        id: idx,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 4,
      })),
    [],
  );

  return (
    <div className={`particle-layer weather-${weather}`}>
      {particles.map((particle) => (
        <span
          key={particle.id}
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
