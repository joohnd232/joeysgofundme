import React, { useState } from 'react';
import { X, Plus, Info } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [description, setDescription] = useState('');
  const [iframeInput, setIframeInput] = useState('');
  const [controls, setControls] = useState('Arrow Keys / Mouse to play');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [color, setColor] = useState('#6366f1');
  const [tagsInput, setTagsInput] = useState('Custom, IFrame');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }
    if (!iframeInput.trim()) {
      setError('Please provide an iframe source URL or embed snippet.');
      return;
    }

    // Extract src from iframe HTML if user pasted <iframe src="...">
    let finalSrc = iframeInput.trim();
    const srcMatch = finalSrc.match(/src=["'](.*?)["']/);
    if (srcMatch && srcMatch[1]) {
      finalSrc = srcMatch[1];
    }

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    onAddGame({
      title: title.trim(),
      category,
      description: description.trim() || 'Custom user embedded game.',
      iframeSrc: finalSrc,
      controls: controls.trim() || 'Standard Controls',
      aspectRatio,
      color,
      tags: tags.length ? tags : ['Custom', 'IFrame'],
      featured: false,
      badge: 'Custom'
    });

    setTitle('');
    setDescription('');
    setIframeInput('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-lg rounded-xl shadow-2xl p-6 text-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold">Add Custom Game to JSON</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-lg flex items-start gap-2.5 text-xs text-slate-300">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <span>
            Every game is stored as an <strong>IFrame</strong> in the JSON collection. You can provide any valid URL, relative HTML game path, or full embed code.
          </span>
        </div>

        {error && (
          <div className="p-2.5 bg-rose-950/50 border border-rose-800 text-rose-300 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Game Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Retro Space Blaster"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="Arcade">Arcade</option>
                <option value="Action">Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Retro">Retro</option>
                <option value="Runner">Runner</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Aspect Ratio</label>
              <select
                value={aspectRatio}
                onChange={e => setAspectRatio(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="16:9">16:9 (Widescreen)</option>
                <option value="4:3">4:3 (Standard)</option>
                <option value="1:1">1:1 (Square)</option>
                <option value="9:14">9:14 (Vertical/Mobile)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">
              IFrame URL or Embed Code *
            </label>
            <textarea
              required
              rows={3}
              value={iframeInput}
              onChange={e => setIframeInput(e.target.value)}
              placeholder='e.g. /games/snake.html or https://example.com/game or <iframe src="..."></iframe>'
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 font-mono text-[11px] focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Short Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Quick one-line summary of how the game works."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Controls Hint</label>
              <input
                type="text"
                value={controls}
                onChange={e => setControls(e.target.value)}
                placeholder="e.g. WASD / Spacebar"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Theme Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
                <span className="font-mono text-slate-300">{color}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="e.g. Retro, 2D, Casual"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Save Game to JSON
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
