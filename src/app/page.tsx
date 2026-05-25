"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import Toolbar from "@/components/Toolbar";
import { defaultTemplate, templates } from "@/lib/templates";

// Both components use browser-only APIs — load without SSR
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
const Preview = dynamic(() => import("@/components/Preview"), { ssr: false });

export default function Home() {
  const [source, setSource] = useState(defaultTemplate.source);
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplate.id);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [splitPct, setSplitPct] = useState(48); // editor width %

  // Drag-to-resize divider
  const containerRef = useRef<HTMLDivElement>(null);
  const handleDividerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startPct = splitPct;

      const onMove = (ev: MouseEvent) => {
        const container = containerRef.current;
        if (!container) return;
        const delta = ev.clientX - startX;
        const pct = startPct + (delta / container.offsetWidth) * 100;
        setSplitPct(Math.max(20, Math.min(80, pct)));
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [splitPct]
  );

  const handleTemplateChange = useCallback((id: string) => {
    const tpl = templates.find((t) => t.id === id);
    if (tpl) {
      setSelectedTemplate(id);
      setSource(tpl.source);
      setStatus(null);
    }
  }, []);

  const handleCompilePdf = useCallback(async () => {
    setIsCompiling(true);
    setStatus(null);
    try {
      const res = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: res.statusText }));
        setStatus({ ok: false, message: data.error ?? "Compilation failed" });
        return;
      }

      // Trigger browser download of the PDF blob
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setStatus({ ok: true, message: "PDF downloaded" });
    } catch {
      setStatus({ ok: false, message: "Network error — is the server running?" });
    } finally {
      setIsCompiling(false);
    }
  }, [source]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-zinc-950">
      <Toolbar
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
        onCompilePdf={handleCompilePdf}
        isCompiling={isCompiling}
        status={status}
      />

      {/* Editor + preview panes */}
      <div
        ref={containerRef}
        className="flex min-h-0 flex-1 overflow-hidden"
      >
        {/* Editor pane */}
        <div style={{ width: `${splitPct}%` }} className="min-w-0 overflow-hidden">
          <Editor value={source} onChange={setSource} />
        </div>

        {/* Drag handle */}
        <div
          onMouseDown={handleDividerMouseDown}
          className="group relative z-10 flex w-1.5 cursor-col-resize items-center justify-center bg-zinc-800 hover:bg-blue-600 transition-colors"
        >
          <div className="h-8 w-0.5 rounded-full bg-zinc-600 group-hover:bg-white/60" />
        </div>

        {/* Preview pane — scrollable paper */}
        <div className="min-w-0 flex-1 overflow-y-auto bg-zinc-200">
          <div className="p-6">
            <div className="mx-auto max-w-[8.5in] shadow-2xl">
              <Preview source={source} onStatusChange={setStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
