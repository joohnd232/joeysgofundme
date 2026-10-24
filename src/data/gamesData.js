export function resolveGameSrc(src) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  const clean = src.startsWith('/') ? src.slice(1) : src.startsWith('./') ? src.slice(2) : src;
  const base = import.meta.env?.BASE_URL || './';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
}

export const DEFAULT_GAMES = [
  {
    id: '1v1-lol',
    title: '1v1.LOL',
    category: 'Action',
    description: 'Fast-paced competitive 3D building and shooter game. Build platforms, practice box fights, and duel opponents in real time.',
    iframeSrc: './games/1v1.html',
    thumbnail: './assets/aistudio/Screenshot_2026-10-24_125753_16e69d37.png',
    controls: 'WASD to move · Left-click to shoot · Right-click to aim · Space to jump · Shift to crouch · Z/X/C/V to build',
    aspectRatio: '16:9',
    plays: 48200,
    rating: 4.9,
    color: '#3b82f6',
    tags: ['3D', 'Action', 'Multiplayer', 'Shooter', 'Building'],
    featured: true,
    badge: 'Popular'
  }
];

export const CLOAK_PRESETS = [
  {
    id: 'default',
    label: 'Default Arcade',
    title: 'Unblocked Arcade - Free Online Games',
    iconSvg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolygon points='6 3 18 3 22 9 12 22 2 9 6 3'%3E%3C/polygon%3E%3C/svg%3E"
  },
  {
    id: 'classroom',
    label: 'Google Classroom',
    title: 'Classes - Google Classroom',
    iconSvg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='8' fill='%23137333'/%3E%3Cpath fill='%23ea4335' d='M24 14l12 7-12 7-12-7z'/%3E%3Cpath fill='%23fbbc04' d='M16 23v8l8 5 8-5v-8l-8 5z'/%3E%3C/svg%3E"
  },
  {
    id: 'docs',
    label: 'Google Docs',
    title: 'World History Notes - Google Docs',
    iconSvg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%234285F4' d='M29 6H14c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h20c2.2 0 4-1.8 4-4V15l-9-9z'/%3E%3Cpath fill='%23A1C2FA' d='M29 6v9h9'/%3E%3Cpath fill='%23FFF' d='M16 22h16v2H16zm0 5h16v2H16zm0 5h10v2H16z'/%3E%3C/svg%3E"
  },
  {
    id: 'drive',
    label: 'Google Drive',
    title: 'My Drive - Google Drive',
    iconSvg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23FFC107' d='M17 6h14l12 21H29z'/%3E%3Cpath fill='%230066DA' d='M5 27l6-10.5 12 21H11z'/%3E%3Cpath fill='%2300AC47' d='M17 48l6-10.5h20l-6 10.5z'/%3E%3C/svg%3E"
  },
  {
    id: 'canvas',
    label: 'Canvas LMS',
    title: 'Dashboard | Canvas',
    iconSvg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='20' fill='%23E02424'/%3E%3Ccircle cx='24' cy='24' r='9' fill='%23fff'/%3E%3C/svg%3E"
  },
  {
    id: 'desmos',
    label: 'Desmos Calculator',
    title: 'Desmos | Graphing Calculator',
    iconSvg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='8' fill='%232563eb'/%3E%3Cpath stroke='%23fff' stroke-width='4' fill='none' d='M10 34c8-2 14-20 28-20'/%3E%3C/svg%3E"
  },
  {
    id: 'wikipedia',
    label: 'Wikipedia',
    title: 'Cellular respiration - Wikipedia',
    iconSvg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='20' fill='%23fff' stroke='%23000' stroke-width='3'/%3E%3Ctext x='16' y='32' font-family='serif' font-weight='bold' font-size='24' fill='%23000'%3EW%3C/text%3E%3C/svg%3E"
  }
];

const CUSTOM_GAMES_STORAGE_KEY = 'unblocked_custom_games_v1';
const FAVORITES_STORAGE_KEY = 'unblocked_favorites_v1';
const PLAY_COUNTS_STORAGE_KEY = 'unblocked_play_counts_v1';

export function getCustomGames() {
  try {
    const raw = localStorage.getItem(CUSTOM_GAMES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveCustomGame(game) {
  const current = getCustomGames();
  const newGame = {
    id: 'custom-' + Date.now(),
    title: game.title || 'Custom iFrame Game',
    category: game.category || 'Custom',
    description: game.description || 'Custom embedded iFrame',
    iframeSrc: game.iframeSrc,
    controls: game.controls || 'Mouse & Keyboard',
    aspectRatio: game.aspectRatio || '16:9',
    plays: 1,
    rating: 5.0,
    color: game.color || '#6366f1',
    tags: game.tags || ['Custom', 'IFrame'],
    isCustom: true
  };
  const updated = [newGame, ...current];
  localStorage.setItem(CUSTOM_GAMES_STORAGE_KEY, JSON.stringify(updated));
  return newGame;
}

export function deleteCustomGame(id) {
  const current = getCustomGames();
  const updated = current.filter(g => g.id !== id);
  localStorage.setItem(CUSTOM_GAMES_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function getFavoriteIds() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleFavoriteId(id) {
  const current = getFavoriteIds();
  const exists = current.includes(id);
  const updated = exists ? current.filter(x => x !== id) : [...current, id];
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function recordGamePlay(id) {
  try {
    const raw = localStorage.getItem(PLAY_COUNTS_STORAGE_KEY);
    const map = raw ? JSON.parse(raw) : {};
    map[id] = (map[id] || 0) + 1;
    localStorage.setItem(PLAY_COUNTS_STORAGE_KEY, JSON.stringify(map));
  } catch (e) {}
}

export function getPlayCount(id, defaultPlays = 0) {
  try {
    const raw = localStorage.getItem(PLAY_COUNTS_STORAGE_KEY);
    const map = raw ? JSON.parse(raw) : {};
    return (map[id] || 0) + defaultPlays;
  } catch (e) {
    return defaultPlays;
  }
}
