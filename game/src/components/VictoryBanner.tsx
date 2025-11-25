import type { Player } from '../types';

interface VictoryBannerProps {
  winner: Player | null;
  onReset: () => void;
}

export const VictoryBanner = ({ winner, onReset }: VictoryBannerProps) =>
  winner ? (
    <div className="victory-overlay">
      <div className="victory-card">
        <p className="victory-kudos">Glass Crown Secured</p>
        <h2>{winner.name} wins the Ascend trial!</h2>
        <p>Stats · Tokens: {winner.credits} · Quiz streak: {winner.streak}</p>
        <button type="button" onClick={onReset}>
          Restart Match
        </button>
      </div>
    </div>
  ) : null;
