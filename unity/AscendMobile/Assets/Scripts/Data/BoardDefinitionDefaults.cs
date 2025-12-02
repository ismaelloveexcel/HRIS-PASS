using UnityEngine;

namespace Ascend.Data
{
    public static class BoardDefinitionDefaults
    {
        public static readonly LadderDefinition[] DefaultLadders =
        {
            new(4, 20, "Bamboo Elevator", ColorUtility.TryParseHtmlString("#bdfcc9", out var c1) ? c1 : Color.green),
            new(12, 34, "Temple Lift", ColorUtility.TryParseHtmlString("#d1b4ff", out var c2) ? c2 : Color.magenta),
            new(29, 55, "Aurora Rail", ColorUtility.TryParseHtmlString("#fce38a", out var c3) ? c3 : Color.yellow),
            new(45, 76, "Shimmer Spire", ColorUtility.TryParseHtmlString("#9be7ff", out var c4) ? c4 : Color.cyan),
            new(66, 92, "Guard Tower Zipline", ColorUtility.TryParseHtmlString("#ffd6e0", out var c5) ? c5 : Color.white),
        };

        public static readonly SnakeDefinition[] DefaultSnakes =
        {
            new(18, 6, "Shark Maw", SnakeSeverity.Medium, QuizTheme.Stem),
            new(38, 21, "Glass Bridge Crack", SnakeSeverity.High, QuizTheme.Lore),
            new(49, 33, "Red Light Sweep", SnakeSeverity.Medium, QuizTheme.Pop),
            new(63, 44, "Observation Cube Drop", SnakeSeverity.High, QuizTheme.Stem),
            new(87, 70, "Frontman Ambush", SnakeSeverity.High, QuizTheme.Lore),
            new(96, 52, "Megashark Spiral", SnakeSeverity.High, QuizTheme.Stem),
        };

        public static readonly MysteryTileDefinition[] DefaultMysteryTiles =
        {
            new(9, MysteryEffect.Credits, "Glass Token Cache"),
            new(23, MysteryEffect.Guard, "Guard Favor"),
            new(41, MysteryEffect.Storm, "Neon Storm"),
            new(58, MysteryEffect.Credits, "Piggy Bank Vault"),
            new(72, MysteryEffect.Guard, "Allied Contestant"),
        };
    }
}
