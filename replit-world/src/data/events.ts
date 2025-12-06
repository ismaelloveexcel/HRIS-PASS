import type { SeasonalEvent } from '../state/types';

export const seasonalEvents: SeasonalEvent[] = [
  {
    id: 'event:ramadan-lanterns',
    title: 'Ramadan Lantern Craft Week',
    timeframe: 'Mar 10 – Apr 10',
    description: 'Hang crescent lanterns, collect Ramadan Glow, and unlock a moonlit arch.',
    startDayOfYear: 70,
    endDayOfYear: 100,
    rewards: [
      { type: 'garden', id: 'ramadan-lanterns' },
      { type: 'element', id: 'ramadan-glow' },
    ],
    specialElement: 'ramadan-glow',
  },
  {
    id: 'event:winter-stargaze',
    title: 'Winter Stargaze Nights',
    timeframe: 'Dec 1 – Jan 5',
    description: 'Snowfall, auroras, and a frostfire forge element for glowing roofs.',
    startDayOfYear: 335,
    endDayOfYear: 10,
    rewards: [
      { type: 'garden', id: 'winter-lights' },
      { type: 'element', id: 'frostfire' },
    ],
    specialElement: 'frostfire',
  },
];
