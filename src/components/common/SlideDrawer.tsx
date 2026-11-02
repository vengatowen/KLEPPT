import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { SLIDES_META } from '../../data/slideMetadata';

interface SlideDrawerProps {
  isOpen: boolean;
  currentSlide: number;
  onSelectSlide: (slideNumber: number) => void;
  onClose: () => void;
}

export const SlideDrawer: React.FC<SlideDrawerProps> = ({
  isOpen,
  currentSlide,
  onSelectSlide,
  onClose,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'handson'>('all');
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = SLIDES_META.filter((s) => {
    if (filterMode === 'handson' && !s.isHandsOn) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.moduleLabel.toLowerCase().includes(q) ||
      String(s.number) === q
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Slide Index (1 – 51)</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              7-Hour Workshop Deck · Presenter: Aishwerya R. · Jump directly to any slide or Hands-On activity
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filterMode === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 51 Slides
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('handson')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filterMode === 'handson' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hands-On Labs Only (9)
            </button>
          </div>

          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search slide title or #..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((slide) => {
            const isActive = slide.number === currentSlide;
            return (
              <button
                key={slide.number}
                type="button"
                onClick={() => {
                  onSelectSlide(slide.number);
                  onClose();
                }}
                className={`text-left p-3.5 rounded-lg border transition-colors cursor-pointer ${
                  isActive
                    ? 'border-teal-600 bg-teal-50/50'
                    : slide.isHandsOn
                    ? 'border-orange-200 bg-orange-50/30 hover:border-orange-400'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 tabular-nums">
                  <span>
                    Slide {String(slide.number).padStart(2, '0')} · {slide.moduleLabel.split('·')[0].trim()}
                  </span>
                  {slide.isHandsOn && (
                    <span className="font-medium text-orange-700">
                      Lab · {slide.durationMinutes}m
                    </span>
                  )}
                </div>
                <div className="text-sm font-semibold text-slate-900 mt-1 line-clamp-1">
                  {slide.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
