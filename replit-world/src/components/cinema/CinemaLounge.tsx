import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

import { SOCKET_URL } from '../../config';
import { useGameStore } from '../../state/useGameStore';
import { loadSession } from '../../utils/session';
import HyperbeamEmbed from './HyperbeamEmbed';

const CinemaLounge = () => {
  const { logCinemaSession, cinemaSessions } = useGameStore((state) => ({
    logCinemaSession: state.logCinemaSession,
    cinemaSessions: state.cinemaSessions,
  }));
  const [notes, setNotes] = useState('');
  const [cinemaStatus, setCinemaStatus] = useState('');
  const [hyperbeamUrl, setHyperbeamUrl] = useState<string | null>(null);
  const session = loadSession();

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!session) return;
    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    socketRef.current = socket;
    socket.emit('world:join', session);
    socket.on('cinema:session', ({ embedUrl }: { embedUrl: string }) => {
      setHyperbeamUrl(embedUrl);
      setCinemaStatus('Hyperbeam session ready. Press play together!');
    });
    socket.on('world:error', (message: string) => setCinemaStatus(message));
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [session]);

  const startHyperbeam = () => {
    if (!session) {
      setCinemaStatus('Join a world to start a session.');
      return;
    }
    setCinemaStatus('Launching Hyperbeam session…');
    socketRef.current?.emit('cinema:start', { worldCode: session.worldCode, token: session.token });
  };

  const handleLog = () => {
    logCinemaSession(notes);
    setNotes('');
  };

  return (
    <div className="panel">
      <p className="badge">Shared cinema</p>
      <h2>Movies Together</h2>
      <p className="panel-subtitle">Fire up Hyperbeam to watch the exact same screen while you chat.</p>
      <div className="control-row" style={{ gap: 12, flexWrap: 'wrap' }}>
        <button type="button" onClick={startHyperbeam}>
          Start Hyperbeam session
        </button>
        {cinemaStatus && <small style={{ color: 'var(--text-muted)' }}>{cinemaStatus}</small>}
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
        {cinemaSessions.slice().reverse().map((sessionItem) => (
          <div key={sessionItem.id} className="memory-entry">
            <strong>{new Date(sessionItem.watchedAt).toLocaleDateString()}</strong>
            <p style={{ color: 'var(--text-muted)' }}>{sessionItem.notes || 'Movie night logged.'}</p>
          </div>
        ))}
        {!cinemaSessions.length && <p style={{ color: 'var(--text-muted)' }}>No cinema nights logged yet.</p>}
      </div>
      {hyperbeamUrl && <HyperbeamEmbed embedUrl={hyperbeamUrl} onClose={() => setHyperbeamUrl(null)} />}
    </div>
  );
};

export default CinemaLounge;
