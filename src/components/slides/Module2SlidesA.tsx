import React, { useState } from 'react';
import { RotateCcw, Eye, Check, ArrowRight, AlertTriangle } from 'lucide-react';
import { ORDERS_RAW } from '../../data/datasets';
import { WorkshopTimer } from '../common/WorkshopTimer';

interface Module2SlidesAProps {
  slideNumber: number;
}

export const Module2SlidesA: React.FC<Module2SlidesAProps> = ({ slideNumber }) => {
  // Slide 13 state
  const [fnIndex, setFnIndex] = useState(0);
  const [customSample, setCustomSample] = useState('  ravi  kumar  ');

  // Slide 14 state: Inside-out stepper
  const [formulaChoice, setFormulaChoice] = useState<'name' | 'price' | 'email'>('name');
  const [stepLayer, setStepLayer] = useState(0);

  // Slide 15 state: Platform switcher
  const [platformTab, setPlatformTab] = useState<'sheets' | 'excel365' | 'excel2021'>('sheets');

  // Slide 16 state: Hands-On 2A Formula Checker
  const [activeTask16, setActiveTask16] = useState(0);
  const [userFormula16, setUserFormula16] = useState('=PROPER(TRIM(B2))');
  const [reveal16, setReveal16] = useState(false);

  // Slide 17 state: Formulas to Values simulator
  const [pastedAsValues, setPastedAsValues] = useState(false);
  const [rawDeleted, setRawDeleted] = useState(false);

  if (slideNumber === 13) {
    const fnRows = [
      {
        fn: 'TRIM',
        use: 'Remove extra leading, trailing, and repeated spaces',
        defaultSample: '  ravi  kumar  ',
        formula: '=TRIM(A2)',
        evalFn: (s: string) => ({ res: s.trim().replace(/\s+/g, ' '), type: 'Text' }),
      },
      {
        fn: 'CLEAN',
        use: 'Remove hidden non-printable characters (line breaks)',
        defaultSample: 'PRIYA\nSHARMA',
        formula: '=CLEAN(A2)',
        evalFn: (s: string) => ({ res: s.replace(/[\x00-\x1F\x7F]/g, ' '), type: 'Text' }),
      },
      {
        fn: 'PROPER, UPPER, LOWER',
        use: 'Fix capitalisation consistently across columns',
        defaultSample: 'mADURAI city',
        formula: '=PROPER(A2)',
        evalFn: (s: string) => ({
          res: s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
          type: 'Text',
        }),
      },
      {
        fn: 'LEN',
        use: 'Count characters (catches invisible spaces!)',
        defaultSample: 'Anil  Verma',
        formula: '=LEN(A2)',
        evalFn: (s: string) => ({ res: String(s.length), type: 'Number' }),
      },
      {
        fn: 'SUBSTITUTE',
        use: 'Replace specific text inside a cell',
        defaultSample: 'Rs.450',
        formula: '=SUBSTITUTE(A2,"Rs.","")',
        evalFn: (s: string) => ({ res: `"${s.replace(/Rs\./g, '')}"`, type: 'Text (Still text!)' }),
      },
      {
        fn: 'LEFT, MID, RIGHT, FIND',
        use: 'Extract part of text by position or delimiter',
        defaultSample: 'ravi.k@mail.com',
        formula: '=LEFT(A2, FIND("@",A2)-1)',
        evalFn: (s: string) => {
          const at = s.indexOf('@');
          return { res: at > 0 ? s.slice(0, at) : '#VALUE!', type: at > 0 ? 'Text' : 'Error' };
        },
      },
      {
        fn: 'VALUE',
        use: 'Convert numeric text into a real mathematical number',
        defaultSample: '450',
        formula: '=VALUE(A2)',
        evalFn: (s: string) => {
          const n = Number(s.trim());
          return { res: isNaN(n) || s.trim() === '' ? '#VALUE!' : String(n), type: isNaN(n) ? 'Error' : 'Number' };
        },
      },
    ];

    const selected = fnRows[fnIndex];
    const computed = selected.evalFn(customSample);

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <table className="w-full text-left border-collapse text-sm border border-slate-200">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs">
                <th className="py-2.5 px-3.5 border-r border-slate-200 w-52">Function</th>
                <th className="py-2.5 px-3.5">Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {fnRows.map((r, i) => (
                <tr
                  key={r.fn}
                  onClick={() => {
                    setFnIndex(i);
                    setCustomSample(r.defaultSample);
                  }}
                  className={`cursor-pointer transition-colors ${
                    fnIndex === i ? 'bg-teal-50/70 font-semibold text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <td className="py-2.5 px-3.5 border-r border-slate-200 font-mono text-xs text-teal-800 font-semibold">
                    {r.fn}
                  </td>
                  <td className="py-2.5 px-3.5 text-[13.5px]">{r.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-slate-500 pt-2">
            All 7 function families work identically in Excel 365, Excel 2021, and Google Sheets.
          </div>
        </div>

        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <div className="text-xs font-medium text-teal-700 mb-1">Interactive Function Sandbox</div>
              <h3 className="text-xl font-bold text-slate-900 font-mono">{selected.fn}</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Cell A2 Input (Edit to test live):
              </label>
              <input
                type="text"
                value={customSample}
                onChange={(e) => setCustomSample(e.target.value)}
                className="w-full px-3.5 py-2.5 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600 bg-slate-50"
              />
              <div className="text-[11px] text-slate-500 mt-1 font-mono tabular-nums">
                Input character length: {customSample.length}
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-900 text-slate-100 font-mono text-xs">
              <div className="text-slate-400 mb-1">Formula in B2:</div>
              <div className="text-sm text-teal-300 font-semibold">{selected.formula}</div>
            </div>

            <div className="p-4 rounded-lg border border-teal-200 bg-teal-50/50 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-teal-900">Evaluated Output</div>
                <div className="font-mono text-lg font-bold text-slate-900 mt-0.5 whitespace-pre">
                  {computed.res}
                </div>
              </div>
              <div className="text-xs font-mono text-teal-800 font-semibold">
                Type: {computed.type}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
            Click any function row on the left to load its preset messy cell.
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 14) {
    const walkthroughs = {
      name: {
        title: '=PROPER(TRIM(CLEAN(B2)))',
        raw: '" ravi kumar "',
        steps: [
          { expr: 'B2', val: '" ravi kumar "', note: 'Raw cell in Orders_Raw with leading & trailing spaces' },
          { expr: 'CLEAN(B2)', val: '" ravi kumar "', note: 'Innermost: strips any invisible line breaks first' },
          { expr: 'TRIM(" ravi kumar ")', val: '"ravi kumar"', note: 'Middle: removes leading/trailing & double spaces' },
          { expr: 'PROPER("ravi kumar")', val: '"Ravi Kumar"', note: 'Outermost: capitalises first letter of each word' },
        ],
      },
      price: {
        title: '=VALUE(SUBSTITUTE(G9,"Rs.",""))',
        raw: '"Rs.450"',
        steps: [
          { expr: 'G9', val: '"Rs.450" (Text)', note: 'Raw cell containing currency letters + digits' },
          { expr: 'SUBSTITUTE(G9,"Rs.","")', val: '"450" (Still Text!)', note: 'Innermost: removes "Rs." but result is still left-aligned text' },
          { expr: 'VALUE("450")', val: '450 (Number)', note: 'Outermost: converts numeric string into true number 450' },
        ],
      },
      email: {
        title: '=LEFT(H2, FIND("@",H2)-1)',
        raw: '"ravi.k@mail.com"',
        steps: [
          { expr: 'H2', val: '"ravi.k@mail.com"', note: 'Raw email string' },
          { expr: 'FIND("@", H2)', val: '7', note: 'Innermost: locates @ symbol at character position 7' },
          { expr: '7 - 1', val: '6', note: 'Subtract 1 so we stop right before @' },
          { expr: 'LEFT(H2, 6)', val: '"ravi.k"', note: 'Outermost: grabs the first 6 characters (username)' },
        ],
      },
    };

    const currentW = walkthroughs[formulaChoice];
    const safeLayer = Math.min(stepLayer, currentW.steps.length - 1);

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Core Cleaning Patterns</div>
            <ul className="space-y-3.5 text-[14.5px] leading-snug text-slate-800">
              <li className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <code className="font-mono text-xs text-teal-800 font-semibold block mb-1">=TRIM(B2)</code>
                Turns <code className="font-mono text-xs">" ravi kumar "</code> into <code className="font-mono text-xs">"ravi kumar"</code>
              </li>
              <li className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <code className="font-mono text-xs text-teal-800 font-semibold block mb-1">=PROPER(TRIM(CLEAN(B2)))</code>
                Gives clean <code className="font-mono text-xs">"Ravi Kumar"</code>
              </li>
              <li className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <code className="font-mono text-xs text-teal-800 font-semibold block mb-1">=SUBSTITUTE(G9,"Rs.","")</code>
                Removes text prefix, then wrap in <code className="font-mono text-xs">VALUE(...)</code> for number
              </li>
              <li className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <code className="font-mono text-xs text-teal-800 font-semibold block mb-1">=LEFT(H2,FIND("@",H2)-1)</code>
                Extracts the email username before <code className="font-mono text-xs">@</code>
              </li>
            </ul>
          </div>
          <div className="pt-3 border-t border-slate-200 text-sm font-semibold text-slate-900">
            Rule: Always read nested formulas from the inside out!
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <div className="text-sm font-bold text-slate-900">Inside-Out Nested Formula Stepper</div>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                {(
                  [
                    { id: 'name', label: 'Name Nesting' },
                    { id: 'price', label: 'Price Value' },
                    { id: 'email', label: 'Email Extract' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setFormulaChoice(tab.id);
                      setStepLayer(0);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                      formulaChoice === tab.id ? 'bg-white text-teal-800 shadow-xs font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 text-teal-300 font-mono text-sm font-semibold mb-5">
              {currentW.title}
            </div>

            <div className="space-y-2.5">
              {currentW.steps.map((st, idx) => {
                const active = idx === safeLayer;
                const done = idx < safeLayer;
                return (
                  <div
                    key={st.expr}
                    onClick={() => setStepLayer(idx)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-colors flex items-center justify-between ${
                      active
                        ? 'border-teal-600 bg-teal-50/70'
                        : done
                        ? 'border-slate-200 bg-slate-50 opacity-80'
                        : 'border-slate-200 bg-white opacity-55'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-xs font-semibold text-slate-900">
                        Step {idx + 1}: {st.expr} → <span className="text-teal-800">{st.val}</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">{st.note}</div>
                    </div>
                    {active && <ArrowRight className="w-4 h-4 text-teal-700 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 tabular-nums">
              Evaluation Layer {safeLayer + 1} of {currentW.steps.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStepLayer(0)}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setStepLayer((s) => (s + 1) % currentW.steps.length)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-teal-700 rounded-md hover:bg-teal-800 cursor-pointer"
              >
                Next Outer Layer →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 15) {
    const comparisons = {
      sheets: {
        name: 'Google Sheets',
        split: '=SPLIT(H2, "@")',
        splitNote: 'Spills "ravi.k" into Col I and "mail.com" into Col J automatically.',
        array: '=ARRAYFORMULA(PROPER(TRIM(B2:B9)))',
        arrayNote: 'One formula in row 2 cleans the entire Customer column!',
        unique: '=UNIQUE(A2:H9)',
        uniqueNote: 'Creates a live deduplicated 7-row view without editing raw data.',
      },
      excel365: {
        name: 'Microsoft Excel 365',
        split: '=TEXTSPLIT(H2, "@")',
        splitNote: 'Dynamic array equivalent of Sheets SPLIT; spills across columns.',
        array: '=PROPER(TRIM(B2:B9))',
        arrayNote: 'Native dynamic array spill — no Ctrl+Shift+Enter needed in 365!',
        unique: '=UNIQUE(A2:H9)',
        uniqueNote: 'Identical syntax to Google Sheets! Spills 7 unique rows dynamically.',
      },
      excel2021: {
        name: 'Microsoft Excel 2021',
        split: 'Data → Text to Columns (Delimiter: @) or LEFT/MID/FIND',
        splitNote: 'TEXTSPLIT was added after 2021; use Text to Columns or FIND("@").',
        array: '=PROPER(TRIM(B2))  (Fill down double-click)',
        arrayNote: 'Double-click the bottom-right fill handle to copy down instantly.',
        unique: '=UNIQUE(A2:H9)',
        uniqueNote: 'Excel 2021 DOES include dynamic =UNIQUE() and =XLOOKUP()!',
      },
    };

    const cur = comparisons[platformTab];

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Slide Highlights</div>
            <ul className="space-y-4 text-[16px] leading-snug text-slate-800">
              <li>
                • <strong>Same core functions work everywhere:</strong>{' '}
                <code className="font-mono text-xs">TRIM, PROPER, SUBSTITUTE, LEFT, FIND</code>
              </li>
              <li>
                • <code className="font-mono text-xs text-teal-800 font-semibold">=SPLIT(H2,"@")</code> splits text into cells in Sheets.
              </li>
              <li>
                • <code className="font-mono text-xs text-teal-800 font-semibold">=ARRAYFORMULA(PROPER(TRIM(B2:B)))</code> applies to the full column.
              </li>
              <li>
                • <code className="font-mono text-xs text-teal-800 font-semibold">=UNIQUE(A2:H)</code> removes duplicates without touching the original.
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-600">
            Use the switcher on the right for side-by-side parity across Google Sheets, Excel 365, and Excel 2021.
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Cross-Platform Syntax Parity</h3>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                {(
                  [
                    { id: 'sheets', label: 'Google Sheets' },
                    { id: 'excel365', label: 'Excel 365' },
                    { id: 'excel2021', label: 'Excel 2021' },
                  ] as const
                ).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatformTab(p.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                      platformTab === p.id ? 'bg-white text-teal-800 shadow-xs font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-xs font-semibold text-slate-500 mb-1">1. Split by Delimiter (@)</div>
                <div className="font-mono text-sm font-bold text-teal-800">{cur.split}</div>
                <div className="text-xs text-slate-600 mt-1">{cur.splitNote}</div>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-xs font-semibold text-slate-500 mb-1">2. Full-Column Text Clean</div>
                <div className="font-mono text-sm font-bold text-teal-800">{cur.array}</div>
                <div className="text-xs text-slate-600 mt-1">{cur.arrayNote}</div>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-xs font-semibold text-slate-500 mb-1">3. Non-Destructive Deduplication</div>
                <div className="font-mono text-sm font-bold text-teal-800">{cur.unique}</div>
                <div className="text-xs text-slate-600 mt-1">{cur.uniqueNote}</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
            Dynamic spill formulas show a thin blue border around spilled cells — keep cells below empty to avoid <code className="font-mono">#SPILL!</code> or <code className="font-mono">#REF!</code>.
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 16) {
    const tasks16 = [
      {
        label: '1. Customer_Clean & City_Clean',
        prompt: 'Clean B2 (" ravi kumar ") and C2 ("chennai") using PROPER and TRIM',
        ideal: '=PROPER(TRIM(B2))',
        check: (f: string) => f.toUpperCase().includes('PROPER') && f.toUpperCase().includes('TRIM'),
        previewHeader: 'Customer_Clean | City_Clean',
        previewRows: ORDERS_RAW.slice(0, 5).map((r) => {
          const cleanStr = (s: string) =>
            s
              .trim()
              .replace(/\s+/g, ' ')
              .toLowerCase()
              .replace(/\b\w/g, (c) => c.toUpperCase());
          return `${cleanStr(r.customer)}  |  ${cleanStr(r.city)}`;
        }),
      },
      {
        label: '2. Email_Clean',
        prompt: 'Standardise H2 using LOWER and TRIM',
        ideal: '=LOWER(TRIM(H2))',
        check: (f: string) => f.toUpperCase().includes('LOWER') && f.toUpperCase().includes('TRIM'),
        previewHeader: 'Email_Clean',
        previewRows: ORDERS_RAW.slice(0, 5).map((r) => r.email.trim().toLowerCase()),
      },
      {
        label: '3. Price_Clean',
        prompt: 'Turn "Rs.450" into numeric 450 and handle "N/A" cleanly',
        ideal: '=IF(G2="N/A", "", VALUE(SUBSTITUTE(G2,"Rs.","")))',
        check: (f: string) => f.toUpperCase().includes('SUBSTITUTE') && f.toUpperCase().includes('VALUE'),
        previewHeader: 'Raw Price -> Price_Clean',
        previewRows: [
          '450 -> 450 (Number)',
          '1200 -> 1200 (Number)',
          'N/A -> "" (Blank)',
          'Rs.450 -> 450 (Number)',
        ],
      },
      {
        label: '4. Email_User',
        prompt: 'Extract username before the @ symbol from H2',
        ideal: '=LEFT(H2, FIND("@", H2) - 1)',
        check: (f: string) => f.toUpperCase().includes('LEFT') && f.toUpperCase().includes('FIND'),
        previewHeader: 'Email -> Email_User',
        previewRows: ORDERS_RAW.slice(0, 5).map((r) => `${r.email} -> ${r.email.split('@')[0]}`),
      },
      {
        label: '5. LEN Proof on Anil Verma',
        prompt: 'Use LEN on B4 ("Anil  Verma") vs cleaned B4 ("Anil Verma")',
        ideal: '=LEN(B4)  vs  =LEN(TRIM(B4))',
        check: (f: string) => f.toUpperCase().includes('LEN'),
        previewHeader: 'Character Count Proof (Row 4)',
        previewRows: [
          'Raw B4 ("Anil  Verma"): LEN = 11 (2 spaces)',
          'Cleaned ("Anil Verma"): LEN = 10 (1 space ✓)',
        ],
      },
    ];

    const curTask = tasks16[activeTask16];
    const isFormulaValid = curTask.check(userFormula16);

    return (
      <div className="h-full w-full flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-3">
          <div className="text-sm font-semibold text-slate-900">
            On <code className="font-mono text-teal-800">Orders_Clean</code>: Complete all 5 text-cleaning steps
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setReveal16((r) => !r)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{reveal16 ? 'Hide Model Formulas' : 'Reveal Formulas'}</span>
            </button>
            <WorkshopTimer defaultMinutes={10} />
          </div>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-12 gap-6 items-stretch">
          <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-2">
              {tasks16.map((t, i) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => {
                    setActiveTask16(i);
                    setUserFormula16(reveal16 ? t.ideal : '=');
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                    activeTask16 === i
                      ? 'border-teal-600 bg-teal-50/50 font-semibold text-slate-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-sm">{t.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-normal">{t.prompt}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">Interactive Formula Checker</div>
              <h3 className="text-base font-bold text-slate-900 mb-3">{curTask.label}</h3>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold text-slate-500 px-2.5 py-2 bg-slate-100 rounded-md">fx</span>
                <input
                  type="text"
                  value={reveal16 ? curTask.ideal : userFormula16}
                  onChange={(e) => setUserFormula16(e.target.value)}
                  placeholder="Type your Excel / Sheets formula here..."
                  className="flex-1 px-3.5 py-2 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
                />
                <span
                  className={`text-xs font-semibold px-3 py-2 rounded-md whitespace-nowrap ${
                    reveal16 || isFormulaValid
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'bg-orange-50 text-orange-800 border border-orange-200'
                  }`}
                >
                  {reveal16 || isFormulaValid ? '✓ Valid Pattern' : 'Keep typing...'}
                </span>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200 text-xs font-semibold text-slate-600 font-mono">
                  {curTask.previewHeader}
                </div>
                <div className="divide-y divide-slate-100 font-mono text-xs">
                  {curTask.previewRows.map((line) => (
                    <div key={line} className="px-3.5 py-2.5 text-slate-800">
                      {reveal16 || isFormulaValid ? line : 'Type formula above or click Reveal Formulas to preview output'}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
              Model Formula:{' '}
              <code className="font-mono text-slate-900 font-semibold">
                {reveal16 ? curTask.ideal : '(Click Reveal Formulas at top right when ready)'}
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 17: Formulas to Values
  const brokenByDelete = rawDeleted && !pastedAsValues;

  return (
    <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
      <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
        <div>
          <div className="text-xs font-medium text-slate-500 mb-4">Breaking Formula Dependencies</div>
          <ul className="space-y-5 text-[17px] leading-snug text-slate-800">
            <li className="flex gap-3">
              <span className="font-mono font-bold text-teal-700">01.</span>
              <span>Cleaned columns are <strong>live formulas</strong> that still depend on the messy originals.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono font-bold text-teal-700">02.</span>
              <span>Select cleaned column → <strong>Copy</strong>, then <strong>Paste Special → Values</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono font-bold text-teal-700">03.</span>
              <span>Delete the old messy columns <strong>only after</strong> pasting values!</span>
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-1">
          <div className="font-semibold text-slate-900">Keyboard Shortcuts (All Platforms):</div>
          <div>• <strong>Google Sheets &amp; Excel 365:</strong> <code className="font-mono">Ctrl + C</code> then <code className="font-mono">Ctrl + Shift + V</code></div>
          <div>• <strong>Excel 2021:</strong> <code className="font-mono">Ctrl + C</code> then <code className="font-mono">Right-Click → Paste Values (123)</code></div>
        </div>
      </div>

      <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
            <div>
              <div className="text-xs font-medium text-slate-500">Interactive Mistake Simulator</div>
              <h3 className="text-lg font-bold text-slate-900">Test What Happens When You Delete Column B</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setPastedAsValues(false);
                setRawDeleted(false);
              }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <button
              type="button"
              disabled={pastedAsValues || rawDeleted}
              onClick={() => setPastedAsValues(true)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                pastedAsValues
                  ? 'bg-teal-100 text-teal-900 border border-teal-300'
                  : 'bg-teal-700 text-white hover:bg-teal-800 disabled:opacity-40'
              }`}
            >
              {pastedAsValues ? '✓ Step 1 Done: Pasted as Values (123)' : 'Step 1: Copy & Paste Special → Values'}
            </button>

            <button
              type="button"
              disabled={rawDeleted}
              onClick={() => setRawDeleted(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:opacity-40 cursor-pointer"
            >
              {rawDeleted ? 'Raw Column B Deleted' : 'Delete Raw Column B Now'}
            </button>
          </div>

          <table className="w-full text-left border-collapse font-mono text-xs border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
              <tr>
                {!rawDeleted && <th className="py-2.5 px-3 border-r border-slate-200">B · Customer (Raw)</th>}
                <th className="py-2.5 px-3 border-r border-slate-200">Customer_Clean (Displayed)</th>
                <th className="py-2.5 px-3">Formula Bar Inside Cell</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { raw: '" ravi kumar "', clean: 'Ravi Kumar', row: 2 },
                { raw: '"PRIYA SHARMA"', clean: 'Priya Sharma', row: 3 },
                { raw: '"Anil  Verma"', clean: 'Anil Verma', row: 4 },
              ].map((item) => (
                <tr key={item.row}>
                  {!rawDeleted && (
                    <td className="py-3 px-3 border-r border-slate-200 text-slate-600 whitespace-pre">
                      {item.raw}
                    </td>
                  )}
                  <td
                    className={`py-3 px-3 border-r border-slate-200 font-semibold ${
                      brokenByDelete ? 'bg-red-50 text-red-700' : 'text-teal-900'
                    }`}
                  >
                    {brokenByDelete ? '#REF!' : item.clean}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {brokenByDelete
                      ? '=PROPER(TRIM(#REF!))'
                      : pastedAsValues
                      ? item.clean
                      : `=PROPER(TRIM(B${item.row}))`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className={`p-4 rounded-lg border text-xs flex items-center gap-2.5 ${
            brokenByDelete
              ? 'border-red-200 bg-red-50 text-red-900'
              : pastedAsValues && rawDeleted
              ? 'border-teal-200 bg-teal-50 text-teal-950'
              : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
        >
          {brokenByDelete ? (
            <>
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>
                <strong>#REF! Disaster!</strong> You deleted Column B while Customer_Clean still held formulas pointing to B2:B4. Click Reset and Paste Values first!
              </span>
            </>
          ) : pastedAsValues && rawDeleted ? (
            <>
              <Check className="w-4 h-4 text-teal-700 shrink-0" />
              <span>
                <strong>Clean &amp; Safe!</strong> Because you converted formulas to static values first, deleting Column B caused zero errors.
              </span>
            </>
          ) : (
            <span>Try clicking "Delete Raw Column B Now" BEFORE Step 1 to see the classic beginner mistake!</span>
          )}
        </div>
      </div>
    </div>
  );
};
