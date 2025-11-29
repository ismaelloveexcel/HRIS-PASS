import type { Player } from '../types';

interface PlayerHudProps {
  players: Player[];
  currentPlayerId?: number;
}

export const PlayerHud = ({ players, currentPlayerId }: PlayerHudProps) => (
  <div className="player-hud">
    {players.map((player) => (
      <article
        key={player.id}
        className={['player-card', currentPlayerId === player.id ? 'card-active' : '']
          .filter(Boolean)
          .join(' ')}
      >
        <header>
          <span className="player-swatch" style={{ backgroundColor: player.color }} />
          <div>
            <p className="player-name">{player.name}</p>
            <small>{currentPlayerId === player.id ? 'Taking the turn' : 'Awaiting turn'}</small>
          </div>
        </header>
        <dl>
          <div>
            <dt>Tile</dt>
            <dd>#{player.position}</dd>
          </div>
          <div>
            <dt>Glass Tokens</dt>
            <dd>{player.credits}</dd>
          </div>
          <div>
            <dt>Quiz Streak</dt>
            <dd>{player.streak}</dd>
          </div>
          <div>
            <dt>Immunity</dt>
            <dd>{player.immunity}</dd>
          </div>
        </dl>
      </article>
    ))}
  </div>
);
