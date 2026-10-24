import React from 'react';
import { Play, Bookmark } from 'lucide-react';
import spaceInvadersImg from '../assets/images/arcade_space_invaders_1792800671866.jpg';
import pixelRunnerImg from '../assets/images/arcade_pixel_runner_1792800671135.jpg';

export const GameCard = ({
  game,
  onSelect,
  isFavorite,
  onToggleFavorite
}) => {
  // Use specific high-fidelity generated images for supported games
  const getThumbnailImage = () => {
    if (game.id === 'space-invaders') return spaceInvadersImg;
    if (game.id === 'dino-runner') return pixelRunnerImg;
    return null;
  };

  const thumbnail = getThumbnailImage();

  return (
    <div
      onClick={() => onSelect(game)}
      className="group relative flex flex-col bg-[#0f172a] hover:bg-[#131d35] border border-slate-800 hover:border-indigo-500/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/40"
    >
      {/* Visual Thumbnail Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={game.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          // Styled fallback visual with arcade geometry and theme color
          <div
            className="w-full h-full flex flex-col items-center justify-center relative p-4"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${game.color}20 0%, #030712 90%)`
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg"
              style={{
                backgroundColor: `${game.color}30`,
                borderColor: `${game.color}60`,
                borderWidth: '1px',
                color: game.color
              }}
            >
              {game.title.charAt(0)}
            </div>
            <span className="text-[11px] font-mono mt-2 text-slate-400">
              IFrame: {game.aspectRatio}
            </span>
          </div>
        )}

        {/* Favorite Button Overlay */}
        <button
          onClick={onToggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-lg backdrop-blur-md transition-colors ${
            isFavorite
              ? 'bg-amber-500/30 text-amber-300 border border-amber-500/60'
              : 'bg-black/50 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
        </button>

        {/* Hover Play Icon overlay */}
        <div className="absolute inset-0 bg-indigo-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Content (Zero-Pill: Clean unboxed metadata with separators) */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-white text-base tracking-tight group-hover:text-indigo-300 transition-colors truncate">
              {game.title}
            </h3>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Clean unboxed metadata with typographic separators */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono pt-2 border-t border-slate-800/80">
          <span className="text-indigo-400 font-medium">{game.category}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">★ {game.rating.toFixed(1)}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{(game.plays).toLocaleString()} plays</span>
        </div>
      </div>
    </div>
  );
};
