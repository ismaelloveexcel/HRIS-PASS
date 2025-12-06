import { useCallback, useMemo, useRef, useState } from 'react';
import { BOARD_SIZE, ladders, mysteryTiles, snakes } from '../data/board';
import type {
  ActiveQuiz,
  EventLogEntry,
  ImmersiveEvent,
  Player,
  SharkAlert,
  TimeOfDay,
} from '../types';
import { quizService } from '../services/quizService';
import { gameTransport } from '../services/gameTransport';

type ImmersivePayload = {
  type: ImmersiveEvent['type'];
  playerName: string;
  [key: string]: string | number;
};

const TIME_OF_DAY_LOOP: TimeOfDay[] = ['sunrise', 'daylight', 'golden', 'neon'];

const makeId = () => Math.random().toString(36).slice(2, 9);

const initialPlayers: Player[] = [
  { id: 1, name: 'Nova', color: '#ff6f91', position: 1, credits: 0, streak: 0, immunity: 0 },
  { id: 2, name: 'Orion', color: '#5be7c4', position: 1, credits: 0, streak: 0, immunity: 0 },
];

const initialLog: EventLogEntry[] = [
  {
    id: makeId(),
    tone: 'info',
    message: 'The floating island hums awake. Contestants, roll to begin.',
    timestamp: Date.now(),
  },
];

