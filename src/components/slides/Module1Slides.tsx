import React, { useState } from 'react';
import { RotateCcw, Eye, Check, HelpCircle } from 'lucide-react';
import { ORDERS_RAW } from '../../data/datasets';
import { WorkshopTimer } from '../common/WorkshopTimer';

interface Module1SlidesProps {
  slideNumber: number;
}

export const Module1Slides: React.FC<Module1SlidesProps> = ({ slideNumber }) => {
  // Slide 7 state: Free-text vs Validated entry simulator
  const [formControlled, setFormControlled] = useState(false);

  // Slide 8 state: Active problem type
  const [problemIdx, setProblemIdx] = useState(0);

  // Slide 9 state: Spotlight problem category in Orders_Raw
  const [spotlightCat, setSpotlightCat] = useState<'dup' | 'miss' | 'inc' | 'err' | 'str'>('dup');

  // Slide 10 state: Visual test column & tool
  const [inspectCol, setInspectCol] = useState<'price' | 'city' | 'orderDate' | 'orderId'>('price');

  // Slide 11 state: Cleaning habits interactive rule preview
  const [caseRule, setCaseRule] = useState<'PROPER' | 'UPPER'>('PROPER');
  const [dateRule, setDateRule] = useState<'yyyy-mm-dd' | 'dd-mmm-yyyy'>('yyyy-mm-dd');

  // Slide 12 state: Hands-On 1 Spot the Dirt clickable cells + Issue Notes
  const [flaggedCells, setFlaggedCells] = useState<Record<string, boolean>>({});
  const [rowNotes, setRowNotes] = useState<Record<number, string>>({});
  const [showHint12, setShowHint12] = useState(false);
  const [revealAll12, setRevealAll12] = useState(false);

  if (slideNumber === 7) {
    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Root Causes in Real Projects</div>
            <ul className="space-y-5 text-[18px] leading-snug text-slate-800">
              <li className="flex gap-3.5">
                <span className="font-mono font-semibold text-teal-700">01.</span>
                <span><strong>Many people</strong> type into many systems with different habits.</span>
              </li>
              <li className="flex gap-3.5">
                <span className="font-mono font-semibold text-teal-700">02.</span>
                <span><strong>Forms allow free text</strong> instead of dropdowns and format checks.</span>
              </li>
              <li className="flex gap-3.5">
                <span className="font-mono font-semibold text-teal-700">03.</span>
                <span><strong>Old exports and merged files</strong> bring column and date mismatches.</span>
              </li>
              <li className="flex gap-3.5">
                <span className="font-mono font-semibold text-teal-700">04.</span>
                <span><strong>Cleaning is a normal step</strong> in every data project — never a surprise.</span>
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
            Compare on the right how three operators enter the exact same Chennai order.
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <div>
                <div className="text-xs font-medium text-slate-500">Source Entry Simulation</div>
                <h3 className="text-lg font-bold text-slate-900">
                  {formControlled ? 'Controlled Form (Dropdowns + Number Masks)' : 'Uncontrolled Free-Text Form'}
                </h3>
              </div>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setFormControlled(false)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                    !formControlled ? 'bg-white text-orange-700 shadow-xs font-semibold' : 'text-slate-600'
                  }`}
                >
                  Free-Text Input
                </button>
                <button
                  type="button"
                  onClick={() => setFormControlled(true)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                    formControlled ? 'bg-white text-teal-700 shadow-xs font-semibold' : 'text-slate-600'
                  }`}
                >
                  Validated Form
                </button>
              </div>
            </div>

            <table className="w-full text-left font-mono text-xs tabular-nums border border-slate-200">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Operator</th>
                  <th className="py-2.5 px-3">City Typed</th>
                  <th className="py-2.5 px-3">Date Typed</th>
                  <th className="py-2.5 px-3">Price Typed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3.5 px-3 font-sans font-medium text-slate-700">Intern A (Phone)</td>
                  <td className="py-3.5 px-3">{formControlled ? 'Chennai' : 'chennai '}</td>
                  <td className="py-3.5 px-3">{formControlled ? '2026-03-05' : '05/03/2026'}</td>
                  <td className="py-3.5 px-3">{formControlled ? '450' : 'Rs.450'}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-sans font-medium text-slate-700">Store Desk B</td>
                  <td className="py-3.5 px-3">{formControlled ? 'Chennai' : 'CHENNAI'}</td>
                  <td className="py-3.5 px-3">{formControlled ? '2026-03-05' : '5 March 2026'}</td>
                  <td className="py-3.5 px-3">{formControlled ? '450' : '450/-'}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-sans font-medium text-slate-700">CSV Export C</td>
                  <td className="py-3.5 px-3">{formControlled ? 'Chennai' : 'Madras (Chennai)'}</td>
                  <td className="py-3.5 px-3">{formControlled ? '2026-03-05' : '03-05-2026 (US)'}</td>
                  <td className="py-3.5 px-3">{formControlled ? '450' : 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700 flex items-center justify-between">
            <span>
              Unique City values seen by PivotTable:{' '}
              <strong className="font-mono text-slate-900">
                {formControlled ? '1 ("Chennai")' : '3 separate cities ("chennai ", "CHENNAI", "Madras (Chennai)")'}
              </strong>
            </span>
            <span className="font-semibold text-teal-700">
              {formControlled ? '✓ Ready for analysis' : '! Needs cleaning'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 8) {
    const types = [
      {
        num: '1',
        name: 'Duplicates',
        desc: 'Same record entered or imported more than once',
        dirty: 'Row 3: 1002 | PRIYA SHARMA | 1200\nRow 5: 1002 | PRIYA SHARMA | 1200',
        impact: 'Double-counts order count and inflates revenue totals.',
        clean: 'Single unique Order 1002 retained; duplicate flagged & removed.',
      },
      {
        num: '2',
        name: 'Missing values',
        desc: 'True blanks or text placeholders like N/A, -, Unknown',
        dirty: 'Qty: [blank]   |   Price: "N/A"',
        impact: 'Multiplication Qty * Price produces 0 or #VALUE! error; distorts averages.',
        clean: 'Placeholders standardized to true blank/null; owner consulted on 0 vs unknown.',
      },
      {
        num: '3',
        name: 'Inconsistent formats',
        desc: 'Mixed date styles, capitalisation, and spelling variants',
        dirty: '"chennai" vs "Chennai" | "05/03/2026" vs "2026-03-07" vs "7 March 2026"',
        impact: 'Filters miss records; dates sort alphabetically instead of chronologically.',
        clean: 'Proper Case ("Chennai") and ISO 8601 true date serials (2026-03-05).',
      },
      {
        num: '4',
        name: 'Errors and outliers',
        desc: 'Impossible, broken, or suspicious business values',
        dirty: 'Qty: -2   |   Email: priya@mail   |   ProductCode: P09',
        impact: 'Negative quantity subtracts from sales; invalid product fails lookup.',
        clean: 'Flagged in Issue Log for correction or excluded via business rule (Qty >= 1).',
      },
      {
        num: '5',
        name: 'Structural problems',
        desc: 'Numbers stored as text, extra spaces, or many values stuffed in one cell',
        dirty: 'Price: "Rs.450"   |   Customer: " ravi kumar "   |   "Anil  Verma"',
        impact: 'SUM() silently skips "Rs.450"; VLOOKUP fails when trailing spaces hide.',
        clean: 'Pure numeric 450 in Price; trimmed single-space text in Customer.',
      },
    ];

    const item = types[problemIdx];

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-6 flex flex-col justify-between gap-2.5">
          {types.map((t, idx) => (
            <button
              key={t.num}
              type="button"
              onClick={() => setProblemIdx(idx)}
              className={`w-full text-left px-5 py-3.5 rounded-xl border transition-colors cursor-pointer ${
                problemIdx === idx
                  ? 'bg-white border-teal-600 shadow-xs'
                  : 'bg-white/75 border-slate-200 hover:bg-white'
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono font-bold text-teal-700">{t.num}.</span>
                <div>
                  <span className="font-bold text-slate-900 text-base">{t.name}: </span>
                  <span className="text-sm text-slate-600">{t.desc}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="col-span-6 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <div className="text-xs font-medium text-teal-700 mb-1">
                Category 0{item.num} Anatomy
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{item.name}</h3>
            </div>

            <div className="p-4 rounded-lg border border-orange-200 bg-orange-50/50">
              <div className="text-xs font-semibold text-orange-900 mb-1.5">! Raw Messy Cell Example</div>
              <pre className="font-mono text-xs text-orange-950 whitespace-pre-wrap">{item.dirty}</pre>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="text-xs font-semibold text-slate-700 mb-1">Why Downstream Analysis Breaks</div>
              <p className="text-sm text-slate-700">{item.impact}</p>
            </div>

            <div className="p-4 rounded-lg border border-teal-200 bg-teal-50/40">
              <div className="text-xs font-semibold text-teal-900 mb-1">✓ Target Clean State</div>
              <p className="text-sm text-teal-950">{item.clean}</p>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
            Every issue in our workshop dataset falls into one of these five buckets.
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 9) {
    const mapRows: { id: 'dup' | 'miss' | 'inc' | 'err' | 'str'; problem: string; example: string }[] = [
      { id: 'dup', problem: 'Duplicate', example: 'Order 1002 appears twice' },
      { id: 'miss', problem: 'Missing', example: 'Blank Qty, N/A price' },
      { id: 'inc', problem: 'Inconsistent', example: 'chennai / Chennai, five date styles' },
      { id: 'err', problem: 'Error', example: 'Qty of -2, email priya@mail, code P09' },
      { id: 'str', problem: 'Structural', example: '"Rs.450" in the Price column (+ extra spaces)' },
    ];

    const isHighlighted = (rowNum: number, col: string) => {
      if (spotlightCat === 'dup') return rowNum === 3 || rowNum === 5;
      if (spotlightCat === 'miss') return ((rowNum === 3 || rowNum === 5) && col === 'qty') || (rowNum === 6 && col === 'price');
      if (spotlightCat === 'inc') return col === 'city' || col === 'orderDate' || col === 'customer';
      if (spotlightCat === 'err')
        return (rowNum === 7 && col === 'qty') || ((rowNum === 3 || rowNum === 5) && col === 'email') || (rowNum === 8 && col === 'productCode');
      if (spotlightCat === 'str') return (rowNum === 9 && col === 'price') || ((rowNum === 2 || rowNum === 4) && col === 'customer');
      return false;
    };

    return (
      <div className="h-full w-full grid grid-cols-12 gap-7 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-3">Click a row to spotlight cells</div>
            <table className="w-full text-left border-collapse text-sm border border-slate-200">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs">
                  <th className="py-2.5 px-3 border-r border-slate-200">Problem</th>
                  <th className="py-2.5 px-3">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mapRows.map((m) => (
                  <tr
                    key={m.id}
                    onClick={() => setSpotlightCat(m.id)}
                    className={`cursor-pointer transition-colors ${
                      spotlightCat === m.id ? 'bg-orange-50/80 font-semibold text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <td className="py-3 px-3 border-r border-slate-200 whitespace-nowrap">{m.problem}</td>
                    <td className="py-3 px-3 text-xs leading-relaxed">{m.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
            Notice how Order 1002 triggers Duplicate, Missing, Inconsistent, and Error rules simultaneously!
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate-700 mb-2">
            Orders_Raw X-Ray — Highlighting: <span className="text-orange-700 uppercase">{spotlightCat}</span>
          </div>
          <table className="w-full text-left border-collapse font-mono text-[11.5px] tabular-nums border border-slate-200">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
                <th className="py-2 px-2">ID</th>
                <th className="py-2 px-2">Customer</th>
                <th className="py-2 px-2">City</th>
                <th className="py-2 px-2">OrderDate</th>
                <th className="py-2 px-2">Code</th>
                <th className="py-2 px-2">Qty</th>
                <th className="py-2 px-2">Price</th>
                <th className="py-2 px-2">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {ORDERS_RAW.map((r) => (
                <tr key={r.rowNum}>
                  {(['orderId', 'customer', 'city', 'orderDate', 'productCode', 'qty', 'price', 'email'] as const).map((col) => {
                    const hit = isHighlighted(r.rowNum, col);
                    const val = r[col];
                    return (
                      <td
                        key={col}
                        className={`py-2.5 px-2 whitespace-pre transition-colors ${
                          hit ? 'bg-orange-100 text-orange-950 font-semibold' : 'text-slate-700'
                        }`}
                      >
                        {val || '(blank)'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-slate-500 pt-2">
            Highlighted cells indicate exact locations matching the selected problem type.
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 10) {
    const statsByCol = {
      price: {
        label: 'Column G · Price',
        count: 8,
        numCount: 6,
        verdict: '! Count (8) ≠ Numerical Count (6) — "N/A" and "Rs.450" are stored as TEXT!',
        variants: ['300', '450', '1200', 'N/A (Text)', 'Rs.450 (Text)'],
      },
      city: {
        label: 'Column C · City',
        count: 8,
        numCount: 0,
        verdict: '! Filter dropdown exposes 6 spelling/case variants for just 4 real cities!',
        variants: ['chennai', 'Chennai', 'coimbatore', 'Coimbatore', 'MADURAI', 'Trichy'],
      },
      orderDate: {
        label: 'Column D · OrderDate',
        count: 8,
        numCount: 5,
        verdict: '! Left-aligned dates like "7 March 2026" or "09-03-2026" are text, not real date numbers!',
        variants: ['05/03/2026', '2026-03-07', '7 March 2026 (Left-aligned text)', '09-03-2026'],
      },
      orderId: {
        label: 'Column A · OrderID',
        count: 8,
        numCount: 8,
        verdict: '! Conditional Formatting → Highlight Duplicate Values lights up 1002 immediately!',
        variants: ['1001', '1002 (Duplicate ×2)', '1003', '1004', '1005', '1006', '1007'],
      },
    };

    const activeStat = statsByCol[inspectCol];

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">5-Second Diagnostic Checks</div>
            <ul className="space-y-4 text-[16px] leading-snug text-slate-800">
              <li className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <strong>Status bar:</strong> if <code className="font-mono text-xs">Count</code> differs from <code className="font-mono text-xs">Numerical Count</code>, some numbers are text.
              </li>
              <li className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <strong>Alignment clue:</strong> Left-aligned numbers or dates usually mean text (real numbers &amp; dates align right by default).
              </li>
              <li className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <strong>Filter dropdown:</strong> shows distinct spelling &amp; case variants alphabetically.
              </li>
              <li className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <strong>Conditional Formatting:</strong> Home → Highlight Cells Rules → Duplicate Values.
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <div className="text-sm font-bold text-slate-900">Interactive Spreadsheet Status Bar &amp; Filter Test</div>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                {(
                  [
                    { id: 'price', label: 'Select Price' },
                    { id: 'city', label: 'Select City' },
                    { id: 'orderDate', label: 'Select Date' },
                    { id: 'orderId', label: 'Select OrderID' },
                  ] as const
                ).map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setInspectCol(b.id)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                      inspectCol === b.id ? 'bg-white text-teal-800 shadow-xs font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="text-xs font-medium text-slate-500 mb-2">
                Filter Dropdown Preview for {activeStat.label}:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {activeStat.variants.map((v) => (
                  <div
                    key={v}
                    className="px-3 py-2 border border-slate-200 rounded-md font-mono text-xs text-slate-800 bg-slate-50 flex items-center gap-2"
                  >
                    <span className="w-3.5 h-3.5 border border-slate-400 rounded-xs bg-white inline-block shrink-0" />
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg border border-orange-200 bg-orange-50/60 text-sm text-orange-950 font-medium">
              {activeStat.verdict}
            </div>
          </div>

          <div className="px-4 py-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs flex items-center justify-between tabular-nums">
            <span>READY · {activeStat.label}</span>
            <div className="flex items-center gap-5">
              <span>Count: <strong>{activeStat.count}</strong></span>
              <span>Numerical Count: <strong className="text-amber-300">{activeStat.numCount}</strong></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 11) {
    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-6 flex flex-col justify-between gap-3">
          {[
            {
              n: '01',
              title: 'Keep the raw data untouched',
              desc: 'Always duplicate Orders_Raw into Orders_Clean before editing a single character.',
            },
            {
              n: '02',
              title: 'Decide the rule first (Proper Case, yyyy-mm-dd)',
              desc: 'Agree on formatting standards and missing-data rules before writing formulas.',
            },
            {
              n: '03',
              title: 'Record every change',
              desc: 'Maintain an Issue Notes column or Cleaning Log so anyone can audit your decisions.',
            },
            {
              n: '04',
              title: 'Check after cleaning: rows before vs after',
              desc: 'Reconcile row counts, blank counts, and column sums before and after removing rows.',
            },
          ].map((h) => (
            <div key={h.n} className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4">
              <span className="font-mono text-lg font-bold text-teal-700 tabular-nums">{h.n}.</span>
              <div>
                <h3 className="text-base font-bold text-slate-900">{h.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-6 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Interactive Habit #2 &amp; #4 Preview</div>
            <h3 className="text-xl font-bold text-slate-900 mb-5">Project Cleaning Rulebook &amp; Audit Check</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="text-xs font-semibold text-slate-600 mb-2">City &amp; Name Case Rule</div>
                <div className="flex gap-1.5">
                  {(['PROPER', 'UPPER'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setCaseRule(r)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-md cursor-pointer ${
                        caseRule === r ? 'bg-teal-700 text-white font-semibold' : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <div className="mt-3 font-mono text-xs text-slate-700">
                  "chennai" → <strong>{caseRule === 'PROPER' ? 'Chennai' : 'CHENNAI'}</strong>
                </div>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="text-xs font-semibold text-slate-600 mb-2">Standard Date Format</div>
                <div className="flex gap-1.5">
                  {(['yyyy-mm-dd', 'dd-mmm-yyyy'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDateRule(d)}
                      className={`px-2.5 py-1.5 text-xs font-mono rounded-md cursor-pointer ${
                        dateRule === d ? 'bg-teal-700 text-white font-semibold' : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <div className="mt-3 font-mono text-xs text-slate-700">
                  05/03/2026 → <strong>{dateRule === 'yyyy-mm-dd' ? '2026-03-05' : '05-Mar-2026'}</strong>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 border-b border-slate-200">
                Habit #4: Before vs After Reconciliation Summary
              </div>
              <div className="divide-y divide-slate-100 font-mono text-xs tabular-nums">
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="text-slate-600">Rows in Orders_Raw (Before)</span>
                  <span className="font-semibold">8 rows</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="text-slate-600">Exact Duplicates Removed (Order 1002)</span>
                  <span className="text-orange-700 font-semibold">-1 row</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between bg-teal-50/40">
                  <span className="text-teal-950 font-semibold">Rows in Orders_Clean (After)</span>
                  <span className="text-teal-800 font-bold">7 rows (Accounted 100%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
            ISO format <code className="font-mono text-slate-800">yyyy-mm-dd</code> sorts accurately even when exported to CSV or SQL.
          </div>
        </div>
      </div>
    );
  }

  // Slide 12: HANDS-ON 1: Spot the Dirt (15 min)
  const totalDirtyCells = ORDERS_RAW.reduce((acc, r) => acc + Object.keys(r.issues).length, 0);
  const correctlyFound = ORDERS_RAW.reduce((acc, r) => {
    return (
      acc +
      Object.keys(r.issues).filter((col) => flaggedCells[`${r.rowNum}_${col}`]).length
    );
  }, 0);

  const toggleCell = (rowNum: number, col: string) => {
    if (revealAll12) return;
    const key = `${rowNum}_${col}`;
    setFlaggedCells((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-full w-full flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-3">
        <div className="flex items-center gap-6 text-xs text-slate-700">
          <span><strong>1.</strong> Copy <code className="font-mono">Orders_Raw</code> → <code className="font-mono">Orders_Clean</code></span>
          <span><strong>2.</strong> Add col I <code className="font-mono">Issue Notes</code></span>
          <span><strong>3.</strong> Click dirty cells below &amp; log notes</span>
          <span className="font-mono font-bold text-teal-800 tabular-nums">
            Score: {revealAll12 ? totalDirtyCells : correctlyFound} / {totalDirtyCells} Dirt Cells Spotted
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowHint12((h) => !h)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 cursor-pointer whitespace-nowrap"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint12 ? 'Hide Hint' : 'Hint'}</span>
          </button>
          <button
            type="button"
            onClick={() => setRevealAll12((r) => !r)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 cursor-pointer whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{revealAll12 ? 'Hide Answers' : 'Reveal All'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setFlaggedCells({});
              setRowNotes({});
              setRevealAll12(false);
            }}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md cursor-pointer"
            title="Reset grid"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <WorkshopTimer defaultMinutes={15} />
        </div>
      </div>

      {showHint12 && (
        <div className="px-4 py-2 rounded-lg border border-orange-200 bg-orange-50/70 text-xs text-orange-950">
          <strong>Hint:</strong> Check hidden spaces (Row 2 &amp; Row 4), mixed case, 5 date formats, numbers stored as text ("Rs.450", "N/A"), blank &amp; negative Qty (-2), duplicate Order 1002, invalid email (priya@mail), and bad ProductCode (P09).
        </div>
      )}

      <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-center px-4 py-2">
        <table className="w-full text-left border-collapse font-mono text-[12px] tabular-nums border border-slate-200">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-[11px]">
              <th className="py-2 px-2 border-r border-slate-200 text-center w-9">Row</th>
              <th className="py-2 px-2 border-r border-slate-200">OrderID</th>
              <th className="py-2 px-2 border-r border-slate-200">Customer</th>
              <th className="py-2 px-2 border-r border-slate-200">City</th>
              <th className="py-2 px-2 border-r border-slate-200">OrderDate</th>
              <th className="py-2 px-2 border-r border-slate-200">Code</th>
              <th className="py-2 px-2 border-r border-slate-200">Qty</th>
              <th className="py-2 px-2 border-r border-slate-200">Price</th>
              <th className="py-2 px-2 border-r border-slate-200">Email</th>
              <th className="py-2 px-2.5 font-sans font-semibold text-teal-800 w-64">I · Issue Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {ORDERS_RAW.map((r) => {
              const autoSummary = Object.values(r.issues).join('; ');
              return (
                <tr key={r.rowNum}>
                  <td className="py-2 px-2 border-r border-slate-200 text-center bg-slate-50 text-slate-400">
                    {r.rowNum}
                  </td>
                  {(['orderId', 'customer', 'city', 'orderDate', 'productCode', 'qty', 'price', 'email'] as const).map(
                    (col) => {
                      const key = `${r.rowNum}_${col}`;
                      const isDirty = Boolean(r.issues[col]);
                      const isClicked = Boolean(flaggedCells[key]);
                      const showAsDirty = revealAll12 ? isDirty : isClicked && isDirty;
                      const showFalseAlarm = !revealAll12 && isClicked && !isDirty;

                      return (
                        <td
                          key={col}
                          onClick={() => toggleCell(r.rowNum, col)}
                          title={revealAll12 && r.issues[col] ? r.issues[col] : 'Click to flag issue'}
                          className={`py-2 px-2 border-r border-slate-200 whitespace-pre cursor-pointer select-none transition-colors ${
                            showAsDirty
                              ? 'bg-orange-100 text-orange-950 font-semibold'
                              : showFalseAlarm
                              ? 'bg-slate-200 text-slate-600'
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span>{r[col] ? r[col].replace(/ /g, '·') : '(blank)'}</span>
                            {showAsDirty && <Check className="w-3 h-3 text-orange-700 shrink-0" />}
                          </div>
                        </td>
                      );
                    }
                  )}
                  <td className="py-1.5 px-2 font-sans text-[11px]">
                    {revealAll12 ? (
                      <span className="text-teal-900 font-medium">{autoSummary}</span>
                    ) : (
                      <input
                        type="text"
                        value={rowNotes[r.rowNum] || ''}
                        onChange={(e) => setRowNotes((p) => ({ ...p, [r.rowNum]: e.target.value }))}
                        placeholder="Type issue note..."
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded-sm focus:outline-none focus:border-teal-600"
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
