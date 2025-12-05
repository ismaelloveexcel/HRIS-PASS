import type { GardenCatalogItem } from '../state/types';

const svg = (content: string) =>
  `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;

export const gardenCatalog: GardenCatalogItem[] = [
  {
    id: 'flower-bed',
    label: 'Flower Bed',
    category: 'plant',
    svg: svg(`
      <rect x="10" y="70" width="100" height="30" rx="12" fill="#7c4d27" />
      <circle cx="35" cy="65" r="14" fill="#ff7eb3" />
      <circle cx="60" cy="60" r="12" fill="#ffd166" />
      <circle cx="85" cy="67" r="10" fill="#9c7bff" />
      <rect x="25" y="80" width="70" height="8" rx="4" fill="#a15a32" />
    `),
    description: 'Layered blooms that attract butterflies and mood boosts.',
  },
  {
    id: 'date-palm',
    label: 'Date Palm',
    category: 'plant',
    svg: svg(`
      <rect x="50" y="50" width="20" height="50" rx="8" fill="#8d5a2b" />
      <path d="M60 55 L20 35" stroke="#37c978" stroke-width="10" stroke-linecap="round" />
      <path d="M60 55 L100 35" stroke="#37c978" stroke-width="10" stroke-linecap="round" />
      <path d="M60 45 L25 20" stroke="#49e0a2" stroke-width="8" stroke-linecap="round" />
      <path d="M60 45 L95 20" stroke="#49e0a2" stroke-width="8" stroke-linecap="round" />
    `),
    description: 'Desert-born shade with sweet fruit lore.',
  },
  {
    id: 'cherry-blossom',
    label: 'Cherry Blossom',
    category: 'plant',
    svg: svg(`
      <rect x="58" y="60" width="8" height="40" fill="#613125" />
      <circle cx="60" cy="50" r="25" fill="#ffd6f4" />
      <circle cx="45" cy="65" r="18" fill="#ffaad7" />
      <circle cx="80" cy="65" r="18" fill="#ffb7de" />
    `),
    description: 'Seasonal confetti that drifts across the yard.',
  },
  {
    id: 'mango-tree',
    label: 'Mango Tree',
    category: 'plant',
    svg: svg(`
      <rect x="55" y="60" width="10" height="40" fill="#7b4d2a" />
      <circle cx="60" cy="45" r="25" fill="#2fbf71" />
      <circle cx="45" cy="50" r="18" fill="#28a362" />
      <circle cx="75" cy="50" r="18" fill="#28a362" />
      <circle cx="60" cy="40" r="8" fill="#ffb347" />
      <circle cx="70" cy="55" r="8" fill="#ffb347" />
    `),
    description: 'Plant for sweet harvests and mellow shadows.',
  },
  {
    id: 'veggie-patch',
    label: 'Vegetable Patch',
    category: 'plant',
    svg: svg(`
      <rect x="10" y="70" width="100" height="30" rx="8" fill="#7a4c32" />
      <rect x="18" y="40" width="20" height="25" rx="6" fill="#ff7b72" />
      <rect x="45" y="45" width="20" height="20" rx="6" fill="#31c48d" />
      <rect x="72" y="42" width="20" height="23" rx="6" fill="#ffd166" />
    `),
    description: 'Carrots, tomatoes, and greens for cooking minigames.',
  },
  {
    id: 'moon-pond',
    label: 'Moon Pond',
    category: 'decor',
    svg: svg(`
      <ellipse cx="60" cy="70" rx="45" ry="25" fill="#8de2ff" />
      <ellipse cx="60" cy="65" rx="30" ry="12" fill="#c9f2ff" />
      <circle cx="40" cy="70" r="6" fill="#fff5cc" />
      <circle cx="80" cy="72" r="8" fill="#fff5cc" />
    `),
    description: 'Reflects the sky and occasionally visiting ducks.',
  },
  {
    id: 'stone-path',
    label: 'Stone Pathway',
    category: 'decor',
    svg: svg(`
      <rect x="15" y="35" width="20" height="50" rx="8" fill="#d2d6e8" />
      <rect x="45" y="35" width="20" height="50" rx="8" fill="#c1c7da" />
      <rect x="75" y="35" width="20" height="50" rx="8" fill="#d2d6e8" />
    `),
    description: 'Guide friends from the house to the cinema and arcade.',
  },
  {
    id: 'garden-fence',
    label: 'Lantern Fence',
    category: 'decor',
    svg: svg(`
      <rect x="10" y="65" width="100" height="15" rx="6" fill="#f7c15a" />
      <rect x="10" y="40" width="100" height="12" rx="6" fill="#f6e7c5" />
      <circle cx="25" cy="55" r="6" fill="#ffd166" />
      <circle cx="58" cy="55" r="6" fill="#ffd166" />
      <circle cx="95" cy="55" r="6" fill="#ffd166" />
    `),
    description: 'Softly lit fence posts for evening hangs.',
  },
  {
    id: 'garden-gnome',
    label: 'Gleeful Gnome',
    category: 'decor',
    svg: svg(`
      <circle cx="60" cy="65" r="28" fill="#fef3c7" />
      <rect x="45" y="40" width="30" height="20" rx="6" fill="#f87171" />
      <circle cx="60" cy="50" r="10" fill="#fff" />
      <circle cx="50" cy="45" r="4" fill="#0f172a" />
      <circle cx="70" cy="45" r="4" fill="#0f172a" />
      <rect x="48" y="78" width="24" height="15" rx="6" fill="#4b5563" />
    `),
    description: 'Clay buddy that celebrates new discoveries.',
    unlockedBy: 'forge:garden-gnome',
  },
  {
    id: 'garden-lantern',
    label: 'Garden Lantern',
    category: 'decor',
    svg: svg(`
      <rect x="55" y="30" width="10" height="60" fill="#8b5cf6" />
      <circle cx="60" cy="25" r="18" fill="#c4b5fd" />
      <circle cx="60" cy="80" r="12" fill="#fef3c7" />
    `),
    description: 'Unlocked via lantern forging quest.',
    unlockedBy: 'forge:lantern',
  },
  {
    id: 'chicken-haven',
    label: 'Chicken Haven',
    category: 'habitat',
    svg: svg(`
      <rect x="30" y="55" width="60" height="40" rx="12" fill="#facc15" />
      <polygon points="30,55 60,30 90,55" fill="#f97316" />
      <circle cx="50" cy="80" r="8" fill="#fff" />
      <circle cx="70" cy="80" r="8" fill="#fff" />
    `),
    description: 'Invite clucky buddies and gather daily eggs.',
  },
  {
    id: 'rabbit-burrow',
    label: 'Rabbit Burrow',
    category: 'habitat',
    svg: svg(`
      <ellipse cx="60" cy="80" rx="35" ry="20" fill="#8b5a2b" />
      <ellipse cx="60" cy="75" rx="22" ry="12" fill="#5a3c1f" />
      <circle cx="45" cy="65" r="8" fill="#fff" />
      <circle cx="75" cy="65" r="8" fill="#fff" />
    `),
    description: 'Gentle fluffballs peek out for carrot snacks.',
  },
  {
    id: 'duck-pond',
    label: 'Duck Pond',
    category: 'habitat',
    svg: svg(`
      <ellipse cx="60" cy="70" rx="45" ry="22" fill="#7dd3fc" />
      <circle cx="45" cy="65" r="10" fill="#fff1a1" />
      <circle cx="80" cy="75" r="10" fill="#fff1a1" />
      <circle cx="45" cy="65" r="4" fill="#0f172a" />
      <circle cx="80" cy="75" r="4" fill="#0f172a" />
    `),
    description: 'Ducks paddle happily when you feed them grains.',
  },
  {
    id: 'butterfly-halo',
    label: 'Butterfly Halo',
    category: 'decor',
    svg: svg(`
      <circle cx="40" cy="40" r="14" fill="#f472b6" />
      <circle cx="80" cy="75" r="10" fill="#60a5fa" />
      <circle cx="60" cy="60" r="8" fill="#34d399" />
      <circle cx="30" cy="75" r="6" fill="#fcd34d" />
    `),
    description: 'Colorful swarm that grows with flower care.',
    unlockedBy: 'quest:pollinator',
  },
  {
    id: 'bee-spiral',
    label: 'Bee Spiral',
    category: 'habitat',
    svg: svg(`
      <circle cx="60" cy="60" r="25" fill="#facc15" />
      <path d="M40 60 Q60 35 80 60" stroke="#000" stroke-width="6" fill="none" />
      <path d="M40 70 Q60 95 80 70" stroke="#000" stroke-width="6" fill="none" />
    `),
    description: 'Spiraling hive that boosts veggie growth.',
    unlockedBy: 'mist+life',
  },
  {
    id: 'ramadan-lanterns',
    label: 'Ramadan Lanterns',
    category: 'decor',
    svg: svg(`
      <rect x="20" y="20" width="80" height="10" rx="5" fill="#fde68a" />
      <line x1="30" y1="30" x2="30" y2="90" stroke="#fbbf24" stroke-width="4" />
      <line x1="60" y1="30" x2="60" y2="90" stroke="#fbbf24" stroke-width="4" />
      <line x1="90" y1="30" x2="90" y2="90" stroke="#fbbf24" stroke-width="4" />
      <circle cx="30" cy="90" r="12" fill="#f87171" />
      <circle cx="60" cy="90" r="12" fill="#34d399" />
      <circle cx="90" cy="90" r="12" fill="#60a5fa" />
    `),
    description: 'Seasonal glow for nightly rituals.',
  },
  {
    id: 'winter-lights',
    label: 'Winter Lights',
    category: 'decor',
    svg: svg(`
      <rect x="15" y="40" width="90" height="10" rx="5" fill="#bae6fd" />
      <circle cx="25" cy="60" r="8" fill="#fef3c7" />
      <circle cx="50" cy="60" r="8" fill="#bae6fd" />
      <circle cx="75" cy="60" r="8" fill="#fef3c7" />
      <circle cx="100" cy="60" r="8" fill="#bae6fd" />
    `),
    description: 'Frosty string lights for cozy nights.',
  },
];
