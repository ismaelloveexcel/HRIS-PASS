import { moodPresets } from '../../data/moods';
import { useGameStore } from '../../state/useGameStore';

const MoodBoard = () => {
  const { unlockedMoods, activeMoodId, setActiveMood } = useGameStore((state) => ({
    unlockedMoods: state.unlockedMoods,
    activeMoodId: state.activeMoodId,
    setActiveMood: state.setActiveMood,
  }));

  return (
    <div className="panel">
      <p className="badge">Atmosphere</p>
      <h2>Mood Presets</h2>
      <p className="panel-subtitle">Swap entire color grades and ambient vibes in one tap.</p>
      <div className="catalog-grid">
        {moodPresets.map((preset) => {
          const unlocked = unlockedMoods.includes(preset.id);
          return (
            <div
              key={preset.id}
              className={`catalog-card ${!unlocked ? 'locked' : ''}`}
              style={{ background: preset.gradient, color: '#0f172a' }}
            >
              <strong>{preset.label}</strong>
              <p style={{ fontSize: '0.8rem' }}>{preset.description}</p>
              <button
                type="button"
                disabled={!unlocked}
                onClick={() => setActiveMood(preset.id)}
              >
                {activeMoodId === preset.id ? 'Active' : unlocked ? 'Activate' : 'Locked'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodBoard;
