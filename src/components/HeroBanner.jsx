import React from 'react';
import { Play, Sparkles, PlusCircle, EyeOff, Cpu } from 'lucide-react';
import heroImgPath from '../assets/images/arcade_hero_banner_1792800669964.jpg';

export const HeroBanner = ({
  onRandomPlay,
  onOpenAddGame,
  onOpenCloak,
  totalGames
}) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#0c1222] shadow-2xl mb-8">
      {/* Background Graphic with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImgPath}
          alt="Arcade Portal Banner"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter blur-[0.5px]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090d16] via-[#090d16]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 sm:p-10 max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>IFrame Sandboxed Arcade Hub</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
          Play Pure Unblocked Games Instantly
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
          Clean client-side arcade games stored as fast, isolated IFrames inside a structured JSON database. Zero lag, no external tracking, with built-in tab disguises and instant panic keys.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onRandomPlay}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Quick Play Random</span>
          </button>

          <button
            onClick={onOpenAddGame}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold rounded-lg border border-slate-700 transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-indigo-400" />
            <span>Add Custom IFrame</span>
          </button>

          <button
            onClick={onOpenCloak}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium rounded-lg border border-slate-800 transition-colors"
          >
            <EyeOff className="w-4 h-4 text-slate-400" />
            <span>Tab Disguise</span>
          </button>
        </div>

        {/* Feature Strips (No pills - clean unboxed metadata with separators) */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs text-slate-400 border-t border-slate-800/80">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <strong className="font-semibold text-white">{totalGames}</strong> Games in JSON
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>100% Client-Side IFrames</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Zero Server Dependencies</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Stealth Panic Protection</span>
        </div>
      </div>
    </div>
  );
};
