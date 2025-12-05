import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { furnitureCatalog } from '../data/furniture';
import { gardenCatalog } from '../data/garden';
import { baseElements, advancedElements, elementRecipes } from '../data/elements';
import { moodPresets } from '../data/moods';
import { achievementList } from '../data/achievements';
import { petSkins } from '../data/pet';
import { seasonalEvents } from '../data/events';
import type {
  AchievementDefinition,
  ElementDefinition,
  ElementRecipe,
  HouseItemInstance,
  StoryPropEntry,
  PhotoEntry,
  CinemaSession,
  RoomKey,
  WorldSnapshot,
  ClockState,
  PlayerStats,
} from './types';
import { createDefaultWorldState } from './defaultWorld';


export interface GameStoreState extends WorldSnapshot {
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
  unlockById: (payload: { type: 'decor' | 'garden' | 'mood' | 'pet' | 'element' | 'prop'; id: string }) => void;
  checkAchievements: () => void;
  recordMovieNight: () => void;
  recordArcadeWin: () => void;
  tickPet: () => void;
  careForPet: (action: 'feed' | 'play' | 'groom' | 'rest') => void;
  visitWorld: () => void;
  clearMailboxItem: (id: string) => void;
  setActiveMood: (id: string) => void;
  equipPetSkin: (id: string) => void;
  updateClock: (date?: Date) => void;
  toggleSkySync: (value: boolean) => void;
  addStoryEntry: (propId: string, entry: Omit<StoryPropEntry, 'id' | 'timestamp'>) => void;
  capturePhoto: (payload: { caption: string; stickers: string[]; dataUrl: string | null }) => void;
  logCinemaSession: (notes: string) => void;
}

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

const timeMoodMap: Record<ClockState['timeOfDay'], string> = {
  sunrise: 'mood:sunrise',
  day: 'mood:rainy',
  evening: 'mood:festival',
  night: 'mood:nightfall',
};

const timeOfDayFromHour = (hour: number): ClockState['timeOfDay'] => {
  if (hour >= 5 && hour < 10) return 'sunrise';
  if (hour >= 10 && hour < 17) return 'day';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
};

const rollWeather = (hour: number, hasFestival: boolean): ClockState['weather'] => {
  if (hasFestival) return 'festival';
  if (hour >= 21 || hour < 6) return 'mist';
  return Math.random() < 0.25 ? 'rain' : 'clear';
};

const dayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const isWithinEventWindow = (day: number, start: number, end: number) => {
  if (start <= end) {
    return day >= start && day <= end;
  }
  return day >= start || day <= end;
};

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      ...createDefaultWorldState(),
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
          if (type === 'prop') {
            return {
              storyProps: state.storyProps.map((prop) =>
                prop.id === id
                  ? {
                      ...prop,
                      unlocked: true,
                    }
                  : prop,
              ),
            } as Partial<GameStoreState>;
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
        if (recipe.result.type === 'prop') {
          return { success: true, message: `${recipe.result.label} unlocked in Story Props!` };
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
        let isNewVisit = false;
        set((state) => {
          if (state.visitStamps.includes(key)) {
            return {} as Partial<GameStoreState>;
          }
          isNewVisit = true;
          return {
            visitStamps: [...state.visitStamps, key],
          } as Partial<GameStoreState>;
        });
        get().incrementStat('visits');
        get().updateClock(today);
        if (isNewVisit) {
          const currentClock = get().clock;
          if (currentClock.timeOfDay === 'sunrise') {
            get().incrementStat('flowersPlanted');
          }
          if (currentClock.timeOfDay === 'night') {
            get().incrementStat('arcadeWins');
          }
        }
        const doy = dayOfYear(today);
        const activeEvent = seasonalEvents.find((event) =>
          isWithinEventWindow(doy, event.startDayOfYear, event.endDayOfYear),
        );
        if (activeEvent && get().activeEventId !== activeEvent.id) {
          set((state) => {
            const mailId = `event-${activeEvent.id}`;
            if (state.mailbox.some((mail) => mail.id === mailId)) {
              return {
                activeEventId: activeEvent.id,
              } as Partial<GameStoreState>;
            }
            return {
              activeEventId: activeEvent.id,
              mailbox: [
                ...state.mailbox,
                {
                  id: mailId,
                  title: `${activeEvent.title} is live!`,
                  body: `${activeEvent.description}\nRewards ready in your catalog.`,
                  claimed: false,
                  reward: activeEvent.rewards[0],
                },
              ],
            } as Partial<GameStoreState>;
          });
          activeEvent.rewards.slice(1).forEach((reward) => get().unlockById(reward));
          if (activeEvent.specialElement) {
            get().unlockById({ type: 'element', id: activeEvent.specialElement });
          }
        }
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
      updateClock: (date = new Date()) => {
        set((state) => {
          const timeOfDay = timeOfDayFromHour(date.getHours());
          const weather = rollWeather(date.getHours(), Boolean(state.activeEventId));
          const nextClock: ClockState = {
            ...state.clock,
            timeOfDay,
            weather: state.clock.followRealSky ? weather : state.clock.weather,
          };
          let nextMood = state.activeMoodId;
          if (state.clock.followRealSky) {
            const targetMood = timeMoodMap[timeOfDay];
            if (state.unlockedMoods.includes(targetMood)) {
              nextMood = targetMood;
            }
          }
          return {
            clock: nextClock,
            activeMoodId: nextMood,
          };
        });
      },
      toggleSkySync: (value) =>
        set((state) => ({
          clock: {
            ...state.clock,
            followRealSky: value,
          },
        })),
      addStoryEntry: (propId, entry) => {
        const payload: StoryPropEntry = {
          id: nanoid(),
          type: entry.type,
          content: entry.content,
          timestamp: Date.now(),
        };
        set((state) => ({
          storyProps: state.storyProps.map((prop) =>
            prop.id === propId
              ? {
                  ...prop,
                  entries: [...prop.entries, payload],
                }
              : prop,
          ),
          discoveryLog: [
            ...state.discoveryLog,
            {
              id: payload.id,
              label: `Story update: ${propId}`,
              detail: entry.type === 'text' ? entry.content : 'Added a new creative moment.',
              category: 'memory',
              timestamp: payload.timestamp,
            },
          ],
        }));
      },
      capturePhoto: ({ caption, stickers, dataUrl }) => {
        const entry: PhotoEntry = {
          id: nanoid(),
          caption,
          stickers,
          dataUrl,
          moodId: get().activeMoodId,
          timestamp: Date.now(),
        };
        set((state) => ({
          photos: [...state.photos, entry],
          discoveryLog: [
            ...state.discoveryLog,
            {
              id: entry.id,
              label: 'Photo captured',
              detail: caption || 'A new snapshot was added to the journal.',
              category: 'photo',
              timestamp: entry.timestamp,
            },
          ],
        }));
      },
      logCinemaSession: (notes) => {
        const session: CinemaSession = {
          id: nanoid(),
          url: 'https://movies2watch.cc/home/',
          watchedAt: Date.now(),
          notes,
        };
        set((state) => ({
          cinemaSessions: [...state.cinemaSessions, session],
          discoveryLog: [
            ...state.discoveryLog,
            {
              id: session.id,
              label: 'Shared cinema moment',
              detail: notes || 'You both enjoyed a movie night.',
              category: 'cinema',
              timestamp: session.watchedAt,
            },
          ],
        }));
        get().recordMovieNight();
      },
    }),
    {
      name: 'personal-world-state',
      version: 2,
      migrate: (state: any, version) => {
        if (!state) return state;
        if (version < 2) {
          const fallback = createDefaultWorldState();
          return {
            ...state,
            clock: state.clock ?? fallback.clock,
            storyProps: state.storyProps ?? fallback.storyProps,
            photos: state.photos ?? fallback.photos,
            activeEventId: state.activeEventId ?? fallback.activeEventId,
            cinemaSessions: state.cinemaSessions ?? fallback.cinemaSessions,
          };
        }
        return state;
      },
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
