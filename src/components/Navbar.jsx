import React from 'react';
import { EyeOff, ShieldAlert, Code2, Gamepad2 } from 'lucide-react';

export const Navbar = ({
  onNavigateHome,
  onOpenCustomIframe,
  onOpenCloak,
  onTriggerPanic,
  panicKey
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-4 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800">
      {/* Zone 1: Single text element wordmark */}
      <div 
        onClick={onNavigateHome}
        className="flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 group"
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
          <Gamepad2 className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
          Unblocked Arcade
        </span>
      </div>

      {/* Zone 2: Navigation link / custom iframe CTA */}
      <div className="hidden sm:flex items-center gap-4">
        <button
          onClick={onOpenCustomIframe}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] whitespace-nowrap shrink-0"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Custom iFrame</span>
        </button>
      </div>

      {/* Zone 3: 1 primary action area (Stealth Utilities) */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenCustomIframe}
          title="Launch custom iframe"
          className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>iFrame</span>
        </button>

        <button
          onClick={onOpenCloak}
          title="Disguise Tab Title & Favicon (Google Docs, Canvas, etc.)"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <EyeOff className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Tab Cloak</span>
        </button>

        <button
          onClick={onTriggerPanic}
          title={`Instant Panic Screen (Key: ${panicKey.toUpperCase()})`}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Panic Key [{panicKey.toUpperCase()}]</span>
        </button>
      </div>
    </header>
  );
};
