const fallbackApi = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}` : 'http://localhost:4000');

export const API_BASE_URL = fallbackApi.replace(/\/$/, '');
export const SOCKET_URL = API_BASE_URL;
export const HYPERBEAM_KEY = import.meta.env.VITE_HYPERBEAM_KEY || '';
