import { achievementList } from '../../data/achievements';
import { useGameStore } from '../../state/useGameStore';

const AchievementPanel = () => {
  const { achievementsUnlocked, stats } = useGameStore((state) => ({
    achievementsUnlocked: state.achievementsUnlocked,
    stats: state.stats,
  }));

  return (
    <div className="panel">
      <p className="badge">Rituals & quests</p>
      <h2>Shared Achievements</h2>
      <p className="panel-subtitle">Gentle quests unlock decor, moods, and stories.</p>
      <div className="scroll-area" style={{ maxHeight: 360 }}>
        {achievementList.map((achievement) => {
          const progress = stats[achievement.requirement.metric];
          const percent = Math.min(
            100,
            Math.round((progress / achievement.requirement.threshold) * 100),
          );
          const completed = achievementsUnlocked.includes(achievement.id);
          return (
            <div
              key={achievement.id}
              className={`achievement-card ${completed ? 'completed' : ''}`}
            >
              <strong>{achievement.title}</strong>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>{achievement.description}</p>
              <div className="progress-track" style={{ marginTop: 8 }}>
                <div
                  className="progress-fill"
                  style={{ width: `${percent}%`, background: completed ? '#16c47f' : undefined }}
                />
              </div>
              <small>
                {progress} / {achievement.requirement.threshold}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementPanel;
