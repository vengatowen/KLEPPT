import { SlideMeta } from '../types/slides';

export const SLIDES_META: SlideMeta[] = [
  // Opening (1-6)
  {
    number: 1,
    module: 'opening',
    moduleLabel: 'Opening',
    title: 'Data Cleaning and Preparation',
    subtitle: 'Excel 365, Excel 2021, Google Sheets, Power Query and AI',
    facilitatorPrompt:
      'Welcome students to the 7-hour workshop. Ask a quick show of hands: who uses Excel 365/2021 vs Google Sheets? Reassure mixed-level learners that every exercise starts from scratch and builds to automation.',
  },
  {
    number: 2,
    module: 'opening',
    moduleLabel: 'Opening',
    title: 'Why This Matters',
    subtitle: 'Clean inputs determine whether every downstream chart and decision can be trusted',
    facilitatorPrompt:
      'Toggle the chart between Raw Data and Cleaned Data on screen. Ask students: "If you presented ₹3,450 instead of ₹4,200 to your project guide or manager, what happens next?"',
  },
  {
    number: 3,
    module: 'opening',
    moduleLabel: 'Opening',
    title: 'What You Will Learn Today',
    subtitle: 'Six progressive modules across our 7-hour hands-on session',
    facilitatorPrompt:
      'Walk through the 7-hour rhythm: every short concept block ends with a hands-on lab. Beginners focus on core steps; fast finishers tackle the stretch challenge on each lab slide.',
  },
  {
    number: 4,
    module: 'opening',
    moduleLabel: 'Opening',
    title: 'Setup Checklist',
    subtitle: 'Prepare your workbook before touching a single cell',
    facilitatorPrompt:
      'Give students 3 minutes to open Excel 2021, Microsoft 365, or Google Sheets. Use the Datasets button at the bottom bar if you want to share CSVs or emphasise typing exact mistakes.',
  },
  {
    number: 5,
    module: 'opening',
    moduleLabel: 'Opening',
    title: 'Practice Dataset (Orders_Raw)',
    subtitle: 'Eight messy order rows — enter or paste exactly as shown, mistakes included',
    facilitatorPrompt:
      'Toggle "Show Hidden Spaces" to point out leading/trailing spaces in Row 2 (" ravi kumar ") and double internal space in Row 4 ("Anil  Verma"). Remind them: do NOT fix mistakes while typing!',
  },
  {
    number: 6,
    module: 'opening',
    moduleLabel: 'Opening',
    title: 'Practice Dataset (Products)',
    subtitle: 'Four-row master lookup table on the second sheet',
    facilitatorPrompt:
      'Click through P01–P04 to show how master data stays clean and compact. Ask sharp-eyed students if they notice a code in Orders_Raw that is missing here (P09!).',
  },

  // Module 1: Data Quality Issues (7-12)
  {
    number: 7,
    module: 'module1',
    moduleLabel: 'Module 1 · Data Quality Issues',
    title: 'Why Data Goes Bad',
    subtitle: 'Real-world datasets are shaped by human typing, loose forms, and legacy merges',
    facilitatorPrompt:
      'Ask students where they collect project data (Google Forms, college attendance sheets, CSV exports). Switch between Free-Text Form and Validated Form to show how bad entries enter at the source.',
  },
  {
    number: 8,
    module: 'module1',
    moduleLabel: 'Module 1 · Data Quality Issues',
    title: 'The Five Problem Types',
    subtitle: 'Every messy spreadsheet breaks down into five recognisable categories',
    facilitatorPrompt:
      'Click each of the 5 problem types. Emphasise #5 (Structural problems): beginners often confuse formatting with true data types—a cell showing "Rs.450" is text, not a number.',
  },
  {
    number: 9,
    module: 'module1',
    moduleLabel: 'Module 1 · Data Quality Issues',
    title: 'Examples From Our Dataset',
    subtitle: 'Mapping the five problem categories directly onto Orders_Raw',
    facilitatorPrompt:
      'Click each row in the table to spotlight where it lives in Orders_Raw. Notice how a single row (like Order 1002) can suffer from multiple issues simultaneously.',
  },
  {
    number: 10,
    module: 'module1',
    moduleLabel: 'Module 1 · Data Quality Issues',
    title: 'Quick Visual Tests',
    subtitle: 'Four 5-second checks before writing any formula',
    facilitatorPrompt:
      'Demonstrate selecting the Price column in the simulator: watch Count (8) vs Numerical Count (6) in the bottom Status Bar. Works identically in Excel 2021, 365, and Google Sheets!',
  },
  {
    number: 11,
    module: 'module1',
    moduleLabel: 'Module 1 · Data Quality Issues',
    title: 'The Four Cleaning Habits',
    subtitle: 'Professional discipline that separates reliable analysts from guesswork',
    facilitatorPrompt:
      'Stress Habit #2: "Decide the rule first." If one team member formats dates as dd-mm-yyyy and another uses yyyy-mm-dd, merging their work creates a brand-new mess.',
  },
  {
    number: 12,
    module: 'module1',
    moduleLabel: 'Module 1 · Data Quality Issues',
    title: 'HANDS-ON 1: Spot the Dirt (15 min)',
    subtitle: 'Pair audit on a copy named Orders_Clean — highest accurate count wins',
    isHandsOn: true,
    durationMinutes: 15,
    facilitatorPrompt:
      'Start the 15-minute timer. Walk the room to verify everyone copied Orders_Raw to Orders_Clean first! In the last 3 minutes, invite pairs to click cells on the projected grid, then click Reveal All.',
  },

  // Module 2: Cleaning in Excel and Google Sheets (13-22)
  {
    number: 13,
    module: 'module2',
    moduleLabel: 'Module 2 · Cleaning in Excel & Sheets',
    title: 'Text Functions',
    subtitle: 'Seven core functions that work identically in Excel 365, Excel 2021, and Google Sheets',
    facilitatorPrompt:
      'Click each function to test it live. Highlight the difference between TRIM (removes extra ASCII spaces, keeps single space between words) and CLEAN (removes non-printable line breaks).',
  },
  {
    number: 14,
    module: 'module2',
    moduleLabel: 'Module 2 · Cleaning in Excel & Sheets',
    title: 'Formulas in Action',
    subtitle: 'Always read nested formulas from the innermost parentheses outward',
    facilitatorPrompt:
      'Use the Inside-Out Stepper for =PROPER(TRIM(CLEAN(B2))) and =VALUE(SUBSTITUTE(G9,"Rs.","")). Ask beginners: "What does SUBSTITUTE return before VALUE wraps it?" (Text "450"!).',
  },
  {
    number: 15,
    module: 'module2',
    moduleLabel: 'Module 2 · Cleaning in Excel & Sheets',
    title: 'Google Sheets Extras',
    subtitle: 'Array formulas and cross-platform equivalents across Sheets, Excel 365, and Excel 2021',
    facilitatorPrompt:
      'Give equal spotlight here: show Sheets SPLIT / ARRAYFORMULA / UNIQUE, then click the Excel 365 and Excel 2021 tabs so every student knows what works in their exact version.',
  },
  {
    number: 16,
    module: 'module2',
    moduleLabel: 'Module 2 · Cleaning in Excel & Sheets',
    title: 'HANDS-ON 2A: Text Cleaning (10 min)',
    subtitle: 'Build five helper columns on Orders_Clean and verify character counts with LEN',
    isHandsOn: true,
    durationMinutes: 10,
    facilitatorPrompt:
      'Start the 10-minute timer. Watch out for Row 6 ("N/A") when cleaning Price: beginners will see #VALUE! on VALUE("N/A") unless wrapped in IF or IFERROR. Reveal formulas after 8 mins.',
  },
  {
    number: 17,
    module: 'module2',
    moduleLabel: 'Module 2 · Cleaning in Excel & Sheets',
    title: 'Formulas to Values',
    subtitle: 'Severing formula dependencies safely before removing raw columns',
    facilitatorPrompt:
      'Click "Delete Raw Column" FIRST in the simulator without pasting values—let students gasp at the wall of #REF! errors! Then Reset and do Copy → Paste Values → Delete.',
  },
  {
    number: 18,
    module: 'module2',
    moduleLabel: 'Module 2 · Cleaning in Excel & Sheets',
    title: 'Fixing Dates',
    subtitle: 'Converting text dates to real serial numbers formatted as yyyy-mm-dd',
    facilitatorPrompt:
      'Toggle DMY vs MDY in the simulator! Point to Row 9 (13/03/2026): because there is no 13th month, Row 9 proves our source file uses Day-Month-Year, meaning 05/03/2026 is 5 March, not 3 May!',
  },
  {
    number: 19,
    module: 'module2',
    moduleLabel: 'Module 2 · Cleaning in Excel & Sheets',
    title: 'Duplicates and Blanks',
    subtitle: 'Flag before deleting, and never guess whether a blank means zero',
    facilitatorPrompt:
      'Walk through the anchored range $A$2:A2 row by row so beginners understand why $ locks the top while the bottom grows. Toggle Blank = 0 vs Unknown to show how AVERAGE shifts.',
  },
  {
    number: 20,
    module: 'module2',
    moduleLabel: 'Module 2 · Cleaning in Excel & Sheets',
    title: 'Data Validation',
    subtitle: 'Best cleaning is the cleaning you never need to do',
    facilitatorPrompt:
      'Click "Circle Invalid Data" in the simulator. Note for Google Sheets users: Data → Data validation automatically shows red corner flags on invalid existing cells!',
  },
  {
    number: 21,
    module: 'module2',
    moduleLabel: 'Module 2 · Cleaning in Excel & Sheets',
    title: 'Find and Replace',
    subtitle: 'Ctrl+H speed with wildcard precision — and why Replace All can be dangerous',
    facilitatorPrompt:
      'Run the P1 → P01 demo WITHOUT "Match entire cell contents" first so students see P10 get corrupted into P010! Then toggle Match Entire Cell Contents ON and re-run.',
  },
  {
    number: 22,
    module: 'module2',
    moduleLabel: 'Module 2 · Cleaning in Excel & Sheets',
    title: 'HANDS-ON 2B: Clean the Orders (15 min)',
    subtitle: 'Deduplicate 8 rows to 7, standardise dates, document Qty rules, and lock validation',
    isHandsOn: true,
    durationMinutes: 15,
    facilitatorPrompt:
      'End with the Check question at the bottom: "Does 450 look right, or IS it right?" Have students test =ISNUMBER() or check the Status Bar Numerical Count.',
  },

  // Module 3: Sorting, Filtering and Lookups (23-30)
  {
    number: 23,
    module: 'module3',
    moduleLabel: 'Module 3 · Sorting, Filtering & Lookups',
    title: 'Sorting',
    subtitle: 'Single-level, multi-level, and custom lists — always inside a structured Table',
    facilitatorPrompt:
      'Click "Warning Demo: Sort City Alone" on screen! Let students see Ravi Kumar suddenly move to Coimbatore while his email stays in Row 2. That visual prevents a classic student disaster.',
  },
  {
    number: 24,
    module: 'module3',
    moduleLabel: 'Module 3 · Sorting, Filtering & Lookups',
    title: 'Filtering',
    subtitle: 'Interactive dropdown filters vs dynamic =FILTER() formulas',
    facilitatorPrompt:
      'Compare traditional Table dropdown filters (hides rows in place) with =FILTER(A2:H8, C2:C8="Chennai") in Google Sheets and Excel 365 (outputs a separate live summary table). Note Excel 2021 uses dropdown/Advanced Filter.',
  },
  {
    number: 25,
    module: 'module3',
    moduleLabel: 'Module 3 · Sorting, Filtering & Lookups',
    title: 'HANDS-ON 3A: Sort and Filter (8 min)',
    subtitle: 'Isolate subsets cleanly and copy filtered results to a dedicated sheet',
    isHandsOn: true,
    durationMinutes: 8,
    facilitatorPrompt:
      'Quick 8-minute sprint! Remind students to clear Filter #1 (Chennai) before testing Filter #2 (Qty > 2), unless asked to combine both.',
  },
  {
    number: 26,
    module: 'module3',
    moduleLabel: 'Module 3 · Sorting, Filtering & Lookups',
    title: 'Why Lookups?',
    subtitle: 'Joining transactional codes with master product names using four ingredients',
    facilitatorPrompt:
      'Click different rows in Orders to animate the lookup bridge. Memorise the 4 ingredients in plain English before showing any syntax: What to find · Where to look · What to return · Exact match.',
  },
  {
    number: 27,
    module: 'module3',
    moduleLabel: 'Module 3 · Sorting, Filtering & Lookups',
    title: 'VLOOKUP',
    subtitle: 'Classic vertical lookup — essential for legacy workbooks, with three famous traps',
    facilitatorPrompt:
      'Toggle off the $ locks and toggle FALSE to TRUE in the simulator. Explain that knowing VLOOKUP is vital for interviews and older sheets, even though XLOOKUP is safer.',
  },
  {
    number: 28,
    module: 'module3',
    moduleLabel: 'Module 3 · Sorting, Filtering & Lookups',
    title: 'XLOOKUP (Preferred)',
    subtitle: 'Modern, resilient lookup built into Excel 2021, Excel 365, and Google Sheets',
    facilitatorPrompt:
      'Great news for mixed software classrooms: XLOOKUP works identically in Excel 2021, Excel 365, AND Google Sheets! Show how P09 cleanly returns "Not found" instead of an ugly error.',
  },
  {
    number: 29,
    module: 'module3',
    moduleLabel: 'Module 3 · Sorting, Filtering & Lookups',
    title: 'Lookup Errors',
    subtitle: 'Diagnosing #N/A, #REF!, and #VALUE! in seconds',
    facilitatorPrompt:
      'In Scenario 1, point out the invisible trailing space ("P01 " vs "P01")—the #1 reason students raise their hand saying "Ma\'am, P01 is right there, why does it say #N/A?!"',
  },
  {
    number: 30,
    module: 'module3',
    moduleLabel: 'Module 3 · Sorting, Filtering & Lookups',
    title: 'HANDS-ON 3B: Lookups (20 min)',
    subtitle: 'Enrich Orders with ProductName, Category, Line_Total, and audit unknown code P09',
    isHandsOn: true,
    durationMinutes: 20,
    facilitatorPrompt:
      'Give beginners solid time for tasks 1–4; challenge faster students with Task 5 (returning two columns at once with Products!$B$2:$C$5—note how dynamic array spill works in 365/2021/Sheets!).',
  },

  // Module 4: Power Query (31-39)
  {
    number: 31,
    module: 'module4',
    moduleLabel: 'Module 4 · Power Query',
    title: 'What Is Power Query?',
    subtitle: 'Record your cleaning recipe once — replay it on fresh data with one click',
    facilitatorPrompt:
      'Frame Power Query as a macro recorder specifically built for data cleaning—zero coding required! For students on Google Sheets today, ask them to pair up with an Excel partner or follow the live simulator.',
  },
  {
    number: 32,
    module: 'module4',
    moduleLabel: 'Module 4 · Power Query',
    title: 'The Editor',
    subtitle: 'Four workspaces inside Data → From Table/Range',
    facilitatorPrompt:
      'Click backward and forward through "Applied Steps" on the right side of the simulated Editor. Emphasise that Ctrl+Z does NOT work inside Power Query—instead, click the × next to any step!',
  },
  {
    number: 33,
    module: 'module4',
    moduleLabel: 'Module 4 · Power Query',
    title: 'Data Sources',
    subtitle: 'Ingesting workbooks, CSVs, web tables, and entire folders of monthly files',
    facilitatorPrompt:
      'Click "Folder" in the connector preview: tell students how combining 12 monthly sales CSVs takes 45 minutes manually vs 30 seconds with From Folder.',
  },
  {
    number: 34,
    module: 'module4',
    moduleLabel: 'Module 4 · Power Query',
    title: 'Cleaning Steps',
    subtitle: 'Point-and-click transformations — and why step order matters',
    facilitatorPrompt:
      'Toggle the step order in the live box! Show what happens when Power Query converts "Rs.450" to Whole Number BEFORE replacing "Rs." -> immediate DataFormat.Error!',
  },
  {
    number: 35,
    module: 'module4',
    moduleLabel: 'Module 4 · Power Query',
    title: 'HANDS-ON 4A: Clean in Power Query (20 min)',
    subtitle: 'Build a repeatable 7-step cleaning pipeline on Orders_Raw',
    isHandsOn: true,
    durationMinutes: 20,
    facilitatorPrompt:
      'Remind students at Step 4: right-click OrderDate type icon → Using Locale → Date → English (India) so 05/03/2026 parses reliably as 5 March regardless of Windows region settings!',
  },
  {
    number: 36,
    module: 'module4',
    moduleLabel: 'Module 4 · Power Query',
    title: 'Merge Queries',
    subtitle: 'Database-grade joins by key — finding matches and catching bad codes simultaneously',
    facilitatorPrompt:
      'Click through all four Join Kinds in the visualizer. Students love "Left Anti"—explain it as an automatic exception report that isolates Order 1006 (P09) into its own Bad_Codes sheet!',
  },
  {
    number: 37,
    module: 'module4',
    moduleLabel: 'Module 4 · Power Query',
    title: 'Append Queries',
    subtitle: 'Stacking monthly tables vertically when column headers match',
    facilitatorPrompt:
      'Toggle the "Header Typo (city vs City)" switch in the simulator! Power Query is strictly case-sensitive: "city" and "City" become two separate columns filled with nulls.',
  },
  {
    number: 38,
    module: 'module4',
    moduleLabel: 'Module 4 · Power Query',
    title: 'Load and Refresh',
    subtitle: 'Close & Load to Excel, drop in new raw rows, and right-click Refresh',
    facilitatorPrompt:
      'Click "+ Add Messy Row 1008" then click "Refresh Output Table" on screen. This is the "aha!" moment of the entire 7-hour day—zero formulas rewritten!',
  },
  {
    number: 39,
    module: 'module4',
    moduleLabel: 'Module 4 · Power Query',
    title: 'HANDS-ON 4B: Merge, Append, Refresh (20 min)',
    subtitle: 'Combine tables, isolate Bad_Codes, stack February orders, and inspect M code',
    isHandsOn: true,
    durationMinutes: 20,
    facilitatorPrompt:
      'Reinforce the Check mantra aloud with the class: "Merge adds COLUMNS (side-by-side); Append adds ROWS (top-to-bottom)." Show the Advanced Editor tab for curious learners.',
  },

  // Module 5: AI-Assisted Data Preparation (40-45)
  {
    number: 40,
    module: 'module5',
    moduleLabel: 'Module 5 · AI-Assisted Data Preparation',
    title: 'Privacy First',
    subtitle: 'Strict data-protection rules before pasting anything into an external AI tool',
    facilitatorPrompt:
      'Run the 5-card Red-Flag quiz with the class shouting "Safe!" or "Block!". Emphasise the golden accountability rule: "AI did it" is never an acceptable excuse in projects or jobs.',
  },
  {
    number: 41,
    module: 'module5',
    moduleLabel: 'Module 5 · AI-Assisted Data Preparation',
    title: 'How to Anonymise',
    subtitle: 'Mask identities while keeping the exact structural dirt so AI sees the real problem',
    facilitatorPrompt:
      'Click "Anonymise Sample" and point out a subtle mistake beginners make: if you replace " ravi kumar " with clean "Customer A", the AI never knows you had extra spaces or lowercase!',
  },
  {
    number: 42,
    module: 'module5',
    moduleLabel: 'Module 5 · AI-Assisted Data Preparation',
    title: 'A Good Prompt Has Four Parts',
    subtitle: 'Context · Data Shape · Task · Output Format',
    facilitatorPrompt:
      'Toggle the 4 prompt building blocks on and off. Notice how omitting Context ("Excel 2021" vs "Excel 365") often makes AI give TEXTSPLIT, which gives #NAME? in Excel 2021!',
  },
  {
    number: 43,
    module: 'module5',
    moduleLabel: 'Module 5 · AI-Assisted Data Preparation',
    title: 'Prompt Templates',
    subtitle: 'Five reusable prompt patterns for formulas, Power Query plans, debugging, and validation',
    facilitatorPrompt:
      'Click through Templates 1–5. Highlight Template #3 (Explain) and #4 (Debug)—AI is often even more valuable as a patient 1-on-1 formula tutor than a blind code generator.',
  },
  {
    number: 44,
    module: 'module5',
    moduleLabel: 'Module 5 · AI-Assisted Data Preparation',
    title: 'Verify Every Answer',
    subtitle: 'Six verification checks to catch plausible-looking AI mistakes on edge cases',
    facilitatorPrompt:
      'Demo the Naive AI Formula =VALUE(RIGHT(G2,3)): it passes on "Rs.450" (450!), fooling careless users, then silently chops "Rs.1200" into 200! Always test 3+ diverse rows and edge cases.',
  },
  {
    number: 45,
    module: 'module5',
    moduleLabel: 'Module 5 · AI-Assisted Data Preparation',
    title: 'HANDS-ON 5: AI Prompting (10 min)',
    subtitle: 'Anonymise, craft a 4-part prompt for email domain extraction, verify, and peer-critique',
    isHandsOn: true,
    durationMinutes: 10,
    facilitatorPrompt:
      'Have pairs test their prompt in the Prompt Grader on screen, then ask the Check question before moving to Capstone: 1) Remove PII / Anonymise, 2) Trim sample to 5–10 rows, 3) Keep representative dirt.',
  },

  // Module 6: Capstone and Wrap-up (46-51)
  {
    number: 46,
    module: 'module6',
    moduleLabel: 'Module 6 · Capstone & Wrap-Up',
    title: 'Capstone Challenge (20 min)',
    subtitle: 'End-to-end pair challenge on a fresh Student Marks dataset',
    isHandsOn: true,
    durationMinutes: 20,
    facilitatorPrompt:
      'Click "Download / Copy Capstone Dataset" so pairs have Student_Marks_Raw and Departments immediately. Let pairs choose Excel Formulas, Google Sheets, or Power Query—as long as they justify why!',
  },
  {
    number: 47,
    module: 'module6',
    moduleLabel: 'Module 6 · Capstone & Wrap-Up',
    title: 'Scoring Rubric (10 points)',
    subtitle: 'Transparent 5-part evaluation criteria for peer or instructor review',
    facilitatorPrompt:
      'Keep this rubric projected during the last 5 minutes of Capstone or use the interactive point buttons during live pair demos so students ensure they didn\'t skip verification (2 pts!).',
  },
  {
    number: 48,
    module: 'module6',
    moduleLabel: 'Module 6 · Capstone & Wrap-Up',
    title: 'Quick Reference',
    subtitle: 'Your single-page decision matrix from symptom to fix',
    facilitatorPrompt:
      'Filter by software tool to recap how every problem we tackled today has both a quick formula/menu fix AND a scalable Power Query / dynamic array fix.',
  },
  {
    number: 49,
    module: 'module6',
    moduleLabel: 'Module 6 · Capstone & Wrap-Up',
    title: 'Key Takeaways',
    subtitle: 'Five habits to carry into every college project, internship, and analyst role',
    facilitatorPrompt:
      'Click each of the 5 takeaways for a rapid-fire 10-second class recall check to energise the room near the end of your 7-hour workshop.',
  },
  {
    number: 50,
    module: 'module6',
    moduleLabel: 'Module 6 · Capstone & Wrap-Up',
    title: 'Homework',
    subtitle: 'Three practical deliverables to cement muscle memory on your own data',
    facilitatorPrompt:
      'Encourage students to pick a real dataset they care about—club attendance, lab inventory, cricket stats, or placement test scores—so the one-page decision note feels meaningful.',
  },
  {
    number: 51,
    module: 'module6',
    moduleLabel: 'Module 6 · Capstone & Wrap-Up',
    title: 'Exit Questions and Thank You',
    subtitle: 'Final reflection · Presented by Aishwerya R.',
    facilitatorPrompt:
      'Invite 3–4 students to share aloud and type their responses live into the Exit Board on screen. Congratulate them on completing all 6 modules and 9 hands-on labs!',
  },
];
