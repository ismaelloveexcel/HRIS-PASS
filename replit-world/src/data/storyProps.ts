import type { StoryProp } from '../state/types';

const svg = (content: string) =>
  `<svg viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;

export const storyPropBlueprints: StoryProp[] = [
  {
    id: 'prop:campfire',
    label: 'Glow Campfire',
    icon: svg(`
      <ellipse cx="70" cy="90" rx="45" ry="18" fill="#7c3aed" opacity="0.2" />
      <path d="M70 30 L88 70 L70 95 L52 70 Z" fill="#f97316" />
      <path d="M70 45 L80 70 L70 85 L60 70 Z" fill="#facc15" />
      <rect x="40" y="80" width="60" height="12" rx="6" fill="#4b2e16" />
      <rect x="30" y="85" width="80" height="12" rx="6" fill="#3f2011" opacity="0.6" />
    `),
    entries: [],
    unlockedBy: 'prop:campfire',
  },
  {
    id: 'prop:projector',
    label: 'Doodle Projector',
    icon: svg(`
      <rect x="20" y="65" width="100" height="30" rx="12" fill="#312e81" />
      <rect x="35" y="30" width="70" height="45" rx="10" fill="#1e1b4b" />
      <circle cx="70" cy="50" r="18" fill="#a5b4fc" />
      <rect x="15" y="80" width="110" height="18" rx="9" fill="#a855f7" opacity="0.35" />
    `),
    entries: [],
    unlockedBy: 'prop:projector',
  },
  {
    id: 'prop:scrapbook',
    label: 'Memory Scrapbook',
    icon: svg(`
      <rect x="20" y="20" width="100" height="80" rx="18" fill="#fef3c7" />
      <rect x="30" y="30" width="80" height="60" rx="12" fill="#fcd34d" />
      <path d="M40 40 L80 40 L60 70 Z" fill="#fda4af" />
      <circle cx="50" cy="70" r="10" fill="#fb7185" />
    `),
    entries: [],
    unlockedBy: 'prop:scrapbook',
  },
];
