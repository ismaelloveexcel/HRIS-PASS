const fallbackApi = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000' : window.location.origin);

export const API_BASE_URL = fallbackApi.replace(/\/$/, '');
export const SOCKET_URL = API_BASE_URL;
