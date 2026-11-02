import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Database,
  MessageSquareText,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';
import { SLIDES_META } from './data/slideMetadata';
import { OpeningSlides } from './components/slides/OpeningSlides';
import { Module1Slides } from './components/slides/Module1Slides';
import { Module2SlidesA } from './components/slides/Module2SlidesA';
import { Module2SlidesB } from './components/slides/Module2SlidesB';
import { Module3Slides } from './components/slides/Module3Slides';
import { Module4Slides } from './components/slides/Module4Slides';
import { Module5Slides } from './components/slides/Module5Slides';
import { Module6Slides } from './components/slides/Module6Slides';
import { SlideDrawer } from './components/common/SlideDrawer';
import { DatasetModal } from './components/common/DatasetModal';

const STAGE_WIDTH = 1600;
const STAGE_HEIGHT = 900;

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [scale, setScale] = useState<number>(0.75);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDatasetOpen, setIsDatasetOpen] = useState<boolean>(false);
  const [showFacilitator, setShowFacilitator] = useState<boolean>(false);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);

  const slideMeta = SLIDES_META[currentSlide - 1] || SLIDES_META[0];

  const updateScale = useCallback(() => {
    const el = stageContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pad = isPresentationMode ? 0 : 24;
    const availW = Math.max(320, rect.width - pad);
    const availH = Math.max(180, rect.height - pad);
    const nextScale = Math.min(availW / STAGE_WIDTH, availH / STAGE_HEIGHT);
    setScale(nextScale);
  }, [isPresentationMode]);

  useEffect(() => {
    updateScale();
    const el = stageContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => updateScale());
    ro.observe(el);
    window.addEventListener('resize', updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [updateScale]);

  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) {
        setIsPresentationMode(false);
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const togglePresentMode = async () => {
    if (!isPresentationMode) {
      setIsPresentationMode(true);
      try {
        if (rootRef.current && rootRef.current.requestFullscreen) {
          await rootRef.current.requestFullscreen();
        }
      } catch {
        // Fallback: theater presentation mode inside iframe
      }
    } else {
      setIsPresentationMode(false);
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        }
      } catch {
        // Ignore
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'Escape') {
        if (isDrawerOpen) setIsDrawerOpen(false);
        else if (isDatasetOpen) setIsDatasetOpen(false);
        else if (isPresentationMode) setIsPresentationMode(false);
        return;
      }

      if (isDrawerOpen || isDatasetOpen) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((s) => Math.min(51, s + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentSlide((s) => Math.max(1, s - 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(51);
      } else if (e.key === 'g' || e.key === 'G') {
        setIsDrawerOpen((v) => !v);
      } else if (e.key === 'n' || e.key === 'N') {
        setShowFacilitator((v) => !v);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, isDatasetOpen, isPresentationMode]);

  const renderSlideBody = () => {
    if (currentSlide >= 1 && currentSlide <= 6) {
      return <OpeningSlides slideNumber={currentSlide} onJumpToSlide={setCurrentSlide} />;
    }
    if (currentSlide >= 7 && currentSlide <= 12) {
      return <Module1Slides slideNumber={currentSlide} />;
    }
    if (currentSlide >= 13 && currentSlide <= 17) {
      return <Module2SlidesA slideNumber={currentSlide} />;
    }
    if (currentSlide >= 18 && currentSlide <= 22) {
      return <Module2SlidesB slideNumber={currentSlide} />;
    }
    if (currentSlide >= 23 && currentSlide <= 30) {
      return <Module3Slides slideNumber={currentSlide} />;
    }
    if (currentSlide >= 31 && currentSlide <= 39) {
      return <Module4Slides slideNumber={currentSlide} />;
    }
    if (currentSlide >= 40 && currentSlide <= 45) {
      return <Module5Slides slideNumber={currentSlide} />;
    }
    return <Module6Slides slideNumber={currentSlide} />;
  };

  const navModules = [
    { label: 'Opening', start: 1, end: 6 },
    { label: 'Quality & Cleaning', start: 7, end: 22 },
    { label: 'Sort, Filter & Lookups', start: 23, end: 30 },
    { label: 'Power Query', start: 31, end: 39 },
    { label: 'AI & Capstone', start: 40, end: 51 },
  ];

  const scaledW = Math.floor(STAGE_WIDTH * scale);
  const scaledH = Math.floor(STAGE_HEIGHT * scale);

  return (
    <div
      ref={rootRef}
      className={`h-screen w-screen flex flex-col overflow-hidden ${
        isPresentationMode ? 'bg-slate-950' : 'bg-slate-200/80'
      }`}
    >
      {/* Top Bar Contract: 3 clean zones separated by gap-8 (hidden during Fullscreen Presentation Mode) */}
      {!isPresentationMode && (
        <header className="flex items-center justify-between gap-8 px-6 py-3 bg-white border-b border-slate-200 shrink-0">
          <button
            type="button"
            onClick={() => setCurrentSlide(1)}
            className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer font-display"
          >
            Data Cleaning &amp; Preparation
          </button>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navModules.map((m) => {
              const active = currentSlide >= m.start && currentSlide <= m.end;
              return (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setCurrentSlide(m.start)}
                  className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
                    active
                      ? 'text-teal-800 font-semibold border-b-2 border-teal-700'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={togglePresentMode}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Present 16:9</span>
            </button>
          </div>
        </header>
      )}

      {/* Centered 16:9 Scaled Stage Container */}
      <main
        ref={stageContainerRef}
        className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden"
      >
        <div
          style={{ width: scaledW, height: scaledH }}
          className={`relative overflow-hidden ${
            isPresentationMode
              ? ''
              : 'rounded-xl border border-slate-300/80 shadow-xs'
          }`}
        >
          {/* Deterministic 1600x900 16:9 Slide Canvas */}
          <div
            style={{
              width: STAGE_WIDTH,
              height: STAGE_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
            className="bg-[#F8FAFC] text-slate-900 flex flex-col justify-between overflow-hidden relative"
          >
            {/* Slide Top Metadata Strip (Zero-Pill clean unboxed text with separators) */}
            <div className="h-[52px] px-12 border-b border-slate-200/90 bg-white/80 flex items-center justify-between text-xs text-slate-500 shrink-0 tabular-nums">
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-slate-800">{slideMeta.moduleLabel}</span>
                <span aria-hidden="true">·</span>
                <span>Slide {String(currentSlide).padStart(2, '0')} of 51</span>
                {slideMeta.isHandsOn && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-orange-700">
                      Hands-On Activity ({slideMeta.durationMinutes} min)
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <span className="font-medium text-slate-700">Aishwerya R.</span>
                <span aria-hidden="true">·</span>
                <span>Excel 365 / Excel 2021 / Google Sheets</span>
                {isPresentationMode && (
                  <>
                    <span aria-hidden="true">·</span>
                    <button
                      type="button"
                      onClick={togglePresentMode}
                      className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span>Exit Fullscreen</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Slide Title Block (Omitted on Slide 1 Hero) */}
            {currentSlide !== 1 && (
              <div className="px-12 pt-6 pb-2 shrink-0">
                <h1 className="text-[34px] leading-[1.15] font-bold tracking-tight text-slate-900">
                  {slideMeta.title}
                </h1>
                {slideMeta.subtitle && (
                  <p className="text-[16px] text-slate-600 mt-1">{slideMeta.subtitle}</p>
                )}
              </div>
            )}

            {/* Main Slide Content Viewport — Guaranteed Zero-Overflow */}
            <div className="flex-1 min-h-0 px-12 py-4 overflow-hidden">
              {renderSlideBody()}
            </div>

            {/* Non-disruptive Floating Facilitator Prompt Overlay */}
            {showFacilitator && (
              <div className="absolute bottom-[74px] left-12 right-12 z-20 px-5 py-3.5 rounded-xl bg-slate-900 text-slate-100 border border-slate-700 flex items-start justify-between gap-4">
                <div className="text-xs leading-relaxed">
                  <span className="font-semibold text-teal-300 mr-2">Facilitator Prompt:</span>
                  <span>{slideMeta.facilitatorPrompt}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFacilitator(false)}
                  className="text-slate-400 hover:text-white p-0.5 cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Bottom Presenter & Slide Navigation Bar */}
            <div className="h-[64px] px-12 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>All 51 Slides (G)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDatasetOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Datasets &amp; CSVs</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowFacilitator((v) => !v)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    showFacilitator
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  <MessageSquareText className="w-3.5 h-3.5" />
                  <span>{showFacilitator ? 'Hide Cue (N)' : 'Facilitator Cue (N)'}</span>
                </button>
              </div>

              {/* Center Progress Indicator */}
              <div className="flex items-center gap-3 tabular-nums">
                <div className="w-56 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-600 transition-all duration-150"
                    style={{ width: `${(currentSlide / 51) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-semibold text-slate-600">
                  {String(currentSlide).padStart(2, '0')} / 51
                </span>
              </div>

              {/* Right Previous / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentSlide === 1}
                  onClick={() => setCurrentSlide((s) => Math.max(1, s - 1))}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  disabled={currentSlide === 51}
                  onClick={() => setCurrentSlide((s) => Math.min(51, s + 1))}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SlideDrawer
        isOpen={isDrawerOpen}
        currentSlide={currentSlide}
        onSelectSlide={setCurrentSlide}
        onClose={() => setIsDrawerOpen(false)}
      />

      <DatasetModal
        isOpen={isDatasetOpen}
        onClose={() => setIsDatasetOpen(false)}
      />
    </div>
  );
}
