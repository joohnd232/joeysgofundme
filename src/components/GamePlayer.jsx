import React, { useRef, useState } from 'react';
import { 
  ArrowLeft, Maximize2, RotateCcw, Bookmark, 
  ExternalLink, Gamepad2, Sparkles, Layers, Code
} from 'lucide-react';
import { resolveGameSrc } from '../data/gamesData';

export const GamePlayer = ({
  game,
  onBack,
  isFavorite,
  onToggleFavorite,
  onPlayNext
}) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [isTheater, setIsTheater] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const resolvedSrc = resolveGameSrc(game.iframeSrc);

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleReload = () => {
    setIframeKey(k => k + 1);
  };

  const handleAboutBlankCloak = () => {
    try {
      const fullUrl = new URL(resolvedSrc, window.location.href).href;
      const win = window.open('about:blank', '_blank');
      if (win) {
        win.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${document.title}</title>
            <style>
              body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #000; }
              iframe { border: none; width: 100%; height: 100%; }
            </style>
          </head>
          <body>
            <iframe src="${fullUrl}" allowfullscreen></iframe>
          </body>
          </html>
        `);
        win.document.close();
      }
    } catch (e) {
      window.open(resolvedSrc, '_blank');
    }
  };

  return (
    <div className={`w-full mx-auto space-y-4 pb-12 transition-all ${isTheater ? 'max-w-[1400px]' : 'max-w-5xl'}`}>
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#0f172a] border border-slate-800 rounded-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Arcade Lobby</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">{game.title}</h1>
              <span className="text-xs text-slate-400 font-medium">·</span>
              <span className="text-xs text-indigo-400 font-medium">{game.category}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="tabular-nums">★ {game.rating.toFixed(1)}</span>
              <span>·</span>
              <span className="tabular-nums">{(game.plays).toLocaleString()} Plays</span>
              <span>·</span>
              <span className="text-slate-400">JSON IFrame: {game.iframeSrc}</span>
            </div>
          </div>
        </div>

        {/* Player Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFavorite}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              isFavorite
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            onClick={handleReload}
            title="Reload game frame"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reload</span>
          </button>

          <button
            onClick={() => setIsTheater(!isTheater)}
            title="Toggle Theater Mode"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              isTheater
                ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Theater</span>
          </button>

          <button
            onClick={handleFullscreen}
            title="Full Screen View"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen</span>
          </button>

          <button
            onClick={handleAboutBlankCloak}
            title="Open in about:blank cloaked tab"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Cloaked Tab</span>
          </button>
        </div>
      </div>

      {/* IFrame Viewport Stage */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden bg-black border-2 border-slate-800 shadow-2xl flex items-center justify-center min-h-[520px] max-h-[82vh]"
      >
        <iframe
          key={iframeKey}
          ref={iframeRef}
          src={resolvedSrc}
          title={game.title}
          allow="autoplay; fullscreen; pointer-lock; camera; microphone; display-capture; clipboard-read; clipboard-write"
          sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-pointer-lock allow-storage-access-by-user-activation"
          className="w-full h-full min-h-[580px] border-none bg-transparent block"
        />
      </div>

      {/* Game Details & Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Controls Info */}
        <div className="p-4 bg-[#0f172a] border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            <Gamepad2 className="w-4 h-4" />
            <span>Game Controls</span>
          </div>
          <p className="text-sm font-mono text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            {game.controls}
          </p>
        </div>

        {/* Description */}
        <div className="p-4 bg-[#0f172a] border border-slate-800 rounded-xl space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            About Game
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {game.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-500">
            {game.tags.map((tag, i) => (
              <span key={tag}>
                {tag}{i < game.tags.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* JSON Spec & Fast Next */}
        <div className="p-4 bg-[#0f172a] border border-slate-800 rounded-xl flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Code className="w-3.5 h-3.5 text-slate-500" />
              <span>IFrame Spec in JSON</span>
            </div>
            <div className="text-xs font-mono text-slate-400 truncate">
              src: <span className="text-indigo-300">{game.iframeSrc}</span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              ratio: <span className="text-slate-200">{game.aspectRatio}</span>
            </div>
          </div>

          <button
            onClick={onPlayNext}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-700"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Play Next Random Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};
