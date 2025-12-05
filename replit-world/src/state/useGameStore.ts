import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { furnitureCatalog } from '../data/furniture';
import { gardenCatalog } from '../data/garden';
import { baseElements, advancedElements, elementRecipes } from '../data/elements';
import { moodPresets } from '../data/moods';
import { achievementList } from '../data/achievements';
import { petSkins } from '../data/pet';
import type {
  AchievementDefinition,
  ElementDefinition,
  ElementRecipe,
  GardenTile,
  HouseItemInstance,
  PlayerStats,
  RoomKey,
} from './types';

export interface MailItem {
  id: string;
  title: string;
  body: string;
  claimed: boolean;
  reward?: {
    type: 'element' | 'decor' | 'garden' | 'pet' | 'mood';
    id: string;
  };
}

interface DiscoveryEntry {
  id: string;
  label: string;
  detail: string;
  category: 'forge' | 'achievement' | 'memory';
  timestamp: number;
}

interface PetState {
  name: string;
  hunger: number;
  happiness: number;
  energy: number;
  cleanliness: number;
  lastTick: number;
  skinId: string;
}

export interface GameStoreState {
  selectedRoom: RoomKey;
  roomThemes: Record<RoomKey, { walls: string; floor: string }>;
  roofColor: string;
  activeMoodId: string;
  houseItems: HouseItemInstance[];
  selectedItemId: string | null;
  unlockedFurniture: string[];
  unlockedGarden: string[];
  unlockedElements: string[];
  unlockedMoods: string[];
  unlockedPetSkins: string[];
  achievementsUnlocked: string[];
  discoveredRecipes: string[];
  gardenTiles: GardenTile[];
  stats: PlayerStats;
  pet: PetState;
  visitStamps: string[];
  discoveryLog: DiscoveryEntry[];
  mailbox: MailItem[];
  // derived setters
  setSelectedRoom: (room: RoomKey) => void;
  addHouseItem: (catalogId: string, room: RoomKey) => void;
  updateHouseItem: (id: string, data: Partial<HouseItemInstance>) => void;
  removeHouseItem: (id: string) => void;
  setRoomColor: (room: RoomKey, field: 'walls' | 'floor', color: string) => void;
  setRoofColor: (color: string) => void;
  setSelectedItem: (id: string | null) => void;
  setGardenTile: (slot: string, contentId: string | null, type: 'plant' | 'decor' | 'habitat' | 'empty') => void;
  registerGardenCare: (action: 'plant' | 'water' | 'feed') => void;
  incrementStat: (metric: keyof PlayerStats, amount?: number) => void;
  combineElements: (a: string, b: string) => { success: boolean; message: string };
  unlockById: (payload: { type: 'decor' | 'garden' | 'mood' | 'pet' | 'element'; id: string }) => void;
  checkAchievements: () => void;
  recordMovieNight: () => void;
  recordArcadeWin: () => void;
  tickPet: () => void;
  careForPet: (action: 'feed' | 'play' | 'groom' | 'rest') => void;
  visitWorld: () => void;
  clearMailboxItem: (id: string) => void;
  setActiveMood: (id: string) => void;
  equipPetSkin: (id: string) => void;
}

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

