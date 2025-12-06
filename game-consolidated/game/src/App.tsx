import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import { DiceTray } from './components/DiceTray';
import { EventFeed } from './components/EventFeed';
import { GameBoard } from './components/GameBoard';
import { PlayerHud } from './components/PlayerHud';
import { QuizModal } from './components/QuizModal';
import { SharkAlert } from './components/SharkAlert';
import { Skybox } from './components/Skybox';
import { AssetPipelinePanel } from './components/AssetPipelinePanel';
import { TutorialOverlay } from './components/TutorialOverlay';
import { VictoryBanner } from './components/VictoryBanner';
import { useGameEngine } from './hooks/useGameEngine';
import { useImmersiveEffects } from './hooks/useImmersiveEffects';
import { useShakeToRoll } from './hooks/useShakeToRoll';
import { useAssetManifest } from './hooks/useAssetManifest';
import { useSoundscape } from './hooks/useSoundscape';

const FASTEST_STORAGE_KEY = 'ascend-fastest-turns';
const TUTORIAL_STORAGE_KEY = 'ascend-tutorial-complete';

const readStoredNumber = (key: string): number | null => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(key);
  const parsed = stored ? Number(stored) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : null;
};

const tutorialSeen = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(TUTORIAL_STORAGE_KEY) === 'true';
};

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
    turnCount,
    immersiveEvent,
  } = useGameEngine();

  useImmersiveEffects(immersiveEvent);
  useSoundscape(timeOfDay);
  const assetRecords = useAssetManifest();

  const [fastestWin, setFastestWin] = useState<number | null>(() => readStoredNumber(FASTEST_STORAGE_KEY));
  const [lastWinTurns, setLastWinTurns] = useState<number | null>(null);
  const [shareSupported, setShareSupported] = useState(false);
  const [showTutorial, setShowTutorial] = useState(() => !tutorialSeen());

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    setShareSupported(typeof navigator.share === 'function');
  }, []);

  useEffect(() => {
    if (!winner) return;
    const turnsTaken = Math.max(1, turnCount + 1);
    setLastWinTurns(turnsTaken);
    setFastestWin((prev) => {
      if (prev === null || turnsTaken < prev) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(FASTEST_STORAGE_KEY, String(turnsTaken));
        }
        return turnsTaken;
      }
      return prev;
    });
  }, [turnCount, winner]);

  const dismissTutorial = useCallback(() => {
    setShowTutorial(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    }
  }, []);

  const canShake = Boolean(currentPlayer) && !isRolling && !activeQuiz && !winner;
  const { hintActive, needsPermission, requestPermission, isMobileReady } = useShakeToRoll({
    onShake: rollDice,
    canShake,
  });

  const disableRoll = Boolean(activeQuiz) || Boolean(winner);
  const liveTurnCount = useMemo(() => Math.max(1, turnCount + 1), [turnCount]);

  const handleShareVictory = useCallback(() => {
    if (!shareSupported || !winner || typeof navigator === 'undefined' || typeof navigator.share !== 'function') return;
    const turnsTaken = lastWinTurns ?? liveTurnCount;
    navigator
      .share({
        title: 'Ascend: Serpent Trials',
        text: `I just won Ascend: Serpent Trials in ${turnsTaken} turns! Beat me?`,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
      })
      .catch(() => undefined);
  }, [lastWinTurns, liveTurnCount, shareSupported, winner]);

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
              disabled={disableRoll}
              shakeHintVisible={hintActive}
              shakeHintNeedsPermission={needsPermission}
              onEnableShake={() => {
                void requestPermission();
              }}
              canShake={isMobileReady}
            />
          </div>
          <div className="sidebar">
            <PlayerHud
              players={players}
              currentPlayerId={currentPlayer?.id}
              highScore={fastestWin}
              turnCount={turnCount}
            />
            <EventFeed events={eventLog} />
            {assetRecords.length ? <AssetPipelinePanel assets={assetRecords} /> : null}
          </div>
        </section>
      </main>

      {activeQuiz && <QuizModal quiz={activeQuiz} onResolve={resolveQuiz} />}
      <SharkAlert alert={sharkAlert} />
      <VictoryBanner
        winner={winner}
        onReset={resetGame}
        onShare={handleShareVictory}
        shareSupported={shareSupported}
        turnsTaken={winner ? lastWinTurns ?? liveTurnCount : null}
      />
      {showTutorial ? <TutorialOverlay onDismiss={dismissTutorial} /> : null}
    </div>
  );
}

export default App;
