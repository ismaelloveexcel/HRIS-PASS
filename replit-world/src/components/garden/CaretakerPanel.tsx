import { useMemo } from 'react';

import { useGameStore } from '../../state/useGameStore';

const typeLabels: Record<string, string> = {
  water: 'Watered plants',
  plant: 'Planted bloom',
  feed: 'Fed habitat',
  pet: 'Pet care',
  movie: 'Cinema ritual',
  quest: 'Quest',
};

const CaretakerPanel = () => {
  const { caretakerLog, caretakerPoints } = useGameStore((state) => ({
    caretakerLog: state.caretakerLog,
    caretakerPoints: state.caretakerPoints,
  }));

  const summary = useMemo(() => {
    return caretakerLog.reduce(
      (acc, entry) => {
        acc[entry.type] = (acc[entry.type] ?? 0) + entry.points;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [caretakerLog]);

  return (
    <div className="panel">
      <p className="badge">Caretaker log</p>
      <h2>Shared kindness score</h2>
      <p className="panel-subtitle">Every watering, feeding, or movie night adds points.</p>
      <div className="control-row" style={{ gap: 16, flexWrap: 'wrap' }}>
        <div className="stat-card" style={{ flex: '0 0 160px' }}>
          <span>Total points</span>
          <span className="stat-value">{caretakerPoints}</span>
        </div>
        <div className="control-stack" style={{ gap: 6, flex: 1 }}>
          {Object.entries(summary).map(([type, points]) => (
            <small key={type}>
              {typeLabels[type] ?? type}: {points} pts
            </small>
          ))}
          {!caretakerLog.length && <small>Start watering or feeding to earn points.</small>}
        </div>
      </div>
      <div className="scroll-area" style={{ maxHeight: 220 }}>
        {caretakerLog.slice(0, 6).map((entry) => (
          <div key={entry.id} className="memory-entry">
            <strong>{typeLabels[entry.type] ?? entry.type}</strong>
            <span style={{ color: 'var(--text-muted)' }}>
              {entry.description} · +{entry.points}pts ·{' '}
              {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        {!caretakerLog.length && <p style={{ color: 'var(--text-muted)' }}>No caretaker entries yet.</p>}
      </div>
    </div>
  );
};

export default CaretakerPanel;
