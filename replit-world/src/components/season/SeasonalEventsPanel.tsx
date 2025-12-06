import { seasonalEvents } from '../../data/events';
import { useGameStore } from '../../state/useGameStore';

const SeasonalEventsPanel = () => {
  const activeEventId = useGameStore((state) => state.activeEventId);

  return (
    <div className="panel">
      <p className="badge">Seasonal festivals</p>
      <h2>Event Board</h2>
      <p className="panel-subtitle">Limited-time rituals add exclusive elements and decor.</p>
      <div className="season-grid">
        {seasonalEvents.map((event) => (
          <div
            key={event.id}
            className={`season-card ${activeEventId === event.id ? 'active' : ''}`}
          >
            <div className="control-row" style={{ justifyContent: 'space-between' }}>
              <strong>{event.title}</strong>
              <span className="badge">{event.timeframe}</span>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>{event.description}</p>
            <small>Rewards: {event.rewards.map((reward) => reward.id).join(', ')}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonalEventsPanel;
