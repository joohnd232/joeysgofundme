import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { TabCloakModal } from './components/TabCloakModal';
import { AddGameModal } from './components/AddGameModal';
import { JsonViewerModal } from './components/JsonViewerModal';
import { DecoyScreen } from './components/DecoyScreen';
import { 
  DEFAULT_GAMES, 
  getCustomGames, 
  saveCustomGame, 
  getFavoriteIds, 
  toggleFavoriteId, 
  recordGamePlay 
} from './data/gamesData';
import { Gamepad2 } from 'lucide-react';

export default function App() {
  const [games, setGames] = useState(() => {
    const custom = getCustomGames();
    return [...custom, ...DEFAULT_GAMES];
  });

  const [favorites, setFavorites] = useState(() => getFavoriteIds());
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [activeGame, setActiveGame] = useState(null);
  const [activeView, setActiveView] = useState('home');

  // Modals & Stealth
  const [isCloakOpen, setIsCloakOpen] = useState(false);
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);
  const [isJsonViewerOpen, setIsJsonViewerOpen] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [panicKey, setPanicKey] = useState(() => localStorage.getItem('unblocked_panic_key') || ']');
  const [activePresetId, setActivePresetId] = useState('default');

  // Fetch /public/games.json on mount to ensure live sync with public JSON
  useEffect(() => {
    fetch('/games.json')
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const custom = getCustomGames();
          setGames([...custom, ...data]);
        }
      })
      .catch(() => {});
  }, []);

  // Panic Key listener (global window event)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === panicKey.toLowerCase()) {
        setIsPanicActive(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panicKey]);

  // Tab cloaking apply
  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    document.title = preset.title;
    const favicon = document.getElementById('app-favicon');
    if (favicon) {
      favicon.href = preset.iconSvg;
    }
  };

  const handlePanicKeyChange = (newKey) => {
    setPanicKey(newKey);
    localStorage.setItem('unblocked_panic_key', newKey);
  };

  const handleSelectGame = (game) => {
    recordGamePlay(game.id);
    // Update plays count locally
    setGames(prev => prev.map(g => g.id === game.id ? { ...g, plays: g.plays + 1 } : g));
    setActiveGame({ ...game, plays: game.plays + 1 });
    setActiveView('game');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (gameId, e) => {
    if (e) e.stopPropagation();
    const updated = toggleFavoriteId(gameId);
    setFavorites(updated);
  };

  const handleAddGame = (gameData) => {
    const newGame = saveCustomGame(gameData);
    setGames(prev => [newGame, ...prev]);
    handleSelectGame(newGame);
  };

  const handleRandomPlay = () => {
    if (games.length === 0) return;
    const rand = games[Math.floor(Math.random() * games.length)];
    handleSelectGame(rand);
  };

  // Categories list
  const categories = [
    'All',
    'Favorites',
    'Arcade',
    'Action',
    'Puzzle',
    'Retro',
    'Runner',
    'Sports'
  ];

  // Filter & Sort games
  const filteredGames = useMemo(() => {
    let result = games.filter(g => {
      // Category filter
      if (activeCategory === 'Favorites') {
        if (!favorites.includes(g.id)) return false;
      } else if (activeCategory !== 'All') {
        if (g.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = g.title.toLowerCase().includes(q);
        const matchCat = g.category.toLowerCase().includes(q);
        const matchTags = g.tags.some(t => t.toLowerCase().includes(q));
        const matchDesc = g.description.toLowerCase().includes(q);
        if (!matchTitle && !matchCat && !matchTags && !matchDesc) return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'popular') return b.plays - a.plays;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [games, activeCategory, searchQuery, sortBy, favorites]);

  // If Panic Key is active, immediately render the decoy article
  if (isPanicActive) {
    return <DecoyScreen onExit={() => setIsPanicActive(false)} panicKey={panicKey} />;
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-600/30 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => {
          if (view === 'favorites') {
            setActiveCategory('Favorites');
            setActiveView('home');
          } else {
            setActiveView(view);
          }
        }}
        onOpenCloak={() => setIsCloakOpen(true)}
        onOpenAddGame={() => setIsAddGameOpen(true)}
        onOpenJsonViewer={() => setIsJsonViewerOpen(true)}
        onTriggerPanic={() => setIsPanicActive(true)}
        favoritesCount={favorites.length}
        panicKey={panicKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeView === 'game' && activeGame ? (
          <GamePlayer
            game={activeGame}
            onBack={() => setActiveView('home')}
            isFavorite={favorites.includes(activeGame.id)}
            onToggleFavorite={() => handleToggleFavorite(activeGame.id)}
            onPlayNext={handleRandomPlay}
          />
        ) : (
          <>
            {/* Hero Showcase (only if on 'All' category and no search active) */}
            {activeCategory === 'All' && !searchQuery && (
              <HeroBanner
                onRandomPlay={handleRandomPlay}
                onOpenAddGame={() => setIsAddGameOpen(true)}
                onOpenCloak={() => setIsCloakOpen(true)}
                totalGames={games.length}
              />
            )}

            {/* Category Filter and Search Toolbar */}
            <CategoryFilterBar
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalFiltered={filteredGames.length}
            />

            {/* Empty State */}
            {filteredGames.length === 0 ? (
              <div className="p-12 text-center bg-[#0f172a] border border-slate-800 rounded-2xl space-y-4 my-8">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">No games found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    {activeCategory === 'Favorites' 
                      ? 'You haven\'t bookmarked any favorites yet. Click the bookmark icon on any game card to add it here!'
                      : 'Try adjusting your search terms or category filters.'}
                  </p>
                </div>
                {activeCategory === 'Favorites' ? (
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white rounded-lg transition-colors"
                  >
                    Browse All Games
                  </button>
                ) : (
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-lg transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            ) : (
              /* Games Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onSelect={handleSelectGame}
                    isFavorite={favorites.includes(game.id)}
                    onToggleFavorite={(e) => handleToggleFavorite(game.id, e)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b12] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Unblocked Arcade</span>
            <span>·</span>
            <span>All games embedded via IFrame JSON specification</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setIsCloakOpen(true)} className="hover:text-white transition-colors">
              Tab Disguise
            </button>
            <span>·</span>
            <button onClick={() => setIsJsonViewerOpen(true)} className="hover:text-white transition-colors">
              games.json
            </button>
            <span>·</span>
            <button onClick={() => setIsAddGameOpen(true)} className="hover:text-white transition-colors">
              Add IFrame
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TabCloakModal
        isOpen={isCloakOpen}
        onClose={() => setIsCloakOpen(false)}
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
        panicKey={panicKey}
        onChangePanicKey={handlePanicKeyChange}
      />

      <AddGameModal
        isOpen={isAddGameOpen}
        onClose={() => setIsAddGameOpen(false)}
        onAddGame={handleAddGame}
      />

      <JsonViewerModal
        isOpen={isJsonViewerOpen}
        onClose={() => setIsJsonViewerOpen(false)}
        games={games}
      />
    </div>
  );
}
