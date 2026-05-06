import { useState, useMemo } from 'react'

/* =====================================================================
   OPS AUTOMATION LAB — single-file React app
   Front-end only. No backend. No persistence. No external API calls.
   ===================================================================== */

export default function App() {
  // Lifted state: pricing card → intake form prefill
  const [selectedPackage, setSelectedPackage] = useState(null)

  const selectPackage = (pkgLabel) => {
    setSelectedPackage(pkgLabel)
    // Defer scroll a tick so React state commits first
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <DemoLab />
        <WhatIAutomate />
        <Proof />
        <Packages onSelectPackage={selectPackage} />
        <Boundaries />
        <Contact
          selectedPackage={selectedPackage}
          clearPackage={() => setSelectedPackage(null)}
        />
      </main>
      <Footer />
    </div>
  )
}

/* ---------- Layout primitives ---------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="inline-block w-2.5 h-2.5 bg-signal shadow-[0_0_12px_rgba(212,240,74,0.8)]" />
          <span className="font-mono text-sm tracking-wide">
            ops_automation_lab
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 font-mono text-[13px] text-ink-300">
          <a href="#demos" className="hover:text-ink-100 transition-colors">demos</a>
          <a href="#what" className="hover:text-ink-100 transition-colors">what</a>
          <a href="#proof" className="hover:text-ink-100 transition-colors">proof</a>
          <a href="#packages" className="hover:text-ink-100 transition-colors">packages</a>
          <a href="#contact" className="btn-secondary px-4 py-2 text-[13px]">contact ↗</a>
        </nav>
      </div>
    </header>
  )
}

function SectionHead({ id, num, kicker, title, sub }) {
  return (
    <div id={id} className="mb-12 pt-4">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-mono text-xs text-signal">{num}</span>
        <span className="label">{kicker}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tightest text-balance max-w-3xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-3 text-ink-300 max-w-2xl text-balance">{sub}</p>
      )}
      <div className="scanline-divider mt-8" />
    </div>
  )
}

function DemoNotice() {
  return (
    <div className="border border-warn/30 bg-warn/5 px-4 py-2.5 mb-6 flex items-start gap-3">
      <span className="font-mono text-warn text-xs mt-0.5">!</span>
      <p className="font-mono text-[13px] text-ink-200 leading-relaxed">
        Demo only. Use fake/sample data. Do not paste private, regulated, financial, client, or sensitive information.
      </p>
    </div>
  )
}

/* ---------- HERO ---------- */

function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-block w-1.5 h-1.5 bg-signal animate-pulse" />
          <span className="label">live · fixed-scope ops automation sprint</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tightest leading-[0.95] text-balance max-w-4xl">
          I automate <br className="hidden md:block" />
          <span className="text-ink-300">repetitive business</span> <br className="hidden md:block" />
          workflows.
        </h1>

        <p className="mt-8 text-lg text-ink-200 max-w-2xl leading-relaxed">
          Spreadsheets, reports, email, files, forms, and data cleanup —
          turned into fixed-scope automations. One workflow. Fixed price.
          No vague AI consulting.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#demos" className="btn-primary">
            view demos →
          </a>
          <a href="#contact" className="btn-secondary">
            send me a workflow
          </a>
        </div>

        {/* Spec strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-700 border border-ink-700">
          {[
            ['scope', 'fixed'],
            ['price', 'fixed'],
            ['handoff', 'documented'],
            ['validation', 'client-confirmed'],
          ].map(([k, v]) => (
            <div key={k} className="bg-ink-900 px-5 py-4">
              <div className="label mb-1">{k}</div>
              <div className="font-mono text-sm text-ink-100">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===========================================================
   DEMO LAB — tabbed interface for 5 demos
   =========================================================== */

const DEMOS = [
  { id: 'roi',      name: 'workflow_roi',     label: 'Workflow ROI Calculator' },
  { id: 'csv',      name: 'csv_cleanup',      label: 'CSV Cleanup' },
  { id: 'report',   name: 'weekly_report',    label: 'Weekly Report Generator' },
  { id: 'rename',   name: 'file_renaming',    label: 'File Renaming Preview' },
  { id: 'intake',   name: 'intake_followup',  label: 'Intake → Follow-Up' },
]

function DemoLab() {
  const [active, setActive] = useState('roi')

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <SectionHead
        id="demos"
        num="01"
        kicker="interactive demos"
        title="Try the kind of work I ship."
        sub="Five mini demos. Front-end only, fake data. They illustrate the shape of automations I build for clients — not their full implementations."
      />

      {/* Tab strip */}
      <div className="border border-ink-700 bg-ink-900/40">
        <div className="flex flex-wrap border-b border-ink-700">
          {DEMOS.map((d, i) => {
            const isActive = active === d.id
            return (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                className={`flex-1 min-w-[140px] px-4 py-3 text-left border-r border-ink-700 last:border-r-0
                           font-mono text-xs transition-colors
                           ${isActive
                             ? 'bg-ink-800 text-signal'
                             : 'text-ink-300 hover:text-ink-100 hover:bg-ink-900'}`}
              >
                <div className="text-[11px] text-ink-400 mb-0.5">demo_{String(i+1).padStart(2,'0')}</div>
                <div>{d.name}</div>
              </button>
            )
          })}
        </div>

        <div className="p-6 md:p-8">
          {active === 'roi'    && <DemoROI />}
          {active === 'csv'    && <DemoCSV />}
          {active === 'report' && <DemoReport />}
          {active === 'rename' && <DemoFilenames />}
          {active === 'intake' && <DemoIntake />}
        </div>
      </div>
    </section>
  )
}

