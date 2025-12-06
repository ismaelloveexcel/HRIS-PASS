import { type FormEvent, useState } from 'react';

import { joinWorld } from '../../api/worldClient';
import { saveSession } from '../../utils/session';
import { useGameStore } from '../../state/useGameStore';
import type { WorldSession } from '../../state/types';

interface WorldGateProps {
  onSession: (session: WorldSession) => void;
}

const WorldGate = ({ onSession }: WorldGateProps) => {
  const [worldCode, setWorldCode] = useState('FAMILY');
  const [playerName, setPlayerName] = useState('Player');
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setStatus('Connecting...');
    try {
      const result = await joinWorld(worldCode.trim(), playerName.trim());
      useGameStore.getState().loadWorldSnapshot(result.world);
      const session = {
        worldCode: worldCode.trim().toUpperCase(),
        playerName: playerName.trim(),
        token: result.token,
      };
      saveSession(session);
      onSession(session);
      setStatus('');
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="world-gate">
      <div className="panel" style={{ maxWidth: 520, margin: '0 auto' }}>
        <p className="badge">Shared universe</p>
        <h2>Enter your world code</h2>
        <p className="panel-subtitle">
          Pick a simple code (e.g., FAMILY) and the backend will keep every house + garden in sync.
        </p>
        <form onSubmit={handleSubmit} className="control-stack" style={{ gap: 16 }}>
          <label className="control-stack">
            <span>World code</span>
            <input
              value={worldCode}
              onChange={(event) => setWorldCode(event.target.value.toUpperCase())}
              maxLength={12}
              required
            />
          </label>
          <label className="control-stack">
            <span>Your nickname</span>
            <input value={playerName} onChange={(event) => setPlayerName(event.target.value)} required />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Connecting...' : 'Enter world'}
          </button>
        </form>
        {status && <p style={{ color: 'var(--danger)' }}>{status}</p>}
      </div>
    </div>
  );
};

export default WorldGate;
