import React, { useState } from 'react';
import { Check, Copy, Download, ArrowRight, RotateCcw, Eye } from 'lucide-react';
import {
  ORDERS_RAW,
  PRODUCTS,
  ordersRawToTSV,
  productsToTSV,
  downloadCSV,
} from '../../data/datasets';

interface OpeningSlidesProps {
  slideNumber: number;
  onJumpToSlide: (slide: number) => void;
}

export const OpeningSlides: React.FC<OpeningSlidesProps> = ({
  slideNumber,
  onJumpToSlide,
}) => {
  // Slide 1 state
  const [heroCleaned, setHeroCleaned] = useState(false);

  // Slide 2 state
  const [chartCleanMode, setChartCleanMode] = useState(false);

  // Slide 3 state
  const [activeModIdx, setActiveModIdx] = useState(0);

  // Slide 4 state
  const [setupChecks, setSetupChecks] = useState<boolean[]>([false, false, false, false]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Slide 5 state
  const [showSpaces, setShowSpaces] = useState(false);
  const [showTypeClues, setShowTypeClues] = useState(false);

  // Slide 6 state
  const [selectedCode, setSelectedCode] = useState<string>('P01');

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  if (slideNumber === 1) {
    return (
      <div className="h-full w-full grid grid-cols-12 gap-10 items-center">
        <div className="col-span-7 flex flex-col justify-center pr-4">
          <div className="text-sm font-medium text-teal-700 tracking-tight mb-4">
            7-Hour Interactive Student Workshop · Hands-On Data Lab
          </div>
          <h1 className="text-[54px] leading-[1.08] font-bold tracking-tight text-slate-900 mb-5">
            Data Cleaning and Preparation
          </h1>
          <p className="text-[22px] leading-relaxed text-slate-600 mb-8 max-w-xl">
            Excel 365, Excel 2021, Google Sheets, Power Query and AI
          </p>

          <div className="pt-6 border-t border-slate-200 flex items-center gap-6 text-base text-slate-700">
            <div>
              <span className="text-slate-500 text-sm block">Facilitator</span>
              <span className="font-semibold text-slate-900 text-lg">Aishwerya R.</span>
            </div>
            <span aria-hidden="true" className="text-slate-300 text-2xl font-light">/</span>
            <div>
              <span className="text-slate-500 text-sm block">Format</span>
              <span className="font-medium text-slate-800">6 Modules · 9 Browser &amp; Sheet Labs</span>
            </div>
            <span aria-hidden="true" className="text-slate-300 text-2xl font-light">/</span>
            <div>
              <span className="text-slate-500 text-sm block">Platforms</span>
              <span className="font-medium text-slate-800">Excel 365 · Excel 2021 · Google Sheets</span>
            </div>
          </div>
        </div>

        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <div>
                <div className="text-xs font-medium text-slate-500">Live Preview Sandbox</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  {heroCleaned ? 'State: Cleaned & Typed Output' : 'State: Raw Messy Input'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHeroCleaned((v) => !v)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  heroCleaned
                    ? 'bg-slate-800 text-white hover:bg-slate-900'
                    : 'bg-teal-700 text-white hover:bg-teal-800'
                }`}
              >
                {heroCleaned ? 'Reset to Messy Data' : 'Run Clean Pipeline'}
              </button>
            </div>

            <table className="w-full text-left border-collapse font-mono text-xs tabular-nums mb-5">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">OrderDate</th>
                  <th className="py-2.5 px-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-3 whitespace-pre">
                    {heroCleaned ? (
                      <span className="text-teal-800 font-medium">Ravi Kumar</span>
                    ) : (
                      <span className="text-orange-700 bg-orange-50 px-1 rounded">" ravi kumar "</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {heroCleaned ? (
                      <span className="text-teal-800 font-medium">2026-03-05</span>
                    ) : (
                      <span className="text-orange-700">05/03/2026</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {heroCleaned ? (
                      <span className="text-teal-800 font-medium">450</span>
                    ) : (
                      <span className="text-slate-700">450</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3">
                    {heroCleaned ? (
                      <span className="text-teal-800 font-medium">Anil Verma</span>
                    ) : (
                      <span className="text-orange-700 bg-orange-50 px-1 rounded">Anil  Verma</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {heroCleaned ? (
                      <span className="text-teal-800 font-medium">2026-03-07</span>
                    ) : (
                      <span className="text-orange-700">7 March 2026</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {heroCleaned ? (
                      <span className="text-teal-800 font-medium">450</span>
                    ) : (
                      <span className="text-slate-700">450</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3">
                    <span className="text-slate-800 font-medium">Divya R</span>
                  </td>
                  <td className="py-3 px-3">
                    {heroCleaned ? (
                      <span className="text-teal-800 font-medium">2026-03-13</span>
                    ) : (
                      <span className="text-orange-700">13/03/2026</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {heroCleaned ? (
                      <span className="text-teal-800 font-medium">450</span>
                    ) : (
                      <span className="text-orange-700 bg-orange-50 px-1 rounded">Rs.450 (Text)</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 tabular-nums">
            <span>
              SUM(Price):{' '}
              <strong className="font-mono text-slate-900">
                {heroCleaned ? '1,350 (All 3 rows counted)' : '900 ("Rs.450" ignored!)'}
              </strong>
            </span>
            <button
              type="button"
              onClick={() => onJumpToSlide(2)}
              className="inline-flex items-center gap-1 font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
            >
              <span>Begin Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 2) {
    const rawBars = [
      { city: 'chennai', amount: 900, note: 'Split by lowercase!' },
      { city: 'Chennai', amount: 1500, note: 'Includes bad code P09' },
      { city: 'Coimbatore', amount: 0, note: 'Blank Qty x 2 duplicates' },
      { city: 'coimbatore', amount: 0, note: '"Rs.450" text = ₹0!' },
      { city: 'MADURAI', amount: 1350, note: 'ALL CAPS label' },
      { city: 'Trichy', amount: -2400, note: 'Negative Qty (-2)!' },
    ];
    const cleanBars = [
      { city: 'Chennai', amount: 900, note: 'Merged case · P09 flagged' },
      { city: 'Coimbatore', amount: 1800, note: 'Deduplicated · Rs.450 -> 450' },
      { city: 'Madurai', amount: 1350, note: 'Proper Case standardized' },
      { city: 'Trichy', amount: 0, note: 'Qty -2 quarantined for review' },
    ];

    const bars = chartCleanMode ? cleanBars : rawBars;

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-7">
          <div className="space-y-6">
            <div className="text-xs font-medium text-slate-500">Core Reality of Analytics</div>
            <ul className="space-y-5 text-[18px] leading-snug text-slate-800">
              <li className="flex gap-3.5">
                <span className="font-mono font-semibold text-teal-700 tabular-nums">01.</span>
                <span>
                  Analysts spend <strong>most of their time preparing data</strong>, not analysing it.
                </span>
              </li>
              <li className="flex gap-3.5">
                <span className="font-mono font-semibold text-teal-700 tabular-nums">02.</span>
                <span>
                  <strong>Dirty data</strong> gives wrong charts and wrong decisions.
                </span>
              </li>
              <li className="flex gap-3.5">
                <span className="font-mono font-semibold text-teal-700 tabular-nums">03.</span>
                <span>
                  <strong>Garbage in, garbage out</strong> — fancy dashboards cannot rescue broken cells.
                </span>
              </li>
              <li className="flex gap-3.5">
                <span className="font-mono font-semibold text-teal-700 tabular-nums">04.</span>
                <span>
                  <strong>Today’s goal:</strong> clean it, combine it, automate it.
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-5 border-t border-slate-200 text-sm text-slate-600">
            Test on the right: see what happens if we chart <span className="font-mono text-slate-900">Orders_Raw</span> before cleaning.
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <div>
                <div className="text-xs font-medium text-slate-500">Interactive Impact Simulation</div>
                <h3 className="text-lg font-bold text-slate-900">
                  {chartCleanMode ? 'City Revenue — After Cleaning' : 'City Revenue — Plotted Directly on Dirty Data'}
                </h3>
              </div>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setChartCleanMode(false)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    !chartCleanMode ? 'bg-white text-orange-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dirty Input (6 Broken Bars)
                </button>
                <button
                  type="button"
                  onClick={() => setChartCleanMode(true)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    chartCleanMode ? 'bg-white text-teal-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Cleaned Output (4 True Cities)
                </button>
              </div>
            </div>

            <div className="space-y-3.5">
              {bars.map((b) => {
                const pct = Math.min(100, Math.round((Math.abs(b.amount) / 2400) * 100));
                const isNeg = b.amount < 0;
                return (
                  <div key={b.city} className="grid grid-cols-12 items-center gap-3">
                    <div className="col-span-3 font-mono text-xs font-medium text-slate-800 truncate">
                      {b.city}
                    </div>
                    <div className="col-span-5 h-6 bg-slate-100 rounded-md overflow-hidden flex items-center px-1">
                      <div
                        className={`h-4 rounded-xs transition-all duration-200 ${
                          isNeg
                            ? 'bg-red-600'
                            : chartCleanMode
                            ? 'bg-teal-600'
                            : 'bg-orange-500'
                        }`}
                        style={{ width: `${Math.max(pct, 4)}%` }}
                      />
                    </div>
                    <div className="col-span-4 flex items-center justify-between text-xs tabular-nums">
                      <span className={`font-mono font-semibold ${isNeg ? 'text-red-700' : 'text-slate-900'}`}>
                        {isNeg ? `-₹${Math.abs(b.amount)}` : `₹${b.amount}`}
                      </span>
                      <span className="text-slate-500 text-[11px] truncate ml-2">{b.note}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-sm tabular-nums">
            <span className="text-slate-600">
              Reported Total:{' '}
              <strong className="font-mono text-slate-900">
                {chartCleanMode ? '₹4,050 (Verified valid orders)' : '₹1,350 (Distorted by -2 Qty & "Rs.450" text!)'}
              </strong>
            </span>
            <span className="text-xs font-medium text-slate-500">
              {chartCleanMode ? '✓ Decision-ready' : '! Misleading chart'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 3) {
    const roadmap = [
      {
        num: '01',
        title: 'Data quality issues',
        slides: 'Slides 7 – 12',
        time: '~55 min',
        tools: 'Excel 365 · Excel 2021 · Google Sheets',
        lab: 'Hands-On 1: Spot the Dirt (15 min pair audit)',
        jump: 7,
        summary: 'Identify duplicates, missing values, format inconsistencies, impossible outliers, and structural text-vs-number traps.',
      },
      {
        num: '02',
        title: 'Cleaning in Excel and Sheets',
        slides: 'Slides 13 – 22',
        time: '~1 hr 35 min',
        tools: 'TRIM, PROPER, VALUE, SPLIT, DATEVALUE, Validation',
        lab: 'Hands-On 2A (10m) & Hands-On 2B (15m)',
        jump: 13,
        summary: 'Clean text formulas, convert formulas to values safely, standardise dates to yyyy-mm-dd, flag duplicates, and lock inputs with Data Validation.',
      },
      {
        num: '03',
        title: 'Sorting, filtering and lookups',
        slides: 'Slides 23 – 30',
        time: '~1 hr 15 min',
        tools: 'Tables, Multi-Sort, FILTER(), VLOOKUP, XLOOKUP',
        lab: 'Hands-On 3A (8m) & Hands-On 3B (20m)',
        jump: 23,
        summary: 'Sort without scrambling rows, filter subsets, bring product names from master tables using XLOOKUP & VLOOKUP, and fix #N/A errors.',
      },
      {
        num: '04',
        title: 'Power Query',
        slides: 'Slides 31 – 39',
        time: '~1 hr 35 min',
        tools: 'Get Data, Applied Steps, Merge, Append, Refresh',
        lab: 'Hands-On 4A (20m) & Hands-On 4B (20m)',
        jump: 31,
        summary: 'Record cleaning steps once as an automated recipe, join tables with Left Outer & Left Anti merges, stack monthly files, and refresh in one click.',
      },
      {
        num: '05',
        title: 'AI-assisted data preparation',
        slides: 'Slides 40 – 45',
        time: '~50 min',
        tools: 'Anonymisation, 4-Part Prompts, Edge-Case Testing',
        lab: 'Hands-On 5: AI Prompting & Critique (10m)',
        jump: 40,
        summary: 'Protect sensitive data first, anonymise while preserving messy patterns, write structured 4-part prompts, and verify every AI formula.',
      },
      {
        num: '06',
        title: 'Capstone challenge',
        slides: 'Slides 46 – 51',
        time: '~50 min',
        tools: 'End-to-End Student Marks Dataset + 10-Pt Rubric',
        lab: 'Capstone Challenge (20m) + Peer Grading',
        jump: 46,
        summary: 'Apply every skill on a fresh Student Marks dataset, document before/after counts, score against a 10-point rubric, and plan take-home practice.',
      },
    ];

    const current = roadmap[activeModIdx];

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-6 flex flex-col justify-between gap-2.5">
          {roadmap.map((m, idx) => (
            <button
              key={m.num}
              type="button"
              onClick={() => setActiveModIdx(idx)}
              className={`w-full text-left px-5 py-3.5 rounded-xl border transition-colors flex items-center justify-between cursor-pointer ${
                activeModIdx === idx
                  ? 'bg-white border-teal-600 shadow-xs'
                  : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-base font-bold text-teal-700 tabular-nums">
                  {m.num}.
                </span>
                <div>
                  <div className="text-base font-bold text-slate-900">{m.title}</div>
                  <div className="text-xs text-slate-500 tabular-nums">
                    {m.slides} · {m.time}
                  </div>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 ${activeModIdx === idx ? 'text-teal-700' : 'text-slate-400'}`} />
            </button>
          ))}
        </div>

        <div className="col-span-6 bg-white border border-slate-200 rounded-xl p-8 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-teal-700 tabular-nums mb-2">
              Module {current.num} · {current.slides} · {current.time}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{current.title}</h3>
            <p className="text-base leading-relaxed text-slate-700 mb-6">{current.summary}</p>

            <div className="space-y-4 pt-5 border-t border-slate-200 text-sm">
              <div>
                <span className="text-slate-500 block text-xs mb-1">Key Tools &amp; Functions</span>
                <span className="font-mono text-slate-900 font-medium">{current.tools}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs mb-1">Hands-On Activity</span>
                <span className="font-semibold text-orange-700">{current.lab}</span>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">7-hour pacing includes Q&amp;A and breaks</span>
            <button
              type="button"
              onClick={() => onJumpToSlide(current.jump)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Jump to Module {current.num}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 4) {
    const items = [
      {
        title: 'Excel 2021, Microsoft 365, or Google Sheets open',
        detail: 'All three platforms receive equal step-by-step formulas today.',
      },
      {
        title: 'New workbook created with two sheets: Orders_Raw and Products',
        detail: 'Match exact sheet tab spelling so lookup formulas connect cleanly.',
      },
      {
        title: 'Practice dataset typed or pasted exactly as shown — mistakes included',
        detail: 'Keep extra spaces, lowercase cities, blank Qty, -2, and "Rs.450" intact!',
      },
      {
        title: 'Rule of the day agreed: Never edit raw data; always clean a copy',
        detail: 'If a formula goes wrong, Orders_Raw is your untouched safety backup.',
      },
    ];

    const completedCount = setupChecks.filter(Boolean).length;

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <div className="text-sm font-semibold text-slate-900">Class Readiness Verification</div>
              <div className="text-xs font-mono text-teal-700 font-semibold tabular-nums">
                {completedCount} / 4 Checked
              </div>
            </div>

            <div className="space-y-3.5">
              {items.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setSetupChecks((prev) => prev.map((v, i) => (i === idx ? !v : v)))
                  }
                  className={`w-full text-left p-4 rounded-lg border transition-colors flex items-start gap-3.5 cursor-pointer ${
                    setupChecks[idx]
                      ? 'border-teal-600 bg-teal-50/40'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div
                    className={`w-5 h-5 mt-0.5 rounded-sm border flex items-center justify-center shrink-0 ${
                      setupChecks[idx]
                        ? 'bg-teal-700 border-teal-700 text-white'
                        : 'border-slate-400 bg-white'
                    }`}
                  >
                    {setupChecks[idx] && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="text-[16px] font-semibold text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-600 mt-1">{item.detail}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span>Golden Rule: Raw tab = Read-only archive · Working tab = Orders_Clean</span>
            <button
              type="button"
              onClick={() => setSetupChecks([false, false, false, false])}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Fast Classroom Distribution</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Quick-Start Starter Files</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Students can type the 8 rows on Slide 5 &amp; 6 to feel every typo firsthand, or copy/download exact starter tables below to stay on pace.
            </p>

            <div className="space-y-3">
              <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-mono text-sm font-semibold text-slate-900">Orders_Raw</div>
                  <div className="text-xs text-slate-500">8 rows · 8 columns · intentional dirt</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyText('s4_orders', ordersRawToTSV())}
                    className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-300 rounded-md hover:bg-slate-100 cursor-pointer whitespace-nowrap"
                  >
                    {copiedId === 's4_orders' ? 'Copied!' : 'Copy TSV'}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      downloadCSV(
                        'Orders_Raw.csv',
                        ['OrderID', 'Customer', 'City', 'OrderDate', 'ProductCode', 'Qty', 'Price', 'Email'],
                        ORDERS_RAW.map((r) => [r.orderId, r.customer, r.city, r.orderDate, r.productCode, r.qty, r.price, r.email])
                      )
                    }
                    className="p-1.5 text-white bg-teal-700 rounded-md hover:bg-teal-800 cursor-pointer"
                    title="Download CSV"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-mono text-sm font-semibold text-slate-900">Products</div>
                  <div className="text-xs text-slate-500">4 rows · 3 columns · lookup master</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyText('s4_products', productsToTSV())}
                    className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-300 rounded-md hover:bg-slate-100 cursor-pointer whitespace-nowrap"
                  >
                    {copiedId === 's4_products' ? 'Copied!' : 'Copy TSV'}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      downloadCSV(
                        'Products.csv',
                        ['ProductCode', 'ProductName', 'Category'],
                        PRODUCTS.map((p) => [p.productCode, p.productName, p.category])
                      )
                    }
                    className="p-1.5 text-white bg-teal-700 rounded-md hover:bg-teal-800 cursor-pointer"
                    title="Download CSV"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-orange-200 bg-orange-50/50 text-xs text-orange-900 leading-relaxed">
            <strong>Software Parity Tip:</strong> Duplicate a sheet tab in Excel via <em>Right-click Tab → Move or Copy → Create a copy</em>; in Google Sheets via <em>Right-click Tab → Duplicate</em>.
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 5) {
    const renderWhitespace = (str: string) => {
      if (!showSpaces) return str;
      return str.replace(/ /g, '·');
    };

    return (
      <div className="h-full w-full flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="text-xs text-slate-600">
            Sheet 1: <strong className="font-mono text-slate-900">Orders_Raw</strong> (Rows 2–9) · Enter mistakes exactly as shown
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSpaces((s) => !s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                showSpaces
                  ? 'bg-orange-50 border-orange-300 text-orange-800'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showSpaces ? 'Showing Spaces as ·' : 'Show Hidden Spaces'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowTypeClues((t) => !t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                showTypeClues
                  ? 'bg-teal-50 border-teal-300 text-teal-800'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {showTypeClues ? 'Showing Alignment Clues' : 'Simulate Cell Alignment'}
            </button>

            <button
              type="button"
              onClick={() => copyText('s5_copy', ordersRawToTSV())}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 cursor-pointer whitespace-nowrap"
            >
              {copiedId === 's5_copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 's5_copy' ? 'Copied!' : 'Copy Sheet'}</span>
            </button>
          </div>
        </div>

        <div className="my-auto">
          <table className="w-full text-left border-collapse font-mono text-[13px] tabular-nums border border-slate-200">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs">
                <th className="py-2.5 px-3 border-r border-slate-200 w-12 text-center">#</th>
                <th className="py-2.5 px-3 border-r border-slate-200">A · OrderID</th>
                <th className="py-2.5 px-3 border-r border-slate-200">B · Customer</th>
                <th className="py-2.5 px-3 border-r border-slate-200">C · City</th>
                <th className="py-2.5 px-3 border-r border-slate-200">D · OrderDate</th>
                <th className="py-2.5 px-3 border-r border-slate-200">E · ProductCode</th>
                <th className="py-2.5 px-3 border-r border-slate-200">F · Qty</th>
                <th className="py-2.5 px-3 border-r border-slate-200">G · Price</th>
                <th className="py-2.5 px-3">H · Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {ORDERS_RAW.map((r) => {
                const isPriceNumeric = !isNaN(Number(r.price));
                return (
                  <tr key={r.rowNum} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 border-r border-slate-200 text-center text-slate-400 bg-slate-50">
                      {r.rowNum}
                    </td>
                    <td className={`py-2.5 px-3 border-r border-slate-200 ${showTypeClues ? 'text-right' : ''}`}>
                      {r.orderId}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 whitespace-pre">
                      <span className={showSpaces && (r.rowNum === 2 || r.rowNum === 4) ? 'text-orange-700 font-semibold bg-orange-50 px-1 rounded' : ''}>
                        {renderWhitespace(r.customer)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200">{r.city}</td>
                    <td className="py-2.5 px-3 border-r border-slate-200">{r.orderDate}</td>
                    <td className="py-2.5 px-3 border-r border-slate-200">{r.productCode}</td>
                    <td className={`py-2.5 px-3 border-r border-slate-200 ${showTypeClues && r.qty ? 'text-right' : ''}`}>
                      {r.qty || <span className="text-slate-300 italic">(blank)</span>}
                    </td>
                    <td
                      className={`py-2.5 px-3 border-r border-slate-200 ${
                        showTypeClues
                          ? isPriceNumeric
                            ? 'text-right text-teal-800'
                            : 'text-left text-orange-700 bg-orange-50/60 font-semibold'
                          : ''
                      }`}
                    >
                      {r.price}
                    </td>
                    <td className="py-2.5 px-3">{r.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Note hidden whitespace: Row 2 has <code className="font-mono text-slate-800">" ravi kumar "</code> · Row 4 has two spaces in <code className="font-mono text-slate-800">"Anil  Verma"</code>.
          </span>
          <span>8 records · Columns A to H</span>
        </div>
      </div>
    );
  }

  // Slide 6: Practice Dataset (Products)
  const matchingOrders = ORDERS_RAW.filter((o) => o.productCode === selectedCode);
  const orphanOrders = ORDERS_RAW.filter(
    (o) => !PRODUCTS.some((p) => p.productCode === o.productCode)
  );

  return (
    <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
      <div className="col-span-6 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
            <div>
              <div className="text-xs font-medium text-slate-500">Sheet 2 · Master Lookup Table</div>
              <h3 className="text-lg font-bold text-slate-900">Products (A1:C5)</h3>
            </div>
            <button
              type="button"
              onClick={() => copyText('s6_copy', productsToTSV())}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 cursor-pointer"
            >
              {copiedId === 's6_copy' ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 's6_copy' ? 'Copied!' : 'Copy Products'}</span>
            </button>
          </div>

          <table className="w-full text-left border-collapse font-mono text-sm tabular-nums border border-slate-200">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs">
                <th className="py-3 px-4 border-r border-slate-200">A · ProductCode</th>
                <th className="py-3 px-4 border-r border-slate-200">B · ProductName</th>
                <th className="py-3 px-4">C · Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {PRODUCTS.map((p) => {
                const active = selectedCode === p.productCode;
                return (
                  <tr
                    key={p.productCode}
                    onClick={() => setSelectedCode(p.productCode)}
                    className={`cursor-pointer transition-colors ${
                      active ? 'bg-teal-50/70 font-semibold text-teal-950' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4 border-r border-slate-200">{p.productCode}</td>
                    <td className="py-3.5 px-4 border-r border-slate-200">{p.productName}</td>
                    <td className="py-3.5 px-4">{p.category}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pt-4 border-t border-slate-200 text-xs text-slate-600">
          Click any <code className="font-mono text-slate-900">ProductCode</code> row above to inspect how it links to <code className="font-mono text-slate-900">Orders_Raw</code> on the right.
        </div>
      </div>

      <div className="col-span-6 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
        <div>
          <div className="text-xs font-medium text-slate-500 mb-1">Relational Key Check</div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Orders Referencing <span className="font-mono text-teal-700">{selectedCode}</span>
          </h3>

          {matchingOrders.length > 0 ? (
            <div className="border border-slate-200 rounded-lg overflow-hidden mb-5">
              <table className="w-full text-left font-mono text-xs tabular-nums">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="py-2 px-3">OrderID</th>
                    <th className="py-2 px-3">Customer</th>
                    <th className="py-2 px-3">Code</th>
                    <th className="py-2 px-3">Qty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {matchingOrders.map((o) => (
                    <tr key={o.rowNum}>
                      <td className="py-2.5 px-3">{o.orderId}</td>
                      <td className="py-2.5 px-3 whitespace-pre">{o.customer.trim()}</td>
                      <td className="py-2.5 px-3 text-teal-700 font-semibold">{o.productCode}</td>
                      <td className="py-2.5 px-3">{o.qty || '(blank)'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-600 mb-5">
              <strong>Zero orders</strong> in <code className="font-mono">Orders_Raw</code> ordered{' '}
              <span className="font-mono font-semibold">{selectedCode} (Jumper Wires)</span> yet — completely normal in a product catalogue!
            </div>
          )}
        </div>

        <div className="p-4 rounded-lg border border-orange-200 bg-orange-50/50">
          <div className="text-xs font-bold text-orange-900 mb-1">
            ! Sneak Peek — Unmatched Code in Orders_Raw
          </div>
          <p className="text-xs text-orange-800 leading-relaxed">
            Order <span className="font-mono font-semibold">{orphanOrders[0]?.orderId}</span> ({orphanOrders[0]?.customer}) contains ProductCode{' '}
            <span className="font-mono font-semibold">{orphanOrders[0]?.productCode}</span>, which does <strong>not exist</strong> in Products! Lookups and Power Query Left Anti joins will catch this automatically.
          </p>
        </div>
      </div>
    </div>
  );
};
