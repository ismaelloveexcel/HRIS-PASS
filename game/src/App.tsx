import './App.css';
import { DiceTray } from './components/DiceTray';
import { EventFeed } from './components/EventFeed';
import { GameBoard } from './components/GameBoard';
import { PlayerHud } from './components/PlayerHud';
import { QuizModal } from './components/QuizModal';
import { SharkAlert } from './components/SharkAlert';
import { Skybox } from './components/Skybox';
import { VictoryBanner } from './components/VictoryBanner';
import { useGameEngine } from './hooks/useGameEngine';

function App() {
  const {
    players,
    boardState,
    currentPlayer,
    diceValue,
    isRolling,
    rollDice,
    eventLog,
    activeQuiz,
    resolveQuiz,
    sharkAlert,
    timeOfDay,
    winner,
    resetGame,
  } = useGameEngine();

  return (
    <div className="app-shell">
      <Skybox timeOfDay={timeOfDay} />
      <main>
        <header className="hero">
          <p>Ascend: Serpent Trials</p>
          <h1>Float above the neon tides, survive the quizzes, seize the glass crown.</h1>
          <small>Inspired by Squid Game tension, tuned for replayable classroom fun.</small>
        </header>

        <section className="primary-layout">
          <div className="board-panel">
            <GameBoard
              players={players}
              ladders={boardState.ladders}
              snakes={boardState.snakes}
              mysteryTiles={boardState.mysteryTiles}
              currentPlayerId={currentPlayer?.id}
              activeQuizTile={activeQuiz?.snake.start ?? null}
            />
            <DiceTray
              value={diceValue}
              isRolling={isRolling}
              onRoll={rollDice}
              currentPlayerName={currentPlayer?.name}
              disabled={Boolean(activeQuiz) || Boolean(winner)}
            />
          </div>
          <div className="sidebar">
            <PlayerHud players={players} currentPlayerId={currentPlayer?.id} />
            <EventFeed events={eventLog} />
          </div>
        </section>
      </main>

      {activeQuiz && <QuizModal quiz={activeQuiz} onResolve={resolveQuiz} />}
      <SharkAlert alert={sharkAlert} />
      <VictoryBanner winner={winner} onReset={resetGame} />
    </div>
  );
}

export default App;
