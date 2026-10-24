import React from 'react';
import { X, Check, Shield, KeyRound } from 'lucide-react';
import { CLOAK_PRESETS } from '../data/gamesData';

export const TabCloakModal = ({
  isOpen,
  onClose,
  activePresetId,
  onSelectPreset,
  panicKey,
  onChangePanicKey
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-lg rounded-xl shadow-2xl p-6 text-slate-100 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold">Stealth & Tab Cloaking</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">
            Select Browser Tab Disguise
          </label>
          <p className="text-xs text-slate-400 mb-3">
            Changes your browser tab's title and favicon to blend into school or work environments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CLOAK_PRESETS.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset)}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <img
                    src={preset.iconSvg}
                    alt={preset.label}
                    className="w-5 h-5 object-contain shrink-0 rounded"
                  />
                  <div className="truncate flex-1">
                    <div className="text-xs font-semibold">{preset.label}</div>
                    <div className="text-[11px] text-slate-400 truncate">{preset.title}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Panic Key Configuration
              </span>
            </div>
            <span className="text-xs text-rose-400 font-mono font-bold">
              Current: [{panicKey.toUpperCase()}]
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Pressing this key instantly hides the arcade and displays an educational Wikipedia biology article.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Set key:</span>
            {[']', 'Escape', 'F4', '`', 'q'].map((k) => (
              <button
                key={k}
                onClick={() => onChangePanicKey(k)}
                className={`px-3 py-1.5 text-xs font-mono font-semibold rounded border transition-colors ${
                  panicKey === k
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {k === 'Escape' ? 'Esc' : k}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
