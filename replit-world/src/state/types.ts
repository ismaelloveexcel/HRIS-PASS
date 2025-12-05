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
    type: 'element' | 'decor' | 'garden' | 'pet' | 'mood';
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
