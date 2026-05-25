/**
 * Lightweight LaTeX → HTML converter for resume documents.
 * Handles the standard subset used in single-column resume templates.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Convert inline LaTeX to HTML (runs inside already-processed block output). */
function inline(s: string): string {
  return (
    s
      // Escape HTML entities first (raw text might contain < > &)
      // Inline math: $...$
      .replace(/\$([^$]+)\$/g, (_, m) => `<span class="math">${escapeHtml(m)}</span>`)
      // Bold, italic, underline
      .replace(/\\textbf\{([^}]*)\}/g, "<strong>$1</strong>")
      .replace(/\\textit\{([^}]*)\}/g, "<em>$1</em>")
      .replace(/\\texttt\{([^}]*)\}/g, "<code>$1</code>")
      .replace(/\\underline\{([^}]*)\}/g, "<u>$1</u>")
      .replace(/\\emph\{([^}]*)\}/g, "<em>$1</em>")
      // Sizes
      .replace(/\{\\(Huge|huge|LARGE|Large|large|normalsize|small|footnotesize)\s+([^}]*)\}/g, (_, size, t) => {
        const sizes: Record<string, string> = {
          Huge: "2em", huge: "1.8em", LARGE: "1.5em", Large: "1.3em",
          large: "1.15em", normalsize: "1em", small: "0.85em", footnotesize: "0.75em",
        };
        return `<span style="font-size:${sizes[size] ?? "1em"}">${inline(t)}</span>`;
      })
      // href
      .replace(/\\href\{([^}]*)\}\{([^}]*)\}/g, '<a href="$1">$2</a>')
      // url
      .replace(/\\url\{([^}]*)\}/g, (_, u) => `<a href="${u}">${escapeHtml(u)}</a>`)
      // Spacing
      .replace(/\\quad\b/g, " ")
      .replace(/\\qquad\b/g, "  ")
      .replace(/~(?!\\)/g, " ") // non-breaking space
      .replace(/\\~/g, " ")
      .replace(/\\,/g, " ")
      .replace(/\\;/g, " ")
      // Dashes
      .replace(/---/g, "—")
      .replace(/--/g, "–")
      // Hfill: push the following content to the right
      .replace(/\\hfill\s*/g, '<span class="hfill"></span>')
      // Line breaks \\[Xpt] or \\ followed by [Xpt] or just \\
      .replace(/\\\\(\[\d+pt\])?/g, (_, opt) => {
        const extra = opt ? ` style="margin-bottom:${opt.slice(1, -1)}"` : "";
        return `<br${extra}>`;
      })
      // Special chars
      .replace(/\\%/g, "%")
      .replace(/\\&/g, "&amp;")
      .replace(/\\#/g, "#")
      .replace(/\\\$/g, "$")
      .replace(/\\_/g, "_")
      .replace(/\\cdot\b/g, "·")
      .replace(/\\bullet\b/g, "•")
      // Backtick pairs (LaTeX left-quote)
      .replace(/``/g, "“")
      .replace(/''/g, "”")
      // Curly braces remaining
      .replace(/\\[{}]/g, "")
      .replace(/[{}]/g, "")
      .replace(/\s{2,}/g, " ")
  );
}

/** Replace vertical spacing commands with styled divs.
 *  Wraps output in double newlines so the following text isn't merged into
 *  the same "paragraph" (which would skip inline() processing). */
function vspace(s: string): string {
  const wrap = (html: string) => `\n\n${html}\n\n`;
  return s
    .replace(/\\vspace\*?\{([^}]+)\}/g, (_, d) => {
      const pts = parseFloat(d);
      const px = Number.isFinite(pts) ? Math.max(2, pts * 1.33) : 8;
      return wrap(`<div style="height:${px}px"></div>`);
    })
    .replace(/\\medskip\b/g, wrap('<div style="height:8px"></div>'))
    .replace(/\\bigskip\b/g, wrap('<div style="height:14px"></div>'))
    .replace(/\\smallskip\b/g, wrap('<div style="height:4px"></div>'))
    .replace(/\\noindent\b/g, "");
}

