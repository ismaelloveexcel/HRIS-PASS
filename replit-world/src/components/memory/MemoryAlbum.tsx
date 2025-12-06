import { useGameStore } from '../../state/useGameStore';

const MemoryAlbum = () => {
  const { discoveryLog, mailbox, clearMailboxItem, photos } = useGameStore((state) => ({
    discoveryLog: state.discoveryLog,
    mailbox: state.mailbox,
    clearMailboxItem: state.clearMailboxItem,
    photos: state.photos,
  }));

  return (
    <div className="panel">
      <p className="badge">Memories & mail</p>
      <h2>Memory Album</h2>
      <p className="panel-subtitle">
        Snapshots of new combos, rituals, and letters you send each other.
      </p>
      <div className="memory-log">
        {discoveryLog.slice().reverse().map((entry) => (
          <div key={entry.timestamp + entry.id} className="memory-entry">
            <strong>{entry.label}</strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{entry.detail}</span>
          </div>
        ))}
        {!discoveryLog.length && <p style={{ color: 'var(--text-muted)' }}>No entries yet.</p>}
      </div>
      <div className="divider" />
      <div className="photo-grid">
        {photos.slice().reverse().map((photo) => (
          <div key={photo.id} className="photo-card">
            <strong>{photo.caption || 'Untitled'}</strong>
            <span>{photo.stickers.join(' ')}</span>
            <small style={{ color: 'var(--text-muted)' }}>
              {new Date(photo.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
        {!photos.length && <p style={{ color: 'var(--text-muted)' }}>Capture your first photo to see it here.</p>}
      </div>
      <div className="divider" />
      <div className="control-stack">
        <strong>Mailbox</strong>
        {mailbox.map((item) => (
          <div key={item.id} className={`mail-card ${item.claimed ? 'claimed' : ''}`}>
            <strong>{item.title}</strong>
            <p style={{ marginTop: 4, color: 'var(--text-muted)' }}>{item.body}</p>
            {item.reward && <small>Reward: {item.reward.id}</small>}
            {!item.claimed && (
              <button type="button" onClick={() => clearMailboxItem(item.id)}>
                Claim gift
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryAlbum;
