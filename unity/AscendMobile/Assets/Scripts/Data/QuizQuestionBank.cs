using System;
using System.Collections.Generic;
using UnityEngine;

namespace Ascend.Data
{
    [CreateAssetMenu(menuName = "Ascend/Quiz Question Bank", fileName = "QuizQuestionBank")]
    public class QuizQuestionBank : ScriptableObject
    {
        [SerializeField] private QuizQuestionDefinition[] questions = Array.Empty<QuizQuestionDefinition>();

        public ReadOnlyMemory<QuizQuestionDefinition> Questions => questions;

        public QuizQuestionDefinition DrawRandom(QuizTheme theme, QuizDifficulty? difficulty = null)
        {
            var candidates = new List<QuizQuestionDefinition>();
            foreach (var question in questions)
            {
                if (question.Category != theme)
                {
                    continue;
                }

                if (difficulty.HasValue && question.Difficulty != difficulty.Value)
                {
                    continue;
                }

                candidates.Add(question);
            }

            if (candidates.Count == 0)
            {
                candidates.AddRange(questions.Span);
            }

            if (candidates.Count == 0)
            {
                throw new InvalidOperationException("QuizQuestionBank has no questions.");
            }

            var index = UnityEngine.Random.Range(0, candidates.Count);
            return candidates[index];
        }

        public void ApplyDefaults()
        {
            questions = QuizQuestionDefaults.DefaultQuestions;
        }
    }

    [Serializable]
    public struct QuizQuestionDefinition
    {
        [SerializeField] private string id;
        [SerializeField] private QuizTheme category;
        [SerializeField] private QuizDifficulty difficulty;
        [SerializeField] [TextArea] private string prompt;
        [SerializeField] private string[] options;
        [SerializeField] private int correctIndex;
        [SerializeField] private string flavor;

        public string Id => id;
        public QuizTheme Category => category;
        public QuizDifficulty Difficulty => difficulty;
        public string Prompt => prompt;
        public ReadOnlyMemory<string> Options => options;
        public int CorrectIndex => correctIndex;
        public string Flavor => flavor;

        public QuizQuestionDefinition(
            string id,
            QuizTheme category,
            QuizDifficulty difficulty,
            string prompt,
            string[] options,
            int correctIndex,
            string flavor = "")
        {
            this.id = id;
            this.category = category;
            this.difficulty = difficulty;
            this.prompt = prompt;
            this.options = options;
            this.correctIndex = correctIndex;
            this.flavor = flavor;
        }
    }

    public enum QuizDifficulty
    {
        Easy,
        Medium,
        Hard,
    }
}
