"use client";

import { useEffect, useRef, useState } from "react";
import { latexToHtml, buildHtmlDocument } from "@/lib/latexToHtml";

interface PreviewProps {
  source: string;
  onStatusChange?: (status: { ok: boolean; message: string }) => void;
}

export default function Preview({ source, onStatusChange }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    if (!source.trim()) return;

    setIsRendering(true);
    try {
      const body = latexToHtml(source);
      const html = buildHtmlDocument(body);

      if (iframeRef.current) {
        iframeRef.current.srcdoc = html;
      }
      onStatusChange?.({ ok: true, message: "Rendered successfully" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      onStatusChange?.({ ok: false, message: msg });

      if (iframeRef.current) {
        iframeRef.current.srcdoc = `<!DOCTYPE html><html><body style="font-family:monospace;padding:24px;color:#c0392b;background:#fff8f8">
          <strong>Render error</strong><pre style="font-size:12px;margin-top:12px">${msg.replace(/</g, "&lt;")}</pre>
        </body></html>`;
      }
    } finally {
      setIsRendering(false);
    }
  }, [source, onStatusChange]);

  return (
    <div className="relative w-full">
      {isRendering && (
        <div className="absolute top-3 right-4 z-10 flex items-center gap-2 rounded-full bg-blue-900/80 px-3 py-1 text-xs text-blue-200">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-400" />
          Rendering…
        </div>
      )}
      {/* min-h of a US Letter page (11in at 96dpi); content can grow taller */}
      <iframe
        ref={iframeRef}
        title="LaTeX Preview"
        sandbox="allow-same-origin"
        style={{ minHeight: "1056px" }}
        className="w-full border-0 bg-white block"
        onLoad={(e) => {
          // Resize iframe to fit its content height
          const iframe = e.currentTarget;
          try {
            const h = iframe.contentDocument?.body?.scrollHeight;
            if (h && h > 0) iframe.style.height = `${h + 40}px`;
          } catch {
            // cross-origin sandbox blocks access in some configs
          }
        }}
      />
    </div>
  );
}
