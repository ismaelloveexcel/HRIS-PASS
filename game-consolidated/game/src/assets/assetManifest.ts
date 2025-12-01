export type AssetKind = 'board' | 'token' | 'effect' | 'environment';

export interface AssetPlaceholder {
  id: string;
  kind: AssetKind;
  label: string;
  description: string;
  status: 'mocked' | 'captured' | 'todo';
  estimatedSizeMB: number;
  notes?: string;
}

export const ASSET_MANIFEST: AssetPlaceholder[] = [
  {
    id: 'board-hologram-v1',
    kind: 'board',
    label: 'Floating Glass Board',
    description: 'Full 3D mesh with emissive shader pass and baked AO map.',
    status: 'todo',
    estimatedSizeMB: 18,
    notes: 'Requires UV unwrap + lightmap for Unity URP.',
  },
  {
    id: 'token-nova-v1',
    kind: 'token',
    label: 'Contestant Token · Nova',
    description: 'Stylized pawn with holographic trail rig.',
    status: 'mocked',
    estimatedSizeMB: 4,
    notes: 'Currently rendered as 2D disc; mesh pending scan.',
  },
  {
    id: 'token-orion-v1',
    kind: 'token',
    label: 'Contestant Token · Orion',
    description: 'Variant pawn with animated emissive veins.',
    status: 'mocked',
    estimatedSizeMB: 4,
  },
  {
    id: 'effect-shark-vfx',
    kind: 'effect',
    label: 'Shark Alert Volumetric',
    description: 'GPU particle system for dorsal-fin ribbon trail.',
    status: 'todo',
    estimatedSizeMB: 6,
  },
  {
    id: 'environment-neon-sky',
    kind: 'environment',
    label: 'Skybox Gradient Pack',
    description: '4× 8k HDRIs for sunrise/daylight/golden/neon cycles.',
    status: 'captured',
    estimatedSizeMB: 64,
    notes: 'Waiting on baking + tone mapping before import.',
  },
];