const createGardenTiles = (): GardenTile[] => {
  const tiles: GardenTile[] = [];
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

const initialElements = baseElements.map((element) => element.id);

const mergeElements = (definitions: ElementDefinition[]): Record<string, ElementDefinition> =>
  definitions.reduce((acc, element) => {
    acc[element.id] = element;
    return acc;
  }, {} as Record<string, ElementDefinition>);

const elementDefinitions: Record<string, ElementDefinition> = {
  ...mergeElements(baseElements),
  ...mergeElements(advancedElements),
};

const recipeKey = (a: string, b: string) => [a, b].sort().join('+');

const recipeMap = elementRecipes.reduce((acc, recipe) => {
  acc[recipeKey(recipe.inputs[0], recipe.inputs[1])] = recipe;
  return acc;
}, {} as Record<string, ElementRecipe>);

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      selectedRoom: 'living-room',
      roomThemes: roomDefaults,
      roofColor: '#7dd3fc',
      houseItems: [],
      activeMoodId: 'mood:sunrise',
      selectedItemId: null,
      unlockedFurniture: baseFurnitureUnlocks,
      unlockedGarden: baseGardenUnlocks,
      unlockedElements: initialElements,
      unlockedMoods: ['mood:sunrise', 'mood:rainy'],
      unlockedPetSkins: ['pet:sprout'],
      achievementsUnlocked: [],
      discoveredRecipes: [],
      gardenTiles: createGardenTiles(),
      stats: baseStats,
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
      setSelectedRoom: (room) => set({ selectedRoom: room, selectedItemId: null }),
      addHouseItem: (catalogId, room) => {
        const item: HouseItemInstance = {
          id: nanoid(),
          catalogId,
          room,
          x: 50,
          y: 60,
          rotation: 0,
          scale: 1,
          tint: furnitureCatalog.find((f) => f.id === catalogId)?.defaultTint ?? '#ffffff',
        };
        set((state) => ({
          houseItems: [...state.houseItems, item],
          selectedItemId: item.id,
        }));
      },
      updateHouseItem: (id, data) =>
        set((state) => ({
          houseItems: state.houseItems.map((item) => (item.id === id ? { ...item, ...data } : item)),
        })),
      removeHouseItem: (id) =>
        set((state) => ({
          houseItems: state.houseItems.filter((item) => item.id !== id),
          selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
        })),
      setRoomColor: (room, field, color) =>
        set((state) => ({
          roomThemes: {
            ...state.roomThemes,
            [room]: { ...state.roomThemes[room], [field]: color },
          },
        })),
      setRoofColor: (color) => set({ roofColor: color }),
      setSelectedItem: (id) => set({ selectedItemId: id }),
      setGardenTile: (slot, contentId, type) => {
        set((state) => ({
          gardenTiles: state.gardenTiles.map((tile) =>
            tile.slot === slot
              ? {
                  ...tile,
                  contentId,
                  type,
                }
              : tile,
          ),
        }));
      },
      registerGardenCare: (action) => {
        if (action === 'plant') {
          get().incrementStat('flowersPlanted');
        }
        if (action === 'feed') {
          get().incrementStat('animalsFed');
        }
      },
      incrementStat: (metric, amount = 1) => {
        set((state) => ({
          stats: {
            ...state.stats,
            [metric]: state.stats[metric] + amount,
          },
        }));
        setTimeout(() => get().checkAchievements(), 0);
      },
      unlockById: ({ type, id }) => {
        set((state) => {
          if (type === 'decor' && !state.unlockedFurniture.includes(id)) {
            return { unlockedFurniture: [...state.unlockedFurniture, id] } as Partial<GameStoreState>;
          }
          if (type === 'garden' && !state.unlockedGarden.includes(id)) {
            return { unlockedGarden: [...state.unlockedGarden, id] } as Partial<GameStoreState>;
          }
          if (type === 'mood' && !state.unlockedMoods.includes(id)) {
            return { unlockedMoods: [...state.unlockedMoods, id] } as Partial<GameStoreState>;
          }
          if (type === 'pet' && !state.unlockedPetSkins.includes(id)) {
            return { unlockedPetSkins: [...state.unlockedPetSkins, id] } as Partial<GameStoreState>;
          }
          if (type === 'element' && !state.unlockedElements.includes(id)) {
            return { unlockedElements: [...state.unlockedElements, id] } as Partial<GameStoreState>;
          }
          return {};
        });
      },
      combineElements: (a, b) => {
        const key = recipeKey(a, b);
        const recipe = recipeMap[key];
        if (!recipe) {
          return { success: false, message: 'Those ingredients fizzled out. Try a new duo.' };
        }
        const already = get().discoveredRecipes.includes(recipe.id);
        if (!already) {
          set((state) => ({
            discoveredRecipes: [...state.discoveredRecipes, recipe.id],
            discoveryLog: [
              ...state.discoveryLog,
              {
                id: recipe.id,
                label: recipe.result.label,
                detail: recipe.lore,
                category: 'forge',
                timestamp: Date.now(),
              },
            ],
          }));
        }
        get().unlockById({ type: recipe.result.type, id: recipe.result.id });
        get().incrementStat('forgeCombos');
        if (recipe.result.type === 'element') {
          return { success: true, message: `${recipe.result.label} discovered!` };
        }
        return { success: true, message: `${recipe.result.label} is ready to place!` };
      },
      checkAchievements: () => {
        const state = get();
        const newlyUnlocked: string[] = [];
        achievementList.forEach((achievement) => {
          if (state.achievementsUnlocked.includes(achievement.id)) return;
          const current = state.stats[achievement.requirement.metric];
          if (current >= achievement.requirement.threshold) {
            newlyUnlocked.push(achievement.id);
            set((prev) => ({
              achievementsUnlocked: [...prev.achievementsUnlocked, achievement.id],
              discoveryLog: [
                ...prev.discoveryLog,
                {
                  id: achievement.id,
                  label: achievement.title,
                  detail: achievement.description,
                  category: 'achievement',
                  timestamp: Date.now(),
                },
              ],
            }));
            if (achievement.reward) {
              get().unlockById({ type: achievement.reward.type, id: achievement.reward.id });
            }
          }
        });
        return newlyUnlocked;
      },
      recordMovieNight: () => get().incrementStat('moviesWatched'),
      recordArcadeWin: () => get().incrementStat('arcadeWins'),
      tickPet: () => {
        set((state) => {
          const now = Date.now();
          const elapsed = Math.max(1, Math.floor((now - state.pet.lastTick) / 1000));
          if (elapsed < 10) return state;
          const decay = elapsed / 10;
          const nextPet = {
            ...state.pet,
            hunger: Math.max(0, state.pet.hunger - decay * 1.5),
            happiness: Math.max(0, state.pet.happiness - decay),
            energy: Math.max(0, state.pet.energy - decay * 0.8),
            cleanliness: Math.max(0, state.pet.cleanliness - decay * 0.5),
            lastTick: now,
          };
          return { pet: nextPet };
        });
      },
      careForPet: (action) => {
        set((state) => {
          type PetDelta = Partial<Record<'hunger' | 'happiness' | 'energy' | 'cleanliness', number>>;
          const delta: Record<'feed' | 'play' | 'groom' | 'rest', PetDelta> = {
            feed: { hunger: 25, happiness: 5 },
            play: { happiness: 20, energy: -8 },
            groom: { cleanliness: 30, happiness: 10 },
            rest: { energy: 25, happiness: 5 },
          };
          const apply = delta[action];
          const clamp = (value: number) => Math.max(0, Math.min(100, value));
          const pet = {
            ...state.pet,
            hunger: clamp(state.pet.hunger + (apply.hunger ?? 0)),
            happiness: clamp(state.pet.happiness + (apply.happiness ?? 0)),
            energy: clamp(state.pet.energy + (apply.energy ?? 0)),
            cleanliness: clamp(state.pet.cleanliness + (apply.cleanliness ?? 0)),
          };
          return { pet };
        });
        get().incrementStat('petCareMoments');
      },
      visitWorld: () => {
        const today = new Date();
        const key = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        set((state) => {
          if (state.visitStamps.includes(key)) {
            return {} as Partial<GameStoreState>;
          }
          return {
            visitStamps: [...state.visitStamps, key],
          } as Partial<GameStoreState>;
        });
        get().incrementStat('visits');
      },
      clearMailboxItem: (id) => {
        const target = get().mailbox.find((item) => item.id === id && !item.claimed);
        if (target?.reward) {
          get().unlockById(target.reward);
        }
        set((state) => ({
          mailbox: state.mailbox.map((item) =>
            item.id === id
              ? {
                  ...item,
                  claimed: true,
                }
              : item,
          ),
        }));
      },
      setActiveMood: (id) => {
        if (!get().unlockedMoods.includes(id)) return;
        set({ activeMoodId: id });
      },
      equipPetSkin: (id) => {
        if (!get().unlockedPetSkins.includes(id)) return;
        set((state) => ({ pet: { ...state.pet, skinId: id } }));
      },
    }),
    {
      name: 'personal-world-state',
      version: 1,
    },
  ),
);

export const getFurnitureById = (id: string) => furnitureCatalog.find((item) => item.id === id);
export const getGardenItemById = (id: string) => gardenCatalog.find((item) => item.id === id);
export const getMoodById = (id: string) => moodPresets.find((mood) => mood.id === id);
export const getPetSkinById = (id: string) => petSkins.find((skin) => skin.id === id);
export const getAchievementById = (id: string): AchievementDefinition | undefined =>
  achievementList.find((achievement) => achievement.id === id);
export const getElementById = (id: string): ElementDefinition | undefined => elementDefinitions[id];
export const getRecipeById = (id: string): ElementRecipe | undefined => elementRecipes.find((recipe) => recipe.id === id);
