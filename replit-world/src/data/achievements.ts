import type { AchievementDefinition } from '../state/types';

export const achievementList: AchievementDefinition[] = [
  {
    id: 'garden-fountain',
    title: 'Bloom Keeper',
    description: 'Plant five flower tiles to restore the Moon Pond.',
    requirement: { metric: 'flowersPlanted', threshold: 5 },
    reward: { type: 'garden', id: 'moon-pond' },
  },
  {
    id: 'animal-chef',
    title: 'Animal Chef',
    description: 'Feed any habitat friends three times.',
    requirement: { metric: 'animalsFed', threshold: 3 },
    reward: { type: 'garden', id: 'chicken-haven' },
  },
  {
    id: 'cinema-rug',
    title: 'Matinee Memories',
    description: 'Watch a cinema clip together once.',
    requirement: { metric: 'moviesWatched', threshold: 1 },
    reward: { type: 'decor', id: 'cinema-rug' },
  },
  {
    id: 'arcade-poster',
    title: 'Arcade Allies',
    description: 'Win three arcade rounds.',
    requirement: { metric: 'arcadeWins', threshold: 3 },
    reward: { type: 'decor', id: 'arcade-poster' },
  },
  {
    id: 'pet-whisperer',
    title: 'Pet Whisperer',
    description: 'Care for the companion six times.',
    requirement: { metric: 'petCareMoments', threshold: 6 },
    reward: { type: 'pet', id: 'pet:meadow' },
  },
  {
    id: 'forge-scholar',
    title: 'Forge Scholar',
    description: 'Complete five successful element combinations.',
    requirement: { metric: 'forgeCombos', threshold: 5 },
    reward: { type: 'decor', id: 'forge:mural' },
  },
  {
    id: 'ritual-keepers',
    title: 'Ritual Keepers',
    description: 'Visit the world on five different sessions.',
    requirement: { metric: 'visits', threshold: 5 },
    reward: { type: 'mood', id: 'mood:nightfall' },
  },
];
