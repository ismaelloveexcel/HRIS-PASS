import { useState } from 'react';

import { useGameStore } from '../../state/useGameStore';

const StoryPropsPanel = () => {
  const { storyProps, addStoryEntry } = useGameStore((state) => ({
    storyProps: state.storyProps,
    addStoryEntry: state.addStoryEntry,
  }));
  const [selectedId, setSelectedId] = useState<string | null>(storyProps[0]?.id ?? null);
  const [note, setNote] = useState('');
  const [entryType, setEntryType] = useState<'text' | 'sketch'>('text');

  const selectedProp = storyProps.find((prop) => prop.id === selectedId);

  const handleSave = () => {
    if (!selectedProp || !selectedProp.unlocked || !note.trim()) return;
    addStoryEntry(selectedProp.id, { type: entryType, content: note.trim() });
    setNote('');
  };

  return (
    <div className="panel">
      <p className="badge">Story props</p>
      <h2>Interactive Keepsakes</h2>
      <p className="panel-subtitle">
        Campfires, projectors, and scrapbooks hold the little jokes you two create.
      </p>
      <div className="prop-grid">
        {storyProps.map((prop) => (
          <button
            type="button"
            key={prop.id}
            className={`prop-card ${selectedId === prop.id ? 'active' : ''} ${!prop.unlocked ? 'locked' : ''}`}
            onClick={() => setSelectedId(prop.id)}
          >
            <div dangerouslySetInnerHTML={{ __html: prop.icon }} />
            <strong>{prop.label}</strong>
            <small>{prop.unlocked ? `${prop.entries.length} memories` : 'Unlock via forge'}</small>
          </button>
        ))}
      </div>
      {selectedProp && (
        <div className="prop-detail">
          <div className="control-row" style={{ justifyContent: 'space-between' }}>
            <strong>{selectedProp.label}</strong>
            <div style={{ display: 'flex', gap: 8 }}>
              <label className="badge" style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="entryType"
                  value="text"
                  checked={entryType === 'text'}
                  onChange={() => setEntryType('text')}
                />
                Note
              </label>
              <label className="badge" style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="entryType"
                  value="sketch"
                  checked={entryType === 'sketch'}
                  onChange={() => setEntryType('sketch')}
                />
                Doodle
              </label>
            </div>
          </div>
          {selectedProp.unlocked ? (
            <>
              <textarea
                value={note}
                placeholder={entryType === 'text' ? 'Write a tiny memory...' : 'Describe your doodle (stars, hearts, goofy faces).'}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
              />
              <button type="button" onClick={handleSave}>
                Save to {selectedProp.label}
              </button>
              <div className="memory-log">
                {selectedProp.entries.slice().reverse().map((entry) => (
                  <div key={entry.id} className="memory-entry">
                    <strong>{entry.type === 'text' ? 'Note' : 'Doodle'}</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{entry.content}</span>
                  </div>
                ))}
                {!selectedProp.entries.length && (
                  <p style={{ color: 'var(--text-muted)' }}>No entries yet—light the prop via the forge.</p>
                )}
              </div>
            </>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>Unlock this prop by experimenting in the Forge Lab.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryPropsPanel;
