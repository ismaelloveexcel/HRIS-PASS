using System;
using System.Collections.Generic;
using Ascend.Data;
using UnityEngine;

namespace Ascend.Core
{
    public class GameStateController : MonoBehaviour
    {
        private static readonly TimeOfDayPhase[] TimeLoop =
        {
            TimeOfDayPhase.Sunrise,
            TimeOfDayPhase.Daylight,
            TimeOfDayPhase.Golden,
            TimeOfDayPhase.Neon,
        };

        [SerializeField] private BoardDefinition boardDefinition = default!;
        [SerializeField] private QuizQuestionBank quizQuestionBank = default!;
        [SerializeField] private PlayerConfig[] startingPlayers =
        {
            new()
            {
                Id = 1,
                Name = "Nova",
                Color = new Color(1f, 0.44f, 0.57f),
            },
            new()
            {
                Id = 2,
                Name = "Orion",
                Color = new Color(0.36f, 0.91f, 0.77f),
            },
        };

        public event Action<GameEvent>? EventPushed;
        public event Action<IReadOnlyList<PlayerState>>? PlayersChanged;
        public event Action<ActiveQuizState>? QuizActivated;
        public event Action? QuizCleared;
        public event Action<SharkAlertState>? SharkAlerted;
        public event Action<PlayerState>? WinnerDeclared;
        public event Action? WinnerCleared;

        public IReadOnlyList<GameEvent> EventLog => eventLog;
        public IReadOnlyList<PlayerState> Players => players;
        public PlayerState? CurrentPlayer => players.Count == 0 ? null : players[currentPlayerIndex];
        public int? DiceValue { get; private set; }
        public bool IsRolling { get; private set; }
        public bool HasWinner => winner != null;
        public ActiveQuizState? ActiveQuiz => activeQuiz;
        public TimeOfDayPhase CurrentTimeOfDay => TimeLoop[turnCount % TimeLoop.Length];

        private readonly List<PlayerState> players = new();
        private readonly List<GameEvent> eventLog = new();
        private readonly Dictionary<int, LadderDefinition> ladderLookup = new();
        private readonly Dictionary<int, SnakeDefinition> snakeLookup = new();
        private readonly Dictionary<int, MysteryTileDefinition> mysteryLookup = new();
        private readonly HashSet<string> clearedSnakes = new();

        private ActiveQuizState? activeQuiz;
        private PlayerState? winner;
        private int currentPlayerIndex;
        private int turnCount;

        private void Awake()
        {
            BootstrapLookups();
            ResetGame();
        }

        public void ResetGame()
        {
            players.Clear();
            foreach (var config in startingPlayers)
            {
                players.Add(new PlayerState(config));
            }

            DiceValue = null;
            IsRolling = false;
            winner = null;
            currentPlayerIndex = 0;
            turnCount = 0;
            eventLog.Clear();
            clearedSnakes.Clear();
            activeQuiz = null;
            WinnerCleared?.Invoke();
            PlayersChanged?.Invoke(players);
            PushEvent(new GameEvent(EventTone.Info, "The floating island hums awake. Contestants, roll to begin."));
        }

        public void RollDice()
        {
            if (!CanRoll())
            {
                return;
            }

            IsRolling = true;
            DiceValue = UnityEngine.Random.Range(1, 7);
            var current = CurrentPlayer;
            if (current == null)
            {
                return;
            }

            var proposed = current.Position + DiceValue.Value;
            if (proposed > boardDefinition.BoardSize)
            {
                PushEvent(new GameEvent(EventTone.Info, $"{current.Name} rolls {DiceValue} but the die overshoots. Hold position."));
                DeferTurnEnd();
                return;
            }

            current.Position = proposed;
            current.Streak += 1;
            PlayersChanged?.Invoke(players);
            ResolveTile(current);
            IsRolling = false;
        }