export const useGameEngine = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [eventLog, setEventLog] = useState<EventLogEntry[]>(initialLog);
  const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz | null>(null);
  const [sharkAlert, setSharkAlert] = useState<SharkAlert | null>(null);
  const [clearedSnakes, setClearedSnakes] = useState<Record<string, boolean>>({});
  const [turnCount, setTurnCount] = useState(0);
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const [immersiveEvent, setImmersiveEvent] = useState<ImmersiveEvent | null>(null);
  const quizRequestIdRef = useRef(0);

  const timeOfDay = TIME_OF_DAY_LOOP[turnCount % TIME_OF_DAY_LOOP.length];

  const pushEvent = useCallback((entry: Omit<EventLogEntry, 'id' | 'timestamp'>) => {
    setEventLog((prev) => {
      const next = [{ ...entry, id: makeId(), timestamp: Date.now() }, ...prev];
      return next.slice(0, 7);
    });
  }, []);

  const rotateTurn = useCallback(() => {
    setCurrentPlayerIndex((idx) => (idx + 1) % players.length);
    setTurnCount((count) => count + 1);
  }, [players.length]);

  const finishTurn = useCallback(
    (message?: string) => {
      if (message) {
        pushEvent({ tone: 'info', message });
      }
      setTimeout(() => {
        setDiceValue(null);
        if (!winnerId) {
          rotateTurn();
        }
      }, 200);
    },
    [pushEvent, rotateTurn, winnerId],
  );

  const emitImmersiveEvent = useCallback((event: ImmersivePayload) => {
    setImmersiveEvent({
      ...(event as ImmersiveEvent),
      id: makeId(),
      timestamp: Date.now(),
    });
  }, []);

  const resolveTile = useCallback(
    (player: Player) => {
      if (player.position >= BOARD_SIZE) {
        setWinnerId(player.id);
        emitImmersiveEvent(
          ({
            type: 'victory',
            playerName: player.name,
            turns: turnCount + 1,
          } satisfies ImmersivePayload),
        );
        gameTransport.publish({
          type: 'victory',
          payload: { playerId: player.id, turns: turnCount + 1 },
        });
        pushEvent({
          tone: 'success',
          message: `${player.name} crowns themselves Champion of the Serpent Trials!`,
        });
        return;
      }

      const ladder = ladders.find((ladderDef) => ladderDef.start === player.position);
      if (ladder) {
        const updated = {
          ...player,
          position: ladder.end,
          credits: player.credits + 1,
        };
        setPlayers((prev) => prev.map((p) => (p.id === player.id ? updated : p)));
        pushEvent({
          tone: 'success',
          message: `${player.name} catches the ${ladder.label} to tile ${ladder.end}.`,
        });
        emitImmersiveEvent(
          ({
            type: 'ladder',
            playerName: player.name,
            ladderLabel: ladder.label,
          } satisfies ImmersivePayload),
        );
        setTimeout(() => resolveTile(updated), 350);
        return;
      }

      const snake = snakes.find((snakeDef) => snakeDef.start === player.position);
      if (snake) {
        const snakeKey = `${player.id}-${snake.start}`;
        if (player.immunity > 0) {
          const safePlayer = { ...player, immunity: player.immunity - 1 };
          setPlayers((prev) => prev.map((p) => (p.id === player.id ? safePlayer : p)));
          pushEvent({
            tone: 'info',
            message: `${player.name} burns an immunity charge to dodge ${snake.label}.`,
          });
          setTimeout(() => resolveTile(safePlayer), 250);
          return;
        }

        if (clearedSnakes[snakeKey]) {
          const bonus = snake.start - snake.end;
          const nextSpot = Math.min(BOARD_SIZE, player.position + bonus);
          const boosted = { ...player, position: nextSpot };
          setPlayers((prev) => prev.map((p) => (p.id === player.id ? boosted : p)));
          pushEvent({
            tone: 'success',
            message: `${player.name} already mastered ${snake.label} and surges to ${nextSpot}.`,
          });
          setTimeout(() => resolveTile(boosted), 300);
          return;
        }

        quizRequestIdRef.current += 1;
        const requestId = quizRequestIdRef.current;
        quizService.fetchQuestion(snake.theme).then((question) => {
          if (quizRequestIdRef.current !== requestId) return;
          setActiveQuiz({
            snake,
            playerId: player.id,
            playerName: player.name,
            question,
          });
        });
        emitImmersiveEvent(
          ({
            type: 'snake-warning',
            playerName: player.name,
            snakeLabel: snake.label,
          } satisfies ImmersivePayload),
        );
        pushEvent({
          tone: 'danger',
          message: `${player.name} triggers ${snake.label}. Quiz room rising!`,
        });
        return;
      }

      const mystery = mysteryTiles.find((mysteryTile) => mysteryTile.tile === player.position);
      if (mystery) {
        let updated = { ...player };
        if (mystery.effect === 'credits') {
          updated = { ...updated, credits: updated.credits + 2 };
          pushEvent({
            tone: 'success',
            message: `${player.name} raids ${mystery.label} and banks 2 glass tokens.`,
          });
        } else if (mystery.effect === 'guard') {
          updated = { ...updated, immunity: updated.immunity + 1 };
          pushEvent({
            tone: 'info',
            message: `Guard favor grants ${player.name} +1 snake immunity.`,
          });
        } else {
          const drift = Math.random() > 0.5 ? 4 : -4;
          const clamped = Math.min(BOARD_SIZE, Math.max(1, updated.position + drift));
          updated = { ...updated, position: clamped };
          pushEvent({
            tone: drift > 0 ? 'success' : 'danger',
            message: `${mystery.label} warps ${player.name} to tile ${clamped}.`,
          });
        }
        setPlayers((prev) => prev.map((p) => (p.id === player.id ? updated : p)));
        setTimeout(() => resolveTile(updated), 300);
        return;
      }

      finishTurn(`${player.name} secures tile ${player.position}.`);
    },
    [clearedSnakes, emitImmersiveEvent, finishTurn, pushEvent, turnCount],
  );

  const resolveQuiz = useCallback(
    (choiceIndex: number | null) => {
      if (!activeQuiz) return;
      const { question, playerId, snake, playerName } = activeQuiz;
      const player = players.find((p) => p.id === playerId);
      if (!player) return;

      const isCorrect = choiceIndex !== null && choiceIndex === question.correctIndex;
      setActiveQuiz(null);

      if (isCorrect) {
        emitImmersiveEvent(
          ({
            type: 'quiz-correct',
            playerName,
          } satisfies ImmersivePayload),
        );
        const reward = snake.start - snake.end;
        const newSpot = Math.min(BOARD_SIZE, player.position + reward);
        const updated = {
          ...player,
          position: newSpot,
          credits: player.credits + 3,
          immunity: player.immunity + 1,
          streak: player.streak + 1,
        };
        setPlayers((prev) => prev.map((p) => (p.id === player.id ? updated : p)));
        setClearedSnakes((prev) => ({ ...prev, [`${player.id}-${snake.start}`]: true }));
        pushEvent({
          tone: 'success',
          message: `${playerName} aces the quiz. ${snake.label} becomes a ladder!`,
        });
        gameTransport.publish({
          type: 'quiz-success',
          payload: { playerId: player.id, snakeStart: snake.start },
        });
        setTimeout(() => resolveTile(updated), 350);
      } else {
        const fallen = {
          ...player,
          position: snake.end,
          credits: Math.max(0, player.credits - 1),
          streak: 0,
        };
        setPlayers((prev) => prev.map((p) => (p.id === player.id ? fallen : p)));
        pushEvent({
          tone: 'danger',
          message: `${playerName} misses the lifeline. ${snake.label} drags them to ${snake.end}.`,
        });
        gameTransport.publish({
          type: 'quiz-failure',
          payload: { playerId: player.id, snakeStart: snake.start },
        });
        emitImmersiveEvent(
          ({
            type: 'snake-bite',
            playerName,
            snakeLabel: snake.label,
          } satisfies ImmersivePayload),
        );
        setSharkAlert({ playerName, severity: snake.severity });
        setTimeout(() => {
          setSharkAlert(null);
          resolveTile(fallen);
        }, 1400);
      }
    },
    [activeQuiz, emitImmersiveEvent, players, pushEvent, resolveTile],
  );

  const rollDice = useCallback(() => {
    if (isRolling || activeQuiz || winnerId) return;
    setIsRolling(true);
    const value = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      const current = players[currentPlayerIndex];
      if (!current) return;
      const proposed = current.position + value;
      setDiceValue(value);
      emitImmersiveEvent(
        ({
          type: 'dice-roll',
          playerName: current.name,
          value,
        } satisfies ImmersivePayload),
      );
      gameTransport.publish({ type: 'roll', payload: { playerId: current.id, value } });

      if (proposed > BOARD_SIZE) {
        pushEvent({
          tone: 'info',
          message: `${current.name} rolls ${value} but the die overshoots. Hold position.`,
        });
        setIsRolling(false);
        finishTurn();
        return;
      }

      const updated = { ...current, position: proposed, streak: current.streak + 1 };
      setPlayers((prev) => prev.map((p) => (p.id === current.id ? updated : p)));
      setIsRolling(false);
      resolveTile(updated);
    }, 400);
  }, [
    activeQuiz,
    currentPlayerIndex,
    emitImmersiveEvent,
    finishTurn,
    isRolling,
    players,
    pushEvent,
    resolveTile,
    winnerId,
  ]);

  const resetGame = useCallback(() => {
    setPlayers(initialPlayers);
    setCurrentPlayerIndex(0);
    setDiceValue(null);
    setIsRolling(false);
    setEventLog(initialLog);
    setActiveQuiz(null);
    setSharkAlert(null);
    setClearedSnakes({});
    setTurnCount(0);
    setWinnerId(null);
  }, []);

  const currentPlayer = players[currentPlayerIndex];
  const winner = players.find((p) => p.id === winnerId) ?? null;

  const boardState = useMemo(
    () => ({
      ladders,
      snakes,
      mysteryTiles,
    }),
    [],
  );

  return {
    players,
    boardState,
    currentPlayer,
    currentPlayerIndex,
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
  };
};
