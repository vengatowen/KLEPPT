import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

interface WorkshopTimerProps {
  defaultMinutes: number;
}

export const WorkshopTimer: React.FC<WorkshopTimerProps> = ({ defaultMinutes }) => {
  const [secondsLeft, setSecondsLeft] = useState(defaultMinutes * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setSecondsLeft(defaultMinutes * 60);
    setRunning(false);
  }, [defaultMinutes]);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const isDone = secondsLeft === 0;
  const isLow = secondsLeft > 0 && secondsLeft <= 60;

  return (
    <div className="flex items-center gap-3 px-3.5 py-2 bg-white border border-slate-200 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
          {isDone ? 'Time Up' : running ? 'Running' : 'Activity Timer'}
        </span>
        <span aria-hidden="true" className="text-slate-300">·</span>
        <span
          className={`font-mono text-lg font-semibold tabular-nums ${
            isDone
              ? 'text-red-600'
              : isLow
              ? 'text-orange-600'
              : running
              ? 'text-teal-700'
              : 'text-slate-900'
          }`}
        >
          {formatted}
        </span>
      </div>

      <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            running
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-teal-700 text-white hover:bg-teal-800'
          }`}
        >
          {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{running ? 'Pause' : secondsLeft === 0 ? 'Done' : 'Start'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSecondsLeft((s) => Math.max(0, s - 60))}
          title="Subtract 1 minute"
          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setSecondsLeft((s) => s + 60)}
          title="Add 1 minute"
          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setSecondsLeft(defaultMinutes * 60);
          }}
          title="Reset timer"
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
