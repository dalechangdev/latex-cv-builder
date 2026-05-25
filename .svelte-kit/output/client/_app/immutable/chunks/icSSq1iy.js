import{a as f,f as v}from"./ChJdINjd.js";import{av as y,aV as w,G as _,a3 as z,aK as $,az as k,as as R,aN as E,aC as u}from"./DF_Zawxt.js";import{e as L,r as T}from"./CnuogJGj.js";import{i as H,b as S}from"./C3Kzn10D.js";function b(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function g(n){return n.replace(/\$([^$]+)\$/g,(e,t)=>`<span class="math">${b(t)}</span>`).replace(/\\textbf\{([^}]*)\}/g,"<strong>$1</strong>").replace(/\\textit\{([^}]*)\}/g,"<em>$1</em>").replace(/\\texttt\{([^}]*)\}/g,"<code>$1</code>").replace(/\\underline\{([^}]*)\}/g,"<u>$1</u>").replace(/\\emph\{([^}]*)\}/g,"<em>$1</em>").replace(/\{\\(Huge|huge|LARGE|Large|large|normalsize|small|footnotesize)\s+([^}]*)\}/g,(e,t,l)=>`<span style="font-size:${{Huge:"2em",huge:"1.8em",LARGE:"1.5em",Large:"1.3em",large:"1.15em",normalsize:"1em",small:"0.85em",footnotesize:"0.75em"}[t]??"1em"}">${g(l)}</span>`).replace(/\\href\{([^}]*)\}\{([^}]*)\}/g,'<a href="$1">$2</a>').replace(/\\url\{([^}]*)\}/g,(e,t)=>`<a href="${t}">${b(t)}</a>`).replace(/\\quad\b/g," ").replace(/\\qquad\b/g,"  ").replace(/~(?!\\)/g," ").replace(/\\~/g," ").replace(/\\,/g," ").replace(/\\;/g," ").replace(/---/g,"—").replace(/--/g,"–").replace(/\\hfill\s*/g,'<span class="hfill"></span>').replace(/\\\\(\[\d+pt\])?/g,(e,t)=>`<br${t?` style="margin-bottom:${t.slice(1,-1)}"`:""}>`).replace(/\\%/g,"%").replace(/\\&/g,"&amp;").replace(/\\#/g,"#").replace(/\\\$/g,"$").replace(/\\_/g,"_").replace(/\\cdot\b/g,"·").replace(/\\bullet\b/g,"•").replace(/``/g,"“").replace(/''/g,"”").replace(/\\[{}]/g,"").replace(/[{}]/g,"").replace(/\s{2,}/g," ")}function x(n){const e=t=>`

${t}

`;return n.replace(/\\vspace\*?\{([^}]+)\}/g,(t,l)=>{const a=parseFloat(l),p=Number.isFinite(a)?Math.max(2,a*1.33):8;return e(`<div style="height:${p}px"></div>`)}).replace(/\\medskip\b/g,e('<div style="height:8px"></div>')).replace(/\\bigskip\b/g,e('<div style="height:14px"></div>')).replace(/\\smallskip\b/g,e('<div style="height:4px"></div>')).replace(/\\noindent\b/g,"")}function C(n){let e=n;e=e.replace(/\\documentclass(\[.*?\])?\{[^}]*\}\s*/g,""),e=e.replace(/\\usepackage(\[.*?\])?\{[^}]*\}\s*/g,""),e=e.replace(/\\pagestyle\{[^}]*\}\s*/g,""),e=e.replace(/\\thispagestyle\{[^}]*\}\s*/g,""),e=e.replace(/\\setlength\{[^}]*\}\{[^}]*\}\s*/g,""),e=e.replace(/\\setcounter\{[^}]*\}\{[^}]*\}\s*/g,""),e=e.replace(/\\begin\{document\}/g,""),e=e.replace(/\\end\{document\}/g,""),e=e.replace(new RegExp("(?<!\\\\)%.*","g"),""),e=e.replace(/\\begin\{center\}([\s\S]*?)\\end\{center\}/g,(l,a)=>`<div class="center">${g(x(a))}</div>`);const t=l=>a=>a.replace(new RegExp(`\\\\begin\\{${l}\\}([\\s\\S]*?)\\\\end\\{${l}\\}`,"g"),(p,i)=>{const r=i.replace(/\\setlength[^\\]*/g,"").split(/\\item\b/).slice(1).map(s=>`<li>${g(s.trim().replace(/\n+/g," "))}</li>`).join(`
`);return`<${l==="itemize"?"ul":"ol"}>${r}</${l==="itemize"?"ul":"ol"}>`});return e=t("itemize")(e),e=t("enumerate")(e),e=t("itemize")(e),e=t("enumerate")(e),e=e.replace(/\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g,(l,a)=>`<table class="tabular">${a.split(/\\\\/).map(i=>i.replace(/\\hline\b/g,"").trim().split("&").map(d=>`<td>${g(d.trim())}</td>`).join("")).filter(i=>i.replace(/<td><\/td>/g,"").trim()).map(i=>`<tr>${i}</tr>`).join(`
`)}</table>`),e=e.replace(/\\hrule\b/g,`

<hr>

`),e=e.replace(/\\hline\b/g,`

<hr>

`),e=e.replace(/\\section\*?\{([^}]*)\}/g,(l,a)=>`

<h2>${g(a)}</h2>

`),e=e.replace(/\\subsection\*?\{([^}]*)\}/g,(l,a)=>`

<h3>${g(a)}</h3>

`),e=e.replace(/\\subsubsection\*?\{([^}]*)\}/g,(l,a)=>`

<h4>${g(a)}</h4>

`),e=x(e),e=e.split(/\n{2,}/).map(l=>{const a=l.trim();return!a||a.startsWith("<")?a:`<p>${g(a)}</p>`}).join(`
`),e}function j(n){return`<!DOCTYPE html>
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
${n}
</body>
</html>`}var q=v('<div class="absolute top-3 right-4 z-10 flex items-center gap-2 rounded-full bg-blue-900/80 px-3 py-1 text-xs text-blue-200"><span class="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-400"></span> Rendering…</div>'),D=v('<div class="relative w-full"><!> <iframe title="LaTeX Preview" sandbox="allow-same-origin" style="min-height: 1056px" class="w-full border-0 bg-white block"></iframe></div>');function F(n,e){y(e,!0);let t,l=E(!1);w(()=>{var s,m;const r=e.source;if(!(!r.trim()||!t)){u(l,!0);try{const c=C(r),o=j(c);t.srcdoc=o,(s=e.onStatusChange)==null||s.call(e,{ok:!0,message:"Rendered successfully"})}catch(c){const o=c instanceof Error?c.message:String(c);(m=e.onStatusChange)==null||m.call(e,{ok:!1,message:o}),t.srcdoc=`<!DOCTYPE html><html><body style="font-family:monospace;padding:24px;color:#c0392b;background:#fff8f8">
        <strong>Render error</strong><pre style="font-size:12px;margin-top:12px">${o.replace(/</g,"&lt;")}</pre>
      </body></html>`}finally{u(l,!1)}}});function a(r){var m,c;const s=r.currentTarget;try{const o=(c=(m=s.contentDocument)==null?void 0:m.body)==null?void 0:c.scrollHeight;o&&o>0&&(s.style.height=`${o+40}px`)}catch{}}var p=D(),i=_(p);{var d=r=>{var s=q();f(r,s)};H(i,r=>{z(l)&&r(d)})}var h=$(i,2);S(h,r=>t=r,()=>t),k(p),L("load",h,a),T(h),f(n,p),R()}export{F as default};
