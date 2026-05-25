<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type * as Monaco from 'monaco-editor';

  interface Props {
    value: string;
    onChange: (value: string) => void;
  }

  let { value, onChange }: Props = $props();

  let container: HTMLDivElement;
  let editor: Monaco.editor.IStandaloneCodeEditor | null = null;

  onMount(async () => {
    // Stub workers — we only use a custom Monarch tokenizer, no language services needed
    (globalThis as { MonacoEnvironment?: unknown }).MonacoEnvironment = {
      getWorker() {
        return new Worker(
          URL.createObjectURL(new Blob([''], { type: 'application/javascript' }))
        );
      },
    };

    const monaco = await import('monaco-editor');

    monaco.languages.register({ id: 'latex' });
    monaco.languages.setMonarchTokensProvider('latex', {
      tokenizer: {
        root: [
          [/%.*$/, 'comment'],
          [/\\[a-zA-Z@]+\*?/, 'keyword'],
          [/[{}]/, 'delimiter.curly'],
          [/[\[\]]/, 'delimiter.square'],
          [/\$\$?/, 'string'],
        ],
      },
    });
    monaco.editor.defineTheme('latex-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
        { token: 'delimiter.curly', foreground: 'FFD700' },
        { token: 'delimiter.square', foreground: 'DA70D6' },
        { token: 'string', foreground: 'CE9178' },
      ],
      colors: { 'editor.background': '#1E1E1E' },
    });

    editor = monaco.editor.create(container, {
      value,
      language: 'latex',
      theme: 'latex-dark',
      fontSize: 13,
      lineHeight: 20,
      wordWrap: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      tabSize: 2,
      automaticLayout: true,
      fontFamily: "'Geist Mono', 'Cascadia Code', 'Fira Code', monospace",
      fontLigatures: true,
      renderLineHighlight: 'line',
      padding: { top: 16, bottom: 16 },
    });

    editor.onDidChangeModelContent(() => {
      onChange(editor!.getValue());
    });
  });

  // Sync external value changes (e.g. template switch) without fighting the user's cursor
  $effect(() => {
    if (editor && editor.getValue() !== value) {
      editor.setValue(value);
    }
  });

  onDestroy(() => {
    editor?.dispose();
  });
</script>

<div bind:this={container} class="h-full w-full"></div>
