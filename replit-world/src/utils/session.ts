import type { WorldSession } from '../state/types';

const KEY = 'world-session';

export const loadSession = (): WorldSession | null => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as WorldSession;
  } catch (error) {
    console.warn('Failed to parse session', error);
    return null;
  }
};

export const saveSession = (session: WorldSession) => {
  localStorage.setItem(KEY, JSON.stringify(session));
};

export const clearSession = () => {
  localStorage.removeItem(KEY);
};
