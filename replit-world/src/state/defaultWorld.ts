import { baseElements } from '../data/elements';
import { storyPropBlueprints } from '../data/storyProps';
import type {
  ClockState,
  PlayerStats,
  RoomKey,
  StoryPropState,
  WorldSnapshot,
} from './types';

const roomDefaults: Record<RoomKey, { walls: string; floor: string }> = {
  'living-room': { walls: '#fef3eb', floor: '#ffe4d6' },
  cinema: { walls: '#101f3c', floor: '#1e2f52' },
  'game-den': { walls: '#0f172a', floor: '#1d2145' },
  bedroom: { walls: '#f1f5f9', floor: '#e0e7ff' },
};

const baseStats: PlayerStats = {
  flowersPlanted: 0,
  animalsFed: 0,
  moviesWatched: 0,
  arcadeWins: 0,
  forgeCombos: 0,
  petCareMoments: 0,
  visits: 0,
};

const createGardenTiles = () => {
  const tiles = [] as WorldSnapshot['gardenTiles'];
  for (let row = 0; row < 7; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      tiles.push({ slot: `r${row}-c${col}`, type: 'empty', contentId: null });
    }
  }
  return tiles;
};

const baseFurnitureUnlocks = [
  'cloud-sofa',
  'starlit-bed',
  'aurora-table',
  'levi-shelf',
  'cosmo-carpet',
  'lumen-lamp',
  'memory-poster',
  'teddy-colossus',
  'cinema-booth',
  'arcade-holo',
];

const baseGardenUnlocks = [
  'flower-bed',
  'date-palm',
  'cherry-blossom',
  'mango-tree',
  'veggie-patch',
  'stone-path',
  'garden-fence',
  'rabbit-burrow',
  'ramadan-lanterns',
  'winter-lights',
];

const initialClock: ClockState = {
  timeOfDay: 'sunrise',
  weather: 'clear',
  followRealSky: true,
};

const createStoryProps = (): StoryPropState[] =>
  storyPropBlueprints.map((prop) => ({
    ...prop,
    unlocked: !prop.unlockedBy,
    entries: [],
  }));

export const createDefaultWorldState = (): WorldSnapshot => ({
  selectedRoom: 'living-room',
  roomThemes: roomDefaults,
  roofColor: '#7dd3fc',
  activeMoodId: 'mood:sunrise',
  clock: { ...initialClock },
  houseItems: [],
  selectedItemId: null,
  unlockedFurniture: [...baseFurnitureUnlocks],
  unlockedGarden: [...baseGardenUnlocks],
  unlockedElements: baseElements.map((element) => element.id),
  unlockedMoods: ['mood:sunrise', 'mood:rainy'],
  unlockedPetSkins: ['pet:sprout'],
  storyProps: createStoryProps(),
  photos: [],
  activeEventId: null,
  cinemaSessions: [],
  achievementsUnlocked: [],
  discoveredRecipes: [],
  gardenTiles: createGardenTiles(),
  stats: { ...baseStats },
  pet: {
    name: 'Lumi',
    hunger: 80,
    happiness: 80,
    energy: 80,
    cleanliness: 80,
    lastTick: Date.now(),
    skinId: 'pet:sprout',
  },
  visitStamps: [],
  discoveryLog: [],
  mailbox: [
    {
      id: 'welcome-letter',
      title: 'Welcome Home',
      body: 'Decorate any room to claim your first mood charm.',
      claimed: false,
      reward: { type: 'mood', id: 'mood:sunrise' },
    },
  ],
});

export const defaultWorldHelpers = {
  roomDefaults,
  baseStats,
  initialClock,
  baseFurnitureUnlocks,
  baseGardenUnlocks,
};
