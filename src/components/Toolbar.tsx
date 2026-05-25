"use client";

import { templates } from "@/lib/templates";

interface ToolbarProps {
  selectedTemplate: string;
  onTemplateChange: (id: string) => void;
  onCompilePdf: () => void;
  isCompiling: boolean;
  status: { ok: boolean; message: string } | null;
}

export default function Toolbar({
  selectedTemplate,
  onTemplateChange,
  onCompilePdf,
  isCompiling,
  status,
}: ToolbarProps) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-zinc-700 bg-zinc-900 px-4">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-zinc-100 tracking-tight">
          LaTeX Resume Builder
        </span>
      </div>

      {/* Centre: status */}
      <div className="hidden sm:flex items-center text-xs">
        {status && (
          <span
            className={
              status.ok
                ? "text-emerald-400"
                : "max-w-xs truncate text-red-400"
            }
          >
            {status.ok ? "✓ " : "✕ "}
            {status.message}
          </span>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <select
          value={selectedTemplate}
          onChange={(e) => onTemplateChange(e.target.value)}
          className="rounded border border-zinc-600 bg-zinc-800 px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <button
          onClick={onCompilePdf}
          disabled={isCompiling}
          className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
        >
          {isCompiling ? (
            <>
              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Compiling…
            </>
          ) : (
            <>
              <DownloadIcon />
              Download PDF
            </>
          )}
        </button>
      </div>
    </header>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
