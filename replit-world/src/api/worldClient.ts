import { API_BASE_URL } from '../config';
import type { WorldSnapshot, WorldSession } from '../state/types';

export interface JoinWorldResponse {
  token: string;
  world: WorldSnapshot;
}

const headers = { 'Content-Type': 'application/json' } as const;

export async function joinWorld(worldCode: string, playerName: string): Promise<WorldSession & { world: WorldSnapshot }> {
  const response = await fetch(`${API_BASE_URL}/api/world/join`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ worldCode, playerName }),
  });
  if (!response.ok) {
    throw new Error(`Join failed: ${response.statusText}`);
  }
  const data = (await response.json()) as JoinWorldResponse;
  return {
    worldCode,
    playerName,
    token: data.token,
    world: data.world,
  };
}

export async function fetchWorld(worldCode: string): Promise<WorldSnapshot> {
  const response = await fetch(`${API_BASE_URL}/api/world/${worldCode}`);
  if (!response.ok) {
    throw new Error('World not found');
  }
  const data = (await response.json()) as { world: WorldSnapshot };
  return data.world;
}

export async function saveWorld(worldCode: string, token: string, world: WorldSnapshot) {
  const response = await fetch(`${API_BASE_URL}/api/world/${worldCode}/state`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ token, world }),
  });
  if (!response.ok) {
    throw new Error('Failed to save world');
  }
  return (await response.json()) as { world: WorldSnapshot };
}