/** Main converter. */
export function latexToHtml(source: string): string {
  let s = source;

  // ── Strip preamble / structural commands ────────────────────────────────
  s = s.replace(/\\documentclass(\[.*?\])?\{[^}]*\}\s*/g, "");
  s = s.replace(/\\usepackage(\[.*?\])?\{[^}]*\}\s*/g, "");
  s = s.replace(/\\pagestyle\{[^}]*\}\s*/g, "");
  s = s.replace(/\\thispagestyle\{[^}]*\}\s*/g, "");
  s = s.replace(/\\setlength\{[^}]*\}\{[^}]*\}\s*/g, "");
  s = s.replace(/\\setcounter\{[^}]*\}\{[^}]*\}\s*/g, "");
  s = s.replace(/\\begin\{document\}/g, "");
  s = s.replace(/\\end\{document\}/g, "");

  // ── Remove comments (negative lookbehind skips escaped \%) ─────────────
  s = s.replace(/(?<!\\)%.*/g, "");

  // ── Block environments ───────────────────────────────────────────────────

  // center
  s = s.replace(/\\begin\{center\}([\s\S]*?)\\end\{center\}/g, (_, body) =>
    `<div class="center">${inline(vspace(body))}</div>`
  );

  // itemize (possibly nested — handle one level at a time, twice)
  const convertList = (tag: string) => (src: string) =>
    src.replace(
      new RegExp(`\\\\begin\\{${tag}\\}([\\s\\S]*?)\\\\end\\{${tag}\\}`, "g"),
      (_, body: string) => {
        // strip optional \setlength lines
        const cleaned = body.replace(/\\setlength[^\\]*/g, "");
        const items = cleaned.split(/\\item\b/).slice(1);
        const lis = items
          .map((i) => `<li>${inline(i.trim().replace(/\n+/g, " "))}</li>`)
          .join("\n");
        return `<${tag === "itemize" ? "ul" : "ol"}>${lis}</${tag === "itemize" ? "ul" : "ol"}>`;
      }
    );

  s = convertList("itemize")(s);
  s = convertList("enumerate")(s);
  // second pass for nested
  s = convertList("itemize")(s);
  s = convertList("enumerate")(s);

  // tabular — simplified: convert rows to divs
  s = s.replace(
    /\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g,
    (_, body) => {
      const rows = body
        .split(/\\\\/)
        .map((r: string) =>
          r
            .replace(/\\hline\b/g, "")
            .trim()
            .split("&")
            .map((cell: string) => `<td>${inline(cell.trim())}</td>`)
            .join("")
        )
        .filter((r: string) => r.replace(/<td><\/td>/g, "").trim())
        .map((r: string) => `<tr>${r}</tr>`)
        .join("\n");
      return `<table class="tabular">${rows}</table>`;
    }
  );

  // ── Horizontal rules (double-newline wrap keeps adjacent text its own para) ─
  s = s.replace(/\\hrule\b/g, "\n\n<hr>\n\n");
  s = s.replace(/\\hline\b/g, "\n\n<hr>\n\n");

  // ── Sections ─────────────────────────────────────────────────────────────
  s = s.replace(/\\section\*?\{([^}]*)\}/g, (_, t) => `\n\n<h2>${inline(t)}</h2>\n\n`);
  s = s.replace(/\\subsection\*?\{([^}]*)\}/g, (_, t) => `\n\n<h3>${inline(t)}</h3>\n\n`);
  s = s.replace(/\\subsubsection\*?\{([^}]*)\}/g, (_, t) => `\n\n<h4>${inline(t)}</h4>\n\n`);

  // ── Vertical spacing ─────────────────────────────────────────────────────
  s = vspace(s);

  // ── Paragraph breaks ─────────────────────────────────────────────────────
  s = s
    .split(/\n{2,}/)
    .map((para) => {
      const t = para.trim();
      if (!t || t.startsWith("<")) return t;
      return `<p>${inline(t)}</p>`;
    })
    .join("\n");

  return s;
}

export function buildHtmlDocument(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 40px 48px;
    font-family: "Times New Roman", Times, serif;
    font-size: 11pt;
    line-height: 1.45;
    color: #111;
    background: #fff;
    max-width: 8.5in;
  }
  h2 {
    font-size: 11pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #444;
    margin: 0.8em 0 0.3em;
    padding-bottom: 2px;
  }
  h3 { font-size: 11pt; margin: 0.5em 0 0.2em; }
  h4 { font-size: 11pt; margin: 0.4em 0 0.2em; font-weight: normal; font-style: italic; }
  p { margin: 0.2em 0; }
  ul, ol { margin: 0.2em 0 0.2em 1.4em; padding: 0; }
  li { margin: 2px 0; }
  hr { border: none; border-top: 0.5px solid #555; margin: 0.5em 0; }
  a { color: #1a56db; text-decoration: none; }
  code { font-size: 10pt; }
  table.tabular { border-collapse: collapse; width: 100%; }
  td { padding: 2px 6px; vertical-align: top; }
  .center { text-align: center; }
  .math { font-style: italic; }
  /* hfill: pushes sibling content to the right inside a flex row */
  p:has(.hfill), .hfill-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0;
  }
  .hfill { flex: 1; min-width: 8px; }
  strong { font-weight: bold; }
  em { font-style: italic; }
</style>
</head>
<body>
${body}
</body>
</html>`;
}
