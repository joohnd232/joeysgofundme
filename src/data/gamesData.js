export const DEFAULT_GAMES = [
  {
    id: 'snake',
    title: 'Snake Classic',
    category: 'Retro',
    description: 'Devour glowing food and grow your snake while steering clear of walls and your own tail.',
    iframeSrc: '/games/snake.html',
    controls: 'Arrow Keys or WASD to navigate. Space to pause.',
    aspectRatio: '1:1',
    plays: 18420,
    rating: 4.9,
    color: '#10b981',
    tags: ['Classic', 'Retro', 'Arcade', 'Singleplayer'],
    featured: true,
    badge: 'Popular'
  },
  {
    id: 'tetris',
    title: 'Block Drop (Tetris)',
    category: 'Puzzle',
    description: 'Stack falling tetrominoes and clear lines before the matrix overflows.',
    iframeSrc: '/games/tetris.html',
    controls: 'Arrow Keys / WASD: Move/Rotate. Space: Hard Drop. C: Hold.',
    aspectRatio: '4:3',
    plays: 24900,
    rating: 5.0,
    color: '#8b5cf6',
    tags: ['Puzzle', 'Brain', 'Retro', 'Endless'],
    featured: true,
    badge: 'Top Rated'
  },
  {
    id: 'space-invaders',
    title: 'Galactic Guardian',
    category: 'Action',
    description: 'Pilot your starship, blast descending alien armada waves, and take cover behind bunkers.',
    iframeSrc: '/games/space-invaders.html',
    controls: 'Left / Right (A / D) to steer. Space to fire cannons.',
    aspectRatio: '4:3',
    plays: 15830,
    rating: 4.8,
    color: '#06b6d4',
    tags: ['Action', 'Shooter', 'Retro', 'Space'],
    featured: true,
    badge: 'Action Pick'
  },
  {
    id: 'flappy',
    title: 'Flappy Flyer',
    category: 'Arcade',
    description: 'Navigate tight gaps between green obstacles with gentle wing flaps and precise timing.',
    iframeSrc: '/games/flappy.html',
    controls: 'Click / Tap screen or Spacebar to flap.',
    aspectRatio: '9:14',
    plays: 31200,
    rating: 4.7,
    color: '#f59e0b',
    tags: ['Arcade', 'Skill', 'Casual', 'Mobile Friendly'],
    featured: true,
    badge: 'Viral Hit'
  },
  {
    id: '2048',
    title: '2048 Arcade',
    category: 'Puzzle',
    description: 'Slide numbered tiles across the 4x4 board to merge identical numbers until reaching 2048.',
    iframeSrc: '/games/2048.html',
    controls: 'Arrow keys or touch swipe in any direction.',
    aspectRatio: '1:1',
    plays: 22100,
    rating: 4.9,
    color: '#eab308',
    tags: ['Numbers', 'Puzzle', 'Logic', 'Strategy'],
    featured: false,
    badge: 'Logic'
  },
  {
    id: 'dino-runner',
    title: 'Night Runner',
    category: 'Runner',
    description: 'Dash through a neon synthwave cityscape, jumping hurdles and ducking under aerial drones.',
    iframeSrc: '/games/dino-runner.html',
    controls: 'Space / Up: Jump. Down / S: Duck.',
    aspectRatio: '16:9',
    plays: 27400,
    rating: 4.8,
    color: '#f43f5e',
    tags: ['Runner', 'Endless', 'Reflex', 'Synthwave'],
    featured: true,
    badge: 'Endless'
  },
  {
    id: 'breakout',
    title: 'Brick Smasher DX',
    category: 'Arcade',
    description: 'Bounce the steel ball against colorful multi-tiered brick walls with your responsive paddle.',
    iframeSrc: '/games/breakout.html',
    controls: 'Mouse Move or Left/Right Arrow keys to steer paddle.',
    aspectRatio: '4:3',
    plays: 12800,
    rating: 4.6,
    color: '#ec4899',
    tags: ['Breakout', 'Arcade', 'Classic', 'Skill'],
    featured: false,
    badge: 'Arcade'
  },
  {
    id: 'pong',
    title: 'Retro Pong DX',
    category: 'Sports',
    description: 'The grandfather of video games! Challenge smart computer AI or play 2-Player local co-op.',
    iframeSrc: '/games/pong.html',
    controls: 'P1: W/S or Up/Down. P2: Up/Down in 2-Player mode.',
    aspectRatio: '16:10',
    plays: 11300,
    rating: 4.7,
    color: '#6366f1',
    tags: ['Sports', '2-Player', 'Retro', 'Competitive'],
    featured: false,
    badge: '2-Player'
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper Classic',
    category: 'Puzzle',
    description: 'Uncover numbers, calculate mine distributions, and flag all hidden charges safely.',
    iframeSrc: '/games/minesweeper.html',
    controls: 'Left-Click: Reveal cell. Right-Click: Place flag.',
    aspectRatio: '1:1',
    plays: 14200,
    rating: 4.7,
    color: '#14b8a6',
    tags: ['Minesweeper', 'Logic', 'Strategy', 'Classic'],
    featured: false,
    badge: 'Brain'
  },
  {
    id: 'pacmaze',
    title: 'Pac-Maze Runner',
    category: 'Retro',
    description: 'Chomp through labyrinth dots, snag power energizers, and turn the tables on roaming ghosts.',
    iframeSrc: '/games/pacmaze.html',
    controls: 'Arrow keys or WASD to navigate maze corridors.',
    aspectRatio: '1:1',
    plays: 19500,
    rating: 4.9,
    color: '#eab308',
    tags: ['Maze', 'Retro', 'Arcade', 'Classic'],
    featured: false,
    badge: 'Classic'
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
    ...game,
    id: 'custom-' + Date.now(),
    plays: 1,
    rating: 5.0,
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
}

export function getFavoriteIds() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ['snake', 'tetris', 'dino-runner'];
  } catch (e) {
    return ['snake', 'tetris'];
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

export function getPlayCount(id, defaultPlays) {
  try {
    const raw = localStorage.getItem(PLAY_COUNTS_STORAGE_KEY);
    const map = raw ? JSON.parse(raw) : {};
    return (map[id] || 0) + defaultPlays;
  } catch (e) {
    return defaultPlays;
  }
}
