import React, { useState } from 'react';
import { Eye, Check, Copy, RotateCcw, ShieldAlert } from 'lucide-react';
import { WorkshopTimer } from '../common/WorkshopTimer';

interface Module5SlidesProps {
  slideNumber: number;
}

export const Module5Slides: React.FC<Module5SlidesProps> = ({ slideNumber }) => {
  // Slide 40 state: Privacy quiz
  const [privacyVotes, setPrivacyVotes] = useState<Record<number, 'safe' | 'block'>>({});

  // Slide 41 state: Anonymisation mode
  const [anonMode, setAnonMode] = useState<'raw' | 'overclean' | 'smart'>('smart');

  // Slide 42 state: 4-part prompt toggles
  const [parts42, setParts42] = useState({
    context: true,
    shape: true,
    task: true,
    format: true,
  });

  // Slide 43 state: Active template
  const [tplIdx, setTplIdx] = useState(0);
  const [copiedTpl, setCopiedTpl] = useState(false);

  // Slide 44 state: AI formula edge-case tester
  const [formula44Mode, setFormula44Mode] = useState<'naive' | 'robust'>('naive');

  // Slide 45 state: Hands-On 5 prompt grader
  const [studentPrompt, setStudentPrompt] = useState(
    'I use Excel 2021. Column H has emails like user1@example.com and broken ones like user2@example. Give one formula for I2 to extract the domain after @, and explain each part.'
  );
  const [reveal45, setReveal45] = useState(false);

  if (slideNumber === 40) {
    const scenarios = [
      {
        text: 'Pasting 800 rows of real college placement student phone numbers & emails into a public AI chat',
        correct: 'block' as const,
        reason: 'Violates privacy — contains real student PII and way more than 5–10 rows.',
      },
      {
        text: 'Pasting 6 anonymised rows ("Customer A", "user1@example.com", "Rs.450") to ask for an Excel formula',
        correct: 'safe' as const,
        reason: 'Safe! Zero real identities, tiny representative sample.',
      },
      {
        text: 'Describing column structure in words ("Column G has Rs.450 and N/A") without pasting any client data',
        correct: 'safe' as const,
        reason: 'Safest approach! Zero data leaves your workbook.',
      },
      {
        text: 'Submitting an AI-generated revenue summary to your guide without checking totals',
        correct: 'block' as const,
        reason: 'Rule: YOU are responsible for the result, never the AI.',
      },
    ];

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-800 mb-4">
              <ShieldAlert className="w-4 h-4" />
              <span>Non-Negotiable Data Protection Rules</span>
            </div>
            <ul className="space-y-4 text-[16px] leading-snug text-slate-800">
              <li>• <strong>Never paste real or sensitive data</strong> into an external AI tool.</li>
              <li>• <strong>No real names, emails, phone numbers, IDs</strong>, or confidential client files.</li>
              <li>• Use <strong>sample or anonymised data only</strong>.</li>
              <li>• Keep <strong>5 to 10 representative rows</strong> — never dump thousands of rows.</li>
              <li className="font-bold text-slate-900">• Golden Rule: You are responsible for the result, not the AI.</li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Class Quick Vote: Safe or Block?</h3>
              <button
                type="button"
                onClick={() => setPrivacyVotes({})}
                className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Reset Votes
              </button>
            </div>

            <div className="space-y-3">
              {scenarios.map((s, idx) => {
                const vote = privacyVotes[idx];
                const isRight = vote === s.correct;
                return (
                  <div key={idx} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-medium text-slate-800 leading-relaxed">{s.text}</p>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setPrivacyVotes((p) => ({ ...p, [idx]: 'safe' }))}
                          className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
                            vote === 'safe' ? 'bg-teal-700 text-white' : 'bg-white border border-slate-300 text-slate-700'
                          }`}
                        >
                          Safe
                        </button>
                        <button
                          type="button"
                          onClick={() => setPrivacyVotes((p) => ({ ...p, [idx]: 'block' }))}
                          className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
                            vote === 'block' ? 'bg-red-600 text-white' : 'bg-white border border-slate-300 text-slate-700'
                          }`}
                        >
                          Block
                        </button>
                      </div>
                    </div>
                    {vote && (
                      <div className={`text-[11px] mt-2 font-medium ${isRight ? 'text-teal-800' : 'text-red-700'}`}>
                        {isRight ? '✓ Correct: ' : '× Check again: '}
                        {s.reason}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 41) {
    const anonSamples = {
      raw: [
        { name: '" ravi kumar "', email: 'ravi.k@mail.com', price: '450' },
        { name: 'PRIYA SHARMA', email: 'priya@mail', price: '1200' },
        { name: 'Anil  Verma', email: 'anil.v@mail.com', price: 'Rs.450' },
      ],
      overclean: [
        { name: 'Customer A', email: 'user1@example.com', price: '450' },
        { name: 'Customer B', email: 'user2@example.com', price: '1200' },
        { name: 'Customer C', email: 'user3@example.com', price: '450' },
      ],
      smart: [
        { name: '" customer a "', email: 'user1@example.com', price: '450' },
        { name: 'CUSTOMER B', email: 'user2@example', price: '1200' },
        { name: 'Customer  C', email: 'user3@example.com', price: 'Rs.450' },
      ],
    };

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Safe Masking Technique</div>
            <ul className="space-y-4 text-[16px] leading-snug text-slate-800">
              <li>• Replace names with <code className="font-mono text-xs font-semibold">Customer A, Customer B</code></li>
              <li>• Replace emails with <code className="font-mono text-xs font-semibold">user1@example.com</code></li>
              <li>• Or simply <strong>describe the column</strong> in plain words instead of pasting rows</li>
              <li className="p-3.5 rounded-lg border border-teal-200 bg-teal-50/50 text-xs text-teal-950 leading-relaxed">
                <strong>Key Insight:</strong> Include a few messy rows <em>with the exact same formatting bugs</em> so the AI sees the real problems!
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="text-sm font-bold text-slate-900">Anonymiser Comparison</div>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setAnonMode('raw')}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                    anonMode === 'raw' ? 'bg-white text-red-700 font-semibold shadow-xs' : 'text-slate-600'
                  }`}
                >
                  × Raw PII (Unsafe)
                </button>
                <button
                  type="button"
                  onClick={() => setAnonMode('overclean')}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                    anonMode === 'overclean' ? 'bg-white text-orange-700 font-semibold shadow-xs' : 'text-slate-600'
                  }`}
                >
                  ! Over-Cleaned Mask
                </button>
                <button
                  type="button"
                  onClick={() => setAnonMode('smart')}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                    anonMode === 'smart' ? 'bg-white text-teal-800 font-semibold shadow-xs' : 'text-slate-600'
                  }`}
                >
                  ✓ Smart Anonymised
                </button>
              </div>
            </div>

            <table className="w-full text-left border-collapse font-mono text-xs border border-slate-200 mb-4">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {anonSamples[anonMode].map((r, i) => (
                  <tr key={i}>
                    <td className="py-3 px-3 whitespace-pre">{r.name}</td>
                    <td className="py-3 px-3">{r.email}</td>
                    <td className="py-3 px-3">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700">
              {anonMode === 'raw' && '× Unsafe: Real customer names and emails are exposed.'}
              {anonMode === 'overclean' &&
                '! Mistake: You accidentally cleaned the spaces, CAPS, broken email, and "Rs." while masking — now AI says "Your data already looks clean!"'}
              {anonMode === 'smart' &&
                '✓ Ideal: Real identities are hidden, yet leading spaces (" customer a "), ALL CAPS, missing .com ("user2@example"), and "Rs.450" remain visible for AI diagnosis!'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 42) {
    const builtChunks: string[] = [];
    if (parts42.context) builtChunks.push('I use Excel 365.');
    if (parts42.shape) builtChunks.push('Column B has names with extra spaces and mixed capitalisation.');
    if (parts42.task) builtChunks.push('Give one formula for C2 that returns Proper Case with single spaces,');
    if (parts42.format) builtChunks.push('and explain each part.');

    const activeCount = Object.values(parts42).filter(Boolean).length;

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-3">The 4-Part Prompt Anatomy</div>
            <div className="space-y-2.5 text-sm text-slate-800 mb-5">
              <div><strong>1. Context:</strong> Excel 365, Excel 2021, Google Sheets, or Power Query</div>
              <div><strong>2. Data shape:</strong> what the column actually contains</div>
              <div><strong>3. Task:</strong> exact clean result you want</div>
              <div><strong>4. Output format:</strong> one formula, numbered steps, or beginner explanation</div>
            </div>

            <div className="p-3.5 rounded-lg border border-red-200 bg-red-50/60 text-xs text-red-900 mb-3">
              <strong>Weak Prompt:</strong> "Clean my data."
            </div>
            <div className="p-3.5 rounded-lg border border-teal-200 bg-teal-50/50 text-xs text-teal-950 leading-relaxed">
              <strong>Strong Prompt:</strong> "I use Excel 365. Column B has names with extra spaces and mixed capitalisation. Give one formula for C2 that returns Proper Case with single spaces, and explain each part."
            </div>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-sm font-bold text-slate-900 mb-3">
              Interactive Prompt Quality Simulator — Toggle parts on/off:
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {(
                [
                  { k: 'context', label: '1. Context' },
                  { k: 'shape', label: '2. Data Shape' },
                  { k: 'task', label: '3. Task' },
                  { k: 'format', label: '4. Output Format' },
                ] as const
              ).map((item) => (
                <button
                  key={item.k}
                  type="button"
                  onClick={() => setParts42((p) => ({ ...p, [item.k]: !p[item.k] }))}
                  className={`py-2 px-2.5 text-xs font-semibold rounded-lg border cursor-pointer ${
                    parts42[item.k]
                      ? 'bg-teal-700 text-white border-teal-700'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  {parts42[item.k] ? `✓ ${item.label}` : `× ${item.label}`}
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs mb-4 min-h-14">
              Prompt Sent: "{builtChunks.length > 0 ? builtChunks.join(' ') : 'Clean my data.'}"
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-2">
              <div className="font-bold text-slate-900">Simulated AI Response ({activeCount}/4 parts provided):</div>
              {activeCount === 4 ? (
                <div className="text-teal-950 space-y-1.5">
                  <div className="font-mono font-bold text-teal-800">=PROPER(TRIM(CLEAN(B2)))</div>
                  <div>• <strong>CLEAN(B2)</strong> removes non-printable line breaks.</div>
                  <div>• <strong>TRIM(...)</strong> removes leading, trailing, and duplicate spaces.</div>
                  <div>• <strong>PROPER(...)</strong> capitalises the first letter of each word.</div>
                </div>
              ) : !parts42.context ? (
                <p className="text-orange-800">
                  ! Missing Context: AI gives a Python pandas script <code className="font-mono">df['col'].str.strip().str.title()</code> instead of an Excel/Sheets formula!
                </p>
              ) : !parts42.shape ? (
                <p className="text-orange-800">
                  ! Missing Data Shape: AI guesses <code className="font-mono">=PROPER(B2)</code> and forgets <code className="font-mono">TRIM()</code>, leaving double spaces inside "Anil  Verma"!
                </p>
              ) : (
                <p className="text-orange-800">
                  ! Incomplete Prompt: Response gives a long 500-word essay or omits cell reference C2 and beginner explanation.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 43) {
    const templates = [
      {
        tag: '1. Formula',
        prompt: `I use [Excel 365 / Excel 2021 / Google Sheets]. Column G has prices like 'Rs.450' and 'N/A'. Write one formula for H2 that returns a number, or blank for N/A.`,
        output: `=IF(G2="N/A", "", VALUE(SUBSTITUTE(G2, "Rs.", "")))`,
      },
      {
        tag: '2. Cleaning Plan',
        prompt: `Here is a 6-row anonymised sample [paste]. List all data quality problems and the exact Power Query steps in the right order.`,
        output: `1. Trim & Capitalize Text -> 2. Replace "Rs." & "N/A" -> 3. Change Types (India DMY locale) -> 4. Remove Duplicates -> 5. Filter Qty >= 1`,
      },
      {
        tag: '3. Explain',
        prompt: `Explain this formula line by line from the inside out for a beginner: =LEFT(H2, FIND("@", H2)-1)`,
        output: `1) FIND("@",H2) locates @ position -> 2) -1 steps one character left -> 3) LEFT(...) extracts username characters.`,
      },
      {
        tag: '4. Debug',
        prompt: `My XLOOKUP in Excel 2021 returns #N/A even though "P01" appears in both sheets. List the top 3 causes and how to test each.`,
        output: `Check 1: Trailing spaces (=LEN(E2)) -> Check 2: Text vs Number (=ISTEXT()) -> Check 3: Hidden line breaks (CLEAN).`,
      },
      {
        tag: '5. Validation',
        prompt: `Suggest Data Validation custom formula rules for a 10-digit Indian mobile number column starting in J2.`,
        output: `=AND(ISNUMBER(J2), LEN(J2)=10, LEFT(TEXT(J2,"0"),1)>="6")`,
      },
    ];

    const curT = templates[tplIdx];

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 flex flex-col justify-between gap-2.5">
          {templates.map((t, i) => (
            <button
              key={t.tag}
              type="button"
              onClick={() => setTplIdx(i)}
              className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                tplIdx === i ? 'bg-white border-teal-600 shadow-xs font-bold text-slate-900' : 'bg-white/75 border-slate-200 text-slate-700 hover:bg-white'
              }`}
            >
              <div className="text-sm">{t.tag}</div>
              <div className="text-xs text-slate-500 font-normal truncate mt-0.5">{t.prompt}</div>
            </button>
          ))}
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">{curT.tag} Template</h3>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(curT.prompt);
                  setCopiedTpl(true);
                  setTimeout(() => setCopiedTpl(false), 1800);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 cursor-pointer"
              >
                {copiedTpl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTpl ? 'Copied Prompt!' : 'Copy Template'}</span>
              </button>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 font-mono text-xs text-slate-800 leading-relaxed">
              "{curT.prompt}"
            </div>

            <div className="p-4 rounded-lg border border-teal-200 bg-teal-50/50">
              <div className="text-xs font-semibold text-teal-900 mb-1">Expected Verified Solution:</div>
              <div className="font-mono text-xs text-teal-950 font-semibold">{curT.output}</div>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
            Save these 5 templates in your personal notes — they cover 95% of spreadsheet cleaning tasks!
          </div>
        </div>
      </div>
    );
  }

  if (slideNumber === 44) {
    const testCases = [
      { row: 'Row 9 ("Rs.450")', naive: '450 (Looks right!)', robust: '450 ✓', naiveBad: false },
      { row: 'Edge 1 ("Rs.1200")', naive: '200 (WRONG! Chopped "1"!)', robust: '1200 ✓', naiveBad: true },
      { row: 'Edge 2 ("N/A")', naive: '#VALUE! (Crashes!)', robust: '"" (Clean blank ✓)', naiveBad: true },
      { row: 'Edge 3 (450 numeric)', naive: '450', robust: '450 ✓', naiveBad: false },
    ];

    return (
      <div className="h-full w-full grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-4">Six Mandatory Verification Checks</div>
            <ul className="space-y-3.5 text-[15px] leading-snug text-slate-800">
              <li>• <strong>Test on three rows</strong> where you already know the right answer.</li>
              <li>• <strong>Test edge cases:</strong> blank, text placeholder, 4-digit numbers, negatives.</li>
              <li>• <strong>Compare row counts and totals</strong> before and after.</li>
              <li>• <strong>Understand every step</strong> — ask the AI to explain unfamiliar functions.</li>
              <li>• <strong>Check version support</strong> (<code className="font-mono text-xs">TEXTAFTER</code> fails in Excel 2021!).</li>
              <li className="text-red-800 font-semibold">• Never run VBA macros or scripts you do not understand.</li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Why Testing Only One Row Fails</h3>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setFormula44Mode('naive')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                    formula44Mode === 'naive' ? 'bg-white text-red-700 font-semibold shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Flawed AI Formula: =VALUE(RIGHT(G2,3))
                </button>
                <button
                  type="button"
                  onClick={() => setFormula44Mode('robust')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                    formula44Mode === 'robust' ? 'bg-white text-teal-800 font-semibold shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Verified: SUBSTITUTE + IF
                </button>
              </div>
            </div>

            <table className="w-full text-left border-collapse font-mono text-xs border border-slate-200">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2.5 px-3">Test Input</th>
                  <th className="py-2.5 px-3">Evaluated Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {testCases.map((tc) => {
                  const bad = formula44Mode === 'naive' && tc.naiveBad;
                  return (
                    <tr key={tc.row} className={bad ? 'bg-red-50' : ''}>
                      <td className="py-3 px-3 text-slate-800">{tc.row}</td>
                      <td className={`py-3 px-3 font-semibold ${bad ? 'text-red-700' : 'text-teal-900'}`}>
                        {formula44Mode === 'naive' ? tc.naive : tc.robust}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700">
            Notice how <code className="font-mono">=VALUE(RIGHT(G2,3))</code> passed on <code className="font-mono">"Rs.450"</code>, tricking anyone who only checked Row 9, then destroyed <code className="font-mono">"Rs.1200"</code>!
          </div>
        </div>
      </div>
    );
  }

  // Slide 45: HANDS-ON 5: AI Prompting (10 min)
  const pLower = studentPrompt.toLowerCase();
  const hasContext = pLower.includes('excel') || pLower.includes('sheets') || pLower.includes('power query');
  const hasShape = pLower.includes('@') || pLower.includes('email') || pLower.includes('column');
  const hasTask = pLower.includes('domain') || pLower.includes('after') || pLower.includes('extract');
  const hasFormat = pLower.includes('formula') || pLower.includes('explain') || pLower.includes('step');
  const score45 = [hasContext, hasShape, hasTask, hasFormat].filter(Boolean).length;

  return (
    <div className="h-full w-full flex flex-col justify-between gap-3.5">
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-2.5">
        <div className="flex items-center gap-4 text-xs text-slate-700">
          <span><strong>1.</strong> Anonymise 6 rows</span>
          <span><strong>2.</strong> Prompt for email domain</span>
          <span><strong>3.</strong> Test 3 rows</span>
          <span><strong>4.</strong> Note changes</span>
          <span><strong>5.</strong> Partner critique</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setReveal45((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{reveal45 ? 'Hide Solutions' : 'Reveal Solutions & Check'}</span>
          </button>
          <WorkshopTimer defaultMinutes={10} />
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-12 gap-6 items-stretch">
        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">Live 4-Part Prompt Grader (Test a student prompt):</span>
              <span className="font-mono text-xs font-bold text-teal-800 tabular-nums">Score: {score45} / 4 Parts</span>
            </div>
            <textarea
              rows={3}
              value={studentPrompt}
              onChange={(e) => setStudentPrompt(e.target.value)}
              className="w-full p-3 font-mono text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600 mb-3"
            />
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { ok: hasContext, name: '1. Context' },
                { ok: hasShape, name: '2. Data Shape' },
                { ok: hasTask, name: '3. Task' },
                { ok: hasFormat, name: '4. Output Format' },
              ].map((b) => (
                <div
                  key={b.name}
                  className={`p-2 rounded border text-center font-semibold ${
                    b.ok ? 'border-teal-300 bg-teal-50 text-teal-900' : 'border-orange-200 bg-orange-50 text-orange-800'
                  }`}
                >
                  {b.ok ? `✓ ${b.name}` : `! ${b.name}`}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 text-xs text-slate-700">
            <strong>Check Question:</strong> <em>What three things must you do before pasting data into AI?</em>
            {reveal45 && (
              <div className="mt-1 font-semibold text-teal-800">
                1) Remove all real PII (names, emails, IDs) · 2) Trim to 5–10 sample rows · 3) Keep representative formatting mistakes!
              </div>
            )}
          </div>
        </div>

        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-800 mb-3">
              Verified Email Domain Formulas (Equal Platform Support):
            </div>
            {reveal45 ? (
              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-2.5 rounded border border-slate-200 bg-slate-50">
                  <div className="font-sans font-bold text-slate-700 mb-0.5">Excel 2021 &amp; Universal:</div>
                  <div className="text-teal-800 font-semibold">=MID(H2, FIND("@",H2)+1, LEN(H2))</div>
                </div>
                <div className="p-2.5 rounded border border-slate-200 bg-slate-50">
                  <div className="font-sans font-bold text-slate-700 mb-0.5">Excel 365:</div>
                  <div className="text-teal-800 font-semibold">=TEXTAFTER(H2, "@")</div>
                </div>
                <div className="p-2.5 rounded border border-slate-200 bg-slate-50">
                  <div className="font-sans font-bold text-slate-700 mb-0.5">Google Sheets:</div>
                  <div className="text-teal-800 font-semibold">=REGEXEXTRACT(H2, "@(.+)$")</div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-500 text-center">
                Click <strong>Reveal Solutions &amp; Check</strong> after pairs critique each other’s prompts!
              </div>
            )}
          </div>
          <div className="text-[11px] text-slate-500">
            Edge test: Does <code className="font-mono">"priya@mail"</code> lack a dot <code className="font-mono">.</code> in the extracted domain? Good verification catches that!
          </div>
        </div>
      </div>
    </div>
  );
};
