const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../chunks/BmkBpGYh.js","../chunks/C3Kzn10D.js","../chunks/DF_Zawxt.js","../chunks/DDNP0bAP.js","../chunks/ChJdINjd.js","../chunks/CJ2uwvXK.js","../chunks/icSSq1iy.js","../chunks/CnuogJGj.js"])))=>i.map(i=>d[i]);
import{i as J,b as ke,_ as ne,c as ae}from"../chunks/C3Kzn10D.js";import{a as N,f as j,d as Ae,c as se}from"../chunks/ChJdINjd.js";import{a as Te}from"../chunks/CJ2uwvXK.js";import{Q as Y,z as Le,ac as M,aG as K,a6 as Ie,aa as Me,a3 as x,ax as Re,l as De,aL as oe,aH as Q,ab as V,c as Pe,H as ze,ah as le,U as Ne,g as D,F as Z,_ as Fe,aJ as He,Y as Be,f as Oe,e as Ue,ao as qe,aM as ce,E as Ge,D as je,aA as be,ar as xe,I as W,a as Ve,J as Xe,an as Je,Z as Ye,y as ie,aj as Ke,a7 as Qe,C as ue,s as de,o as We,A as Ze,N as $e,a8 as et,a5 as tt,n as it,av as _e,aR as X,as as ye,aK as B,G as T,az as S,ap as fe,a1 as $,aN as F,au as pe,aC as y}from"../chunks/DF_Zawxt.js";import{d as Se,a as ee,s as me}from"../chunks/CnuogJGj.js";function rt(e,t,i){for(var n=[],o=t.length,c,s=t.length,a=0;a<o;a++){let v=t[a];xe(v,()=>{if(c){if(c.pending.delete(v),c.done.add(v),c.pending.size===0){var f=e.outrogroups;te(e,ie(c.done)),f.delete(c),f.size===0&&(e.outrogroups=null)}}else s-=1},!1)}if(s===0){var p=n.length===0&&i!==null;if(p){var l=i,g=l.parentNode;Xe(g),g.append(l),e.items.clear()}te(e,t,!p)}else c={pending:new Set(t),done:new Set},(e.outrogroups??(e.outrogroups=new Set)).add(c)}function te(e,t,i=!0){var n;if(e.pending.size>0){n=new Set;for(const s of e.pending.values())for(const a of s)n.add(e.items.get(a).e)}for(var o=0;o<t.length;o++){var c=t[o];if(n!=null&&n.has(c)){c.f|=D;const s=document.createDocumentFragment();Je(c,s)}else Ye(t[o],i)}}var ve;function nt(e,t,i,n,o,c=null){var s=e,a=new Map;{var p=e;s=M?K(Ie(p)):p.appendChild(Y())}M&&Me();var l=null,g=Be(()=>{var m=i();return Ke(m)?m:m==null?[]:ie(m)}),v,f=new Map,d=!0;function r(m){(E.effect.f&je)===0&&(E.pending.delete(m),E.fallback=l,at(E,v,s,t,n),l!==null&&(v.length===0?(l.f&D)===0?be(l):(l.f^=D,G(l,null,s)):xe(l,()=>{l=null})))}function _(m){E.pending.delete(m)}var w=Le(()=>{v=x(g);var m=v.length;let C=!1;if(M){var P=Re(s)===De;P!==(m===0)&&(s=oe(),K(s),Q(!1),C=!0)}for(var k=new Set,L=Ne,H=He(),I=0;I<m;I+=1){M&&V.nodeType===Pe&&V.data===ze&&(s=V,C=!0,Q(!1));var u=v[I],b=n(u,I),h=d?null:a.get(b);h?(h.v&&le(h.v,u),h.i&&le(h.i,I),H&&L.unskip_effect(h.e)):(h=st(a,d?s:ve??(ve=Y()),u,b,I,o,t,i),d||(h.e.f|=D),a.set(b,h)),k.add(b)}if(m===0&&c&&!l&&(d?l=Z(()=>c(s)):(l=Z(()=>c(ve??(ve=Y()))),l.f|=D)),m>k.size&&Fe(),M&&m>0&&K(oe()),!d)if(f.set(L,k),H){for(const[A,R]of a)k.has(A)||L.skip_effect(R.e);L.oncommit(r),L.ondiscard(_)}else r(L);C&&Q(!0),x(g)}),E={effect:w,items:a,pending:f,outrogroups:null,fallback:l};d=!1,M&&(s=V)}function q(e){for(;e!==null&&(e.f&Ve)===0;)e=e.next;return e}function at(e,t,i,n,o){var I;var c=t.length,s=e.items,a=q(e.effect.first),p,l=null,g=[],v=[],f,d,r,_;for(_=0;_<c;_+=1){if(f=t[_],d=o(f,_),r=s.get(d).e,e.outrogroups!==null)for(const u of e.outrogroups)u.pending.delete(r),u.done.delete(r);if((r.f&W)!==0&&be(r),(r.f&D)!==0)if(r.f^=D,r===a)G(r,null,i);else{var w=l?l.next:a;r===e.effect.last&&(e.effect.last=r.prev),r.prev&&(r.prev.next=r.next),r.next&&(r.next.prev=r.prev),z(e,l,r),z(e,r,w),G(r,w,i),l=r,g=[],v=[],a=q(l.next);continue}if(r!==a){if(p!==void 0&&p.has(r)){if(g.length<v.length){var E=v[0],m;l=E.prev;var C=g[0],P=g[g.length-1];for(m=0;m<g.length;m+=1)G(g[m],E,i);for(m=0;m<v.length;m+=1)p.delete(v[m]);z(e,C.prev,P.next),z(e,l,C),z(e,P,E),a=E,l=P,_-=1,g=[],v=[]}else p.delete(r),G(r,a,i),z(e,r.prev,r.next),z(e,r,l===null?e.effect.first:l.next),z(e,l,r),l=r;continue}for(g=[],v=[];a!==null&&a!==r;)(p??(p=new Set)).add(a),v.push(a),a=q(a.next);if(a===null)continue}(r.f&D)===0&&g.push(r),l=r,a=q(r.next)}if(e.outrogroups!==null){for(const u of e.outrogroups)u.pending.size===0&&(te(e,ie(u.done)),(I=e.outrogroups)==null||I.delete(u));e.outrogroups.size===0&&(e.outrogroups=null)}if(a!==null||p!==void 0){var k=[];if(p!==void 0)for(r of p)(r.f&W)===0&&k.push(r);for(;a!==null;)(a.f&W)===0&&a!==e.fallback&&k.push(a),a=q(a.next);var L=k.length;if(L>0){var H=c===0?i:null;rt(e,k,H)}}}function st(e,t,i,n,o,c,s,a){var p=(s&Oe)!==0?(s&Ue)===0?qe(i,!1,!1):ce(i):null,l=(s&Ge)!==0?ce(o):null;return{v:p,i:l,e:Z(()=>(c(t,p??i,l??o,a),()=>{e.delete(n)}))}}function G(e,t,i){if(e.nodes)for(var n=e.nodes.start,o=e.nodes.end,c=t&&(t.f&D)===0?t.nodes.start:i;n!==null;){var s=Qe(n);if(c.before(n),n===o)return;n=s}}function z(e,t,i){t===null?e.effect.first=i:t.next=i,i===null?e.effect.last=t:i.prev=t}function we(e){var t,i,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(i=we(e[t]))&&(n&&(n+=" "),n+=i)}else for(i in e)e[i]&&(n&&(n+=" "),n+=i);return n}function ot(){for(var e,t,i=0,n="",o=arguments.length;i<o;i++)(e=arguments[i])&&(t=we(e))&&(n&&(n+=" "),n+=t);return n}function lt(e){return typeof e=="object"?ot(e):e??""}function ct(e,t,i){var n=e==null?"":""+e;return n===""?null:n}function ut(e,t){return e==null?null:String(e)}function dt(e,t,i,n,o,c){var s=e[ue];if(M||s!==i||s===void 0){var a=ct(i);(!M||a!==e.getAttribute("class"))&&(a==null?e.removeAttribute("class"):e.className=a),e[ue]=i}return c}function ft(e,t,i,n){var o=e[de];if(M||o!==t){var c=ut(t);(!M||c!==e.getAttribute("style"))&&(c==null?e.removeAttribute("style"):e.style.cssText=c),e[de]=t}return n}const pt=Symbol("is custom element"),mt=Symbol("is html"),vt=it?"link":"LINK";function gt(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function O(e,t,i,n){var o=ht(e);M&&(o[t]=e.getAttribute(t),t==="src"||t==="srcset"||t==="href"&&e.nodeName===vt)||o[t]!==(o[t]=i)&&(t==="loading"&&(e[We]=i),i==null?e.removeAttribute(t):typeof i!="string"&&bt(e).includes(t)?e[t]=i:e.setAttribute(t,i))}function ht(e){var t;return e[t=Ze]??(e[t]={[pt]:e.nodeName.includes("-"),[mt]:e.namespaceURI===$e})}var ge=new Map;function bt(e){var t=e.getAttribute("is")||e.nodeName,i=ge.get(t);if(i)return i;ge.set(t,i=[]);for(var n,o=e,c=Element.prototype;c!==o;){n=tt(o);for(var s in n)n[s].set&&s!=="innerHTML"&&s!=="textContent"&&s!=="innerText"&&i.push(s);o=et(o)}return i}const re=[{id:"classic",name:"Classic",description:"Clean single-column resume",source:`\\documentclass[11pt]{article}
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

\\end{document}`},{id:"academic",name:"Academic",description:"CV style with publications and research",source:`\\documentclass[11pt]{article}
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

\\end{document}`},{id:"minimal",name:"Minimal",description:"Ultra-clean, typography-focused",source:`\\documentclass[10pt]{article}
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

\\end{document}`}],he=re[0];var xt=j("<span> </span>"),_t=j("<option> </option>"),yt=j('<span class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white"></span> Compiling…',1),St=Ae('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download PDF',1),wt=j('<header class="flex h-12 shrink-0 items-center justify-between border-b border-zinc-700 bg-zinc-900 px-4"><div class="flex items-center gap-2"><span class="text-sm font-semibold text-zinc-100 tracking-tight">LaTeX Resume Builder</span></div> <div class="hidden sm:flex items-center text-xs"><!></div> <div class="flex items-center gap-2"><select class="rounded border border-zinc-600 bg-zinc-800 px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"></select> <button class="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"><!></button></div></header>');function Et(e,t){_e(t,!0);var i=wt(),n=B(T(i),2),o=T(n);{var c=f=>{var d=xt(),r=T(d);S(d),X(()=>{dt(d,1,lt(t.status.ok?"text-emerald-400":"max-w-xs truncate text-red-400")),me(r,`${t.status.ok?"✓ ":"✕ "}
        ${t.status.message??""}`)}),N(f,d)};J(o,f=>{t.status&&f(c)})}S(n);var s=B(n,2),a=T(s);nt(a,21,()=>re,f=>f.id,(f,d)=>{var r=_t(),_=T(r,!0);S(r);var w={};X(()=>{gt(r,x(d).id===t.selectedTemplate),me(_,x(d).name),w!==(w=x(d).id)&&(r.value=(r.__value=x(d).id)??"")}),N(f,r)}),S(a);var p=B(a,2),l=T(p);{var g=f=>{var d=yt();fe(),N(f,d)},v=f=>{var d=St(),r=$(d);O(r,"width",13),O(r,"height",13),O(r,"stroke-width",2.5),fe(),N(f,d)};J(l,f=>{t.isCompiling?f(g):f(v,-1)})}S(p),S(s),S(i),X(()=>p.disabled=t.isCompiling),ee("change",a,f=>t.onTemplateChange(f.currentTarget.value)),ee("click",p,function(...f){var d;(d=t.onCompilePdf)==null||d.apply(this,f)}),N(e,i),ye()}Se(["change","click"]);var Ct=j('<div class="flex h-screen flex-col overflow-hidden bg-zinc-950"><!> <div class="flex min-h-0 flex-1 overflow-hidden"><div class="min-w-0 overflow-hidden"><!></div> <div role="slider" aria-label="Resize panels" aria-orientation="vertical" tabindex="0" class="group relative z-10 flex w-1.5 cursor-col-resize items-center justify-center bg-zinc-800 hover:bg-blue-600 transition-colors"><div class="h-8 w-0.5 rounded-full bg-zinc-600 group-hover:bg-white/60"></div></div> <div class="min-w-0 flex-1 overflow-y-auto bg-zinc-200"><div class="p-6"><div class="mx-auto max-w-[8.5in] shadow-2xl"><!></div></div></div></div></div>');function Mt(e,t){_e(t,!0);let i=F(pe(he.source)),n=F(pe(he.id)),o=F(null),c=F(!1),s=F(48),a=F(null),p=F(null),l;Te(async()=>{const[u,b]=await Promise.all([ne(()=>import("../chunks/BmkBpGYh.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url),ne(()=>import("../chunks/icSSq1iy.js"),__vite__mapDeps([6,4,2,7,1,3]),import.meta.url)]);y(a,u.default,!0),y(p,b.default,!0)});function g(u){u.preventDefault();const b=u.clientX,h=x(s);function A(U){const Ee=U.clientX-b,Ce=h+Ee/l.offsetWidth*100;y(s,Math.max(20,Math.min(80,Ce)),!0)}function R(){document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",R)}document.addEventListener("mousemove",A),document.addEventListener("mouseup",R)}function v(u){const b=re.find(h=>h.id===u);b&&(y(n,u,!0),y(i,b.source,!0),y(o,null))}async function f(){y(c,!0),y(o,null);try{const u=await fetch("/api/compile",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({source:x(i)})});if(!u.ok){const R=await u.json().catch(()=>({error:u.statusText}));y(o,{ok:!1,message:R.error??"Compilation failed"},!0);return}const b=await u.blob(),h=URL.createObjectURL(b),A=document.createElement("a");A.href=h,A.download="resume.pdf",A.click(),URL.revokeObjectURL(h),y(o,{ok:!0,message:"PDF downloaded"},!0)}catch{y(o,{ok:!1,message:"Network error — is the server running?"},!0)}finally{y(c,!1)}}var d=Ct(),r=T(d);Et(r,{get selectedTemplate(){return x(n)},onTemplateChange:v,onCompilePdf:f,get isCompiling(){return x(c)},get status(){return x(o)}});var _=B(r,2),w=T(_),E=T(w);{var m=u=>{var b=se(),h=$(b);ae(h,()=>x(a),(A,R)=>{R(A,{get value(){return x(i)},onChange:U=>y(i,U,!0)})}),N(u,b)};J(E,u=>{x(a)&&u(m)})}S(w);var C=B(w,2);O(C,"aria-valuemin",20),O(C,"aria-valuemax",80);var P=B(C,2),k=T(P),L=T(k),H=T(L);{var I=u=>{var b=se(),h=$(b);ae(h,()=>x(p),(A,R)=>{R(A,{get source(){return x(i)},onStatusChange:U=>y(o,U,!0)})}),N(u,b)};J(H,u=>{x(p)&&u(I)})}S(L),S(k),S(P),S(_),ke(_,u=>l=u,()=>l),S(d),X(u=>{ft(w,`width: ${x(s)??""}%`),O(C,"aria-valuenow",u)},[()=>Math.round(x(s))]),ee("mousedown",C,g),N(e,d),ye()}Se(["mousedown"]);export{Mt as component};
