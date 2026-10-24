import React, { useState } from 'react';
import { X, Play, Code2, Globe, Sparkles } from 'lucide-react';

export const CustomIframeModal = ({
  isOpen,
  onClose,
  onLaunchGame
}) => {
  const [iframeInput, setIframeInput] = useState('');
  const [title, setTitle] = useState('');
  const [saveToLibrary, setSaveToLibrary] = useState(true);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLaunch = (e) => {
    e.preventDefault();
    const raw = iframeInput.trim();
    if (!raw) {
      setError('Please enter a URL or iframe embed code.');
      return;
    }

    // Extract src from <iframe src="..."> if full HTML embed code was provided
    let finalSrc = raw;
    const srcMatch = raw.match(/src=["'](.*?)["']/i);
    if (srcMatch && srcMatch[1]) {
      finalSrc = srcMatch[1];
    }

    const gameTitle = title.trim() || 'Custom iFrame';

    onLaunchGame({
      title: gameTitle,
      iframeSrc: finalSrc,
      category: 'Custom',
      description: 'Custom unblocked iFrame player',
      controls: 'Mouse and Keyboard controls',
      aspectRatio: '16:9',
      color: '#6366f1',
      save: saveToLibrary
    });

    setIframeInput('');
    setTitle('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl p-6 text-slate-100 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold">Custom iFrame Player</h2>
              <p className="text-xs text-slate-400">Embed and play any web game or site in an isolated sandboxed iframe.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLaunch} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>iFrame Source URL or &lt;iframe&gt; Code *</span>
            </label>
            <textarea
              required
              rows={3}
              value={iframeInput}
              onChange={e => setIframeInput(e.target.value)}
              placeholder='Paste URL or iframe embed code (e.g. https://... or <iframe src="..."></iframe>)'
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 font-mono text-[12px] focus:outline-none focus:border-indigo-500 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Game Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. My Custom Game"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500 placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="saveCheck"
              checked={saveToLibrary}
              onChange={e => setSaveToLibrary(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 cursor-pointer"
            />
            <label htmlFor="saveCheck" className="text-slate-300 cursor-pointer select-none">
              Save to my custom games list on the home screen
            </label>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Launch iFrame</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
