import React, { useState } from 'react';
import { RotateCcw, RefreshCw, Plus, Eye, Check, AlertTriangle, Code2 } from 'lucide-react';
import { ORDERS_RAW, PRODUCTS, ORDERS_FEB } from '../../data/datasets';
import { WorkshopTimer } from '../common/WorkshopTimer';

interface Module4SlidesProps {
  slideNumber: number;
}

export const Module4Slides: React.FC<Module4SlidesProps> = ({ slideNumber }) => {
  // Slide 31 state: Connect -> Transform -> Combine -> Load
  const [pqStage, setPqStage] = useState<number>(0);

  // Slide 32 state: Editor Applied Steps time-travel
  const [appliedStepIdx, setAppliedStepIdx] = useState<number>(3);

  // Slide 33 state: Source connector
  const [sourceType, setSourceType] = useState<'workbook' | 'csv' | 'web' | 'folder'>('folder');

  // Slide 34 state: Order matters ("Rs." before Number type)
  const [wrongTypeFirst, setWrongTypeFirst] = useState<boolean>(false);

  // Slide 35 state: Hands-On 4A step sequencer
  const [pqStepsDone, setPqStepsDone] = useState<number>(0);

  // Slide 36 state: Merge Queries Join Kind
  const [joinKind, setJoinKind] = useState<'left' | 'inner' | 'full' | 'anti'>('left');

  // Slide 37 state: Append Queries header mismatch
  const [headerTypo, setHeaderTypo] = useState<boolean>(false);

  // Slide 38 state: Load and Refresh simulator
  const [extraRawAdded, setExtraRawAdded] = useState<boolean>(false);
  const [refreshed, setRefreshed] = useState<boolean>(false);

  // Slide 39 state: Hands-On 4B + M-code viewer
  const [showMCode, setShowMCode] = useState<boolean>(false);

  if (slideNumber === 31) {
    const stages = [
      {
        name: '1. Connect',
        desc: 'Point Excel at a Table, CSV, workbook, or whole folder without copying and pasting.',
        detail: 'Data → Get Data (Excel 2021 / 365 & Power BI). Raw source stays 100% untouched!',
      },
      {
        name: '2. Transform',
        desc: 'Trim spaces, fix case, replace "Rs.", parse India DMY dates, and drop duplicates.',
        detail: 'Every click records a repeatable step in your recipe — zero cell formulas needed.',
      },
      {
        name: '3. Combine',
        desc: 'Merge columns across tables (stronger than VLOOKUP) or Append monthly files vertically.',
        detail: 'Handles thousands of rows smoothly without slowing down your workbook.',
      },
      {
        name: '4. Load & Refresh',
        desc: 'Output a clean green Excel Table. Next month? Just right-click → Refresh!',
        detail: 'Cook the recipe once, replay it forever with one click.',
      },
    ];

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Core Concept</div>
            <ul className="space-y-4 text-[16px] leading-snug text-slate-800">
              <li>• <strong>Records your cleaning steps once</strong> as a structured recipe.</li>
              <li>• <strong>Replays them on new data</strong> with one click: <strong>Refresh</strong>.</li>
              <li>• Think of it as a <em>recipe you cook once and repeat forever</em>.</li>
              <li>• Core flow: <strong>Connect → Transform → Combine → Load</strong>.</li>
              <li>• Found under <strong>Data → Get Data</strong> (Excel 2021 / 365; identical engine inside Power BI!).</li>
            </ul>
          </div>
          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
            Google Sheets note: Sheets users automate similar pipelines via <code className="font-mono">QUERY()</code>, <code className="font-mono">ARRAYFORMULA</code>, or Connected Sheets.
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-3">Click each stage of the Power Query Recipe</div>
            <div className="grid grid-cols-4 gap-2.5 mb-6">
              {stages.map((s, idx) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setPqStage(idx)}
                  className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    pqStage === idx
                      ? 'bg-teal-700 text-white border-teal-700'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold">{s.name}</div>
                </button>
              ))}
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <h3 className="text-xl font-bold text-slate-900">{stages[pqStage].name}</h3>
              <p className="text-base text-slate-700 leading-relaxed">{stages[pqStage].desc}</p>
              <div className="pt-3 border-t border-slate-200 text-xs font-medium text-teal-800">
                {stages[pqStage].detail}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Manual cleaning every Monday: 30 mins × 52 weeks = 26 hours/year</span>
            <span className="font-semibold text-teal-800">Power Query Refresh: 2 seconds!</span>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 32) {
    const editorSteps = [
      {
        name: 'Source',
        rows: [
          { c: '" ravi kumar "', city: 'chennai', price: '450' },
          { c: 'Anil  Verma', city: 'MADURAI', price: '450' },
          { c: 'Divya R', city: 'coimbatore', price: 'Rs.450' },
        ],
      },
      {
        name: 'Trimmed Text',
        rows: [
          { c: 'ravi kumar', city: 'chennai', price: '450' },
          { c: 'Anil  Verma', city: 'MADURAI', price: '450' },
          { c: 'Divya R', city: 'coimbatore', price: 'Rs.450' },
        ],
      },
      {
        name: 'Capitalized Each Word',
        rows: [
          { c: 'Ravi Kumar', city: 'Chennai', price: '450' },
          { c: 'Anil  Verma', city: 'Madurai', price: '450' },
          { c: 'Divya R', city: 'Coimbatore', price: 'Rs.450' },
        ],
      },
      {
        name: 'Replaced Value ("Rs.") & Changed Type',
        rows: [
          { c: 'Ravi Kumar', city: 'Chennai', price: '450 (123)' },
          { c: 'Anil Verma', city: 'Madurai', price: '450 (123)' },
          { c: 'Divya R', city: 'Coimbatore', price: '450 (123)' },
        ],
      },
    ];

    const curStep = editorSteps[appliedStepIdx];

    return (
      <div className="h-full w-full flex flex-col justify-between gap-4">
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex items-center justify-between text-xs text-slate-700">
          <span><strong>Start:</strong> Click inside table → <code className="font-mono text-teal-800 font-semibold">Data → From Table/Range</code></span>
          <span>Click any step under <strong>Applied Steps (right pane)</strong> below to inspect how the preview updates!</span>
        </div>

        <div className="flex-1 min-h-0 bg-white border border-slate-300 rounded-xl overflow-hidden flex flex-col">
          {/* Top Ribbon */}
          <div className="bg-slate-800 text-slate-100 px-4 py-2.5 flex items-center justify-between text-xs border-b border-slate-700">
            <div className="flex items-center gap-5 font-medium">
              <span className="text-teal-300 font-bold">1. Ribbon:</span>
              <span>Home (Close &amp; Load, Remove Rows, Merge)</span>
              <span>Transform (Trim, Replace Values)</span>
              <span>Add Column (Custom Column)</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">Power Query Editor Simulation</span>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-12">
            {/* Left Queries Pane */}
            <div className="col-span-2 border-r border-slate-200 bg-slate-50 p-3.5">
              <div className="text-[11px] font-bold text-slate-500 mb-2">2. Queries [2]</div>
              <div className="space-y-1.5 font-mono text-xs">
                <div className="px-2.5 py-2 rounded bg-teal-50 border border-teal-300 text-teal-950 font-semibold">
                  Orders
                </div>
                <div className="px-2.5 py-2 rounded text-slate-600">Products</div>
              </div>
            </div>

            {/* Center Data Preview */}
            <div className="col-span-7 p-4 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-700 mb-2">
                  3. Data Preview — Viewing at Step: <span className="text-teal-700">{curStep.name}</span>
                </div>
                <table className="w-full text-left border-collapse font-mono text-xs border border-slate-200">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="py-2 px-3 border-r border-slate-200">ABC Customer</th>
                      <th className="py-2 px-3 border-r border-slate-200">ABC City</th>
                      <th className="py-2 px-3">{appliedStepIdx === 3 ? '123 Price' : 'ABC Price'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {curStep.rows.map((r, i) => (
                      <tr key={i}>
                        <td className="py-2.5 px-3 border-r border-slate-200 whitespace-pre">{r.c}</td>
                        <td className="py-2.5 px-3 border-r border-slate-200">{r.city}</td>
                        <td className="py-2.5 px-3">{r.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-xs text-slate-500">
                Note: Ctrl+Z does not undo inside Power Query — instead, click × next to an Applied Step!
              </div>
            </div>

            {/* Right Applied Steps */}
            <div className="col-span-3 border-l border-slate-200 bg-slate-50 p-3.5 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-700 mb-2">
                  4. Applied Steps (Your Recipe)
                </div>
                <div className="space-y-1.5">
                  {editorSteps.map((st, idx) => (
                    <button
                      key={st.name}
                      type="button"
                      onClick={() => setAppliedStepIdx(idx)}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                        appliedStepIdx === idx
                          ? 'bg-teal-700 text-white border-teal-700'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {idx + 1}. {st.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-slate-500">
                Editable and reorderable at any time.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 33) {
    const connectors = {
      workbook: {
        title: 'From Excel Workbook',
        path: 'Data → Get Data → From File → From Excel Workbook',
        benefit: 'Pull sheets or named Tables from another Excel file without breaking links.',
      },
      csv: {
        title: 'From Text / CSV',
        path: 'Data → Get Data → From Text/CSV',
        benefit: 'Handles UTF-8 encoding, delimiter selection, and prevents Excel from mangling leading zeros!',
      },
      web: {
        title: 'From Web',
        path: 'Data → Get Data → From Other Sources → From Web',
        benefit: 'Extracts HTML tables directly from public URLs (exchange rates, Wikipedia tables, portals).',
      },
      folder: {
        title: 'From Folder (Superpower!)',
        path: 'Data → Get Data → From File → From Folder → Combine & Transform',
        benefit: 'Automatically stacks 12+ monthly files (Orders_Jan.csv, Orders_Feb.csv...) in one step! Drop March into the folder and click Refresh.',
      },
    };

    const cur = connectors[sourceType];

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Connecting Cleanly</div>
            <ul className="space-y-4 text-[16px] leading-snug text-slate-800">
              <li>• Common connectors: <strong>Excel workbook, Text/CSV, Web</strong></li>
              <li>• <strong>Folder connector:</strong> combines many monthly files at once</li>
              <li>
                • <strong>Best habit:</strong> Rename each query clearly (<code className="font-mono text-xs text-teal-800 font-semibold">Orders</code>, <code className="font-mono text-xs text-teal-800 font-semibold">Products</code>) instead of leaving <code className="font-mono text-xs">Table1</code> or <code className="font-mono text-xs">Query1</code>.
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              {(
                [
                  { id: 'folder', label: 'Folder (Multi-File)' },
                  { id: 'workbook', label: 'Excel Workbook' },
                  { id: 'csv', label: 'Text / CSV' },
                  { id: 'web', label: 'Web URL' },
                ] as const
              ).map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSourceType(b.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                    sourceType === b.id ? 'bg-teal-700 text-white border-teal-700' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
              <h3 className="text-xl font-bold text-slate-900">{cur.title}</h3>
              <div className="font-mono text-xs text-teal-800 bg-white px-3 py-2 rounded border border-slate-200">
                Menu Path: {cur.path}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{cur.benefit}</p>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Clear query names (<code className="font-mono">Orders</code>, <code className="font-mono">Products</code>, <code className="font-mono">Bad_Codes</code>) become your clean worksheet tab names on Load.
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 34) {
    const pqMenuRows = [
      ['Remove spaces', 'Transform → Format → Trim'],
      ['Fix capitalisation', 'Transform → Format → Capitalize Each Word'],
      ['Fix types', 'Click the type icon (ABC / 123 / Calendar) on header'],
      ['Replace values', 'Transform → Replace Values ("Rs." to nothing, "N/A" to null)'],
      ['Remove duplicates', 'Home → Remove Rows → Remove Duplicates'],
      ['Remove errors', 'Home → Remove Rows → Remove Errors'],
      ['Split column', 'Transform → Split Column → By Delimiter'],
      ['New column', 'Add Column → Custom Column: [Qty] * [Price]'],
    ];

    return (
      <div className="h-full w-full grid grid-cols-12 gap-7 items-stretch">
        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <table className="w-full text-left border-collapse text-xs border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="py-2 px-3 border-r border-slate-200 w-44">Task</th>
                <th className="py-2 px-3">Where in Power Query</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pqMenuRows.map(([task, where]) => (
                <tr key={task} className="hover:bg-slate-50">
                  <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-900">{task}</td>
                  <td className="py-2 px-3 font-mono text-[11.5px] text-slate-700">{where}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs font-semibold text-orange-800 pt-2">
            Rule: Order matters — replace "Rs." first, then set the type to number!
          </div>
        </div>

        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Interactive Step-Order Proof</div>
            <h3 className="text-base font-bold text-slate-900 mb-4">Why Step Sequence Matters on "Rs.450"</h3>

            <div className="flex flex-col gap-2 mb-4">
              <button
                type="button"
                onClick={() => setWrongTypeFirst(false)}
                className={`p-3 rounded-lg border text-left text-xs font-medium cursor-pointer ${
                  !wrongTypeFirst ? 'border-teal-600 bg-teal-50/60 text-teal-950 font-semibold' : 'border-slate-200 text-slate-700'
                }`}
              >
                ✓ Correct Order: 1. Replace "Rs." → ""   then   2. Change Type → Whole Number
              </button>
              <button
                type="button"
                onClick={() => setWrongTypeFirst(true)}
                className={`p-3 rounded-lg border text-left text-xs font-medium cursor-pointer ${
                  wrongTypeFirst ? 'border-red-500 bg-red-50/70 text-red-950 font-semibold' : 'border-slate-200 text-slate-700'
                }`}
              >
                × Wrong Order: 1. Change Type → Whole Number   then   2. Replace "Rs."
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden font-mono text-xs">
              <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 text-slate-600">
                Row 9 Price Cell ("Rs.450") Result:
              </div>
              <div className={`p-4 font-bold text-sm ${wrongTypeFirst ? 'bg-red-50 text-red-700' : 'bg-teal-50/40 text-teal-900'}`}>
                {wrongTypeFirst
                  ? 'DataFormat.Error: We couldn\'t convert to Number ("Rs.450")'
                  : '450   (Clean Whole Number 123 ✓)'}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Tip: Power Query auto-adds a "Changed Type" step on import — delete or drag it to the bottom if needed!
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 35) {
    const steps35 = [
      '1. Load Orders_Raw into Power Query (Data → From Table/Range)',
      '2. Trim and Capitalize Each Word on Customer and City',
      '3. Replace "Rs." with "" and "N/A" with null in Price',
      '4. Set data types (OrderDate Using Locale → Date → English (India))',
      '5. Remove duplicates on OrderID (8 rows → 7 rows)',
      '6. Filter / Remove rows where Qty < 1 or null (7 rows → 5 clean rows)',
      '7. Rename the query "Orders"; keep editor open for Module 4B',
    ];

    return (
      <div className="h-full w-full flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-3">
          <div className="text-sm font-semibold text-slate-900">
            Build Your 7-Step Recipe in Power Query · Progress: <span className="font-mono text-teal-700">{pqStepsDone} / 7 Steps</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setPqStepsDone((s) => Math.min(7, s + 1))}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-700 rounded-md hover:bg-teal-800 cursor-pointer"
            >
              Execute Next Step →
            </button>
            <button
              type="button"
              onClick={() => setPqStepsDone(0)}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
              title="Reset steps"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <WorkshopTimer defaultMinutes={20} />
          </div>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-12 gap-6 items-stretch">
          <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-1.5">
              {steps35.map((label, i) => {
                const done = i < pqStepsDone;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setPqStepsDone(i + 1)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                      done
                        ? 'border-teal-500 bg-teal-50/60 text-teal-950 font-semibold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {done ? `✓ ${label}` : label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2">
                Simulated Query Output ({pqStepsDone >= 6 ? '5 Clean Valid Rows' : pqStepsDone >= 5 ? '7 Deduplicated Rows' : '8 Raw Rows'})
              </div>
              <table className="w-full text-left border-collapse font-mono text-[11px] tabular-nums border border-slate-200">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="py-1.5 px-2">ID</th>
                    <th className="py-1.5 px-2">Customer</th>
                    <th className="py-1.5 px-2">City</th>
                    <th className="py-1.5 px-2">OrderDate</th>
                    <th className="py-1.5 px-2">Code</th>
                    <th className="py-1.5 px-2">Qty</th>
                    <th className="py-1.5 px-2">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ORDERS_RAW.filter((r, idx) => {
                    if (pqStepsDone >= 5 && idx === 3) return false; // drop second 1002
                    if (pqStepsDone >= 6 && (r.qty === '' || Number(r.qty) < 1)) return false;
                    return true;
                  }).map((r) => {
                    const cust =
                      pqStepsDone >= 2
                        ? r.customer.trim().replace(/\s+/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
                        : r.customer;
                    const city =
                      pqStepsDone >= 2
                        ? r.city.trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
                        : r.city;
                    const price =
                      pqStepsDone >= 3
                        ? r.price === 'N/A'
                          ? 'null'
                          : r.price.replace('Rs.', '')
                        : r.price;
                    return (
                      <tr key={r.rowNum}>
                        <td className="py-1.5 px-2">{r.orderId}</td>
                        <td className="py-1.5 px-2 whitespace-pre">{cust}</td>
                        <td className="py-1.5 px-2">{city}</td>
                        <td className="py-1.5 px-2">{pqStepsDone >= 4 ? '2026-03-XX (Date)' : r.orderDate}</td>
                        <td className="py-1.5 px-2">{r.productCode}</td>
                        <td className="py-1.5 px-2">{r.qty || 'null'}</td>
                        <td className="py-1.5 px-2">{price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-slate-500">
              Query Name: <code className="font-mono font-bold text-slate-900">{pqStepsDone >= 7 ? 'Orders ✓' : 'Orders_Raw'}</code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 36) {
    const cleanOrders5 = [
      { id: '1001', cust: 'Ravi Kumar', code: 'P01' },
      { id: '1003', cust: 'Anil Verma', code: 'P01' },
      { id: '1004', cust: 'Meena Iyer', code: 'P03' },
      { id: '1006', cust: 'Ravi Kumar', code: 'P09' },
      { id: '1007', cust: 'Divya R', code: 'P01' },
    ];

    let mergedRows: { id: string; cust: string; code: string; prodName: string }[] = [];
    if (joinKind === 'left') {
      mergedRows = cleanOrders5.map((o) => {
        const p = PRODUCTS.find((pr) => pr.productCode === o.code);
        return { id: o.id, cust: o.cust, code: o.code, prodName: p ? p.productName : 'null (No match)' };
      });
    } else if (joinKind === 'inner') {
      mergedRows = cleanOrders5
        .filter((o) => PRODUCTS.some((pr) => pr.productCode === o.code))
        .map((o) => ({
          id: o.id,
          cust: o.cust,
          code: o.code,
          prodName: PRODUCTS.find((pr) => pr.productCode === o.code)!.productName,
        }));
    } else if (joinKind === 'anti') {
      mergedRows = cleanOrders5
        .filter((o) => !PRODUCTS.some((pr) => pr.productCode === o.code))
        .map((o) => ({ id: o.id, cust: o.cust, code: o.code, prodName: 'null — Caught Bad Code!' }));
    } else {
      mergedRows = [
        ...cleanOrders5.map((o) => {
          const p = PRODUCTS.find((pr) => pr.productCode === o.code);
          return { id: o.id, cust: o.cust, code: o.code, prodName: p ? p.productName : 'null' };
        }),
        { id: 'null', cust: '(Unused Product)', code: 'P04', prodName: 'Jumper Wires' },
      ];
    }

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-600 mb-3">
              <strong>Home → Merge Queries:</strong> Match <code className="font-mono">ProductCode</code> in Orders &amp; Products
            </div>
            <table className="w-full text-left border-collapse text-xs border border-slate-200">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2.5 px-3 border-r border-slate-200">Join kind</th>
                  <th className="py-2.5 px-3">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { id: 'left', k: 'Left Outer', r: 'All Orders rows plus matches (best for lookups)' },
                  { id: 'inner', k: 'Inner', r: 'Only matching rows' },
                  { id: 'full', k: 'Full Outer', r: 'Everything from both' },
                  { id: 'anti', k: 'Left Anti', r: 'Orders with no match (finds bad codes!)' },
                ].map((j) => (
                  <tr
                    key={j.id}
                    onClick={() => setJoinKind(j.id as 'left' | 'inner' | 'full' | 'anti')}
                    className={`cursor-pointer ${
                      joinKind === j.id ? 'bg-teal-50/80 font-semibold text-teal-950' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3 border-r border-slate-200 whitespace-nowrap">{j.k}</td>
                    <td className="py-3 px-3">{j.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-slate-500">
            Click any Join Kind row above to simulate the exact merged output on the right!
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Live Merge Result — Join Kind: <span className="text-teal-700 uppercase">{joinKind}</span>
              </h3>
              <span className="text-xs font-mono text-slate-500 tabular-nums">{mergedRows.length} row(s) returned</span>
            </div>

            <table className="w-full text-left border-collapse font-mono text-xs border border-slate-200">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2 px-3">OrderID</th>
                  <th className="py-2 px-3">Customer</th>
                  <th className="py-2 px-3">ProductCode</th>
                  <th className="py-2 px-3">Products.ProductName</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mergedRows.map((m, i) => (
                  <tr key={i} className={m.code === 'P09' ? 'bg-orange-50/70' : ''}>
                    <td className="py-2.5 px-3">{m.id}</td>
                    <td className="py-2.5 px-3">{m.cust}</td>
                    <td className="py-2.5 px-3 font-semibold">{m.code}</td>
                    <td className="py-2.5 px-3 font-semibold text-teal-900">{m.prodName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700">
            {joinKind === 'anti'
              ? 'Left Anti isolated ONLY Order 1006 (P09)! Load this as a "Bad_Codes" exception sheet for the data owner.'
              : 'After merging, click the two-way Expand icon on the new Products column header to pick ProductName & Category.'}
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 37) {
    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Vertical Row Stacking</div>
            <ul className="space-y-4 text-[16px] leading-snug text-slate-800">
              <li>• <strong>Append stacks rows</strong> from tables that share the same columns.</li>
              <li>• Classic example: stacking <strong>January</strong> and <strong>February</strong> orders.</li>
              <li>• Path: <strong>Home → Append Queries → Append Queries as New</strong>.</li>
              <li className="text-orange-900 bg-orange-50/70 p-3.5 rounded-lg border border-orange-200 text-xs leading-relaxed">
                <strong>Strict Rule:</strong> Column names must match <strong>exactly</strong> (including case! <code className="font-mono">City</code> vs <code className="font-mono">city</code> creates two separate columns with <code className="font-mono">null</code> gaps).
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Append Simulator: Orders + Orders_Feb</h3>
              <button
                type="button"
                onClick={() => setHeaderTypo((t) => !t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border cursor-pointer ${
                  headerTypo ? 'bg-red-50 border-red-300 text-red-800' : 'bg-teal-50 border-teal-300 text-teal-900'
                }`}
              >
                {headerTypo ? '× Header Mismatch: Feb uses "city" (lowercase)' : '✓ Exact Headers Match ("City" = "City")'}
              </button>
            </div>

            <table className="w-full text-left border-collapse font-mono text-xs border border-slate-200">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2 px-3">Source</th>
                  <th className="py-2 px-3">OrderID</th>
                  <th className="py-2 px-3">Customer</th>
                  <th className="py-2 px-3">City</th>
                  {headerTypo && <th className="py-2 px-3 bg-red-100 text-red-900">city (Extra Col!)</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2.5 px-3 text-slate-500">Mar</td>
                  <td className="py-2.5 px-3">1001</td>
                  <td className="py-2.5 px-3">Ravi Kumar</td>
                  <td className="py-2.5 px-3">Chennai</td>
                  {headerTypo && <td className="py-2.5 px-3 bg-red-50 text-red-700">null</td>}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-500">Mar</td>
                  <td className="py-2.5 px-3">1003</td>
                  <td className="py-2.5 px-3">Anil Verma</td>
                  <td className="py-2.5 px-3">Madurai</td>
                  {headerTypo && <td className="py-2.5 px-3 bg-red-50 text-red-700">null</td>}
                </tr>
                {ORDERS_FEB.map((f) => (
                  <tr key={f.orderId} className="bg-teal-50/30">
                    <td className="py-2.5 px-3 text-teal-800 font-semibold">Feb</td>
                    <td className="py-2.5 px-3">{f.orderId}</td>
                    <td className="py-2.5 px-3">{f.customer}</td>
                    <td className={`py-2.5 px-3 ${headerTypo ? 'text-red-700 font-semibold' : ''}`}>
                      {headerTypo ? 'null' : f.city}
                    </td>
                    {headerTypo && <td className="py-2.5 px-3 bg-red-50 text-red-800 font-semibold">{f.city}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-600">
            Click the button at top right to see why case-sensitive header names matter in Power Query!
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 38) {
    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Automating Future Updates</div>
            <ul className="space-y-4 text-[16px] leading-snug text-slate-800">
              <li>• Click <strong>Home → Close &amp; Load</strong> to create the clean green output sheet.</li>
              <li>• Add a brand-new messy row to the raw <code className="font-mono text-xs">Orders_Raw</code> sheet.</li>
              <li>• Right-click the output table → <strong>Refresh</strong>.</li>
              <li>• The new row is <strong>cleaned, merged, and calculated automatically</strong>!</li>
              <li className="p-3.5 rounded-lg border border-teal-200 bg-teal-50/50 text-xs text-teal-950">
                <strong>Pro Tip:</strong> Always make the raw source an Excel Table (<code className="font-mono font-bold">Ctrl + T</code>) so its boundary expands automatically when new rows are pasted at the bottom.
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="text-sm font-bold text-slate-900">One-Click Refresh Simulator</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={extraRawAdded}
                  onClick={() => setExtraRawAdded(true)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700 disabled:opacity-40 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>1. Add Messy Row 1008</span>
                </button>
                <button
                  type="button"
                  disabled={!extraRawAdded || refreshed}
                  onClick={() => setRefreshed(true)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 rounded-md hover:bg-teal-800 disabled:opacity-40 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>2. Right-Click → Refresh</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExtraRawAdded(false);
                    setRefreshed(false);
                  }}
                  className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {extraRawAdded && (
              <div className="mb-4 p-3 rounded-lg border border-orange-200 bg-orange-50 font-mono text-xs text-orange-950">
                New Raw Row in Orders_Raw: <strong>1008 | "  deepa k  " | "madurai" | "15/03/2026" | "P03" | 3 | "Rs.350"</strong>
              </div>
            )}

            <div className="text-xs font-semibold text-teal-800 mb-2">Green Output Table (Orders_Clean):</div>
            <table className="w-full text-left border-collapse font-mono text-xs border border-slate-200">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">Customer</th>
                  <th className="py-2 px-3">City</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">ProductName</th>
                  <th className="py-2 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2 px-3">1001</td>
                  <td className="py-2 px-3">Ravi Kumar</td>
                  <td className="py-2 px-3">Chennai</td>
                  <td className="py-2 px-3">2026-03-05</td>
                  <td className="py-2 px-3">Arduino Kit</td>
                  <td className="py-2 px-3 text-right">900</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">1007</td>
                  <td className="py-2 px-3">Divya R</td>
                  <td className="py-2 px-3">Coimbatore</td>
                  <td className="py-2 px-3">2026-03-13</td>
                  <td className="py-2 px-3">Arduino Kit</td>
                  <td className="py-2 px-3 text-right">1800</td>
                </tr>
                {refreshed && (
                  <tr className="bg-teal-50 font-bold text-teal-950">
                    <td className="py-2.5 px-3">1008</td>
                    <td className="py-2.5 px-3">Deepa K</td>
                    <td className="py-2.5 px-3">Madurai</td>
                    <td className="py-2.5 px-3">2026-03-15</td>
                    <td className="py-2.5 px-3">Sensor Pack</td>
                    <td className="py-2.5 px-3 text-right">1050 ✓</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-500">
            {refreshed
              ? '✓ Row 1008 was trimmed, capitalized, date-parsed, stripped of "Rs.", merged with Sensor Pack, and multiplied!'
              : 'Click Step 1 then Step 2 above to experience automated Refresh.'}
          </div>
        </div>
      </div>
    );
  }

  // Slide 39: HANDS-ON 4B: Merge, Append, Refresh (20 min)
  const mScript = `let
    Source = Excel.CurrentWorkbook(){[Name="Orders_Raw"]}[Content],
    Trimmed = Table.TransformColumns(Source, {{"Customer", Text.Trim}, {"City", Text.Trim}}),
    ProperCase = Table.TransformColumns(Trimmed, {{"Customer", Text.Proper}, {"City", Text.Proper}}),
    CleanPrice = Table.ReplaceValue(ProperCase, "Rs.", "", Replacer.ReplaceText, {"Price"}),
    NullNA = Table.ReplaceValue(CleanPrice, "N/A", null, Replacer.ReplaceValue, {"Price"}),
    Typed = Table.TransformColumnTypes(NullNA, {{"OrderDate", type date}}, "en-IN"),
    Deduped = Table.Distinct(Typed, {"OrderID"}),
    ValidQty = Table.SelectRows(Deduped, each [Qty] >= 1),
    Merged = Table.NestedJoin(ValidQty, {"ProductCode"}, Products, {"ProductCode"}, "Prod", JoinKind.LeftOuter),
    Expanded = Table.ExpandTableColumn(Merged, "Prod", {"ProductName", "Category"})
in
    Expanded`;

  return (
    <div className="h-full w-full flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-3">
        <div className="text-sm font-semibold text-slate-900">
          Check Rule: <span className="text-teal-800">Merge adds COLUMNS</span> · <span className="text-orange-700">Append adds ROWS</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowMCode((m) => !m)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{showMCode ? 'Show Lab Tasks' : 'Challenge #5: View Advanced Editor (M Code)'}</span>
          </button>
          <WorkshopTimer defaultMinutes={20} />
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
        {!showMCode ? (
          <div className="grid grid-cols-12 gap-8 items-center my-auto">
            <div className="col-span-7 space-y-3.5 text-[15.5px] text-slate-800">
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                <strong>1. Merge Orders with Products (Left Outer):</strong> expand <code className="font-mono text-xs">ProductName</code> and <code className="font-mono text-xs">Category</code>.
              </div>
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                <strong>2. Create Bad_Codes:</strong> use a <strong>Left Anti</strong> merge to isolate unmatched codes (<code className="font-mono text-xs">P09</code>).
              </div>
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                <strong>3. Create Orders_Feb:</strong> two February rows with identical eight column names, then <strong>Append</strong>.
              </div>
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                <strong>4. Close and Load:</strong> add a messy row to the raw sheet and test <strong>Refresh</strong>.
              </div>
              <div className="p-3.5 rounded-lg border border-teal-200 bg-teal-50/50 text-teal-950">
                <strong>5. Challenge:</strong> Open <strong>View → Advanced Editor</strong> and notice each step is a single line of M code!
              </div>
            </div>

            <div className="col-span-5 p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Expected Workbook Output Sheets</h3>
              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded flex justify-between">
                  <span className="font-bold text-teal-800">Orders_All</span>
                  <span>Clean Jan/Mar + Feb + Product cols</span>
                </div>
                <div className="p-3 bg-white border border-orange-200 rounded flex justify-between">
                  <span className="font-bold text-orange-800">Bad_Codes</span>
                  <span>1 row: Order 1006 (Code P09)</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded flex justify-between">
                  <span className="text-slate-600">Orders_Raw</span>
                  <span>Untouched raw archive</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-auto space-y-3">
            <div className="text-xs font-semibold text-slate-600">
              View → Advanced Editor — Every point-and-click step generated one clean line of Power Query M language:
            </div>
            <pre className="p-5 rounded-xl bg-slate-900 text-teal-300 font-mono text-xs leading-relaxed overflow-x-auto">
              {mScript}
            </pre>
          </div>
        )}

        <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
          Need the two <code className="font-mono">Orders_Feb</code> rows? Click <strong>Datasets</strong> in the bottom bar to copy or download <code className="font-mono">Orders_Feb.csv</code>.
        </div>
      </div>
    </div>
  );
};
