import { P as ensure_array_like, Q as escape_html, G as attr, J as attr_style, a7 as stringify } from "../../chunks/renderer.js";
const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Clean single-column resume",
    source: `\\documentclass[11pt]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{hyperref}

\\pagestyle{empty}

\\begin{document}

% ─── Header ───────────────────────────────────────────────────────────────────
\\begin{center}
{\\Huge \\textbf{Jane Smith}} \\\\[6pt]
\\href{mailto:jane@example.com}{jane@example.com}\\quad
$\\cdot$\\quad (415) 555-0123\\quad
$\\cdot$\\quad San Francisco, CA\\\\[2pt]
\\href{https://linkedin.com/in/janesmith}{linkedin.com/in/janesmith}\\quad
$\\cdot$\\quad
\\href{https://github.com/janesmith}{github.com/janesmith}
\\end{center}

\\medskip
\\hrule
\\medskip

% ─── Experience ───────────────────────────────────────────────────────────────
\\section*{Experience}

\\textbf{Senior Software Engineer} \\hfill \\textbf{Jan 2022 -- Present}\\\\
\\textit{Acme Corp --- San Francisco, CA}
\\begin{itemize}
  \\setlength\\itemsep{2pt}
  \\item Led migration of monolith to microservices, reducing deploy time by 60\\%
  \\item Mentored a team of 4 engineers; established code-review and testing standards
  \\item Drove adoption of TypeScript across 12 services, eliminating a class of runtime bugs
\\end{itemize}

\\textbf{Software Engineer} \\hfill \\textbf{Jun 2019 -- Dec 2021}\\\\
\\textit{Startup Inc --- San Francisco, CA}
\\begin{itemize}
  \\setlength\\itemsep{2pt}
  \\item Built real-time chat using WebSockets; scaled to 50k concurrent users
  \\item Reduced P95 API latency from 800ms to 120ms through query optimization
\\end{itemize}

\\medskip
\\hrule
\\medskip

% ─── Education ────────────────────────────────────────────────────────────────
\\section*{Education}

\\textbf{B.S. Computer Science} \\hfill \\textbf{2015 -- 2019}\\\\
\\textit{University of California, Berkeley}\\quad GPA: 3.8/4.0

\\medskip
\\hrule
\\medskip

% ─── Skills ───────────────────────────────────────────────────────────────────
\\section*{Skills}

\\textbf{Languages:}~Python, TypeScript, Go, Rust, SQL \\\\
\\textbf{Frameworks:}~React, Node.js, FastAPI, gRPC \\\\
\\textbf{Infrastructure:}~AWS, Docker, Kubernetes, Terraform, PostgreSQL

\\end{document}`
  },
  {
    id: "academic",
    name: "Academic",
    description: "CV style with publications and research",
    source: `\\documentclass[11pt]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}

\\pagestyle{empty}

\\begin{document}

% ─── Header ───────────────────────────────────────────────────────────────────
\\begin{center}
{\\Huge \\textbf{Dr. Alex Chen}} \\\\[6pt]
Department of Computer Science, MIT \\\\
\\href{mailto:alex@mit.edu}{alex@mit.edu}\\quad
$\\cdot$\\quad +1 (617) 555-0199\\quad
$\\cdot$\\quad \\href{https://alexchen.mit.edu}{alexchen.mit.edu}
\\end{center}

\\bigskip
\\hrule
\\bigskip

% ─── Research Interests ───────────────────────────────────────────────────────
\\section*{Research Interests}

Distributed systems, machine learning systems, program synthesis,
formal verification of concurrent programs.

\\bigskip
\\hrule
\\bigskip

% ─── Education ────────────────────────────────────────────────────────────────
\\section*{Education}

\\textbf{Ph.D. Computer Science} \\hfill \\textbf{2018 -- 2023}\\\\
\\textit{Massachusetts Institute of Technology}\\\\
Dissertation: \\textit{Verified Concurrency for Distributed Databases}\\\\
Advisor: Prof. Barbara Liskov

\\medskip

\\textbf{B.S. Computer Science \\& Mathematics} \\hfill \\textbf{2014 -- 2018}\\\\
\\textit{Carnegie Mellon University}\\quad GPA: 4.0/4.0, Valedictorian

\\bigskip
\\hrule
\\bigskip

% ─── Publications ─────────────────────────────────────────────────────────────
\\section*{Selected Publications}

\\begin{enumerate}
  \\setlength\\itemsep{6pt}
  \\item \\textbf{A. Chen}, B. Liskov. \`\`VerifiedTx: Formally Verified Distributed Transactions.''
        \\textit{OSDI 2023}, pp. 1--18.
  \\item \\textbf{A. Chen}, M. Zaharia, J. Gonzalez. \`\`MLSys Benchmarking at Scale.''
        \\textit{MLSys 2022}, pp. 45--60.
  \\item \\textbf{A. Chen}, S. Madden. \`\`Lightweight Verification for Concurrent Data Structures.''
        \\textit{PLDI 2021}, pp. 234--248.
\\end{enumerate}

\\bigskip
\\hrule
\\bigskip

% ─── Experience ───────────────────────────────────────────────────────────────
\\section*{Academic \\& Industry Experience}

\\textbf{Postdoctoral Researcher} \\hfill \\textbf{2023 -- Present}\\\\
\\textit{Stanford University --- DAWN Lab}

\\medskip

\\textbf{Research Intern} \\hfill \\textbf{Summer 2022}\\\\
\\textit{Google Brain --- Systems Research Group}

\\bigskip
\\hrule
\\bigskip

% ─── Awards ───────────────────────────────────────────────────────────────────
\\section*{Awards \\& Fellowships}

\\begin{itemize}
  \\setlength\\itemsep{2pt}
  \\item NSF Graduate Research Fellowship (2018)
  \\item Best Paper Award, OSDI 2023
  \\item MIT Presidential Fellowship (2018)
\\end{itemize}

\\end{document}`
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Ultra-clean, typography-focused",
    source: `\\documentclass[10pt]{article}
\\usepackage[top=0.6in,bottom=0.6in,left=0.8in,right=0.8in]{geometry}
\\usepackage{hyperref}

\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{4pt}

\\begin{document}

% ─── Header ───────────────────────────────────────────────────────────────────
{\\huge \\textbf{Sam Rivera}}

\\vspace{4pt}
\\href{mailto:sam@example.com}{sam@example.com}\\quad
(312) 555-0140\\quad
Chicago, IL\\quad
\\href{https://samrivera.dev}{samrivera.dev}

\\vspace{8pt}
\\hrule
\\vspace{8pt}

% ─── Summary ──────────────────────────────────────────────────────────────────
Product-minded engineer with 6 years building consumer-facing web and mobile
products. Comfortable owning features end-to-end from design review to
production monitoring.

\\vspace{6pt}
\\hrule
\\vspace{6pt}

% ─── Experience ───────────────────────────────────────────────────────────────
\\textbf{EXPERIENCE}

\\vspace{4pt}
\\textbf{Staff Engineer} \\hfill 2022 -- Present\\\\
Shopify --- Remote
\\begin{itemize}
  \\setlength\\itemsep{1pt}
  \\item Architected checkout redesign serving 100M+ monthly transactions
  \\item Reduced cart abandonment 12\\% via A/B-tested UX improvements
\\end{itemize}

\\vspace{2pt}
\\textbf{Senior Engineer} \\hfill 2019 -- 2022\\\\
Stripe --- San Francisco, CA
\\begin{itemize}
  \\setlength\\itemsep{1pt}
  \\item Built Stripe Dashboard analytics, used daily by 500k merchants
  \\item Owned on-call rotation for payments core; achieved 99.999\\% uptime
\\end{itemize}

\\vspace{2pt}
\\textbf{Engineer} \\hfill 2017 -- 2019\\\\
Braintree --- Chicago, IL

\\vspace{6pt}
\\hrule
\\vspace{6pt}

% ─── Education ────────────────────────────────────────────────────────────────
\\textbf{EDUCATION}

\\vspace{4pt}
\\textbf{B.S. Software Engineering} \\hfill 2013 -- 2017\\\\
University of Illinois, Urbana-Champaign

\\vspace{6pt}
\\hrule
\\vspace{6pt}

% ─── Skills ───────────────────────────────────────────────────────────────────
\\textbf{SKILLS}

\\vspace{4pt}
Ruby, Elixir, TypeScript, React, PostgreSQL, Redis, GraphQL, AWS

\\end{document}`
  }
];
const defaultTemplate = templates[0];
function Toolbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      selectedTemplate,
      isCompiling
    } = $$props;
    $$renderer2.push(`<header class="flex h-12 shrink-0 items-center justify-between border-b border-zinc-700 bg-zinc-900 px-4"><div class="flex items-center gap-2"><span class="text-sm font-semibold text-zinc-100 tracking-tight">LaTeX Resume Builder</span></div> <div class="hidden sm:flex items-center text-xs">`);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="flex items-center gap-2"><select class="rounded border border-zinc-600 bg-zinc-800 px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"><!--[-->`);
    const each_array = ensure_array_like(templates);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let t = each_array[$$index];
      $$renderer2.option({ value: t.id, selected: t.id === selectedTemplate }, ($$renderer3) => {
        $$renderer3.push(`${escape_html(t.name)}`);
      });
    }
    $$renderer2.push(`<!--]--></select> <button${attr("disabled", isCompiling, true)} class="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500 disabled:opacity-50">`);
    if (isCompiling) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white"></span> Compiling…`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", 13)}${attr("height", 13)} viewBox="0 0 24 24" fill="none" stroke="currentColor"${attr("stroke-width", 2.5)} stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download PDF`);
    }
    $$renderer2.push(`<!--]--></button></div></header>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    defaultTemplate.source;
    let selectedTemplate = defaultTemplate.id;
    let isCompiling = false;
    let splitPct = 48;
    $$renderer2.push(`<div class="flex h-screen flex-col overflow-hidden bg-zinc-950">`);
    Toolbar($$renderer2, {
      selectedTemplate,
      isCompiling
    });
    $$renderer2.push(`<!----> <div class="flex min-h-0 flex-1 overflow-hidden"><div${attr_style(`width: ${stringify(splitPct)}%`)} class="min-w-0 overflow-hidden">`);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div role="slider" aria-label="Resize panels" aria-orientation="vertical"${attr("aria-valuemin", 20)}${attr("aria-valuemax", 80)}${attr("aria-valuenow", Math.round(splitPct))} tabindex="0" class="group relative z-10 flex w-1.5 cursor-col-resize items-center justify-center bg-zinc-800 hover:bg-blue-600 transition-colors"><div class="h-8 w-0.5 rounded-full bg-zinc-600 group-hover:bg-white/60"></div></div> <div class="min-w-0 flex-1 overflow-y-auto bg-zinc-200"><div class="p-6"><div class="mx-auto max-w-[8.5in] shadow-2xl">`);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div></div></div></div>`);
  });
}
export {
  _page as default
};
