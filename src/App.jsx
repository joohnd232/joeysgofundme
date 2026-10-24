import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { TabCloakModal } from './components/TabCloakModal';
import { CustomIframeModal } from './components/CustomIframeModal';
import { DecoyScreen } from './components/DecoyScreen';
import { 
  DEFAULT_GAMES, 
  getCustomGames, 
  saveCustomGame, 
  deleteCustomGame,
  getFavoriteIds, 
  toggleFavoriteId, 
  recordGamePlay,
  resolveGameSrc
} from './data/gamesData';
import { Code2, Play, Globe, Sparkles } from 'lucide-react';

export default function App() {
  const [games, setGames] = useState(() => {
    const custom = getCustomGames();
    return [...custom, ...DEFAULT_GAMES];
  });

  const [favorites, setFavorites] = useState(() => getFavoriteIds());
  const [activeGame, setActiveGame] = useState(null);
  const [quickInput, setQuickInput] = useState('');

  // Modals & Stealth
  const [isCustomIframeOpen, setIsCustomIframeOpen] = useState(false);
  const [isCloakOpen, setIsCloakOpen] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [panicKey, setPanicKey] = useState(() => localStorage.getItem('unblocked_panic_key') || ']');
  const [activePresetId, setActivePresetId] = useState('default');

  // Fetch games.json on mount to sync any user-placed games in games.json
  useEffect(() => {
    fetch(resolveGameSrc('games.json'))
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
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
    setGames(prev => prev.map(g => g.id === game.id ? { ...g, plays: (g.plays || 0) + 1 } : g));
    setActiveGame({ ...game, plays: (game.plays || 0) + 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (gameId, e) => {
    if (e) e.stopPropagation();
    const updated = toggleFavoriteId(gameId);
    setFavorites(updated);
  };

  const handleDeleteGame = (gameId) => {
    deleteCustomGame(gameId);
    setGames(prev => prev.filter(g => g.id !== gameId));
  };

  const handleLaunchCustomGame = (gameData) => {
    if (gameData.save) {
      const saved = saveCustomGame(gameData);
      setGames(prev => [saved, ...prev]);
      handleSelectGame(saved);
    } else {
      const sessionGame = {
        id: 'session-' + Date.now(),
        title: gameData.title || 'Custom iFrame',
        category: 'Custom',
        description: 'Temporary custom iFrame session',
        iframeSrc: gameData.iframeSrc,
        controls: 'Mouse and Keyboard',
        aspectRatio: '16:9',
        plays: 1,
        rating: 5.0,
        color: '#6366f1',
        tags: ['Custom', 'IFrame']
      };
      handleSelectGame(sessionGame);
    }
  };

  const handleQuickLaunch = (e) => {
    e.preventDefault();
    const raw = quickInput.trim();
    if (!raw) return;

    let finalSrc = raw;
    const srcMatch = raw.match(/src=["'](.*?)["']/i);
    if (srcMatch && srcMatch[1]) {
      finalSrc = srcMatch[1];
    }

    handleLaunchCustomGame({
      title: 'Custom iFrame Game',
      iframeSrc: finalSrc,
      save: true
    });
    setQuickInput('');
  };

  // If Panic Key is active, immediately render the decoy article
  if (isPanicActive) {
    return <DecoyScreen onExit={() => setIsPanicActive(false)} panicKey={panicKey} />;
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-600/30 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        onNavigateHome={() => setActiveGame(null)}
        onOpenCustomIframe={() => setIsCustomIframeOpen(true)}
        onOpenCloak={() => setIsCloakOpen(true)}
        onTriggerPanic={() => setIsPanicActive(true)}
        panicKey={panicKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeGame ? (
          <GamePlayer
            game={activeGame}
            onBack={() => setActiveGame(null)}
            isFavorite={favorites.includes(activeGame.id)}
            onToggleFavorite={() => handleToggleFavorite(activeGame.id)}
            onPlayNext={() => {
              if (games.length > 0) {
                const rand = games[Math.floor(Math.random() * games.length)];
                handleSelectGame(rand);
              }
            }}
          />
        ) : (
          <div className="space-y-8">
            {/* Hero Showcase */}
            <HeroBanner
              onOpenCustomIframe={() => setIsCustomIframeOpen(true)}
              onOpenCloak={() => setIsCloakOpen(true)}
            />

            {/* Quick Inline Custom iFrame Launcher */}
            <div className="p-6 bg-[#0f172a] border border-slate-800 rounded-2xl shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    Quick Custom iFrame Launcher
                  </h2>
                </div>
                <span className="text-xs text-slate-400">
                  Enter any game URL or &lt;iframe&gt; code to play instantly
                </span>
              </div>

              <form onSubmit={handleQuickLaunch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    placeholder='e.g. https://example.com/game or <iframe src="..."></iframe>'
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] shrink-0"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Launch iFrame</span>
                </button>
              </form>
            </div>

            {/* Saved Custom Games Section */}
            {games.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Your Custom Games ({games.length})
                  </h3>
                  <button
                    onClick={() => setIsCustomIframeOpen(true)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    + Add Another
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {games.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onSelect={handleSelectGame}
                      isFavorite={favorites.includes(game.id)}
                      onToggleFavorite={(e) => handleToggleFavorite(game.id, e)}
                      onDelete={handleDeleteGame}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Clean Empty State */
              <div className="p-8 text-center bg-[#0c1222]/60 border border-dashed border-slate-800 rounded-2xl space-y-3">
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  No games stored yet. Paste a game URL or embed code in the launcher above, or click the <strong>Custom iFrame</strong> button in the navigation bar.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b12] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Unblocked Arcade</span>
            <span>·</span>
            <span>Client-side Sandboxed iFrame Portal</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setIsCustomIframeOpen(true)} className="hover:text-white transition-colors">
              Custom iFrame
            </button>
            <span>·</span>
            <button onClick={() => setIsCloakOpen(true)} className="hover:text-white transition-colors">
              Tab Disguise
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

      <CustomIframeModal
        isOpen={isCustomIframeOpen}
        onClose={() => setIsCustomIframeOpen(false)}
        onLaunchGame={handleLaunchCustomGame}
      />
    </div>
  );
}
