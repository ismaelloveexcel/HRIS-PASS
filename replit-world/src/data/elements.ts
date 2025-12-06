import type { ElementDefinition, ElementRecipe } from '../state/types';

const icon = (content: string) =>
  `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;

export const baseElements: ElementDefinition[] = [
  {
    id: 'fire',
    label: 'Fire',
    description: 'Warmth from campfires, cinema popcorn, and lantern dreams.',
    icon: icon('<path d="M32 8 L44 28 L32 56 L20 28 Z" fill="#ff6b6b" />'),
  },
  {
    id: 'water',
    label: 'Water',
    description: 'Collected from watering trees, ponds, and rainy moods.',
    icon: icon('<path d="M32 10 C32 10 12 34 12 42 C12 54 22 60 32 60 C42 60 52 54 52 42 C52 34 32 10 32 10 Z" fill="#60a5fa" />'),
  },
  {
    id: 'earth',
    label: 'Earth',
    description: 'Soil from veggie patches and flower beds.',
    icon: icon('<circle cx="32" cy="36" r="20" fill="#c08457" />'),
  },
  {
    id: 'air',
    label: 'Air',
    description: 'Breezes from kite days and open windows.',
    icon: icon('<circle cx="20" cy="26" r="8" fill="#c7d2fe" /><circle cx="36" cy="20" r="12" fill="#a5b4fc" opacity="0.7" /><circle cx="46" cy="34" r="10" fill="#e0e7ff" />'),
  },
  {
    id: 'life',
    label: 'Life',
    description: 'Earned by caring for pets and feeding garden friends.',
    icon: icon('<circle cx="32" cy="32" r="18" fill="#34d399" /><path d="M32 16 L38 26 L32 22 L26 26 Z" fill="#bbf7d0" />'),
  },
];

export const advancedElements: ElementDefinition[] = [
  {
    id: 'clay',
    label: 'Clay',
    description: 'Soft earth ready to be sculpted into keepsakes.',
    icon: icon('<ellipse cx="32" cy="40" rx="20" ry="12" fill="#d97706" />'),
    discoveredVia: 'earth+water',
  },
  {
    id: 'wood',
    label: 'Living Wood',
    description: 'Trunks and planks gathered from thriving trees.',
    icon: icon('<rect x="26" y="16" width="12" height="32" rx="6" fill="#8b5a2b" /><circle cx="32" cy="16" r="10" fill="#22c55e" />'),
    discoveredVia: 'earth+life',
  },
  {
    id: 'mist',
    label: 'Morning Mist',
    description: 'Cool vapor swirling over ponds at sunrise.',
    icon: icon('<path d="M12 36 Q22 28 32 36 T52 36" stroke="#bae6fd" stroke-width="8" fill="none" stroke-linecap="round" />'),
    discoveredVia: 'air+water',
  },
  {
    id: 'light',
    label: 'Light',
    description: 'Collected from projectors, lanterns, and morning rays.',
    icon: icon('<circle cx="32" cy="32" r="18" fill="#fde047" /><circle cx="32" cy="32" r="10" fill="#fff7c4" />'),
    discoveredVia: 'fire+air',
  },
  {
    id: 'story-spark',
    label: 'Story Spark',
    description: 'Appears after movie nights and bedtime tales.',
    icon: icon('<path d="M32 10 L38 26 L56 28 L42 38 L48 54 L32 44 L16 54 L22 38 L8 28 L26 26 Z" fill="#f472b6" />'),
    discoveredVia: 'fire+life',
  },
  {
    id: 'canvas',
    label: 'Canvas',
    description: 'A fresh surface waiting for doodles.',
    icon: icon('<rect x="16" y="12" width="32" height="40" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="4" />'),
    discoveredVia: 'earth+air',
  },
  {
    id: 'ember',
    label: 'Ember Core',
    description: 'Lingering spark collected from campfires.',
    icon: icon('<circle cx="32" cy="32" r="16" fill="#fb923c" />'),
    discoveredVia: 'fire+clay',
  },
  {
    id: 'glow-ink',
    label: 'Glow Ink',
    description: 'Shimmering ink for projector doodles.',
    icon: icon('<rect x="18" y="18" width="28" height="36" rx="6" fill="#6366f1" /><rect x="24" y="24" width="16" height="24" rx="4" fill="#c7d2fe" />'),
    discoveredVia: 'light+mist',
  },
  {
    id: 'ramadan-glow',
    label: 'Ramadan Glow',
    description: 'Festival light collected during lantern week.',
    icon: icon('<path d="M32 8 L40 28 L32 48 L24 28 Z" fill="#fde047" /><circle cx="32" cy="28" r="12" fill="#fef9c3" />'),
  },
  {
    id: 'frostfire',
    label: 'Frostfire',
    description: 'Winter aurora flame used for neon roofs.',
    icon: icon('<path d="M32 10 C42 26 44 36 32 54 C20 36 22 26 32 10 Z" fill="#67e8f9" /><path d="M32 20 C38 30 39 36 32 48" stroke="#a78bfa" stroke-width="4" fill="none" />'),
  },
];

export const elementRecipes: ElementRecipe[] = [
  {
    id: 'earth-water',
    inputs: ['earth', 'water'],
    result: {
      type: 'element',
      id: 'clay',
      label: 'Clay',
      description: 'Use it to sculpt fountains and gnomes.',
    },
    lore: 'Mud pie science leads to sturdy clay bricks.',
  },
  {
    id: 'earth-life',
    inputs: ['earth', 'life'],
    result: {
      type: 'element',
      id: 'wood',
      label: 'Living Wood',
      description: 'Branches perfect for lantern frames.',
    },
    lore: 'You whispered to the trees and they offered a branch.',
  },
  {
    id: 'air-water',
    inputs: ['air', 'water'],
    result: {
      type: 'element',
      id: 'mist',
      label: 'Morning Mist',
      description: 'Needed for nightfall moods and ponds.',
    },
    lore: 'Fog rolls in when dawn meets a cozy pond.',
  },
  {
    id: 'fire-air',
    inputs: ['fire', 'air'],
    result: {
      type: 'element',
      id: 'light',
      label: 'Light',
      description: 'Collect to unlock mood halos.',
    },
    lore: 'A glowing ember caught a breeze and became a beam.',
  },
  {
    id: 'fire-life',
    inputs: ['fire', 'life'],
    result: {
      type: 'element',
      id: 'story-spark',
      label: 'Story Spark',
      description: 'Fuel murals and co-op rituals.',
    },
    lore: 'Sharing tales by the projector births a Story Spark.',
  },
  {
    id: 'earth-air',
    inputs: ['earth', 'air'],
    result: {
      type: 'element',
      id: 'canvas',
      label: 'Canvas',
      description: 'Blank wall ready for murals.',
    },
    lore: 'Wind-carved sandstone turns into a smooth canvas.',
  },
  {
    id: 'fire-wood',
    inputs: ['fire', 'wood'],
    result: {
      type: 'decor',
      id: 'forge:lantern',
      label: 'Starlight Lantern',
      description: 'Unlocks glowing lantern decor indoors and outdoors.',
    },
    lore: 'Fire wrapped around wood becomes a lantern to guide walks.',
  },
  {
    id: 'clay-life',
    inputs: ['clay', 'life'],
    result: {
      type: 'garden',
      id: 'garden-gnome',
      label: 'Garden Gnome',
      description: 'New decorative companion that raises pollinator visits.',
    },
    lore: 'Clay with a heartbeat smiles and guards the veggie patch.',
  },
  {
    id: 'story-canvas',
    inputs: ['story-spark', 'canvas'],
    result: {
      type: 'decor',
      id: 'forge:mural',
      label: 'Story Mural',
      description: 'Unlocks a mural wall for collaborative doodles.',
    },
    lore: 'Every spark wants a wall to live on.',
  },
  {
    id: 'wood-light',
    inputs: ['wood', 'light'],
    result: {
      type: 'prop',
      id: 'prop:campfire',
      label: 'Glow Campfire',
      description: 'An interactive firepit for stories.',
    },
    lore: 'Warm wood plus light equals the coziest campfire.',
  },
  {
    id: 'story-light',
    inputs: ['story-spark', 'light'],
    result: {
      type: 'prop',
      id: 'prop:projector',
      label: 'Doodle Projector',
      description: 'Sketch directly onto cinema walls.',
    },
    lore: 'Stories beamed through light become living movies.',
  },
  {
    id: 'clay-canvas',
    inputs: ['clay', 'canvas'],
    result: {
      type: 'prop',
      id: 'prop:scrapbook',
      label: 'Memory Scrapbook',
      description: 'Paste photos, stickers, and notes together.',
    },
    lore: 'Soft clay binds pages into a living book.',
  },
  {
    id: 'ember-life',
    inputs: ['ember', 'life'],
    result: {
      type: 'decor',
      id: 'glow-roof',
      label: 'Glow Roof Accent',
      description: 'Unlocks the neon roofline.',
    },
    lore: 'An ember blessed with care becomes a floating aurora.',
  },
  {
    id: 'ramadan-glow-light',
    inputs: ['ramadan-glow', 'light'],
    result: {
      type: 'mood',
      id: 'mood:festival',
      label: 'Festival Glow',
      description: 'Lantern-lit ambience for evening hangs.',
    },
    lore: 'Holiday light mixing creates a festival sky.',
  },
  {
    id: 'frostfire-mist',
    inputs: ['frostfire', 'mist'],
    result: {
      type: 'decor',
      id: 'forge:icicle-path',
      label: 'Icicle Path',
      description: 'Winter path skin that sparkles.',
    },
    lore: 'Frostfire cools mist into shimmering glass stones.',
  },
  {
    id: 'mist-light',
    inputs: ['mist', 'light'],
    result: {
      type: 'mood',
      id: 'mood:nightfall',
      label: 'Nightfall Mood',
      description: 'Unlocks bioluminescent lighting and sky gradients.',
    },
    lore: 'Fog mixed with starlight becomes a hush over the home.',
  },
  {
    id: 'mist-life',
    inputs: ['mist', 'life'],
    result: {
      type: 'garden',
      id: 'bee-spiral',
      label: 'Bee Spiral',
      description: 'Unlocks a glowing hive habitat.',
    },
    lore: 'Morning mist keeps pollinators dancing.',
  },
  {
    id: 'story-life',
    inputs: ['story-spark', 'life'],
    result: {
      type: 'pet',
      id: 'pet:luma',
      label: 'Luma Skin',
      description: 'Gives your pet a bioluminescent variant.',
    },
    lore: 'Stories told with care wrap the pet in ethereal light.',
  },
];
