import type { MoodPreset } from '../state/types';

export const moodPresets: MoodPreset[] = [
  {
    id: 'mood:sunrise',
    label: 'Sunrise Glow',
    gradient: 'linear-gradient(135deg, #ffe7c7 0%, #ffd1ff 100%)',
    ambientSound: null,
    accent: '#ffb347',
    description: 'Soft peach light inspired by early garden visits.',
  },
  {
    id: 'mood:rainy',
    label: 'Rainy Cozy',
    gradient: 'linear-gradient(135deg, #a5b4fc 0%, #c7d2fe 80%)',
    ambientSound: null,
    accent: '#6b7cff',
    description: 'Cool hues with gentle droplets for cinema marathons.',
  },
  {
    id: 'mood:nightfall',
    label: 'Nightfall Biolume',
    gradient: 'linear-gradient(135deg, #081e3f 0%, #1b3557 100%)',
    ambientSound: null,
    accent: '#7dd3fc',
    description: 'Unlocked via forging Mist + Light. Features glowing trims.',
  },
];
