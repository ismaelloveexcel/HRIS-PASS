namespace Ascend.Data
{
    public static class QuizQuestionDefaults
    {
        public static readonly QuizQuestionDefinition[] DefaultQuestions =
        {
            new(
                "stem-1",
                QuizTheme.Stem,
                QuizDifficulty.Easy,
                "A snake drops you 12 tiles. The island spins once every 3 turns. How many spins happen while you climb those 12 tiles back at 2 tiles per turn?",
                new[] { "1 spin", "2 spins", "3 spins", "4 spins" },
                1,
                "Observation Cube math burst"),
            new(
                "stem-2",
                QuizTheme.Stem,
                QuizDifficulty.Medium,
                "The neon ladders glow in a Fibonacci rhythm. If the previous ladder pulses 5 times, how many pulses does the next ladder show?",
                new[] { "5", "8", "10", "13" },
                1,
                "Bamboo elevator puzzle"),
            new(
                "stem-3",
                QuizTheme.Stem,
                QuizDifficulty.Hard,
                "Glass tokens double every successful quiz, starting with 1. After four consecutive wins, how many tokens do you hold?",
                new[] { "8", "12", "16", "24" },
                2),
            new(
                "pop-1",
                QuizTheme.Pop,
                QuizDifficulty.Easy,
                "In Squid Game, which shape do the guards with triangle masks usually act as?",
                new[] { "Managers", "Workers / Enforcers", "Contestants", "VIPs" },
                1),
            new(
                "pop-2",
                QuizTheme.Pop,
                QuizDifficulty.Medium,
                "Which children’s game inspired the “Red Light, Green Light” challenge?",
                new[] { "Freeze Tag", "Statues", "Mother May I", "Simon Says" },
                3),
            new(
                "pop-3",
                QuizTheme.Pop,
                QuizDifficulty.Hard,
                "What song plays during the Squid Game dormitory wake-up call?",
                new[] { "Blue Danube Waltz", "Fly Me to the Moon", "Way Back Then", "Paradise Lost" },
                0),
            new(
                "lore-1",
                QuizTheme.Lore,
                QuizDifficulty.Easy,
                "What color do the contest jumpsuits have in Squid Game?",
                new[] { "Orange", "Green", "Red", "Yellow" },
                1),
            new(
                "lore-2",
                QuizTheme.Lore,
                QuizDifficulty.Medium,
                "The Glass Bridge challenge features how many stepping panels in the original show?",
                new[] { "14", "16", "20", "24" },
                2),
            new(
                "lore-3",
                QuizTheme.Lore,
                QuizDifficulty.Hard,
                "What is the prize money displayed in the Squid Game piggy bank?",
                new[] { "30 billion won", "40 billion won", "45.6 billion won", "50.1 billion won" },
                2),
        };
    }
}
