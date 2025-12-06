import type { PetSkin } from '../state/types';

const svg = (content: string) =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;

export const petSkins: PetSkin[] = [
  {
    id: 'pet:sprout',
    label: 'Sproutling',
    svg: svg(`
      <circle cx="100" cy="100" r="60" fill="#a7f3d0" />
      <ellipse cx="80" cy="90" rx="12" ry="18" fill="#0f172a" />
      <ellipse cx="120" cy="90" rx="12" ry="18" fill="#0f172a" />
      <path d="M70 130 Q100 150 130 130" stroke="#0f172a" stroke-width="8" fill="none" />
      <path d="M100 40 C110 60 120 80 100 70 C80 80 90 60 100 40 Z" fill="#34d399" />
    `),
  },
  {
    id: 'pet:luma',
    label: 'Luma Bloom',
    svg: svg(`
      <circle cx="100" cy="100" r="60" fill="#c084fc" />
      <circle cx="100" cy="100" r="40" fill="#e9d5ff" opacity="0.7" />
      <ellipse cx="80" cy="90" rx="10" ry="16" fill="#1f2937" />
      <ellipse cx="120" cy="90" rx="10" ry="16" fill="#1f2937" />
      <circle cx="80" cy="90" r="6" fill="#fef3c7" />
      <circle cx="120" cy="90" r="6" fill="#fef3c7" />
      <path d="M70 135 Q100 155 130 135" stroke="#f472b6" stroke-width="8" fill="none" />
      <circle cx="100" cy="35" r="18" fill="#fde047" />
    `),
    unlockedBy: 'story-life',
  },
  {
    id: 'pet:meadow',
    label: 'Meadow Guardian',
    svg: svg(`
      <circle cx="100" cy="100" r="60" fill="#fef9c3" />
      <rect x="70" y="65" width="60" height="60" rx="30" fill="#86efac" />
      <ellipse cx="80" cy="95" rx="11" ry="16" fill="#0f172a" />
      <ellipse cx="120" cy="95" rx="11" ry="16" fill="#0f172a" />
      <path d="M72 140 Q100 165 128 140" stroke="#0f172a" stroke-width="8" fill="none" />
      <circle cx="60" cy="60" r="12" fill="#34d399" />
      <circle cx="140" cy="60" r="12" fill="#34d399" />
    `),
    unlockedBy: 'pet-whisperer',
  },
];