        public void ResolveQuiz(int? choiceIndex)
        {
            if (activeQuiz == null)
            {
                return;
            }

            var quizState = activeQuiz.Value;
            var player = FindPlayer(quizState.PlayerId);
            if (player == null)
            {
                return;
            }

            var isCorrect = choiceIndex.HasValue && quizState.Question.CorrectIndex == choiceIndex.Value;
            activeQuiz = null;
            QuizCleared?.Invoke();

            if (isCorrect)
            {
                var bonus = quizState.Snake.Start - quizState.Snake.End;
                player.Position = Mathf.Min(boardDefinition.BoardSize, player.Position + bonus);
                player.Credits += 3;
                player.Immunity += 1;
                player.Streak += 1;
                clearedSnakes.Add($"{player.Id}-{quizState.Snake.Start}");
                PlayersChanged?.Invoke(players);
                PushEvent(new GameEvent(EventTone.Success, $"{player.Name} aces the quiz. {quizState.Snake.Label} becomes a ladder!"));
                ResolveTile(player);
            }
            else
            {
                player.Position = quizState.Snake.End;
                player.Credits = Math.Max(0, player.Credits - 1);
                player.Streak = 0;
                PlayersChanged?.Invoke(players);
                PushEvent(new GameEvent(EventTone.Danger, $"{player.Name} misses the lifeline. {quizState.Snake.Label} drags them to {quizState.Snake.End}."));
                SharkAlerted?.Invoke(new SharkAlertState(player.Name, quizState.Snake.Severity));
                ResolveTile(player);
            }
        }

        private void ResolveTile(PlayerState player)
        {
            if (player.Position >= boardDefinition.BoardSize)
            {
                winner = player;
                PushEvent(new GameEvent(EventTone.Success, $"{player.Name} crowns themselves Champion of the Serpent Trials!"));
                WinnerDeclared?.Invoke(player);
                return;
            }

            if (TryHandleLadder(player))
            {
                return;
            }

            if (TryHandleSnake(player))
            {
                return;
            }

            if (TryHandleMystery(player))
            {
                return;
            }

            FinishTurn($"{player.Name} secures tile {player.Position}.");
        }

        private bool TryHandleLadder(PlayerState player)
        {
            if (!ladderLookup.TryGetValue(player.Position, out var ladder))
            {
                return false;
            }

            player.Position = ladder.End;
            player.Credits += 1;
            PlayersChanged?.Invoke(players);
            PushEvent(new GameEvent(EventTone.Success, $"{player.Name} catches the {ladder.Label} to tile {ladder.End}."));
            ResolveTile(player);
            return true;
        }

        private bool TryHandleSnake(PlayerState player)
        {
            if (!snakeLookup.TryGetValue(player.Position, out var snake))
            {
                return false;
            }

            var snakeKey = $"{player.Id}-{snake.Start}";
            if (player.Immunity > 0)
            {
                player.Immunity -= 1;
                PlayersChanged?.Invoke(players);
                PushEvent(new GameEvent(EventTone.Info, $"{player.Name} burns an immunity charge to dodge {snake.Label}."));
                ResolveTile(player);
                return true;
            }

            if (clearedSnakes.Contains(snakeKey))
            {
                var bonus = snake.Start - snake.End;
                player.Position = Math.Min(boardDefinition.BoardSize, player.Position + bonus);
                PlayersChanged?.Invoke(players);
                PushEvent(new GameEvent(EventTone.Success, $"{player.Name} already mastered {snake.Label} and surges to {player.Position}."));
                ResolveTile(player);
                return true;
            }

            var question = quizQuestionBank.DrawRandom(snake.Theme, QuizDifficulty.Medium);
            activeQuiz = new ActiveQuizState(player.Id, player.Name, snake, question);
            QuizActivated?.Invoke(activeQuiz.Value);
            PushEvent(new GameEvent(EventTone.Danger, $"{player.Name} triggers {snake.Label}. Quiz room rising!"));
            return true;
        }

        private bool TryHandleMystery(PlayerState player)
        {
            if (!mysteryLookup.TryGetValue(player.Position, out var tile))
            {
                return false;
            }

            switch (tile.Effect)
            {
                case MysteryEffect.Credits:
                    player.Credits += 2;
                    PushEvent(new GameEvent(EventTone.Success, $"{player.Name} raids {tile.Label} and banks 2 glass tokens."));
                    break;
                case MysteryEffect.Guard:
                    player.Immunity += 1;
                    PushEvent(new GameEvent(EventTone.Info, $"Guard favor grants {player.Name} +1 snake immunity."));
                    break;
                case MysteryEffect.Storm:
                    var drift = UnityEngine.Random.value > 0.5f ? 4 : -4;
                    player.Position = Mathf.Clamp(player.Position + drift, 1, boardDefinition.BoardSize);
                    PushEvent(new GameEvent(drift > 0 ? EventTone.Success : EventTone.Danger, $"{tile.Label} warps {player.Name} to tile {player.Position}."));
                    break;
            }

            PlayersChanged?.Invoke(players);
            ResolveTile(player);
            return true;
        }

