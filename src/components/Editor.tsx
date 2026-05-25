"use client";

import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { useCallback, useRef } from "react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const monacoRef = useRef<Parameters<OnMount>[1] | null>(null);

  const handleMount: OnMount = useCallback((_editor, monaco) => {
    monacoRef.current = monaco;

    // Register a minimal LaTeX tokenizer for syntax highlighting
    monaco.languages.register({ id: "latex" });
    monaco.languages.setMonarchTokensProvider("latex", {
      tokenizer: {
        root: [
          [/%.*$/, "comment"],
          [/\\[a-zA-Z@]+\*?/, "keyword"],
          [/\{|\}/, "delimiter.curly"],
          [/\[|\]/, "delimiter.square"],
          [/\$\$?/, "string"],
        ],
      },
    });
    monaco.editor.defineTheme("latex-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955" },
        { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
        { token: "delimiter.curly", foreground: "FFD700" },
        { token: "delimiter.square", foreground: "DA70D6" },
        { token: "string", foreground: "CE9178" },
      ],
      colors: {
        "editor.background": "#1E1E1E",
      },
    });
    monaco.editor.setTheme("latex-dark");
  }, []);

  return (
    <MonacoEditor
      language="latex"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      onMount={handleMount}
      options={{
        fontSize: 13,
        lineHeight: 20,
        wordWrap: "on",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        tabSize: 2,
        automaticLayout: true,
        fontFamily: "'Geist Mono', 'Cascadia Code', 'Fira Code', monospace",
        fontLigatures: true,
        renderLineHighlight: "line",
        padding: { top: 16, bottom: 16 },
      }}
    />
  );
}
