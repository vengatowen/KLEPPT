import React, { useState } from 'react';
import { RotateCcw, Eye, Check, AlertCircle } from 'lucide-react';
import { WorkshopTimer } from '../common/WorkshopTimer';

interface Module2SlidesBProps {
  slideNumber: number;
}

export const Module2SlidesB: React.FC<Module2SlidesBProps> = ({ slideNumber }) => {
  // Slide 18 state: Date locale DMY vs MDY + General format serial toggle
  const [dateLocale, setDateLocale] = useState<'DMY' | 'MDY'>('DMY');
  const [showSerial, setShowSerial] = useState(false);

  // Slide 19 state: Duplicates & Blanks
  const [blankPolicy, setBlankPolicy] = useState<'empty' | 'zero'>('empty');

  // Slide 20 state: Live Data Validation sandbox
  const [testCity, setTestCity] = useState('Chennai');
  const [testQty, setTestQty] = useState('3');
  const [testOrderId, setTestOrderId] = useState('1008');
  const [circleInvalid, setCircleInvalid] = useState(false);

  // Slide 21 state: Find and Replace wildcard / match entire cell trap
  const [matchEntireCell, setMatchEntireCell] = useState(false);
  const [replacedDone, setReplacedDone] = useState(false);

  // Slide 22 state: Hands-On 2B 5-step pipeline
  const [steps22, setSteps22] = useState<boolean[]>([false, false, false, false]);
  const [revealCheck22, setRevealCheck22] = useState(false);

  if (slideNumber === 18) {
    const rawDates = [
      { row: 2, raw: '05/03/2026', dmy: '2026-03-05 (5 Mar)', mdy: '2026-05-03 (3 May!)', serialDmy: '46086' },
      { row: 3, raw: '2026-03-07', dmy: '2026-03-07 (7 Mar)', mdy: '2026-03-07 (7 Mar)', serialDmy: '46088' },
      { row: 4, raw: '7 March 2026', dmy: '2026-03-07 (=DATEVALUE)', mdy: '2026-03-07 (=DATEVALUE)', serialDmy: '46088' },
      { row: 6, raw: '09-03-2026', dmy: '2026-03-09 (9 Mar)', mdy: '2026-09-03 (3 Sep!)', serialDmy: '46090' },
      { row: 9, raw: '13/03/2026', dmy: '2026-03-13 (13 Mar)', mdy: 'TEXT FAIL (No Month 13!)', serialDmy: '46094' },
    ];

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Date Standardisation Steps</div>
            <ul className="space-y-4 text-[15.5px] leading-snug text-slate-800">
              <li>
                • <strong>Data → Text to Columns:</strong> Next → Next → choose <strong>Date: DMY</strong> → Finish.
              </li>
              <li>
                • <code className="font-mono text-xs text-teal-800 font-semibold">=DATEVALUE(D4)</code> converts written text like <code className="font-mono text-xs">"7 March 2026"</code>.
              </li>
              <li>
                • Format all dates as <code className="font-mono text-xs font-semibold">yyyy-mm-dd</code> (Format Cells → Custom).
              </li>
              <li>
                • <strong>True Date Test:</strong> switch format to <code className="font-mono text-xs">General</code> — a real date turns into a serial number (days since 1 Jan 1900).
              </li>
              <li className="text-orange-900 bg-orange-50/70 p-3 rounded-lg border border-orange-200 text-xs leading-relaxed">
                <strong>Ambiguity Warning:</strong> Is <code className="font-mono">05/03/2026</code> the 5th of March or the 3rd of May? Always confirm the source format!
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">DMY vs MDY Parser &amp; Serial Number Test</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setDateLocale('DMY')}
                    className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                      dateLocale === 'DMY' ? 'bg-white text-teal-800 shadow-xs font-semibold' : 'text-slate-600'
                    }`}
                  >
                    Source: DMY (India)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDateLocale('MDY')}
                    className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                      dateLocale === 'MDY' ? 'bg-white text-orange-700 shadow-xs font-semibold' : 'text-slate-600'
                    }`}
                  >
                    Wrong: MDY (US)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSerial((s) => !s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border cursor-pointer ${
                    showSerial ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {showSerial ? 'Format: General (Serial)' : 'Format: yyyy-mm-dd'}
                </button>
              </div>
            </div>

            <table className="w-full text-left border-collapse font-mono text-xs tabular-nums border border-slate-200">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Row</th>
                  <th className="py-2.5 px-3">Raw OrderDate</th>
                  <th className="py-2.5 px-3">Parsed Result ({dateLocale})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rawDates.map((d) => {
                  const badMdy = dateLocale === 'MDY' && (d.row === 2 || d.row === 6 || d.row === 9);
                  return (
                    <tr key={d.row}>
                      <td className="py-3 px-3 text-slate-400">{d.row}</td>
                      <td className="py-3 px-3 text-slate-800">{d.raw}</td>
                      <td
                        className={`py-3 px-3 font-semibold ${
                          badMdy ? 'bg-orange-50 text-orange-800' : 'text-teal-800'
                        }`}
                      >
                        {showSerial
                          ? dateLocale === 'MDY' && d.row === 9
                            ? '"13/03/2026" (Left-aligned text!)'
                            : d.serialDmy
                          : dateLocale === 'DMY'
                          ? d.dmy
                          : d.mdy}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700">
            <strong>Clue in Row 9:</strong> <code className="font-mono">13/03/2026</code> proves the first number is the <strong>Day</strong> (there is no 13th month), confirming <code className="font-mono">05/03/2026</code> is <strong>5 March 2026</strong>!
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 19) {
    const qtysEmpty = [2, null, 3, 1, -2, 5, 4]; // deduplicated 7 rows
    const validPositive = [2, 3, 1, 5, 4]; // 5 known valid rows -> sum 15 / 5 = 3.00
    const avgIfBlankIgnored = (15 / 5).toFixed(2); // 3.00 (excluding blank & flagged -2)
    const avgIfBlankZero = (15 / 6).toFixed(2); // 2.50 (if blank turned into 0!)

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-6 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-3">Techniques for Duplicates &amp; Blanks</div>
            <ul className="space-y-3.5 text-[15px] leading-snug text-slate-800">
              <li>
                • <strong>Flag first, delete later:</strong>
                <code className="block font-mono text-xs text-teal-800 font-semibold mt-1 bg-slate-50 p-2 rounded border border-slate-200">
                  =COUNTIFS($A$2:A2, A2, $B$2:B2, B2)
                </code>
              </li>
              <li>
                • <strong>Data → Remove Duplicates:</strong> tick exact columns that define a duplicate.
              </li>
              <li>
                • <strong>Go To Special → Blanks</strong> (<code className="font-mono text-xs">Ctrl+G</code>) selects every empty cell at once.
              </li>
              <li>
                • <code className="font-mono text-xs text-teal-800 font-semibold">=COUNTBLANK(F2:F9)</code> counts blanks;{' '}
                <code className="font-mono text-xs text-teal-800 font-semibold">=IF(G5="N/A","",G5)</code> clears text placeholders.
              </li>
              <li className="font-semibold text-slate-900">
                • Crucial question — Ask the data owner: <em>Is a blank zero or unknown?</em>
              </li>
            </ul>
          </div>
          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200 tabular-nums">
            Notice <code className="font-mono">$A$2:A2</code>: Row 3 (first 1002) returns <strong>1</strong>; Row 5 (second 1002) expands to <code className="font-mono">$A$2:A5</code> and returns <strong>2</strong>!
          </div>
        </div>

        <div className="col-span-6 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Interactive Business Decision Lab</div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Does Blank Qty = 0 or Unknown? Watch <code className="font-mono text-base">AVERAGE()</code> Change!
            </h3>

            <div className="flex items-center gap-2 mb-5">
              <button
                type="button"
                onClick={() => setBlankPolicy('empty')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                  blankPolicy === 'empty'
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Keep Blank = Unknown (Ignored by AVERAGE)
              </button>
              <button
                type="button"
                onClick={() => setBlankPolicy('zero')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                  blankPolicy === 'zero'
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Replace Blank with 0 (Included in AVERAGE)
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2 mb-5 font-mono text-xs text-center tabular-nums">
              {validPositive.slice(0, 1).map((v, idx) => (
                <div key={idx} className="p-2.5 border border-slate-200 rounded bg-slate-50">Qty: {v}</div>
              ))}
              <div
                className={`p-2.5 border rounded font-bold ${
                  blankPolicy === 'zero'
                    ? 'border-orange-300 bg-orange-50 text-orange-900'
                    : 'border-teal-300 bg-teal-50 text-teal-900'
                }`}
              >
                {blankPolicy === 'zero' ? 'Qty: 0' : '(blank)'}
              </div>
              {validPositive.slice(1).map((v, idx) => (
                <div key={idx} className="p-2.5 border border-slate-200 rounded bg-slate-50">Qty: {v}</div>
              ))}
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between tabular-nums">
              <div>
                <div className="text-xs text-slate-500">Calculated Average Order Qty</div>
                <div className="font-mono text-2xl font-bold text-slate-900 mt-0.5">
                  {blankPolicy === 'empty' ? `${avgIfBlankIgnored} units` : `${avgIfBlankZero} units`}
                </div>
              </div>
              <div className="text-xs text-slate-600 max-w-xs text-right">
                {blankPolicy === 'empty'
                  ? 'Divides 15 units across 5 known orders. Safe when Priya’s Qty was simply forgotten.'
                  : 'Divides 15 units across 6 orders! Artificially drags average down by 17%.'}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
            Count of blanks in raw F2:F9 (<code className="font-mono">{qtysEmpty.length + 1}</code> rows) via <code className="font-mono">=COUNTBLANK(F2:F9)</code> is <strong>2</strong>.
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 20) {
    const allowedCities = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy'];
    const cityOk = allowedCities.includes(testCity);
    const qtyNum = Number(testQty);
    const qtyOk = Number.isInteger(qtyNum) && qtyNum >= 1 && testQty.trim() !== '';
    const existingIds = ['1001', '1002', '1003', '1004', '1005', '1006', '1007'];
    const idOk = testOrderId.trim() !== '' && !existingIds.includes(testOrderId.trim());

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Preventive Rules (Data → Data Validation)</div>
            <ul className="space-y-3.5 text-[15px] leading-snug text-slate-800">
              <li>• <strong>List:</strong> dropdown of allowed cities (<code className="font-mono text-xs">Chennai, Coimbatore, Madurai, Trichy</code>)</li>
              <li>• <strong>Whole number:</strong> <code className="font-mono text-xs">Qty</code> must be <code className="font-mono text-xs">1</code> or more</li>
              <li>• <strong>Date:</strong> between <code className="font-mono text-xs">1 Jan 2026</code> and <code className="font-mono text-xs">=TODAY()</code></li>
              <li>• <strong>Custom:</strong> <code className="font-mono text-xs text-teal-800 font-semibold">=COUNTIF($A:$A,A2)=1</code> blocks duplicate IDs</li>
              <li>• <strong>Circle Invalid Data:</strong> highlights pre-existing bad values already on the sheet</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-slate-200 text-sm font-bold text-teal-900">
            “Best cleaning is the cleaning you never need to do.”
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Live Data Validation Gatekeeper</h3>
              <button
                type="button"
                onClick={() => setCircleInvalid((c) => !c)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border cursor-pointer ${
                  circleInvalid
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {circleInvalid ? 'Showing Red Validation Circles' : 'Click: Circle Invalid Data'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="p-3.5 border border-slate-200 rounded-lg bg-slate-50">
                <label className="block text-xs font-semibold text-slate-600 mb-1">OrderID (Unique)</label>
                <input
                  type="text"
                  value={testOrderId}
                  onChange={(e) => setTestOrderId(e.target.value)}
                  placeholder="Try 1001 vs 1008"
                  className={`w-full px-2.5 py-1.5 font-mono text-xs border rounded ${
                    idOk ? 'border-teal-500 bg-white' : 'border-red-500 bg-red-50'
                  }`}
                />
                <div className={`text-[11px] mt-1.5 font-medium ${idOk ? 'text-teal-800' : 'text-red-700'}`}>
                  {idOk ? '✓ Unique ID accepted' : '× Blocked: Duplicate ID!'}
                </div>
              </div>

              <div className="p-3.5 border border-slate-200 rounded-lg bg-slate-50">
                <label className="block text-xs font-semibold text-slate-600 mb-1">City (List Rule)</label>
                <input
                  type="text"
                  value={testCity}
                  onChange={(e) => setTestCity(e.target.value)}
                  placeholder="Try chennai"
                  className={`w-full px-2.5 py-1.5 font-mono text-xs border rounded ${
                    cityOk ? 'border-teal-500 bg-white' : 'border-red-500 bg-red-50'
                  }`}
                />
                <div className={`text-[11px] mt-1.5 font-medium ${cityOk ? 'text-teal-800' : 'text-red-700'}`}>
                  {cityOk ? '✓ Matches allowed list' : '× Blocked: Use Proper Case list'}
                </div>
              </div>

              <div className="p-3.5 border border-slate-200 rounded-lg bg-slate-50">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Qty (Whole ≥ 1)</label>
                <input
                  type="text"
                  value={testQty}
                  onChange={(e) => setTestQty(e.target.value)}
                  placeholder="Try -2 or 1.5"
                  className={`w-full px-2.5 py-1.5 font-mono text-xs border rounded ${
                    qtyOk ? 'border-teal-500 bg-white' : 'border-red-500 bg-red-50'
                  }`}
                />
                <div className={`text-[11px] mt-1.5 font-medium ${qtyOk ? 'text-teal-800' : 'text-red-700'}`}>
                  {qtyOk ? '✓ Valid positive integer' : '× Blocked: Must be whole ≥ 1'}
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-3.5 bg-white">
              <div className="text-xs font-semibold text-slate-600 mb-2">
                Existing Rows Audit (Data Validation does not block old mistakes until you audit them):
              </div>
              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-2 border border-slate-200 rounded flex items-center justify-between">
                  <span>Row 3 Qty:</span>
                  <span className={circleInvalid ? 'px-2 py-0.5 rounded-full border-2 border-red-600 text-red-700 font-bold' : ''}>
                    (blank)
                  </span>
                </div>
                <div className="p-2 border border-slate-200 rounded flex items-center justify-between">
                  <span>Row 7 Qty:</span>
                  <span className={circleInvalid ? 'px-2 py-0.5 rounded-full border-2 border-red-600 text-red-700 font-bold' : ''}>
                    -2
                  </span>
                </div>
                <div className="p-2 border border-slate-200 rounded flex items-center justify-between">
                  <span>Row 9 City:</span>
                  <span className={circleInvalid ? 'px-2 py-0.5 rounded-full border-2 border-red-600 text-red-700 font-bold' : ''}>
                    coimbatore
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-2">
            Try typing <code className="font-mono">1002</code> in OrderID or <code className="font-mono">-2</code> in Qty above to trigger live validation rejection!
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 21) {
    const sampleCodes = ['P1', 'P10', 'P12', 'P2', 'P1'];
    const outputCodes = sampleCodes.map((c) => {
      if (!replacedDone) return c;
      if (matchEntireCell) {
        return c === 'P1' ? 'P01' : c;
      }
      return c.replace('P1', 'P01');
    });

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Precision Bulk Replacement</div>
            <ul className="space-y-4 text-[16px] leading-snug text-slate-800">
              <li>• Shortcut: <code className="font-mono font-bold text-teal-800">Ctrl + H</code> (works in Excel &amp; Google Sheets)</li>
              <li>
                • <strong>Wildcards:</strong>
                <div className="mt-1.5 space-y-1 text-sm text-slate-600 font-mono">
                  <div>*  → matches any sequence of text</div>
                  <div>?  → matches any single character</div>
                  <div>~  → escapes literal *, ?, or ~ symbol</div>
                </div>
              </li>
              <li>
                • Tick <strong>Match entire cell contents</strong> to avoid damaging <code className="font-mono text-xs">P10</code> while replacing <code className="font-mono text-xs">P1</code>!
              </li>
              <li>• Always click <strong>Find Next</strong> to test before clicking <strong>Replace All</strong>.</li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <div>
                <div className="text-xs font-medium text-slate-500">Interactive Ctrl+H Trap Demo</div>
                <h3 className="text-lg font-bold text-slate-900">Find "P1" → Replace with "P01"</h3>
              </div>
              <button
                type="button"
                onClick={() => setReplacedDone(false)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 mb-5 flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-sm font-medium text-slate-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={matchEntireCell}
                  onChange={(e) => {
                    setMatchEntireCell(e.target.checked);
                    setReplacedDone(false);
                  }}
                  className="w-4 h-4 accent-teal-700"
                />
                <span>Match entire cell contents</span>
              </label>

              <button
                type="button"
                onClick={() => setReplacedDone(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Click: Replace All
              </button>
            </div>

            <div className="grid grid-cols-5 gap-3 font-mono text-center">
              {sampleCodes.map((orig, i) => {
                const after = outputCodes[i];
                const corrupted = replacedDone && !matchEntireCell && (orig === 'P10' || orig === 'P12');
                const fixedRight = replacedDone && orig === 'P1';
                return (
                  <div
                    key={i}
                    className={`p-3.5 rounded-lg border ${
                      corrupted
                        ? 'border-red-300 bg-red-50 text-red-900'
                        : fixedRight
                        ? 'border-teal-300 bg-teal-50 text-teal-900'
                        : 'border-slate-200 bg-white text-slate-800'
                    }`}
                  >
                    <div className="text-[11px] text-slate-400 mb-1">Before: {orig}</div>
                    <div className="text-base font-bold">{after}</div>
                    {corrupted && <div className="text-[10px] text-red-700 font-sans mt-1">! Damaged</div>}
                    {fixedRight && <div className="text-[10px] text-teal-700 font-sans mt-1">✓ Fixed</div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
            <span>
              {replacedDone && !matchEntireCell
                ? 'Look at P10 and P12 — because "P1" is inside "P10", Replace All corrupted them into P010 and P012! Tick "Match entire cell contents" and re-test.'
                : replacedDone && matchEntireCell
                ? 'Perfect! Only exact "P1" cells changed to "P01"; P10 and P12 remained untouched.'
                : 'Leave the checkbox unticked first and click Replace All to see the classic P10 corruption bug.'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Slide 22: HANDS-ON 2B: Clean the Orders (15 min)
  const toggleStep22 = (idx: number) => {
    setSteps22((p) => p.map((v, i) => (i === idx ? !v : v)));
  };
  const deduped = steps22[0];
  const datesFixed = steps22[1];
  const qtyFlagged = steps22[2];

  const previewRows22 = [
    { id: '1001', cust: 'Ravi Kumar', city: 'Chennai', date: datesFixed ? '2026-03-05' : '05/03/2026', qty: '2', price: 450, note: '' },
    { id: '1002', cust: 'Priya Sharma', city: 'Coimbatore', date: '2026-03-07', qty: '', price: 1200, note: qtyFlagged ? 'Blank Qty — ask owner' : '' },
    ...(deduped
      ? []
      : [{ id: '1002 (Dup)', cust: 'Priya Sharma', city: 'Coimbatore', date: '2026-03-07', qty: '', price: 1200, note: 'Flag=2 -> Remove' }]),
    { id: '1003', cust: 'Anil Verma', city: 'Madurai', date: datesFixed ? '2026-03-07' : '7 March 2026', qty: '3', price: 450, note: '' },
    { id: '1004', cust: 'Meena Iyer', city: 'Chennai', date: datesFixed ? '2026-03-09' : '09-03-2026', qty: '1', price: '', note: 'N/A cleared' },
    { id: '1005', cust: 'Suresh Babu', city: 'Trichy', date: datesFixed ? '2026-03-10' : '10/03/2026', qty: '-2', price: 1200, note: qtyFlagged ? 'Negative Qty — return?' : '' },
    { id: '1006', cust: 'Ravi Kumar', city: 'Chennai', date: datesFixed ? '2026-03-12' : '12/03/2026', qty: '5', price: 300, note: 'Code P09 check' },
    { id: '1007', cust: 'Divya R', city: 'Coimbatore', date: datesFixed ? '2026-03-13' : '13/03/2026', qty: '4', price: 450, note: '' },
  ];

  return (
    <div className="h-full w-full flex flex-col justify-between gap-3.5">
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-2.5">
        <div className="flex items-center gap-3">
          {[
            '1. Deduplicate (8 → 7 rows)',
            '2. Dates → yyyy-mm-dd',
            '3. Highlight & Note Bad Qty',
            '4. Add Validation + Save v1',
          ].map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => toggleStep22(i)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                steps22[i]
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {steps22[i] ? `✓ ${label}` : label}
            </button>
          ))}
        </div>

        <WorkshopTimer defaultMinutes={15} />
      </div>

      <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-xl px-5 py-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-1 tabular-nums">
          <span>
            Live State of <code className="font-mono font-semibold text-slate-900">Orders_Clean_v1.xlsx</code> · Active Rows: <strong>{previewRows22.length}</strong>
          </span>
          <button
            type="button"
            onClick={() => setSteps22([true, true, true, true])}
            className="text-teal-700 font-semibold hover:underline cursor-pointer"
          >
            Apply All 4 Transformations
          </button>
        </div>

        <table className="w-full text-left border-collapse font-mono text-[11.5px] tabular-nums border border-slate-200">
          <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="py-1.5 px-2.5">OrderID</th>
              <th className="py-1.5 px-2.5">Customer_Clean</th>
              <th className="py-1.5 px-2.5">City_Clean</th>
              <th className="py-1.5 px-2.5">OrderDate</th>
              <th className="py-1.5 px-2.5">Qty</th>
              <th className="py-1.5 px-2.5 text-right">Price_Clean</th>
              <th className="py-1.5 px-2.5 font-sans">Issue Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {previewRows22.map((r) => {
              const badQty = qtyFlagged && (r.qty === '' || r.qty === '-2');
              return (
                <tr key={r.id}>
                  <td className="py-1.5 px-2.5">{r.id}</td>
                  <td className="py-1.5 px-2.5">{r.cust}</td>
                  <td className="py-1.5 px-2.5">{r.city}</td>
                  <td className={`py-1.5 px-2.5 ${datesFixed ? 'text-teal-800 font-semibold' : ''}`}>{r.date}</td>
                  <td className={`py-1.5 px-2.5 ${badQty ? 'bg-orange-100 text-orange-950 font-bold' : ''}`}>
                    {r.qty || '(blank)'}
                  </td>
                  <td className="py-1.5 px-2.5 text-right">{r.price === '' ? '(blank)' : r.price}</td>
                  <td className="py-1.5 px-2.5 font-sans text-xs text-slate-600">{r.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
          <div>
            <strong>Check Question:</strong> <em>Does your value look right, or is it right? (Is 450 a number or text?)</em>
            {revealCheck22 && (
              <span className="ml-2 text-teal-800 font-semibold">
                → Test with =ISNUMBER(G2) = TRUE, right-alignment, or Status Bar Numerical Count!
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setRevealCheck22((v) => !v)}
            className="inline-flex items-center gap-1 px-2.5 py-1 font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{revealCheck22 ? 'Hide Check Answer' : 'Reveal Check Answer'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