/* ---------- DEMO 1: ROI Calculator ---------- */

function DemoROI() {
  const [hoursPerWeek, setHours] = useState(6)
  const [hourlyValue,  setRate]  = useState(75)
  const [people,       setPpl]   = useState(2)

  const monthly = hoursPerWeek * 4.33 * hourlyValue * people
  const yearly  = monthly * 12
  // Conservative automation value: 70% of yearly cost recovered (net of maintenance)
  const automationValue = yearly * 0.7

  const fmt = (n) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })

  return (
    <div>
      <DemoNotice />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="label mb-4">inputs</div>
          <div className="space-y-4">
            <Field label="hours / week / person">
              <input type="number" min="0" step="0.5" value={hoursPerWeek}
                     onChange={(e)=>setHours(parseFloat(e.target.value)||0)}
                     className="input" />
            </Field>
            <Field label="hourly value of time ($)">
              <input type="number" min="0" step="5" value={hourlyValue}
                     onChange={(e)=>setRate(parseFloat(e.target.value)||0)}
                     className="input" />
            </Field>
            <Field label="people doing this task">
              <input type="number" min="1" step="1" value={people}
                     onChange={(e)=>setPpl(parseInt(e.target.value)||1)}
                     className="input" />
            </Field>
          </div>
        </div>

        <div>
          <div className="label mb-4">output</div>
          <div className="space-y-3">
            <Stat label="monthly time cost" value={fmt(monthly)} />
            <Stat label="yearly time cost"  value={fmt(yearly)} accent />
            <Stat label="estimated automation value (yr)" value={fmt(automationValue)} mono />
            <p className="text-xs text-ink-400 leading-relaxed pt-2">
              Estimate assumes ~70% of recovered time, net of maintenance and validation overhead.
              A real proposal narrows this number to your specific workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- DEMO 2: CSV Cleanup ---------- */

const SAMPLE_CSV = `Name, email,  Company , status
 Jane Doe , JANE@ACME.com, Acme Co. , active
john smith,john@acme.com,acme co.,Active
Jane Doe, jane@acme.com,Acme Co.,active
   ,,,
ALICIA WONG ,Alicia@beta.io ,Beta Industries,paused
bob jones ,bob@gamma.co , Gamma LLC ,ACTIVE
john smith,john@acme.com,acme co.,active`

function DemoCSV() {
  const [raw, setRaw] = useState(SAMPLE_CSV)
  const [result, setResult] = useState(null)

  const cleanCsv = () => {
    const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0)
    if (lines.length === 0) { setResult({ headers: [], rows: [], fixes: [] }); return }

    const splitRow = (line) => line.split(',').map(c => c.trim())

    // Headers: title case, normalized
    const rawHeaders = splitRow(lines[0])
    const headers = rawHeaders.map(h => titleCase(h.replace(/\s+/g, ' ')))

    const fixes = []
    let trimCount = 0, blankSkipped = 0, dupSkipped = 0, caseFixed = 0

    const seen = new Set()
    const rows = []
    for (let i = 1; i < lines.length; i++) {
      const cells = splitRow(lines[i])
      // Skip fully blank rows
      if (cells.every(c => c === '')) { blankSkipped++; continue }

      // Trim + normalize
      const cleaned = cells.map((c, idx) => {
        const before = c
        let v = c.trim().replace(/\s+/g, ' ')
        if (v !== before) trimCount++

        const header = (headers[idx] || '').toLowerCase()
        if (header.includes('email')) {
          const lower = v.toLowerCase()
          if (lower !== v) caseFixed++
          v = lower
        } else if (header === 'status') {
          const lower = v.toLowerCase()
          if (lower !== v) caseFixed++
          v = lower
        } else if (header === 'name' || header.includes('company')) {
          const tc = titleCase(v)
          if (tc !== v) caseFixed++
          v = tc
        }
        return v
      })

      const key = cleaned.join('|').toLowerCase()
      if (seen.has(key)) { dupSkipped++; continue }
      seen.add(key)
      rows.push(cleaned)
    }

    if (trimCount)    fixes.push(`${trimCount} cells trimmed / whitespace normalized`)
    if (caseFixed)    fixes.push(`${caseFixed} cells case-normalized (email lower, names title-case)`)
    if (blankSkipped) fixes.push(`${blankSkipped} blank row${blankSkipped>1?'s':''} removed`)
    if (dupSkipped)   fixes.push(`${dupSkipped} duplicate row${dupSkipped>1?'s':''} removed`)
    if (fixes.length === 0) fixes.push('No issues found — file already clean.')

    setResult({ headers, rows, fixes })
  }

  return (
    <div>
      <DemoNotice />
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="label mb-3">input · paste/edit messy csv</div>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className="input h-72 resize-y leading-relaxed text-xs"
            spellCheck={false}
          />
          <div className="mt-3 flex items-center gap-3">
            <button onClick={cleanCsv} className="btn-primary">clean csv →</button>
            <button onClick={() => { setRaw(SAMPLE_CSV); setResult(null) }} className="btn-ghost text-xs">
              reset sample
            </button>
          </div>
        </div>

        <div>
          <div className="label mb-3">output · cleaned table</div>
          {!result ? (
            <div className="panel h-72 flex items-center justify-center text-ink-400 font-mono text-xs">
              run the demo to see output
            </div>
          ) : (
            <div>
              <div className="panel overflow-auto max-h-72">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="bg-ink-800 text-ink-200">
                      {result.headers.map((h, i) => (
                        <th key={i} className="text-left px-3 py-2 border-b border-ink-700 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, i) => (
                      <tr key={i} className="border-b border-ink-800 last:border-b-0">
                        {row.map((cell, j) => (
                          <td key={j} className="px-3 py-2 whitespace-nowrap text-ink-100">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <div className="label mb-2">fixes applied</div>
                <ul className="space-y-1.5">
                  {result.fixes.map((f, i) => (
                    <li key={i} className="font-mono text-xs text-ink-200">
                      <span className="text-signal mr-2">+</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function titleCase(s) {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bLlc\b/g, 'LLC').replace(/\bCo\.\b/g, 'Co.').replace(/\bCo\b/g, 'Co')
}

/* ---------- DEMO 3: Weekly Report Generator ---------- */

const SAMPLE_REPORT_DATA = {
  weekOf: '2026-04-27',
  leads: [
    { source: 'website',  qualified: true,  revenue: 0    },
    { source: 'referral', qualified: true,  revenue: 0    },
    { source: 'website',  qualified: false, revenue: 0    },
    { source: 'cold',     qualified: false, revenue: 0    },
    { source: 'website',  qualified: true,  revenue: 0    },
    { source: 'referral', qualified: true,  revenue: 0    },
    { source: 'event',    qualified: true,  revenue: 0    },
  ],
  sales: [
    { client: 'A. Patel',     amount: 1500, status: 'closed' },
    { client: 'M. Reyes',     amount: 750,  status: 'closed' },
    { client: 'T. Kowalski',  amount: 3000, status: 'closed' },
    { client: 'L. Brennan',   amount: 1500, status: 'pending' },
  ],
  tasks: [
    { name: 'Quarterly report build',     status: 'done' },
    { name: 'Intake form revisions',      status: 'done' },
    { name: 'CSV import audit',            status: 'done' },
    { name: 'Vendor onboarding template',  status: 'done' },
    { name: 'New dashboard tile',          status: 'in-progress' },
    { name: 'Email sequence cleanup',      status: 'in-progress' },
  ],
}

function DemoReport() {
  const [report, setReport] = useState(null)

  const generate = () => {
    const d = SAMPLE_REPORT_DATA
    const totalLeads = d.leads.length
    const qualified  = d.leads.filter(l => l.qualified).length
    const closedSales = d.sales.filter(s => s.status === 'closed')
    const revenue = closedSales.reduce((sum, s) => sum + s.amount, 0)
    const conversion = totalLeads ? (closedSales.length / totalLeads) * 100 : 0
    const tasksDone = d.tasks.filter(t => t.status === 'done').length

    const summary =
      `Week of ${d.weekOf}: ${totalLeads} leads came in (${qualified} qualified). ` +
      `${closedSales.length} of those moved to close, generating $${revenue.toLocaleString()} in revenue ` +
      `at a ${conversion.toFixed(1)}% conversion rate. ` +
      `Operationally, ${tasksDone} of ${d.tasks.length} tracked tasks were completed; ` +
      `${d.tasks.length - tasksDone} remain in progress and carry into next week.`

    setReport({ totalLeads, qualified, closedSales: closedSales.length, revenue, conversion, tasksDone, total: d.tasks.length, summary })
  }

  return (
    <div>
      <DemoNotice />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="label mb-3">input · sample weekly data</div>
          <div className="panel p-4 font-mono text-xs space-y-3">
            <div><span className="text-ink-400">week_of:</span> <span className="text-ink-100">{SAMPLE_REPORT_DATA.weekOf}</span></div>
            <div><span className="text-ink-400">leads:</span> <span className="text-ink-100">{SAMPLE_REPORT_DATA.leads.length} records</span></div>
            <div><span className="text-ink-400">sales:</span> <span className="text-ink-100">{SAMPLE_REPORT_DATA.sales.length} records</span></div>
            <div><span className="text-ink-400">tasks:</span> <span className="text-ink-100">{SAMPLE_REPORT_DATA.tasks.length} records</span></div>
          </div>
          <button onClick={generate} className="btn-primary mt-4">generate report →</button>
        </div>

        <div>
          <div className="label mb-3">output</div>
          {!report ? (
            <div className="panel h-full min-h-[200px] flex items-center justify-center text-ink-400 font-mono text-xs">
              run the demo to see output
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-px bg-ink-700 border border-ink-700">
                <Stat compact label="total leads" value={report.totalLeads} />
                <Stat compact label="qualified" value={report.qualified} />
                <Stat compact label="closed" value={report.closedSales} />
                <Stat compact label="revenue" value={'$' + report.revenue.toLocaleString()} accent />
                <Stat compact label="conversion" value={report.conversion.toFixed(1) + '%'} />
                <Stat compact label="tasks done" value={`${report.tasksDone} / ${report.total}`} />
              </div>
              <div className="panel p-4">
                <div className="label mb-2">summary</div>
                <p className="text-[15px] text-ink-100 leading-relaxed">{report.summary}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- DEMO 4: File Renaming ---------- */

const SAMPLE_FILES = [
  'invoice final FINAL 2.pdf',
  'client_upload_scan_0001.pdf',
  'IMG_20260504.png',
  'Q1   report   v3 (copy).docx',
  'meeting notes -- ALICIA -- 5/2.txt',
  'screenshot 2026-04-30 at 11.42.13 AM.png',
  '~$proposal_draft.docx',
]

function DemoFilenames() {
  const [files, setFiles] = useState(SAMPLE_FILES.join('\n'))
  const [result, setResult] = useState(null)

  const preview = () => {
    const list = files.split(/\r?\n/).map(f => f.trim()).filter(Boolean)
    const out = list.map(orig => ({ from: orig, to: standardizeFilename(orig) }))
    setResult(out)
  }

  return (
    <div>
      <DemoNotice />
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="label mb-3">input · messy filenames (one per line)</div>
          <textarea
            value={files}
            onChange={(e) => setFiles(e.target.value)}
            className="input h-72 resize-y leading-relaxed text-xs"
            spellCheck={false}
          />
          <div className="mt-3 flex items-center gap-3">
            <button onClick={preview} className="btn-primary">preview clean names →</button>
            <button onClick={() => { setFiles(SAMPLE_FILES.join('\n')); setResult(null) }} className="btn-ghost text-xs">
              reset sample
            </button>
          </div>
          <p className="mt-3 text-xs text-ink-400 leading-relaxed">
            Preview only — no actual files are read, written, or moved.
          </p>
        </div>

        <div>
          <div className="label mb-3">output · standardized names</div>
          {!result ? (
            <div className="panel h-72 flex items-center justify-center text-ink-400 font-mono text-xs">
              run the demo to see output
            </div>
          ) : (
            <div className="panel divide-y divide-ink-800 max-h-72 overflow-auto">
              {result.map((r, i) => (
                <div key={i} className="px-3 py-2.5 font-mono text-xs leading-relaxed">
                  <div className="text-ink-400 line-through truncate">{r.from}</div>
                  <div className="text-signal truncate">{r.to}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function standardizeFilename(name) {
  // Skip Office lock files
  if (name.startsWith('~$')) return '[skipped] ' + name
  const dot = name.lastIndexOf('.')
  let base = dot > 0 ? name.slice(0, dot) : name
  let ext  = dot > 0 ? name.slice(dot + 1).toLowerCase() : ''

  let cleaned = base
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')                          // strip "(copy)" etc
    .replace(/\b(final|v\d+|copy|new|draft)\b/gi, '')   // strip noise tokens
    .replace(/\bfinal\s+final\b/gi, '')
    .replace(/\d{1,2}[:\.]\d{2}(?:[:\.]\d{2})?\s*(am|pm)?/gi, '') // strip times
    .replace(/[^a-z0-9]+/g, '-')                        // non-alnum → dash
    .replace(/-+/g, '-')                                // collapse dashes
    .replace(/^-|-$/g, '')                              // trim dashes

  if (!cleaned) cleaned = 'untitled'
  return ext ? `${cleaned}.${ext}` : cleaned
}

/* ---------- DEMO 5: Intake → Follow-up ---------- */

function DemoIntake() {
  const [form, setForm] = useState({
    name: 'Maria Chen',
    service: 'Weekly inventory report from 3 spreadsheets',
    urgency: 'this month',
    notes: 'Currently doing it by hand every Friday, takes ~2 hours. Files come in inconsistent formats.',
  })
  const [output, setOutput] = useState(null)

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const generate = () => {
    const date = new Date().toISOString().slice(0,10)
    const record = [
      `intake_id: REQ-${Math.random().toString(36).slice(2,6).toUpperCase()}`,
      `received:  ${date}`,
      `name:      ${form.name || '—'}`,
      `service:   ${form.service || '—'}`,
      `urgency:   ${form.urgency || '—'}`,
      `notes:     ${form.notes || '—'}`,
    ].join('\n')

    const email = `Subject: Re: ${form.service || 'Your workflow request'}

Hi ${firstName(form.name)},

Thanks for sending this over. Quick read on what you described:

  • Workflow:  ${form.service || '—'}
  • Cadence:   ${form.urgency || '—'}
  • Friction:  ${trimNotes(form.notes)}

Based on what you wrote, this looks like a fit for a fixed-scope sprint. I have a couple of clarifying questions before I quote:

  1. What does the final output need to look like (file? email? dashboard tile?)
  2. Who else touches this workflow today?
  3. Is there a target date we're working back from?

If you can answer those, I'll send a fixed price and timeline within 24 hours.

— Ops Automation Lab`

    const checklist = [
      `Log intake to tracker (REQ id, date, source)`,
      `Reply with 3 clarifying questions within 24h`,
      `Confirm scope is automatable (no PHI / regulated data)`,
      `Quote fixed price + timeline`,
      `Send agreement + 50% deposit invoice on accept`,
    ]

    setOutput({ record, email, checklist })
  }

  return (
    <div>
      <DemoNotice />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="label mb-4">input · intake form</div>
          <div className="space-y-3">
            <Field label="name"><input className="input" value={form.name} onChange={handle('name')} /></Field>
            <Field label="service needed"><input className="input" value={form.service} onChange={handle('service')} /></Field>
            <Field label="urgency"><input className="input" value={form.urgency} onChange={handle('urgency')} /></Field>
            <Field label="notes"><textarea className="input h-24 resize-y" value={form.notes} onChange={handle('notes')} /></Field>
          </div>
          <button onClick={generate} className="btn-primary mt-4">generate follow-up →</button>
        </div>

        <div>
          <div className="label mb-4">output</div>
          {!output ? (
            <div className="panel h-full min-h-[280px] flex items-center justify-center text-ink-400 font-mono text-xs">
              run the demo to see output
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="label mb-2">structured record</div>
                <pre className="panel p-3 font-mono text-xs text-ink-100 whitespace-pre-wrap leading-relaxed">{output.record}</pre>
              </div>
              <div>
                <div className="label mb-2">email draft</div>
                <pre className="panel p-3 font-mono text-xs text-ink-100 whitespace-pre-wrap leading-relaxed max-h-48 overflow-auto">{output.email}</pre>
              </div>
              <div>
                <div className="label mb-2">next-step checklist</div>
                <ul className="panel p-3 space-y-1.5">
                  {output.checklist.map((c, i) => (
                    <li key={i} className="font-mono text-xs text-ink-100">
                      <span className="text-signal mr-2">[ ]</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function firstName(full) { return (full || '').trim().split(/\s+/)[0] || 'there' }
function trimNotes(n) { const s = (n||'').trim(); return s.length > 90 ? s.slice(0, 87) + '...' : (s || '—') }

/* ---------- Shared small components ---------- */

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="label mb-1.5">{label}</div>
      {children}
    </label>
  )
}

function Stat({ label, value, accent, mono, compact }) {
  return (
    <div className={`bg-ink-900 ${compact ? 'px-3 py-3' : 'px-4 py-3.5'} border ${compact ? 'border-0' : 'border-ink-700'}`}>
      <div className="label mb-1">{label}</div>
      <div className={`font-mono ${compact ? 'text-base' : 'text-xl'} ${accent ? 'text-signal' : 'text-ink-100'}`}>
        {value}
      </div>
    </div>
  )
}

/* ===========================================================
   WHAT I AUTOMATE
   =========================================================== */

const AUTOMATE_LIST = [
  ['weekly spreadsheet/report generation', 'pull, transform, format, deliver — on a schedule.'],
  ['csv cleanup and formatting',           'trim, dedupe, normalize, validate against a known schema.'],
  ['intake → spreadsheet/email workflows', 'forms route to a record + a templated reply, no copy/paste.'],
  ['lead tracking & follow-up systems',    'pipeline visibility plus templated nudges at known stages.'],
  ['file renaming, moving, organization',  'standardize names; route files to the right folder.'],
  ['quote / invoice generation',           'turn a row of inputs into a clean PDF/email — every time.'],
  ['admin dashboards',                     'one screen with the numbers you actually look at on Monday.'],
  ['repetitive support / ops workflows',   'the recurring 3-step thing nobody owns. give it a system.'],
]

function WhatIAutomate() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHead
        id="what"
        num="02"
        kicker="scope · what i automate"
        title="The work has a shape. I work in that shape."
        sub="If your workflow looks like one of these, it's almost certainly a fixed-scope build."
      />
      <div className="grid md:grid-cols-2 gap-px bg-ink-700 border border-ink-700">
        {AUTOMATE_LIST.map(([title, desc], i) => (
          <div key={i} className="bg-ink-900 px-6 py-5">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] text-signal">{String(i+1).padStart(2,'0')}</span>
              <h3 className="font-mono text-sm text-ink-100">{title}</h3>
            </div>
            <p className="mt-1.5 ml-7 text-[15px] text-ink-300 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===========================================================
   PROOF
   =========================================================== */

const PROOF_ITEMS = [
  {
    metric: '1,900+',
    label: 'records',
    body: 'Built an internal bulk workflow that handled 1,900+ records and reduced a multi-hour manual process into minutes.',
  },
  {
    metric: 'min → sec',
    label: 'speedup',
    body: 'Built printer/location configuration tooling that reduced repetitive setup work from minutes per item to seconds.',
  },
  {
    metric: 'op tools',
    label: 'sftp / cli',
    body: 'Built SFTP command generators and internal support tools to reduce manual command mistakes.',
  },
  {
    metric: 'full stack',
    label: 'client systems',
    body: 'Built client workflow systems with forms, dashboards, uploads, email automation, and admin tools.',
  },
  {
    metric: 'large scale',
    label: 'rag · scrape',
    body: 'Built large-scale scraping, transcript, and RAG systems for automated research and reporting.',
  },
]

function Proof() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHead
        id="proof"
        num="03"
        kicker="proof · receipts"
        title="I have actually shipped this kind of thing."
        sub="Anonymized — no employer or client names, no PHI, no regulated data."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROOF_ITEMS.map((p, i) => (
          <div key={i} className="panel p-6 group hover:border-ink-500 transition-colors">
            <div className="flex items-baseline justify-between mb-4">
              <span className="font-mono text-2xl text-signal">{p.metric}</span>
              <span className="label">{p.label}</span>
            </div>
            <p className="text-[15px] text-ink-200 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===========================================================
   PACKAGES
   =========================================================== */

const PACKAGES = [
  {
    price: '$750',
    name: 'Quick Automation',
    sub: 'one workflow · one in · one out',
    points: [
      'Single repetitive task',
      'One input source, one output target',
      'Basic handoff notes',
      'Validation checklist for client',
    ],
  },
  {
    price: '$1,500',
    name: 'Core Automation Sprint',
    sub: 'multi-step · validated · documented',
    featured: true,
    points: [
      'Multi-step workflow',
      'Input validation & error handling',
      'Documentation + run instructions',
      'One round of revisions after handoff',
    ],
  },
  {
    price: '$3,000',
    name: 'Ops System Build',
    sub: 'automation + dashboard + process',
    points: [
      'Automation core (as Sprint)',
      'Reporting / dashboard layer',
      'Cleaner internal process map',
      'Two rounds of revisions',
    ],
  },
]

function Packages({ onSelectPackage }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHead
        id="packages"
        num="04"
        kicker="pricing · fixed scope"
        title="Three packages. Pick one."
        sub="No retainers. No hourly. No vague AI consulting. Pick the shape, and we scope it."
      />
      <div className="grid md:grid-cols-3 gap-4">
        {PACKAGES.map((p, i) => (
          <div key={i}
               className={`p-7 flex flex-col ${p.featured
                 ? 'border-2 border-signal bg-ink-900 relative'
                 : 'panel'}`}>
            {p.featured && (
              <div className="absolute -top-3 left-7 px-2.5 py-0.5 bg-signal text-ink-950 font-mono text-[11px] uppercase tracking-wider">
                most common
              </div>
            )}
            <div className="font-mono text-3xl text-ink-100 mb-1">{p.price}</div>
            <div className="font-mono text-sm text-ink-100 mb-1">{p.name}</div>
            <div className="font-mono text-xs text-ink-400 mb-6">{p.sub}</div>
            <ul className="space-y-2 mb-6 flex-1">
              {p.points.map((pt, j) => (
                <li key={j} className="text-[15px] text-ink-200 leading-relaxed flex items-start">
                  <span className="marker-dot mt-2 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onSelectPackage(`${p.price} ${p.name}`)}
              className={p.featured ? 'btn-primary' : 'btn-secondary'}>
              start this →
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===========================================================
   BOUNDARIES
   =========================================================== */

const BOUNDARIES = [
  '50% upfront before any build work begins.',
  'Fixed scope only — no open-ended retainers.',
  'No PHI, regulated data, credentials, or sensitive customer/financial records in the demos or intake form.',
  'No vague "automate my whole business" projects. One workflow at a time.',
  'No unpaid custom builds or speculative work. The demos on this page show the style of work before we scope anything.',
  'Client validates outputs before any operational use.',
]

function Boundaries() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHead
        id="boundaries"
        num="05"
        kicker="boundaries · how i work"
        title="The constraints that keep this fast and clean."
        sub="These aren't negotiable. They're what makes a fixed-scope sprint actually work."
      />
      <div className="panel divide-y divide-ink-800">
        {BOUNDARIES.map((b, i) => (
          <div key={i} className="px-6 py-4 flex items-start gap-4">
            <span className="font-mono text-xs text-signal mt-1 shrink-0">
              {String(i+1).padStart(2,'0')}
            </span>
            <p className="text-[15px] text-ink-100 leading-relaxed">{b}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===========================================================
   CONTACT — generates copyable intake summary
   =========================================================== */

function Contact({ selectedPackage, clearPackage }) {
  const [form, setForm] = useState({
    name: '', email: '',
    workflow: '', frequency: '', tools: '', output: '',
  })
  const [copied, setCopied] = useState(false)

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const summary = useMemo(() => {
    const pkgLine = selectedPackage
      ? `Package interest: ${selectedPackage}\n\n`
      : ''
    return `OPS AUTOMATION LAB — INTAKE SUMMARY
====================================

${pkgLine}Name:      ${form.name || '—'}
Email:     ${form.email || '—'}

1. What workflow do you repeat?
   ${form.workflow || '—'}

2. How often?
   ${form.frequency || '—'}

3. What tools / files are involved?
   ${form.tools || '—'}

4. What output do you need?
   ${form.output || '—'}

------------------------------------
Reply to: josephwquinn90@outlook.com`
  }, [form, selectedPackage])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // clipboard blocked — fallback: select the textarea
      const ta = document.getElementById('intake-summary-preview')
      if (ta) { ta.select(); document.execCommand('copy') }
      setCopied(true); setTimeout(() => setCopied(false), 2200)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHead
        id="contact"
        num="06"
        kicker="intake · send me a workflow"
        title="Want me to look at one workflow?"
        sub="Copy the intake summary and send it to me. I'll tell you within 24 hours whether it is a fit and what price range it falls into."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {selectedPackage && (
            <div className="flex items-start justify-between gap-3 px-4 py-3 border border-signal/40 bg-signal/5">
              <div className="min-w-0">
                <div className="label text-signal mb-1">selected package</div>
                <div className="font-mono text-[13px] text-ink-100 truncate">{selectedPackage}</div>
              </div>
              <button
                type="button"
                onClick={clearPackage}
                className="font-mono text-xs text-ink-300 hover:text-ink-100 transition-colors px-2 py-1 shrink-0"
                aria-label="clear selected package">
                clear ×
              </button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <Field label="name"><input className="input" value={form.name} onChange={handle('name')} placeholder="Jane Doe" /></Field>
            <Field label="email"><input type="email" className="input" value={form.email} onChange={handle('email')} placeholder="jane@company.co" /></Field>
          </div>
          <Field label="1 · what workflow do you repeat?">
            <textarea className="input h-20 resize-y" value={form.workflow} onChange={handle('workflow')}
                      placeholder="e.g. weekly inventory report from 3 spreadsheets" />
          </Field>
          <Field label="2 · how often?">
            <input className="input" value={form.frequency} onChange={handle('frequency')} placeholder="weekly / daily / on every new lead..." />
          </Field>
          <Field label="3 · what tools / files are involved?">
            <textarea className="input h-20 resize-y" value={form.tools} onChange={handle('tools')}
                      placeholder="Google Sheets, Outlook, .csv exports from POS..." />
          </Field>
          <Field label="4 · what output do you need?">
            <textarea className="input h-20 resize-y" value={form.output} onChange={handle('output')}
                      placeholder="A single PDF / a row appended / an email sent..." />
          </Field>
          <button onClick={copy} className="btn-primary mt-3 w-full">
            {copied ? '✓ copied — paste into email/dm' : 'copy intake summary'}
          </button>

          <div className="mt-3 panel p-4">
            <div className="label mb-2">send to</div>
            <div className="font-mono text-[13px] text-ink-100 leading-relaxed">
              Email: <span className="text-signal">josephwquinn90@outlook.com</span>
            </div>
            <div className="font-mono text-[13px] text-ink-100 leading-relaxed mt-1">
              or DM on LinkedIn: <span className="text-signal">linkedin.com/in/joseph-quinn-730622218</span>
            </div>
          </div>

          <p className="text-xs text-ink-400 leading-relaxed">
            This form does not submit anywhere. Nothing is saved or transmitted. You copy the text and send it yourself.
          </p>
        </div>

        <div>
          <div className="label mb-2">preview · what gets copied</div>
          <textarea
            id="intake-summary-preview"
            value={summary}
            readOnly
            className="input font-mono text-xs h-[28rem] resize-none leading-relaxed"
          />
        </div>
      </div>
    </section>
  )
}

/* ===========================================================
   FOOTER
   =========================================================== */

function Footer() {
  return (
    <footer className="border-t border-ink-800 mt-10">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-signal" />
          <span className="font-mono text-xs text-ink-300">ops_automation_lab</span>
        </div>
        <div className="font-mono text-xs text-ink-400 leading-relaxed">
          © {new Date().getFullYear()} · fixed-scope ops automation sprints · front-end demos use sample data only
        </div>
      </div>
    </footer>
  )
}
