import type { FurnitureCatalogItem } from '../state/types';

const svg = (content: string) =>
  `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${content}</svg>`;

export const furnitureCatalog: FurnitureCatalogItem[] = [
  {
    id: 'cloud-sofa',
    label: 'Cloud Sofa',
    roomAffinity: ['living-room', 'cinema'],
    defaultTint: '#ffb7c5',
    svg: svg(`
      <rect x="10" y="50" width="140" height="45" rx="22" fill="currentColor" />
      <rect x="25" y="20" width="110" height="45" rx="22" fill="currentColor" opacity="0.8" />
      <circle cx="55" cy="90" r="8" fill="#ffffff" />
      <circle cx="105" cy="90" r="8" fill="#ffffff" />
    `),
    footprint: [32, 18],
    description: 'A plush sofa that begs for movie nights and giggles.',
  },
  {
    id: 'starlit-bed',
    label: 'Starlit Bed',
    roomAffinity: ['bedroom'],
    defaultTint: '#9bb9ff',
    svg: svg(`
      <rect x="15" y="60" width="130" height="35" rx="14" fill="currentColor" />
      <rect x="25" y="35" width="110" height="35" rx="12" fill="#ffffff" opacity="0.75" />
      <circle cx="45" cy="35" r="10" fill="#ffd166" />
      <circle cx="115" cy="28" r="6" fill="#ffd166" />
    `),
    footprint: [36, 20],
    description: 'Snuggle under a galaxy of soft pillows and glow stars.',
  },
  {
    id: 'aurora-table',
    label: 'Aurora Table',
    roomAffinity: ['living-room', 'game-den'],
    defaultTint: '#ffd166',
    svg: svg(`
      <rect x="25" y="50" width="110" height="18" rx="8" fill="currentColor" />
      <rect x="35" y="25" width="90" height="28" rx="14" fill="#fff9e0" opacity="0.9" />
      <rect x="40" y="72" width="10" height="25" rx="3" fill="#f5d782" />
      <rect x="110" y="72" width="10" height="25" rx="3" fill="#f5d782" />
    `),
    footprint: [30, 16],
    description: 'A warm table for drawing plans or sharing snacks.',
  },
  {
    id: 'levi-shelf',
    label: 'Levitation Shelf',
    roomAffinity: ['living-room', 'game-den', 'cinema'],
    defaultTint: '#8ce0d4',
    svg: svg(`
      <rect x="20" y="20" width="120" height="14" rx="6" fill="currentColor" />
      <rect x="30" y="50" width="100" height="14" rx="6" fill="currentColor" opacity="0.8" />
      <rect x="40" y="80" width="80" height="14" rx="6" fill="currentColor" opacity="0.6" />
      <circle cx="80" cy="12" r="6" fill="#fff" />
    `),
    footprint: [26, 26],
    description: 'Floating shelves for memories, trophies, or secret snacks.',
  },
  {
    id: 'cosmo-carpet',
    label: 'Cosmo Carpet',
    roomAffinity: ['living-room', 'cinema', 'game-den'],
    defaultTint: '#6c63ff',
    svg: svg(`
      <rect x="10" y="20" width="140" height="80" rx="18" fill="currentColor" />
      <rect x="25" y="35" width="110" height="50" rx="12" fill="rgba(255,255,255,0.2)" />
      <circle cx="55" cy="60" r="18" fill="rgba(255,255,255,0.25)" />
      <circle cx="105" cy="60" r="12" fill="rgba(255,255,255,0.25)" />
    `),
    footprint: [40, 28],
    description: 'A nebula-soft rug that makes every step feel like a cloud.',
  },
  {
    id: 'lumen-lamp',
    label: 'Lumen Lamp',
    roomAffinity: ['living-room', 'cinema', 'bedroom'],
    defaultTint: '#ffb347',
    svg: svg(`
      <rect x="70" y="40" width="20" height="45" rx="6" fill="#f2f2f2" />
      <circle cx="80" cy="30" r="25" fill="currentColor" />
      <circle cx="80" cy="30" r="15" fill="rgba(255,255,255,0.6)" />
      <rect x="72" y="90" width="16" height="10" rx="6" fill="#d4d4d4" />
    `),
    footprint: [12, 24],
    description: 'Warm light that shifts hues to match your mood.',
  },
  {
    id: 'memory-poster',
    label: 'Memory Poster',
    roomAffinity: ['living-room', 'cinema', 'game-den', 'bedroom'],
    defaultTint: '#ff80b5',
    svg: svg(`
      <rect x="30" y="10" width="100" height="100" rx="12" fill="#1d2b53" />
      <rect x="35" y="15" width="90" height="90" rx="10" fill="currentColor" />
      <path d="M45 85 L80 35 L115 85 Z" fill="rgba(255,255,255,0.8)" />
    `),
    footprint: [18, 32],
    description: 'Pin your funniest doodles or snapshots from adventures.',
  },
  {
    id: 'teddy-colossus',
    label: 'Giant Teddy',
    roomAffinity: ['living-room', 'bedroom', 'game-den'],
    defaultTint: '#f6c89f',
    svg: svg(`
      <circle cx="80" cy="40" r="22" fill="currentColor" />
      <circle cx="60" cy="30" r="10" fill="currentColor" />
      <circle cx="100" cy="30" r="10" fill="currentColor" />
      <rect x="35" y="50" width="90" height="55" rx="28" fill="currentColor" />
      <circle cx="55" cy="80" r="14" fill="#f5b087" />
      <circle cx="105" cy="80" r="14" fill="#f5b087" />
    `),
    footprint: [30, 34],
    description: 'Huggable guardian of secrets and silly moments.',
  },
  {
    id: 'cinema-booth',
    label: 'Cinema Booth',
    roomAffinity: ['cinema'],
    defaultTint: '#e6437d',
    svg: svg(`
      <rect x="15" y="45" width="130" height="50" rx="16" fill="currentColor" />
      <rect x="25" y="30" width="110" height="25" rx="10" fill="#43122b" />
      <circle cx="50" cy="70" r="8" fill="#fff5c7" />
      <circle cx="110" cy="70" r="8" fill="#fff5c7" />
    `),
    footprint: [36, 24],
    description: 'Perfect view, perfect popcorn, perfect laugh track.',
  },
  {
    id: 'arcade-holo',
    label: 'Arcade Holo Desk',
    roomAffinity: ['game-den'],
    defaultTint: '#2f6bff',
    svg: svg(`
      <rect x="20" y="65" width="120" height="25" rx="12" fill="currentColor" />
      <rect x="35" y="25" width="90" height="45" rx="15" fill="#0b1024" />
      <rect x="45" y="35" width="70" height="25" rx="10" fill="#25d0ff" opacity="0.6" />
      <circle cx="80" cy="85" r="6" fill="#00f5c7" />
    `),
    footprint: [32, 20],
    description: 'Arcade command center for co-op showdowns.',
  },
  {
    id: 'forge-lantern',
    label: 'Starlight Lantern',
    roomAffinity: ['living-room', 'cinema', 'game-den'],
    defaultTint: '#ffe066',
    svg: svg(`
      <path d="M80 20 L120 50 L80 100 L40 50 Z" fill="currentColor" />
      <circle cx="80" cy="60" r="20" fill="rgba(255,255,255,0.45)" />
      <rect x="70" y="10" width="20" height="12" rx="6" fill="#f4d35e" />
    `),
    footprint: [16, 26],
    description: 'Crafted from Fire + Wood. Makes your rooms glow softly.',
    unlockedBy: 'forge:lantern',
  },
  {
    id: 'cinema-rug',
    label: 'Cinema Stargaze Rug',
    roomAffinity: ['cinema'],
    defaultTint: '#1f2a44',
    svg: svg(`
      <rect x="10" y="25" width="140" height="70" rx="20" fill="currentColor" />
      <circle cx="60" cy="60" r="14" fill="#ffdd87" />
      <circle cx="100" cy="60" r="9" fill="#9c7bff" />
      <circle cx="130" cy="55" r="6" fill="#52f2ff" />
    `),
    footprint: [42, 24],
    description: 'Unlocked after sharing a movie night achievement.',
    unlockedBy: 'achievement:cinema-rug',
  },
  {
    id: 'arcade-poster',
    label: 'Arcade Victory Poster',
    roomAffinity: ['game-den'],
    defaultTint: '#00f5c7',
    svg: svg(`
      <rect x="35" y="10" width="90" height="100" rx="12" fill="#031b34" />
      <path d="M50 90 L70 30 L90 90 Z" fill="currentColor" />
      <circle cx="80" cy="65" r="8" fill="#fff" />
    `),
    footprint: [18, 32],
    description: 'Earned through winning friendly arcade duels.',
    unlockedBy: 'achievement:arcade-poster',
  },
  {
    id: 'mural-wall',
    label: 'Story Mural Wall',
    roomAffinity: ['living-room', 'cinema', 'game-den'],
    defaultTint: '#ff9d73',
    svg: svg(`
      <rect x="20" y="10" width="120" height="100" rx="18" fill="#fef4eb" />
      <path d="M30 80 Q60 30 90 80" stroke="currentColor" stroke-width="6" fill="none" />
      <circle cx="70" cy="60" r="12" fill="#ffd166" />
      <circle cx="110" cy="50" r="9" fill="#68d2c4" />
    `),
    footprint: [30, 36],
    description: 'Craft Story Spark + Canvas to unlock a co-doodle surface.',
    unlockedBy: 'forge:mural',
  },
  {
    id: 'glow-roof',
    label: 'Glow Roof Accent',
    roomAffinity: ['living-room', 'bedroom', 'cinema', 'game-den'],
    defaultTint: '#7dd3fc',
    svg: svg(`
      <path d="M15 80 L80 20 L145 80 Z" fill="currentColor" />
      <rect x="25" y="80" width="110" height="20" fill="#0f172a" />
    `),
    footprint: [50, 30],
    description: 'Bright neon roofline unlocked via weather quests.',
    unlockedBy: 'mood:nightfall',
  },
];
