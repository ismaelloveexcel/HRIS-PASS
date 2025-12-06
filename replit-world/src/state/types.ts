export type RoomKey = 'living-room' | 'cinema' | 'game-den' | 'bedroom';

export interface FurnitureCatalogItem {
  id: string;
  label: string;
  roomAffinity: RoomKey[];
  defaultTint: string;
  svg: string;
  footprint: [number, number];
  description: string;
  unlockedBy?: string; // element id, achievement id, etc.
  moodTags?: string[];
}

export interface HouseItemInstance {
  id: string;
  catalogId: string;
  room: RoomKey;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  rotation: number; // deg
  scale: number; // multiplier
  tint: string;
}

export type GardenSlotType = 'empty' | 'plant' | 'decor' | 'habitat';

export interface GardenCatalogItem {
  id: string;
  label: string;
  category: Exclude<GardenSlotType, 'empty'>;
  svg: string;
  description: string;
  unlockedBy?: string;
  providesElement?: string;
}

export interface GardenTile {
  slot: string; // "rX-cY"
  type: GardenSlotType;
  contentId: string | null;
}

export interface ElementDefinition {
  id: string;
  label: string;
  description: string;
  icon: string;
  discoveredVia?: string;
}

export interface ElementRecipe {
  id: string;
  inputs: [string, string];
  result: {
    type: 'element' | 'decor' | 'garden' | 'pet' | 'mood' | 'prop';
    id: string;
    label: string;
    description: string;
  };
  lore: string;
}

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  requirement: {
    metric: keyof PlayerStats;
    threshold: number;
  };
  reward: {
    type: 'element' | 'decor' | 'garden' | 'pet' | 'mood';
    id: string;
  } | null;
}

export type PlayerStats = {
  flowersPlanted: number;
  animalsFed: number;
  moviesWatched: number;
  arcadeWins: number;
  forgeCombos: number;
  petCareMoments: number;
  visits: number;
};

export interface MoodPreset {
  id: string;
  label: string;
  gradient: string;
  ambientSound: string | null;
  accent: string;
  description: string;
}

export interface PetSkin {
  id: string;
  label: string;
  svg: string;
  unlockedBy?: string;
}

export type TimeOfDay = 'sunrise' | 'day' | 'evening' | 'night';
export type WeatherKind = 'clear' | 'rain' | 'mist' | 'festival';

export interface ClockState {
  timeOfDay: TimeOfDay;
  weather: WeatherKind;
  followRealSky: boolean;
}

export interface StoryPropEntry {
  id: string;
  type: 'audio' | 'sketch' | 'text';
  content: string;
  timestamp: number;
}

export interface StoryProp {
  id: string;
  label: string;
  icon: string;
  entries: StoryPropEntry[];
  unlockedBy?: string;
}

export interface StoryPropState extends StoryProp {
  unlocked: boolean;
}

export interface PhotoEntry {
  id: string;
  caption: string;
  stickers: string[];
  moodId: string;
  dataUrl: string | null;
  timestamp: number;
}

export interface SeasonalEvent {
  id: string;
  title: string;
  timeframe: string;
  description: string;
  startDayOfYear: number;
  endDayOfYear: number;
  rewards: {
    type: 'decor' | 'garden' | 'pet' | 'mood' | 'element';
    id: string;
  }[];
  specialElement?: string;
}

export interface CinemaSession {
  id: string;
  url: string;
  watchedAt: number;
  notes: string;
}

export interface MailItem {
  id: string;
  title: string;
  body: string;
  claimed: boolean;
  reward?: {
    type: 'element' | 'decor' | 'garden' | 'pet' | 'mood' | 'prop';
    id: string;
  };
}

export interface DiscoveryEntry {
  id: string;
  label: string;
  detail: string;
  category: 'forge' | 'achievement' | 'memory' | 'photo' | 'cinema';
  timestamp: number;
}

export interface PetState {
  name: string;
  hunger: number;
  happiness: number;
  energy: number;
  cleanliness: number;
  lastTick: number;
  skinId: string;
}

export interface WorldSnapshot {
  selectedRoom: RoomKey;
  roomThemes: Record<RoomKey, { walls: string; floor: string }>;
  roofColor: string;
  activeMoodId: string;
  clock: ClockState;
  houseItems: HouseItemInstance[];
  selectedItemId: string | null;
  unlockedFurniture: string[];
  unlockedGarden: string[];
  unlockedElements: string[];
  unlockedMoods: string[];
  unlockedPetSkins: string[];
  storyProps: StoryPropState[];
  photos: PhotoEntry[];
  activeEventId: string | null;
  cinemaSessions: CinemaSession[];
  caretakerLog: CaretakerEntry[];
  caretakerPoints: number;
  bucketList: BucketListItem[];
  achievementsUnlocked: string[];
  discoveredRecipes: string[];
  gardenTiles: GardenTile[];
  stats: PlayerStats;
  pet: PetState;
  visitStamps: string[];
  discoveryLog: DiscoveryEntry[];
  mailbox: MailItem[];
}

export interface WorldSession {
  worldCode: string;
  token: string;
  playerName: string;
}

export interface CaretakerEntry {
  id: string;
  type: 'water' | 'plant' | 'feed' | 'pet' | 'movie' | 'quest';
  description: string;
  points: number;
  timestamp: number;
}

export interface BucketListItem {
  id: string;
  title: string;
  source: string;
  addedBy: string;
  status: 'planned' | 'watched';
  addedAt: number;
  watchedAt?: number;
}
