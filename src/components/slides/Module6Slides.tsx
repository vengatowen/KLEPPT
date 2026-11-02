import React, { useState } from 'react';
import { Copy, Download, Check, RotateCcw, Eye, Plus, Trash2 } from 'lucide-react';
import {
  CAPSTONE_MARKS_RAW,
  CAPSTONE_DEPARTMENTS,
  capstoneMarksToTSV,
  capstoneDeptsToTSV,
  downloadCSV,
} from '../../data/datasets';
import { WorkshopTimer } from '../common/WorkshopTimer';

interface Module6SlidesProps {
  slideNumber: number;
}

export const Module6Slides: React.FC<Module6SlidesProps> = ({ slideNumber }) => {
  // Slide 46 state: Capstone
  const [revealCap, setRevealCap] = useState(false);
  const [copiedCap, setCopiedCap] = useState<string | null>(null);

  // Slide 47 state: Interactive 10-point rubric scorer
  const [rubricScores, setRubricScores] = useState<number[]>([2, 3, 1, 2, 2]);
  const [teamName, setTeamName] = useState('Pair 1');

  // Slide 48 state: Quick Reference search/filter
  const [refFilter, setRefFilter] = useState<'all' | 'text' | 'quality' | 'combine'>('all');

  // Slide 49 state: Key Takeaways recall reveal
  const [openTakeaway, setOpenTakeaway] = useState<number | null>(0);

  // Slide 50 state: Homework dataset topic preview
  const [hwTopic, setHwTopic] = useState<'attendance' | 'inventory' | 'scores'>('attendance');

  // Slide 51 state: Live Classroom Exit-Ticket Board
  const [exitNotes, setExitNotes] = useState<{ cat: 0 | 1 | 2; text: string }[]>([
    { cat: 0, text: 'XLOOKUP with "Not found" & Power Query Trim' },
    { cat: 2, text: 'Monthly lab equipment CSV exports with mixed dates' },
  ]);
  const [newExitCat, setNewExitCat] = useState<0 | 1 | 2>(0);
  const [newExitText, setNewExitText] = useState('');

  if (slideNumber === 46) {
    const copyHelper = (id: string, text: string) => {
      navigator.clipboard.writeText(text);
      setCopiedCap(id);
      setTimeout(() => setCopiedCap(null), 1800);
    };

    return (
      <div className="h-full w-full flex flex-col justify-between gap-3.5">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => copyHelper('marks', capstoneMarksToTSV())}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-800 rounded-md hover:bg-slate-200 cursor-pointer"
            >
              {copiedCap === 'marks' ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCap === 'marks' ? 'Copied Marks!' : 'Copy Marks Sheet'}</span>
            </button>
            <button
              type="button"
              onClick={() => copyHelper('depts', capstoneDeptsToTSV())}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-800 rounded-md hover:bg-slate-200 cursor-pointer"
            >
              {copiedCap === 'depts' ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCap === 'depts' ? 'Copied Depts!' : 'Copy Depts Sheet'}</span>
            </button>
            <button
              type="button"
              onClick={() =>
                downloadCSV(
                  'Capstone_Student_Marks_Raw.csv',
                  ['RollNo', 'StudentName', 'DOB', 'DeptCode', 'Marks', 'Email'],
                  CAPSTONE_MARKS_RAW.map((r) => [r.rollNo, r.studentName, r.dob, r.deptCode, r.marks, r.email])
                )
              }
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 rounded-md hover:bg-teal-800 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setRevealCap((v) => !v)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{revealCap ? 'Hide Audit Key' : 'Reveal Audit Key'}</span>
            </button>
            <WorkshopTimer defaultMinutes={20} />
          </div>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-12 gap-5 items-stretch">
          <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-teal-800 mb-2.5">Pair Deliverables (All 6 Steps):</div>
              <ol className="space-y-2 text-xs text-slate-800 leading-relaxed">
                <li><strong>1.</strong> Write a complete <strong>Issue Log</strong> before editing.</li>
                <li><strong>2.</strong> Clean with <strong>Formulas or Power Query</strong>, stating your reason.</li>
                <li><strong>3.</strong> Add <strong>Data Validation</strong> (Marks 0–100, valid DeptCodes, unique RollNo).</li>
                <li><strong>4.</strong> Add <code className="font-mono">DeptName</code> with <strong>XLOOKUP</strong> or a <strong>Merge</strong>.</li>
                <li><strong>5.</strong> Show a <strong>Before vs After count</strong> (rows, blanks, duplicates).</li>
                <li><strong>6.</strong> Use <strong>AI once</strong> with anonymised data and note how you verified it.</li>
              </ol>
            </div>

            {revealCap && (
              <div className="p-3 rounded-lg border border-teal-200 bg-teal-50/60 text-[11px] text-teal-950 font-mono">
                Key: Rows 7 → 6 (R102 dup) · "92 marks" → 92 · "N/A" &amp; blank marks flagged · -15 marks quarantined · D99 caught by XLOOKUP/Left Anti!
              </div>
            )}
          </div>

          <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2">
                Fresh Messy Dataset: <code className="font-mono">Student_Marks_Raw</code> + <code className="font-mono">Departments</code> (D01–D04)
              </div>
              <table className="w-full text-left border-collapse font-mono text-[11px] tabular-nums border border-slate-200">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="py-1.5 px-2">RollNo</th>
                    <th className="py-1.5 px-2">StudentName</th>
                    <th className="py-1.5 px-2">DOB</th>
                    <th className="py-1.5 px-2">Dept</th>
                    <th className="py-1.5 px-2">Marks</th>
                    <th className="py-1.5 px-2">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {CAPSTONE_MARKS_RAW.map((r) => (
                    <tr key={r.rowNum}>
                      <td className="py-1.5 px-2">{r.rollNo}</td>
                      <td className="py-1.5 px-2 whitespace-pre">{r.studentName}</td>
                      <td className="py-1.5 px-2">{r.dob}</td>
                      <td className="py-1.5 px-2">{r.deptCode}</td>
                      <td className="py-1.5 px-2">{r.marks || '(blank)'}</td>
                      <td className="py-1.5 px-2">{r.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-600 pt-2 border-t border-slate-200">
              <span className="font-sans font-semibold text-slate-800">Departments:</span>
              {CAPSTONE_DEPARTMENTS.map((d) => (
                <span key={d.deptCode}>
                  {d.deptCode}={d.deptName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 47) {
    const rubric = [
      { criterion: 'Issue log completeness', max: 2, desc: 'Spotted duplicate R102, spaces/case, text marks, -15, blank/N/A, mixed DOB, bad D99' },
      { criterion: 'Correct cleaning', max: 3, desc: 'Raw sheet untouched; trimmed Proper names, ISO DOBs, numeric marks, deduplicated 7→6' },
      { criterion: 'Validation added', max: 1, desc: 'Whole number 0–100 on Marks + dropdown list on DeptCode / unique RollNo' },
      { criterion: 'Lookup or merge correct', max: 2, desc: 'Accurate DeptName joined; D99 cleanly flagged as "Not found" or isolated' },
      { criterion: 'Verification and documentation', max: 2, desc: 'Before/After row & blank counts reconciled + AI anonymisation & verification note' },
    ];

    const totalScore = rubricScores.reduce((a, b) => a + b, 0);

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <table className="w-full text-left border-collapse text-sm border border-slate-200">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs">
                <th className="py-2.5 px-3.5 border-r border-slate-200">Criterion</th>
                <th className="py-2.5 px-3.5 border-r border-slate-200 text-center w-20">Max Pts</th>
                <th className="py-2.5 px-3.5 w-44">Live Score Selector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rubric.map((r, idx) => (
                <tr key={r.criterion}>
                  <td className="py-3 px-3.5 border-r border-slate-200">
                    <div className="font-bold text-slate-900">{r.criterion}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{r.desc}</div>
                  </td>
                  <td className="py-3 px-3.5 border-r border-slate-200 text-center font-mono font-bold text-slate-700 tabular-nums">
                    {r.max}
                  </td>
                  <td className="py-3 px-3.5">
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: r.max + 1 }, (_, pt) => (
                        <button
                          key={pt}
                          type="button"
                          onClick={() =>
                            setRubricScores((prev) => prev.map((v, i) => (i === idx ? pt : v)))
                          }
                          className={`w-8 h-8 font-mono text-xs font-bold rounded-md border cursor-pointer tabular-nums ${
                            rubricScores[idx] === pt
                              ? 'bg-teal-700 text-white border-teal-700'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {pt}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-4 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-2">Live Pair Assessment</div>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-3 py-2 text-base font-bold text-slate-900 border border-slate-300 rounded-lg mb-6"
            />

            <div className="p-6 rounded-xl border border-teal-200 bg-teal-50/40 text-center tabular-nums mb-5">
              <div className="text-xs font-semibold text-teal-800 mb-1">Total Capstone Score</div>
              <div className="font-mono text-5xl font-bold text-slate-900">
                {totalScore} <span className="text-2xl text-slate-400">/ 10</span>
              </div>
              <div className="text-xs font-medium text-teal-900 mt-2">
                {totalScore >= 9
                  ? 'Analyst Ready — Audit-grade execution!'
                  : totalScore >= 7
                  ? 'Strong Work — Check minor edge cases.'
                  : 'Good Start — Review verification steps.'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRubricScores([0, 0, 0, 0, 0])}
            className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Zero Scores for Next Pair</span>
          </button>
        </div>
      </div>
    );
  }

  if (slideNumber === 48) {
    const cheatRows = [
      { cat: 'text', p: 'Extra spaces', f: 'TRIM / Power Query Trim' },
      { cat: 'text', p: 'Wrong case', f: 'PROPER, UPPER, LOWER / Capitalize Each Word' },
      { cat: 'text', p: 'Number as text', f: 'VALUE, Text to Columns, set Power Query type' },
      { cat: 'text', p: 'Mixed dates', f: 'Text to Columns (DMY), DATEVALUE, Using Locale' },
      { cat: 'quality', p: 'Duplicates', f: 'COUNTIFS flag, Remove Duplicates, UNIQUE' },
      { cat: 'quality', p: 'Blanks', f: 'Go To Special → Blanks, COUNTBLANK, Fill Down' },
      { cat: 'quality', p: 'Invalid entries', f: 'Data Validation (List, Whole Number, Custom)' },
      { cat: 'combine', p: 'Combine by column', f: 'XLOOKUP, VLOOKUP, Power Query Merge' },
      { cat: 'combine', p: 'Combine by rows', f: 'Power Query Append' },
      { cat: 'combine', p: 'Repeat weekly', f: 'Power Query Refresh' },
    ];

    const shownCheat = cheatRows.filter((r) => refFilter === 'all' || r.cat === refFilter);

    return (
      <div className="h-full w-full bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="text-xs text-slate-600">
            Symptom-to-Tool Decision Matrix (Excel 365 · Excel 2021 · Google Sheets · Power Query)
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(
              [
                { id: 'all', label: 'All 10 Fixes' },
                { id: 'text', label: 'Text, Numbers & Dates' },
                { id: 'quality', label: 'Duplicates, Blanks & Rules' },
                { id: 'combine', label: 'Combine & Automate' },
              ] as const
            ).map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setRefFilter(b.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                  refFilter === b.id ? 'bg-white text-teal-800 shadow-xs font-semibold' : 'text-slate-600'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="my-auto">
          <table className="w-full text-left border-collapse text-xs border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="py-2 px-4 border-r border-slate-200 w-64">Problem</th>
                <th className="py-2 px-4">Recommended Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {shownCheat.map((r) => (
                <tr key={r.p} className="hover:bg-slate-50">
                  <td className="py-2 px-4 border-r border-slate-200 font-bold text-slate-900">{r.p}</td>
                  <td className="py-2 px-4 font-mono text-teal-900">{r.f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-xs text-slate-500">
          One-off ad-hoc cleanup → Formulas &amp; Menus · Weekly or multi-file cleanup → Power Query Refresh.
        </div>
      </div>
    );
  }

  if (slideNumber === 49) {
    const takeaways = [
      {
        title: '1. Keep raw data safe; clean a copy',
        quiz: 'Recall Check: Why do we never run Remove Duplicates directly on Orders_Raw?',
        ans: 'Because if we pick the wrong columns or delete needed rows, our original evidence is gone forever.',
      },
      {
        title: '2. Decide rules first, then clean, then verify',
        quiz: 'Recall Check: How do you prove 450 is a real number and 2026-03-05 is a real date?',
        ans: 'Check Numerical Count on the status bar, =ISNUMBER(), or switch Date format temporarily to General.',
      },
      {
        title: '3. Prevent problems with validation',
        quiz: 'Recall Check: What stops a user from typing "chennai" lowercase or -2 Qty tomorrow?',
        ans: 'Data Validation dropdown lists and Whole Number >= 1 rules.',
      },
      {
        title: '4. Automate repeat work with Power Query',
        quiz: 'Recall Check: Which combines columns side-by-side vs stacks rows top-to-bottom?',
        ans: 'Merge adds columns (like XLOOKUP); Append stacks rows (Jan + Feb).',
      },
      {
        title: '5. AI: anonymise first, ask clearly, verify always',
        quiz: 'Recall Check: Name the four building blocks of a reliable data-cleaning prompt.',
        ans: '1. Context (Tool/Version) · 2. Data Shape · 3. Task · 4. Output Format.',
      },
    ];

    return (
      <div className="h-full w-full flex flex-col justify-between gap-3">
        {takeaways.map((t, idx) => {
          const isOpen = openTakeaway === idx;
          return (
            <div
              key={t.title}
              onClick={() => setOpenTakeaway(isOpen ? null : idx)}
              className={`bg-white border rounded-xl px-6 py-3.5 cursor-pointer transition-colors ${
                isOpen ? 'border-teal-600 shadow-xs' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
                <span className="text-xs font-medium text-teal-700">
                  {isOpen ? 'Hide Recall Check' : 'Click for Rapid-Fire Check'}
                </span>
              </div>
              {isOpen && (
                <div className="mt-2 pt-2 border-t border-slate-100 text-xs flex items-center justify-between gap-4">
                  <span className="text-slate-700 font-medium">{t.quiz}</span>
                  <span className="text-teal-800 font-semibold">{t.ans}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (slideNumber === 50) {
    const topicIdeas = {
      attendance: 'Club / Class Attendance: duplicate RollNos, "Present"/"P"/"yes", mixed dates, extra spaces in names.',
      inventory: 'Lab Inventory: "50 pcs" text quantities, missing prices, inconsistent vendor names, broken item codes.',
      scores: 'Test / Sports Scores: "Absent" or "N/A" mixed in numeric columns, out-of-range marks, department code lookup.',
    };

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="font-mono text-xs font-bold text-teal-800 mb-1">Assignment 01 · Personal Dataset</div>
              <p className="text-sm text-slate-800 leading-relaxed">
                Clean a <strong>50-row dataset of your own</strong> (attendance, lab inventory, scores); submit your <strong>Issue Log</strong>, <strong>cleaned file</strong>, and a <strong>one-page note on decisions</strong>.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="font-mono text-xs font-bold text-teal-800 mb-1">Assignment 02 · Multi-Month Automation</div>
              <p className="text-sm text-slate-800 leading-relaxed">
                Build a <strong>Power Query</strong> combining two months of data; add a <strong>third month</strong> and demonstrate one-click <strong>Refresh</strong>.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="font-mono text-xs font-bold text-teal-800 mb-1">Assignment 03 · Safe AI Verification</div>
              <p className="text-sm text-slate-800 leading-relaxed">
                Write <strong>three AI prompts</strong> using anonymised data and submit <strong>screenshots of your verification</strong> on edge cases.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Idea Generator for Assignment 01</div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Pick a 50-Row Dataset Theme</h3>

            <div className="flex gap-2 mb-4">
              {(
                [
                  { id: 'attendance', label: 'Attendance' },
                  { id: 'inventory', label: 'Lab Inventory' },
                  { id: 'scores', label: 'Exam Scores' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setHwTopic(t.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md border cursor-pointer ${
                    hwTopic === t.id ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-lg border border-teal-200 bg-teal-50/40 text-xs text-teal-950 leading-relaxed mb-5">
              {topicIdeas[hwTopic]}
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900">Before Submitting, Double-Check:</div>
              <div>• Raw tab preserved untouched alongside Cleaned tab</div>
              <div>• Row count &amp; blank count before vs after documented</div>
              <div>• Zero real PII visible in your 3 AI prompt screenshots</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 51: Exit Questions and Thank You
  const cols = [
    { idx: 0 as const, title: '1. One tool I will use tomorrow' },
    { idx: 1 as const, title: '2. One thing that confused me' },
    { idx: 2 as const, title: '3. One data problem from my own work I want to solve' },
  ];

  const addNote = () => {
    if (!newExitText.trim()) return;
    setExitNotes((prev) => [...prev, { cat: newExitCat, text: newExitText.trim() }]);
    setNewExitText('');
  };

  return (
    <div className="h-full w-full flex flex-col justify-between gap-4">
      <div className="grid grid-cols-3 gap-5 flex-1 min-h-0">
        {cols.map((col) => (
          <div
            key={col.idx}
            className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-slate-900 pb-3 mb-3 border-b border-slate-200">
                {col.title}
              </h3>
              <div className="space-y-2">
                {exitNotes
                  .map((n, i) => ({ ...n, origIdx: i }))
                  .filter((n) => n.cat === col.idx)
                  .map((n) => (
                    <div
                      key={n.origIdx}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start justify-between gap-2"
                    >
                      <span>{n.text}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setExitNotes((prev) => prev.filter((_, idx) => idx !== n.origIdx))
                        }
                        className="text-slate-400 hover:text-red-600 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="text-[11px] text-slate-400">Live student reflection column</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl px-6 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 flex-1 max-w-2xl">
          <select
            value={newExitCat}
            onChange={(e) => setNewExitCat(Number(e.target.value) as 0 | 1 | 2)}
            className="px-2.5 py-2 text-xs font-medium border border-slate-300 rounded-lg bg-slate-50"
          >
            <option value={0}>Prompt 1: Tool for tomorrow</option>
            <option value={1}>Prompt 2: Confused me</option>
            <option value={2}>Prompt 3: Problem to solve</option>
          </select>
          <input
            type="text"
            value={newExitText}
            onChange={(e) => setNewExitText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addNote();
            }}
            placeholder="Capture a student response live..."
            className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
          />
          <button
            type="button"
            onClick={addNote}
            className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        <div className="text-right">
          <div className="text-base font-bold text-slate-900">Thank you | Questions?</div>
          <div className="text-xs text-slate-600">Facilitated by Aishwerya R.</div>
        </div>
      </div>
    </div>
  );
};
