using System;
using UnityEngine;

namespace Ascend.Data
{
    [CreateAssetMenu(menuName = "Ascend/Board Definition", fileName = "BoardDefinition")]
    public class BoardDefinition : ScriptableObject
    {
        [SerializeField] private int boardSize = 100;
        [SerializeField] private LadderDefinition[] ladders = Array.Empty<LadderDefinition>();
        [SerializeField] private SnakeDefinition[] snakes = Array.Empty<SnakeDefinition>();
        [SerializeField] private MysteryTileDefinition[] mysteryTiles = Array.Empty<MysteryTileDefinition>();

        public int BoardSize => boardSize;
        public ReadOnlyMemory<LadderDefinition> Ladders => ladders;
        public ReadOnlyMemory<SnakeDefinition> Snakes => snakes;
        public ReadOnlyMemory<MysteryTileDefinition> MysteryTiles => mysteryTiles;

        public void ApplyDefaults()
        {
            boardSize = 100;
            ladders = BoardDefinitionDefaults.DefaultLadders;
            snakes = BoardDefinitionDefaults.DefaultSnakes;
            mysteryTiles = BoardDefinitionDefaults.DefaultMysteryTiles;
        }
    }

    [Serializable]
    public struct LadderDefinition
    {
        [SerializeField] private int start;
        [SerializeField] private int end;
        [SerializeField] private string label;
        [SerializeField] private Color color;

        public int Start => start;
        public int End => end;
        public string Label => label;
        public Color Color => color;

        public LadderDefinition(int start, int end, string label, Color color)
        {
            this.start = start;
            this.end = end;
            this.label = label;
            this.color = color;
        }
    }

    [Serializable]
    public struct SnakeDefinition
    {
        [SerializeField] private int start;
        [SerializeField] private int end;
        [SerializeField] private string label;
        [SerializeField] private SnakeSeverity severity;
        [SerializeField] private QuizTheme theme;

        public int Start => start;
        public int End => end;
        public string Label => label;
        public SnakeSeverity Severity => severity;
        public QuizTheme Theme => theme;

        public SnakeDefinition(int start, int end, string label, SnakeSeverity severity, QuizTheme theme)
        {
            this.start = start;
            this.end = end;
            this.label = label;
            this.severity = severity;
            this.theme = theme;
        }
    }

    [Serializable]
    public struct MysteryTileDefinition
    {
        [SerializeField] private int tile;
        [SerializeField] private MysteryEffect effect;
        [SerializeField] private string label;

        public int Tile => tile;
        public MysteryEffect Effect => effect;
        public string Label => label;

        public MysteryTileDefinition(int tile, MysteryEffect effect, string label)
        {
            this.tile = tile;
            this.effect = effect;
            this.label = label;
        }
    }

    public enum SnakeSeverity
    {
        Low,
        Medium,
        High,
    }

    public enum QuizTheme
    {
        Stem,
        Pop,
        Lore,
    }

    public enum MysteryEffect
    {
        Credits,
        Guard,
        Storm,
    }
}
