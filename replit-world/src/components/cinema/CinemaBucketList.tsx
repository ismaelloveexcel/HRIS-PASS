import { useState } from 'react';

import { useGameStore } from '../../state/useGameStore';
import { loadSession } from '../../utils/session';

const CinemaBucketList = () => {
  const session = loadSession();
  const { bucketList, addBucketItem, toggleBucketItem } = useGameStore((state) => ({
    bucketList: state.bucketList,
    addBucketItem: state.addBucketItem,
    toggleBucketItem: state.toggleBucketItem,
  }));
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('Movies2Watch');

  const handleAdd = () => {
    if (!title.trim()) return;
    addBucketItem({
      title: title.trim(),
      source: source.trim() || 'Movies2Watch',
      addedBy: session?.playerName ?? 'Caretaker',
    });
    setTitle('');
  };

  return (
    <div className="panel">
      <p className="badge">Bucket list</p>
      <h2>Watch queue</h2>
      <p className="panel-subtitle">Plan movies/series you both want to share.</p>
      <div className="control-row" style={{ gap: 8, flexWrap: 'wrap' }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          style={{ flex: 2, minWidth: 160 }}
        />
        <input
          placeholder="Source (Netflix, Movies2Watch…)"
          value={source}
          onChange={(event) => setSource(event.target.value)}
          style={{ flex: 2, minWidth: 160 }}
        />
        <button type="button" onClick={handleAdd} disabled={!title.trim()}>
          Add
        </button>
      </div>
      <div className="scroll-area" style={{ maxHeight: 240 }}>
        {bucketList.map((item) => (
          <div key={item.id} className={`bucket-item ${item.status}`}>
            <div>
              <strong>{item.title}</strong>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                {item.source} · added by {item.addedBy}
              </p>
            </div>
            <button type="button" onClick={() => toggleBucketItem(item.id)}>
              {item.status === 'planned' ? 'Mark watched' : 'Reset'}
            </button>
          </div>
        ))}
        {!bucketList.length && <p style={{ color: 'var(--text-muted)' }}>Queue is empty. Start adding dream movies!</p>}
      </div>
    </div>
  );
};

export default CinemaBucketList;
