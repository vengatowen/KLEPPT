import React, { useState } from 'react';
import { RotateCcw, Eye, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/datasets';
import { WorkshopTimer } from '../common/WorkshopTimer';

interface Module3SlidesProps {
  slideNumber: number;
}

const CLEAN_7_ORDERS = [
  { id: '1001', customer: 'Ravi Kumar', city: 'Chennai', date: '2026-03-05', code: 'P01', qty: 2, price: 450, flagged: false },
  { id: '1002', customer: 'Priya Sharma', city: 'Coimbatore', date: '2026-03-07', code: 'P02', qty: null as number | null, price: 1200, flagged: true },
  { id: '1003', customer: 'Anil Verma', city: 'Madurai', date: '2026-03-07', code: 'P01', qty: 3, price: 450, flagged: false },
  { id: '1004', customer: 'Meena Iyer', city: 'Chennai', date: '2026-03-09', code: 'P03', qty: 1, price: null as number | null, flagged: true },
  { id: '1005', customer: 'Suresh Babu', city: 'Trichy', date: '2026-03-10', code: 'P02', qty: -2, price: 1200, flagged: true },
  { id: '1006', customer: 'Ravi Kumar', city: 'Chennai', date: '2026-03-12', code: 'P09', qty: 5, price: 300, flagged: false },
  { id: '1007', customer: 'Divya R', city: 'Coimbatore', date: '2026-03-13', code: 'P01', qty: 4, price: 450, flagged: false },
];

export const Module3Slides: React.FC<Module3SlidesProps> = ({ slideNumber }) => {
  // Slide 23 state: Sorting
  const [sortMode, setSortMode] = useState<'none' | 'city' | 'multi' | 'scrambled'>('none');

  // Slide 24 state: Filtering
  const [cityFilter, setCityFilter] = useState<string>('ALL');
  const [minQtyFilter, setMinQtyFilter] = useState<boolean>(false);
  const [colorFilter, setColorFilter] = useState<boolean>(false);

  // Slide 25 state: Hands-On 3A
  const [task25Mode, setTask25Mode] = useState<'task1' | 'task2'>('task1');
  const [reveal25, setReveal25] = useState(false);

  // Slide 26 state: Why Lookups
  const [selectedOrderIdx, setSelectedOrderIdx] = useState(0);

  // Slide 27 state: VLOOKUP traps
  const [lockDollar, setLockDollar] = useState(true);
  const [exactMatchFalse, setExactMatchFalse] = useState(true);
  const [colInserted, setColInserted] = useState(false);

  // Slide 28 state: XLOOKUP
  const [spillTwoCols, setSpillTwoCols] = useState(false);
  const [xColInserted, setXColInserted] = useState(false);

  // Slide 29 state: Lookup Errors doctor
  const [fixedErrors, setFixedErrors] = useState<Record<string, boolean>>({});

  // Slide 30 state: Hands-On 3B
  const [reveal30, setReveal30] = useState(false);

  if (slideNumber === 23) {
    let displayed = [...CLEAN_7_ORDERS];
    const sortedCitiesOnly = [...CLEAN_7_ORDERS].map((r) => r.city).sort((a, b) => a.localeCompare(b));

    if (sortMode === 'city') {
      displayed.sort((a, b) => a.city.localeCompare(b.city));
    } else if (sortMode === 'multi') {
      displayed.sort((a, b) => {
        const c = a.city.localeCompare(b.city);
        if (c !== 0) return c;
        return b.date.localeCompare(a.date); // newest first
      });
    }

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Structured Sorting Rules</div>
            <ul className="space-y-4 text-[15.5px] leading-snug text-slate-800">
              <li>• Convert the range to a Table first: <code className="font-mono font-bold text-teal-800">Ctrl + T</code></li>
              <li>• <strong>Single sort:</strong> <code className="font-mono text-xs">City</code> A to Z</li>
              <li>• <strong>Multi-level sort:</strong> <code className="font-mono text-xs">City</code> A→Z, then <code className="font-mono text-xs">OrderDate</code> newest first (level order matters!)</li>
              <li>• <strong>Custom sort:</strong> logical order like <code className="font-mono text-xs">Low, Medium, High</code> instead of alphabetical</li>
              <li className="p-3.5 rounded-lg border border-red-200 bg-red-50/70 text-xs text-red-900 leading-relaxed">
                <strong>Warning:</strong> Click <em>one cell</em> inside the table; <strong>never highlight and sort a single column alone</strong> or records scramble permanently!
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                {(
                  [
                    { id: 'none', label: 'Original' },
                    { id: 'city', label: 'City A→Z' },
                    { id: 'multi', label: 'City + Newest Date' },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSortMode(m.id)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                      sortMode === m.id ? 'bg-white text-teal-800 shadow-xs font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSortMode(sortMode === 'scrambled' ? 'none' : 'scrambled')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                  sortMode === 'scrambled'
                    ? 'bg-red-600 text-white'
                    : 'bg-orange-50 text-orange-800 border border-orange-300 hover:bg-orange-100'
                }`}
              >
                {sortMode === 'scrambled' ? 'Reset Corrupted Table' : '! Demo: Sort City Column Alone'}
              </button>
            </div>

            <table className="w-full text-left border-collapse font-mono text-xs tabular-nums border border-slate-200">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2 px-3">OrderID</th>
                  <th className="py-2 px-3">Customer</th>
                  <th className="py-2 px-3">City</th>
                  <th className="py-2 px-3">OrderDate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {displayed.map((r, i) => {
                  const shownCity = sortMode === 'scrambled' ? sortedCitiesOnly[i] : r.city;
                  const wrongCity = sortMode === 'scrambled' && shownCity !== r.city;
                  return (
                    <tr key={r.id} className={wrongCity ? 'bg-red-50/70' : ''}>
                      <td className="py-2.5 px-3">{r.id}</td>
                      <td className="py-2.5 px-3">{r.customer}</td>
                      <td className={`py-2.5 px-3 font-semibold ${wrongCity ? 'text-red-700' : 'text-teal-800'}`}>
                        {shownCity} {wrongCity && '(Wrong!)'}
                      </td>
                      <td className="py-2.5 px-3">{r.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-600 pt-2">
            {sortMode === 'scrambled'
              ? '! DISASTER: Priya Sharma (1002) now says "Chennai" and Anil Verma (1003) says "Chennai"! Always sort the whole table.'
              : sortMode === 'multi'
              ? 'Notice Chennai rows: 2026-03-12 → 2026-03-09 → 2026-03-05 (newest first within each city).'
              : 'Select Multi-Level Sort above to see secondary sorting within matching cities.'}
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 24) {
    const filtered24 = CLEAN_7_ORDERS.filter((r) => {
      if (cityFilter !== 'ALL' && r.city !== cityFilter) return false;
      if (minQtyFilter && (r.qty === null || r.qty <= 2)) return false;
      if (colorFilter && !r.flagged) return false;
      return true;
    });

    const formulaParts: string[] = [];
    if (cityFilter !== 'ALL') formulaParts.push(`C2:C8="${cityFilter}"`);
    if (minQtyFilter) formulaParts.push('F2:F8>2');
    const dynamicFilterFormula =
      formulaParts.length > 0
        ? `=FILTER(A2:G8, ${formulaParts.join(', ')})`
        : '=FILTER(A2:G8, C2:C8="Chennai")';

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Filtering Capabilities</div>
            <ul className="space-y-4 text-[15.5px] leading-snug text-slate-800">
              <li>• <strong>Text filters:</strong> <code className="font-mono text-xs">begins with</code>, <code className="font-mono text-xs">contains</code></li>
              <li>• <strong>Number filters:</strong> <code className="font-mono text-xs">greater than</code>, <code className="font-mono text-xs">top 10</code></li>
              <li>• <strong>Date filters:</strong> <code className="font-mono text-xs">this month</code>, <code className="font-mono text-xs">between</code></li>
              <li>• <strong>Filter by colour:</strong> isolate highlighted anomaly cells immediately</li>
              <li>
                • <strong>Google Sheets &amp; Excel 365 formulas:</strong>
                <code className="block font-mono text-xs text-teal-800 font-semibold mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded">
                  =SORT()  and  =FILTER(A2:H, C2:C="Chennai")
                </code>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs font-medium border border-slate-300 rounded-md bg-white cursor-pointer"
                >
                  <option value="ALL">All Cities</option>
                  <option value="Chennai">City = Chennai</option>
                  <option value="Coimbatore">City = Coimbatore</option>
                  <option value="Madurai">City = Madurai</option>
                </select>

                <button
                  type="button"
                  onClick={() => setMinQtyFilter((v) => !v)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border cursor-pointer ${
                    minQtyFilter ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Qty &gt; 2
                </button>

                <button
                  type="button"
                  onClick={() => setColorFilter((v) => !v)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border cursor-pointer ${
                    colorFilter ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Highlighted Only
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCityFilter('ALL');
                  setMinQtyFilter(false);
                  setColorFilter(false);
                }}
                className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Clear Filters
              </button>
            </div>

            <div className="mb-3 px-3 py-2 bg-slate-900 text-teal-300 font-mono text-xs rounded-lg">
              {dynamicFilterFormula}
            </div>

            <table className="w-full text-left border-collapse font-mono text-xs tabular-nums border border-slate-200">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2 px-3">OrderID</th>
                  <th className="py-2 px-3">Customer</th>
                  <th className="py-2 px-3">City</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3 text-right">Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered24.map((r) => (
                  <tr key={r.id} className={r.flagged ? 'bg-orange-50/60' : ''}>
                    <td className="py-2 px-3">{r.id}</td>
                    <td className="py-2 px-3">{r.customer}</td>
                    <td className="py-2 px-3">{r.city}</td>
                    <td className="py-2 px-3">{r.date}</td>
                    <td className="py-2 px-3 text-right">{r.qty === null ? '(blank)' : r.qty}</td>
                  </tr>
                ))}
                {filtered24.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500 font-sans">
                      No rows match combined filters — click Clear Filters to reset.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-500 tabular-nums">
            Showing {filtered24.length} of 7 rows.
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 25) {
    const task1Rows = CLEAN_7_ORDERS.filter((r) => r.city === 'Chennai').sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    const task2Rows = CLEAN_7_ORDERS.filter((r) => r.qty !== null && r.qty > 2);
    const shownRows = task25Mode === 'task1' ? task1Rows : task2Rows;

    return (
      <div className="h-full w-full flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-3">
          <div className="flex items-center gap-6 text-sm text-slate-800">
            <span><strong>1.</strong> Chennai orders, newest first</span>
            <span><strong>2.</strong> Orders with Qty &gt; 2</span>
            <span><strong>3.</strong> Copy filtered results to a new sheet</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setReveal25((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{reveal25 ? 'Hide Expected Output' : 'Reveal Expected Output'}</span>
            </button>
            <WorkshopTimer defaultMinutes={8} />
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTask25Mode('task1')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                  task25Mode === 'task1' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Task 1: Chennai · Newest First (3 rows)
              </button>
              <button
                type="button"
                onClick={() => setTask25Mode('task2')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                  task25Mode === 'task2' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Task 2: All Cities · Qty &gt; 2 (3 rows)
              </button>
            </div>
            <div className="text-xs text-slate-500">
              Remember to clear Filter 1 before running Filter 2!
            </div>
          </div>

          {reveal25 ? (
            <table className="w-full text-left border-collapse font-mono text-xs tabular-nums border border-slate-200 my-auto">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2.5 px-3">OrderID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">City</th>
                  <th className="py-2.5 px-3">OrderDate</th>
                  <th className="py-2.5 px-3 text-right">Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {shownRows.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3 px-3 font-semibold text-teal-800">{r.id}</td>
                    <td className="py-3 px-3">{r.customer}</td>
                    <td className="py-3 px-3">{r.city}</td>
                    <td className="py-3 px-3">{r.date}</td>
                    <td className="py-3 px-3 text-right font-semibold">{r.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="my-auto p-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center">
              <div className="text-base font-bold text-slate-800 mb-1">
                Students Working in Excel / Google Sheets (8 Minutes)
              </div>
              <p className="text-xs text-slate-600 max-w-lg mx-auto">
                Click <strong>Reveal Expected Output</strong> above once students finish to verify exact row order ({task25Mode === 'task1' ? '1006 → 1004 → 1001' : '1003, 1006, 1007'}).
              </p>
            </div>
          )}

          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
            Google Sheets / Excel 365 formula shortcut for Task 1:{' '}
            <code className="font-mono text-slate-800">=SORT(FILTER(A2:H8, C2:C8="Chennai"), 4, FALSE)</code>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 26) {
    const activeOrd = CLEAN_7_ORDERS[selectedOrderIdx];
    const matchedProd = PRODUCTS.find((p) => p.productCode === activeOrd.code);

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Connecting Two Sheets</div>
            <ul className="space-y-4 text-[16px] leading-snug text-slate-800">
              <li>• <strong>Orders</strong> has a product code (<code className="font-mono text-xs">P01</code>) but not the product name.</li>
              <li>• <strong>Products</strong> holds the product name (<code className="font-mono text-xs">Arduino Kit</code>).</li>
              <li>• <strong>A lookup brings them together</strong> automatically.</li>
            </ul>

            <div className="mt-6 pt-5 border-t border-slate-200">
              <div className="text-xs font-bold text-teal-800 mb-3">The Four Ingredients of Every Lookup:</div>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded border border-slate-200 bg-slate-50"><strong>1. What to find</strong> (Lookup value)</div>
                <div className="p-2.5 rounded border border-slate-200 bg-slate-50"><strong>2. Where to look</strong> (Search range)</div>
                <div className="p-2.5 rounded border border-slate-200 bg-slate-50"><strong>3. What to return</strong> (Result column)</div>
                <div className="p-2.5 rounded border border-slate-200 bg-slate-50"><strong>4. Exact match?</strong> (Always Exact!)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-600 mb-3">
              Click any Order below to trace the 4 Lookup Ingredients live:
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-6 border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 border-b border-slate-200">
                  Sheet 1: Orders
                </div>
                <div className="divide-y divide-slate-100 font-mono text-xs">
                  {CLEAN_7_ORDERS.slice(0, 6).map((o, i) => (
                    <div
                      key={o.id}
                      onClick={() => setSelectedOrderIdx(i)}
                      className={`px-3 py-2 flex justify-between cursor-pointer ${
                        selectedOrderIdx === i ? 'bg-teal-50 font-bold text-teal-950' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span>#{o.id} · {o.customer.split(' ')[0]}</span>
                      <span className="text-teal-700">{o.code}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-1 flex justify-center">
                <ArrowRight className="w-6 h-6 text-teal-600" />
              </div>

              <div className="col-span-5 border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 border-b border-slate-200">
                  Sheet 2: Products
                </div>
                <div className="divide-y divide-slate-100 font-mono text-xs">
                  {PRODUCTS.map((p) => {
                    const hit = p.productCode === activeOrd.code;
                    return (
                      <div
                        key={p.productCode}
                        className={`px-3 py-2.5 flex justify-between ${
                          hit ? 'bg-teal-600 text-white font-bold' : 'text-slate-600'
                        }`}
                      >
                        <span>{p.productCode}</span>
                        <span>{p.productName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg border text-xs font-mono ${
              matchedProd
                ? 'border-teal-200 bg-teal-50/50 text-teal-950'
                : 'border-orange-200 bg-orange-50 text-orange-950'
            }`}
          >
            1. Find: <strong>"{activeOrd.code}"</strong> → 2. Look in: <strong>Products!A2:A5</strong> → 3. Return:{' '}
            <strong>
              {matchedProd ? `"${matchedProd.productName}"` : 'NOT FOUND! (P09 catches bad code)'}
            </strong>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 27) {
    const formulaText = `=VLOOKUP(E2, Products!${lockDollar ? '$A$2:$C$5' : 'A2:C5'}, 2, ${
      exactMatchFalse ? 'FALSE' : 'TRUE'
    })`;

    const evalRow = (code: string, rowOffset: number) => {
      if (colInserted) {
        return 'Notes Col! (Broken index 2)';
      }
      const startIdx = lockDollar ? 0 : rowOffset;
      const sliced = PRODUCTS.slice(startIdx);
      if (exactMatchFalse) {
        const hit = sliced.find((p) => p.productCode === code);
        return hit ? hit.productName : '#N/A';
      }
      // Approximate match TRUE returns largest <= code!
      const approx = [...sliced].filter((p) => p.productCode <= code).pop();
      return approx ? `${approx.productName} (Wrong approx!)` : '#N/A';
    };

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <code className="block font-mono text-xs bg-slate-900 text-teal-300 p-3 rounded-lg mb-4">
              =VLOOKUP(E2, Products!$A$2:$C$5, 2, FALSE)
            </code>
            <ul className="space-y-3 text-[15px] leading-snug text-slate-800">
              <li>• <code className="font-mono text-xs font-bold">E2</code>: lookup value</li>
              <li>• <code className="font-mono text-xs font-bold">Products!$A$2:$C$5</code>: table range (lock with <code className="font-mono">$</code>); lookup value <strong>must be in the first column</strong></li>
              <li>• <code className="font-mono text-xs font-bold">2</code>: column number to return</li>
              <li>• <code className="font-mono text-xs font-bold">FALSE</code>: exact match (most common mistake: forgetting it!)</li>
              <li className="text-orange-800 font-medium">• Limitations: Cannot look left; breaks if columns are inserted.</li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-700 mb-3">
              Interactive VLOOKUP Trap Simulator — Toggle switches to test failure modes:
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                onClick={() => setLockDollar((v) => !v)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border cursor-pointer ${
                  lockDollar ? 'bg-teal-50 border-teal-300 text-teal-900' : 'bg-red-50 border-red-300 text-red-800 font-semibold'
                }`}
              >
                {lockDollar ? '✓ $ Range Locked ($A$2:$C$5)' : '× Forgot $ Lock (Drifts down!)'}
              </button>
              <button
                type="button"
                onClick={() => setExactMatchFalse((v) => !v)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border cursor-pointer ${
                  exactMatchFalse ? 'bg-teal-50 border-teal-300 text-teal-900' : 'bg-red-50 border-red-300 text-red-800 font-semibold'
                }`}
              >
                {exactMatchFalse ? '✓ Exact Match (FALSE)' : '× Omitted FALSE (Approx Match!)'}
              </button>
              <button
                type="button"
                onClick={() => setColInserted((v) => !v)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border cursor-pointer ${
                  !colInserted ? 'bg-slate-50 border-slate-300 text-slate-700' : 'bg-red-50 border-red-300 text-red-800 font-semibold'
                }`}
              >
                {colInserted ? '× Column Inserted in Products!' : 'Insert Column in Products'}
              </button>
            </div>

            <div className="px-3.5 py-2 bg-slate-900 text-amber-300 font-mono text-xs rounded-lg mb-4">
              Row 2 Formula: {formulaText}
            </div>

            <table className="w-full text-left border-collapse font-mono text-xs border border-slate-200">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2 px-3">Order</th>
                  <th className="py-2 px-3">Code</th>
                  <th className="py-2 px-3">Range Checked</th>
                  <th className="py-2 px-3">VLOOKUP Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { id: '1001', code: 'P01', off: 0 },
                  { id: '1002', code: 'P02', off: 1 },
                  { id: '1003', code: 'P01', off: 2 },
                  { id: '1006', code: 'P09', off: 3 },
                ].map((r) => {
                  const out = evalRow(r.code, r.off);
                  const isBad =
                    out.includes('Wrong') ||
                    out.includes('Notes') ||
                    (!lockDollar && r.code === 'P01' && r.off > 0);
                  return (
                    <tr key={r.id}>
                      <td className="py-2.5 px-3">{r.id}</td>
                      <td className="py-2.5 px-3 font-semibold">{r.code}</td>
                      <td className="py-2.5 px-3 text-slate-500">
                        {lockDollar ? '$A$2:$C$5' : `A${2 + r.off}:C${5 + r.off}`}
                      </td>
                      <td className={`py-2.5 px-3 font-semibold ${isBad ? 'bg-red-50 text-red-700' : 'text-teal-900'}`}>
                        {out}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-500">
            Notice Order 1003 (<code className="font-mono">P01</code>): without <code className="font-mono">$</code> locks, row 4 looks in <code className="font-mono">A4:C7</code> and misses <code className="font-mono">P01</code> in row 2!
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 28) {
    const xFormula = spillTwoCols
      ? '=XLOOKUP(E2, Products!$A$2:$A$5, Products!$B$2:$C$5, "Not found")'
      : '=XLOOKUP(E2, Products!$A$2:$A$5, Products!$B$2:$B$5, "Not found")';

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <code className="block font-mono text-[11.5px] bg-slate-900 text-teal-300 p-3 rounded-lg mb-4">
              =XLOOKUP(E2, Products!$A$2:$A$5, Products!$B$2:$B$5, "Not found")
            </code>
            <ul className="space-y-3.5 text-[15.5px] leading-snug text-slate-800">
              <li>• <strong>Separate</strong> lookup and return columns</li>
              <li>• <strong>Exact match by default</strong> (no forgotten <code className="font-mono text-xs">FALSE</code>!)</li>
              <li>• <strong>Built-in not-found message</strong> (<code className="font-mono text-xs">"Not found"</code>)</li>
              <li>• Can <strong>look in any direction</strong> (left, right, up, down) and return <strong>many columns</strong> at once</li>
              <li className="text-teal-800 font-semibold">
                • <code className="font-mono text-xs">P09</code> cleanly returns <code className="font-mono text-xs">"Not found"</code>: the lookup caught a bad code!
              </li>
            </ul>
          </div>
          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
            Supported natively in Excel 365, Excel 2021, and Google Sheets!
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="text-sm font-bold text-slate-900">Live XLOOKUP Resilience &amp; Multi-Column Spill</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSpillTwoCols((s) => !s)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md border cursor-pointer ${
                    spillTwoCols ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {spillTwoCols ? '✓ Returning 2 Columns (B2:C5)' : 'Return Both Name & Category'}
                </button>
                <button
                  type="button"
                  onClick={() => setXColInserted((c) => !c)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border cursor-pointer ${
                    xColInserted ? 'bg-teal-50 border-teal-400 text-teal-900' : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  {xColInserted ? '✓ Column Inserted — Zero Breakage!' : 'Test Insert Column'}
                </button>
              </div>
            </div>

            <div className="px-3.5 py-2 bg-slate-900 text-teal-300 font-mono text-xs rounded-lg mb-4">
              {xFormula}
            </div>

            <table className="w-full text-left border-collapse font-mono text-xs border border-slate-200">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2 px-3">OrderID</th>
                  <th className="py-2 px-3">Code</th>
                  <th className="py-2 px-3">ProductName</th>
                  {spillTwoCols && <th className="py-2 px-3">Category (Spilled)</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {CLEAN_7_ORDERS.slice(0, 6).map((o) => {
                  const hit = PRODUCTS.find((p) => p.productCode === o.code);
                  return (
                    <tr key={o.id} className={!hit ? 'bg-orange-50/70' : ''}>
                      <td className="py-2.5 px-3">{o.id}</td>
                      <td className="py-2.5 px-3 font-semibold">{o.code}</td>
                      <td className={`py-2.5 px-3 font-semibold ${hit ? 'text-teal-900' : 'text-orange-800'}`}>
                        {hit ? hit.productName : 'Not found'}
                      </td>
                      {spillTwoCols && (
                        <td className="py-2.5 px-3 text-slate-700">{hit ? hit.category : ''}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-500">
            Because XLOOKUP references the return column directly instead of counting column #2, inserting columns never breaks it!
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 29) {
    const cases = [
      {
        id: 'na',
        err: '#N/A',
        cause: 'Value not found; invisible trailing spaces ("P01 "); or text vs number mismatch ("1001" vs 1001)',
        brokenFormula: '=XLOOKUP(E2, Products!$A$2:$A$5, Products!$B$2:$B$5)   where E2 = "P01 "',
        fixedFormula: '=XLOOKUP(TRIM(E2), Products!$A$2:$A$5, Products!$B$2:$B$5)',
        fixedOut: 'Arduino Kit ✓',
      },
      {
        id: 'ref',
        err: '#REF!',
        cause: 'VLOOKUP column index number is larger than the table width, or referenced column was deleted',
        brokenFormula: '=VLOOKUP(E2, Products!$A$2:$C$5, 4, FALSE)   (Only 3 cols exist!)',
        fixedFormula: '=VLOOKUP(E2, Products!$A$2:$C$5, 2, FALSE)',
        fixedOut: 'Arduino Kit ✓',
      },
      {
        id: 'val',
        err: '#VALUE!',
        cause: 'Wrong data type or invalid argument (e.g. col_index < 1, or multiplying "Rs.450" text)',
        brokenFormula: '=F2 * G2   where G2 = "Rs.450"',
        fixedFormula: '=F2 * VALUE(SUBSTITUTE(G2,"Rs.",""))',
        fixedOut: '1800 ✓',
      },
    ];

    return (
      <div className="h-full w-full flex flex-col justify-between gap-4">
        <div className="grid grid-cols-3 gap-5 flex-1 min-h-0">
          {cases.map((c) => {
            const isFixed = Boolean(fixedErrors[c.id]);
            return (
              <div
                key={c.id}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xl font-bold text-red-700">{c.err}</span>
                    <span
                      className={`text-xs font-semibold ${
                        isFixed ? 'text-teal-700' : 'text-orange-700'
                      }`}
                    >
                      {isFixed ? 'Status: Debugged' : 'Status: Broken'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">{c.cause}</p>

                  <div className="p-3 rounded-lg bg-slate-900 font-mono text-[11px] text-slate-200 mb-3">
                    {isFixed ? c.fixedFormula : c.brokenFormula}
                  </div>

                  <div
                    className={`p-3 rounded-lg border font-mono text-sm font-bold ${
                      isFixed
                        ? 'border-teal-200 bg-teal-50 text-teal-900'
                        : 'border-red-200 bg-red-50 text-red-700'
                    }`}
                  >
                    Output: {isFixed ? c.fixedOut : c.err}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFixedErrors((p) => ({ ...p, [c.id]: !p[c.id] }))}
                  className={`w-full py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    isFixed
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-teal-700 text-white hover:bg-teal-800'
                  }`}
                >
                  {isFixed ? 'Reset Error' : 'Apply Diagnostic Fix'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl px-6 py-3.5 flex items-center justify-between text-sm">
          <span>
            <strong>Universal Fix Rule:</strong> <code className="font-mono text-teal-800 font-semibold">TRIM</code> the lookup column and ensure both sides share the exact same data type (Text vs Number).
          </span>
          <button
            type="button"
            onClick={() => setFixedErrors({})}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>
      </div>
    );
  }

  // Slide 30: HANDS-ON 3B: Lookups (20 min)
  return (
    <div className="h-full w-full flex flex-col justify-between gap-3.5">
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-2.5">
        <div className="flex items-center gap-4 text-xs text-slate-700">
          <span><strong>1.</strong> XLOOKUP Name &amp; Category</span>
          <span><strong>2.</strong> Confirm VLOOKUP matches</span>
          <span><strong>3.</strong> <code className="font-mono">Line_Total = Qty * Price_Clean</code></span>
          <span><strong>4.</strong> Recommend fix for <code className="font-mono">P09</code></span>
          <span><strong>5.</strong> Challenge: 1-formula 2-col XLOOKUP</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setReveal30((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 cursor-pointer whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{reveal30 ? 'Hide Solution' : 'Reveal Enriched Table'}</span>
          </button>
          <WorkshopTimer defaultMinutes={20} />
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-xl px-5 py-3 flex flex-col justify-between">
        <table className="w-full text-left border-collapse font-mono text-[11.5px] tabular-nums border border-slate-200">
          <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="py-2 px-2.5">ID</th>
              <th className="py-2 px-2.5">Customer</th>
              <th className="py-2 px-2.5">Code</th>
              <th className="py-2 px-2.5">ProductName (XLOOKUP)</th>
              <th className="py-2 px-2.5">Category</th>
              <th className="py-2 px-2.5 text-right">Qty</th>
              <th className="py-2 px-2.5 text-right">Price</th>
              <th className="py-2 px-2.5 text-right">Line_Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {CLEAN_7_ORDERS.map((r) => {
              const prod = PRODUCTS.find((p) => p.productCode === r.code);
              const validTotal =
                r.qty !== null && r.qty > 0 && r.price !== null ? r.qty * r.price : null;
              return (
                <tr key={r.id} className={!prod && reveal30 ? 'bg-orange-50/70' : ''}>
                  <td className="py-2 px-2.5">{r.id}</td>
                  <td className="py-2 px-2.5">{r.customer}</td>
                  <td className="py-2 px-2.5 font-semibold">{r.code}</td>
                  <td className="py-2 px-2.5 font-semibold text-teal-900">
                    {reveal30 ? (prod ? prod.productName : 'Not found (!)') : '?'}
                  </td>
                  <td className="py-2 px-2.5 text-slate-700">
                    {reveal30 ? (prod ? prod.category : 'Not found') : '?'}
                  </td>
                  <td className="py-2 px-2.5 text-right">{r.qty === null ? '(blank)' : r.qty}</td>
                  <td className="py-2 px-2.5 text-right">{r.price === null ? '(blank)' : r.price}</td>
                  <td className="py-2 px-2.5 text-right font-semibold">
                    {reveal30 ? (validTotal !== null ? validTotal : 'Check Qty/Price') : '?'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>
            {reveal30 ? (
              <>
                <strong>Task 4 Fix:</strong> Order 1006 has <code className="font-mono">P09</code> (Price 300) — check invoice/sales team whether P09 is a new item to add to <code className="font-mono">Products</code> or a typo for <code className="font-mono">P03</code>/<code className="font-mono">P04</code>.
              </>
            ) : (
              'Challenge (#5) Hint: Set XLOOKUP return_array to Products!$B$2:$C$5 so one formula fills both columns!'
            )}
          </span>
          {reveal30 && (
            <span className="font-mono text-teal-800 font-semibold">
              =IF(AND(ISNUMBER(F2),F2&gt;0,ISNUMBER(G2)), F2*G2, "")
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
