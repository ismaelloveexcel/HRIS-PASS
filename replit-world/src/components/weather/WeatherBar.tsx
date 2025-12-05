import { useEffect } from 'react';

import { useGameStore } from '../../state/useGameStore';

const friendlyCopy: Record<string, string> = {
  sunrise: 'Sunrise glow – best time to plant new memories.',
  day: 'Daylight energy – perfect for garden chores.',
  evening: 'Evening sparkles – forge something cozy.',
  night: 'Bioluminescent hush – arcade duels and cinema vibes.',
};

const weatherEmoji: Record<string, string> = {
  clear: '☀️',
  rain: '🌧️',
  mist: '✨',
  festival: '🏮',
};

const WeatherBar = () => {
  const { clock, updateClock, toggleSkySync } = useGameStore((state) => ({
    clock: state.clock,
    updateClock: state.updateClock,
    toggleSkySync: state.toggleSkySync,
  }));

  useEffect(() => {
    const interval = setInterval(() => updateClock(), 60000);
    return () => clearInterval(interval);
  }, [updateClock]);

  return (
    <div className="panel weather-bar">
      <div className="control-row" style={{ justifyContent: 'space-between' }}>
        <div>
          <p className="badge">Sky sync</p>
          <h2>
            {weatherEmoji[clock.weather]} {clock.timeOfDay.toUpperCase()}
          </h2>
          <p className="panel-subtitle">{friendlyCopy[clock.timeOfDay]}</p>
        </div>
        <div className="control-row" style={{ gap: 8 }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Follow real sky</label>
          <input
            type="checkbox"
            checked={clock.followRealSky}
            onChange={(event) => toggleSkySync(event.target.checked)}
          />
        </div>
      </div>
      <div className="control-row" style={{ gap: 12 }}>
        <button type="button" onClick={() => updateClock()}>
          Refresh now
        </button>
        <small style={{ color: 'var(--text-muted)' }}>
          Weather changes unlock small boosts (rain = faster flowers, night = arcade XP).
        </small>
      </div>
    </div>
  );
};

export default WeatherBar;
