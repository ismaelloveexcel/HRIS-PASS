import { useState } from 'react';

import { useGameStore } from '../../state/useGameStore';

const CINEMA_URL = 'https://movies2watch.cc/home/';

const CinemaLounge = () => {
  const { logCinemaSession, cinemaSessions } = useGameStore((state) => ({
    logCinemaSession: state.logCinemaSession,
    cinemaSessions: state.cinemaSessions,
  }));
  const [notes, setNotes] = useState('');

  const openPortal = () => {
    if (typeof window !== 'undefined') {
      window.open(CINEMA_URL, '_blank', 'noopener');
    }
  };

  const handleLog = () => {
    logCinemaSession(notes);
    setNotes('');
  };

  return (
    <div className="panel">
      <p className="badge">Shared cinema</p>
      <h2>Movies Together</h2>
      <p className="panel-subtitle">
        Launch the Movies2Watch portal and jot a quick note so it lands in your scrapbook.
      </p>
      <div className="control-row" style={{ gap: 12 }}>
        <button type="button" onClick={openPortal}>
          Open movie portal
        </button>
        <small style={{ color: 'var(--text-muted)' }}>The site opens in a new tab so you can stream side-by-side.</small>
      </div>
      <textarea
        rows={2}
        value={notes}
        placeholder="What did you watch? Favorite scene?"
        onChange={(event) => setNotes(event.target.value)}
      />
      <button type="button" onClick={handleLog}>
        Log cinema night
      </button>
      <div className="scroll-area" style={{ maxHeight: 220 }}>
        {cinemaSessions.slice().reverse().map((session) => (
          <div key={session.id} className="memory-entry">
            <strong>{new Date(session.watchedAt).toLocaleDateString()}</strong>
            <p style={{ color: 'var(--text-muted)' }}>{session.notes || 'Movie night logged.'}</p>
          </div>
        ))}
        {!cinemaSessions.length && <p style={{ color: 'var(--text-muted)' }}>No cinema nights logged yet.</p>}
      </div>
    </div>
  );
};

export default CinemaLounge;
