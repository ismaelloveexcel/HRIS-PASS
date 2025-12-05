import { useEffect, useMemo, useState } from 'react';

import { useGameStore } from '../../state/useGameStore';

type CellValue = '🌟' | '🎮' | null;

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const ArcadeCabinet = () => {
  const { recordArcadeWin, stats } = useGameStore((state) => ({
    recordArcadeWin: state.recordArcadeWin,
    stats: state.stats,
  }));
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [current, setCurrent] = useState<CellValue>('🌟');
  const [status, setStatus] = useState('Take turns tapping the holographic board.');

  const winner = useMemo(() => {
    for (const [a, b, c] of winningLines) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null;
  }, [board]);

  const handleMove = (index: number) => {
    if (board[index] || winner) return;
    const next = [...board];
    next[index] = current;
    setBoard(next);
    const nextPlayer: CellValue = current === '🌟' ? '🎮' : '🌟';
    setCurrent(nextPlayer);
    setStatus(`It is ${nextPlayer === '🌟' ? 'your' : "nephew's"} move.`);
  };

  useEffect(() => {
    if (winner) {
      setStatus(`${winner} wins!`);
      recordArcadeWin();
    }
  }, [winner, recordArcadeWin]);

  useEffect(() => {
    if (!winner && board.every(Boolean)) {
      setStatus('Draw! Hit reset for a rematch.');
    }
  }, [board, winner]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setCurrent('🌟');
    setStatus('Fresh game! 🌟 starts.');
  };

  return (
    <div className="panel">
      <p className="badge">Arcade den</p>
      <h2>Mini Arcade Cabinet</h2>
      <p className="panel-subtitle">Pass-and-play tic-tac-toe counts toward arcade achievements.</p>
      <div className="arcade-grid">
        {board.map((cell, index) => (
          <button
            type="button"
            key={index}
            className="arcade-cell"
            onClick={() => handleMove(index)}
          >
            {cell ?? ''}
          </button>
        ))}
      </div>
      <p style={{ color: 'var(--text-muted)' }}>{status}</p>
      <div className="control-row" style={{ gap: 12 }}>
        <button type="button" onClick={reset}>
          Reset board
        </button>
        <small style={{ color: 'var(--text-muted)' }}>Total arcade wins: {stats.arcadeWins}</small>
      </div>
    </div>
  );
};

export default ArcadeCabinet;