        private void FinishTurn(string? message = null)
        {
            if (!string.IsNullOrEmpty(message))
            {
                PushEvent(new GameEvent(EventTone.Info, message));
            }

            DiceValue = null;
            if (winner == null)
            {
                currentPlayerIndex = (currentPlayerIndex + 1) % players.Count;
                turnCount += 1;
            }

            PlayersChanged?.Invoke(players);
        }

        private void DeferTurnEnd()
        {
            IsRolling = false;
            FinishTurn();
        }

        private bool CanRoll()
        {
            return !IsRolling && activeQuiz == null && !HasWinner && boardDefinition != null && quizQuestionBank != null;
        }

        private PlayerState? FindPlayer(int playerId)
        {
            return players.Find(p => p.Id == playerId);
        }

        private void PushEvent(GameEvent entry)
        {
            eventLog.Insert(0, entry.WithTimestamp());
            if (eventLog.Count > 7)
            {
                eventLog.RemoveAt(eventLog.Count - 1);
            }

            EventPushed?.Invoke(entry);
        }

        private void BootstrapLookups()
        {
            ladderLookup.Clear();
            foreach (var ladder in boardDefinition.Ladders.Span)
            {
                ladderLookup[ladder.Start] = ladder;
            }

            snakeLookup.Clear();
            foreach (var snake in boardDefinition.Snakes.Span)
            {
                snakeLookup[snake.Start] = snake;
            }

            mysteryLookup.Clear();
            foreach (var mystery in boardDefinition.MysteryTiles.Span)
            {
                mysteryLookup[mystery.Tile] = mystery;
            }
        }
    }

    [Serializable]
    public class PlayerConfig
    {
        [SerializeField] private int id = 1;
        [SerializeField] private string name = "Player";
        [SerializeField] private Color color = Color.white;

        public int Id
        {
            get => id;
            set => id = value;
        }

        public string Name
        {
            get => name;
            set => name = value;
        }

        public Color Color
        {
            get => color;
            set => color = value;
        }
    }

    public class PlayerState
    {
        public PlayerState(PlayerConfig config)
        {
            Id = config.Id;
            Name = config.Name;
            Color = config.Color;
        }

        public int Id { get; }
        public string Name { get; }
        public Color Color { get; }
        public int Position { get; set; } = 1;
        public int Credits { get; set; }
        public int Streak { get; set; }
        public int Immunity { get; set; }
    }

    public enum EventTone
    {
        Info,
        Success,
        Danger,
    }

    public readonly struct GameEvent
    {
        public GameEvent(EventTone tone, string message)
        {
            Tone = tone;
            Message = message;
            Timestamp = DateTimeOffset.UtcNow;
        }

        public EventTone Tone { get; }
        public string Message { get; }
        public DateTimeOffset Timestamp { get; }

        public GameEvent WithTimestamp()
        {
            return new GameEvent(Tone, Message);
        }
    }

    public readonly struct ActiveQuizState
    {
        public ActiveQuizState(int playerId, string playerName, SnakeDefinition snake, QuizQuestionDefinition question)
        {
            PlayerId = playerId;
            PlayerName = playerName;
            Snake = snake;
            Question = question;
        }

        public int PlayerId { get; }
        public string PlayerName { get; }
        public SnakeDefinition Snake { get; }
        public QuizQuestionDefinition Question { get; }
    }

    public readonly struct SharkAlertState
    {
        public SharkAlertState(string playerName, SnakeSeverity severity)
        {
            PlayerName = playerName;
            Severity = severity;
        }

        public string PlayerName { get; }
        public SnakeSeverity Severity { get; }
    }

    public enum TimeOfDayPhase
    {
        Sunrise,
        Daylight,
        Golden,
        Neon,
    }
}
