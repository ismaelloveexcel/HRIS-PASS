import type { Player } from '../types';

interface VictoryBannerProps {
  winner: Player | null;
  onReset: () => void;
  onShare?: () => void;
  shareSupported?: boolean;
  turnsTaken?: number | null;
}

export const VictoryBanner = ({ winner, onReset, onShare, shareSupported, turnsTaken }: VictoryBannerProps) =>
  winner ? (
    <div className="victory-overlay">
      <div className="victory-card">
        <p className="victory-kudos">Glass Crown Secured</p>
        <h2>{winner.name} wins the Ascend trial!</h2>
        <p>Stats · Tokens: {winner.credits} · Quiz streak: {winner.streak}</p>
        <p className="victory-turns">
          Fastest run: {turnsTaken ? `${turnsTaken} turns` : 'Tracking…'}
        </p>
        <div className="victory-actions">
          {shareSupported && onShare ? (
            <button type="button" className="share-button" onClick={onShare}>
              Share the flex
            </button>
          ) : null}
          <button type="button" onClick={onReset}>
            Restart Match
          </button>
        </div>
      </div>
    </div>
  ) : null;
