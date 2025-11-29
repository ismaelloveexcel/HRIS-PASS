import type { Ladder, MysteryTile, Player, Snake } from '../types';

interface GameBoardProps {
  players: Player[];
  ladders: Ladder[];
  snakes: Snake[];
  mysteryTiles: MysteryTile[];
  currentPlayerId?: number;
  activeQuizTile?: number | null;
}

const buildRows = () => {
  const rows: number[][] = [];
  for (let row = 9; row >= 0; row -= 1) {
    const base = row * 10 + 1;
    const tiles = Array.from({ length: 10 }, (_, idx) => base + idx);
    rows.push(row % 2 === 0 ? tiles : tiles.reverse());
  }
  return rows;
};

const ladderMap = (ladders: Ladder[]) =>
  ladders.reduce<Record<number, Ladder>>((acc, ladder) => {
    acc[ladder.start] = ladder;
    return acc;
  }, {});

const snakeMap = (snakes: Snake[]) =>
  snakes.reduce<Record<number, Snake>>((acc, snake) => {
    acc[snake.start] = snake;
    return acc;
  }, {});

const mysteryMap = (mysteryTiles: MysteryTile[]) =>
  mysteryTiles.reduce<Record<number, MysteryTile>>((acc, tile) => {
    acc[tile.tile] = tile;
    return acc;
  }, {});

const rows = buildRows();

export const GameBoard = ({
  players,
  ladders,
  snakes,
  mysteryTiles,
  currentPlayerId,
  activeQuizTile,
}: GameBoardProps) => {
  const ladderLookup = ladderMap(ladders);
  const snakeLookup = snakeMap(snakes);
  const mysteryLookup = mysteryMap(mysteryTiles);

  const playerByTile = players.reduce<Record<number, Player[]>>((acc, player) => {
    const list = acc[player.position] ?? [];
    list.push(player);
    acc[player.position] = list;
    return acc;
  }, {});

  return (
    <div className="board">
      {rows.map((row, rowIdx) => (
        <div key={`row-${rowIdx}`} className="board-row">
          {row.map((tileNumber) => {
            const tilePlayers = playerByTile[tileNumber] ?? [];
            const ladder = ladderLookup[tileNumber];
            const snake = snakeLookup[tileNumber];
            const mystery = mysteryLookup[tileNumber];
            const tileType = ladder
              ? 'ladder'
              : snake
              ? 'snake'
              : mystery
              ? 'mystery'
              : tileNumber === 100
              ? 'finish'
              : 'regular';
            const isCurrent = tilePlayers.some((p) => p.id === currentPlayerId);
            const isQuizHotspot = activeQuizTile === tileNumber;

            return (
              <div
                key={tileNumber}
                className={['tile', `tile-${tileType}`, isCurrent ? 'tile-current' : '', isQuizHotspot ? 'tile-quiz' : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="tile-index">{tileNumber}</div>
                {ladder && <span className="tile-marker ladder-marker">{ladder.label}</span>}
                {snake && <span className="tile-marker snake-marker">{snake.label}</span>}
                {mystery && <span className="tile-marker mystery-marker">{mystery.label}</span>}
                <div className="tile-players">
                  {tilePlayers.map((player) => (
                    <span
                      key={player.id}
                      className="token"
                      style={{ backgroundColor: player.color }}
                      title={player.name}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
