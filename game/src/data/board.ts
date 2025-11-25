import type { Ladder, MysteryTile, Snake } from '../types';

export const BOARD_SIZE = 100;

export const ladders: Ladder[] = [
  { start: 4, end: 20, label: 'Bamboo Elevator', color: '#bdfcc9' },
  { start: 12, end: 34, label: 'Temple Lift', color: '#d1b4ff' },
  { start: 29, end: 55, label: 'Aurora Rail', color: '#fce38a' },
  { start: 45, end: 76, label: 'Shimmer Spire', color: '#9be7ff' },
  { start: 66, end: 92, label: 'Guard Tower Zipline', color: '#ffd6e0' },
];

export const snakes: Snake[] = [
  { start: 18, end: 6, label: 'Shark Maw', severity: 'medium', theme: 'stem' },
  { start: 38, end: 21, label: 'Glass Bridge Crack', severity: 'high', theme: 'lore' },
  { start: 49, end: 33, label: 'Red Light Sweep', severity: 'medium', theme: 'pop' },
  { start: 63, end: 44, label: 'Observation Cube Drop', severity: 'high', theme: 'stem' },
  { start: 87, end: 70, label: 'Frontman Ambush', severity: 'high', theme: 'lore' },
  { start: 96, end: 52, label: 'Megashark Spiral', severity: 'high', theme: 'stem' },
];

export const mysteryTiles: MysteryTile[] = [
  { tile: 9, effect: 'credits', label: 'Glass Token Cache' },
  { tile: 23, effect: 'guard', label: 'Guard Favor' },
  { tile: 41, effect: 'storm', label: 'Neon Storm' },
  { tile: 58, effect: 'credits', label: 'Piggy Bank Vault' },
  { tile: 72, effect: 'guard', label: 'Allied Contestant' },
];
