<script lang="ts">
  import { onMount } from 'svelte';
  import type { Component } from 'svelte';
  import Toolbar from '$lib/Toolbar.svelte';
  import { defaultTemplate, templates } from '$lib/templates';

  type EditorProps = { value: string; onChange: (v: string) => void };
  type PreviewProps = {
    source: string;
    onStatusChange?: (s: { ok: boolean; message: string }) => void;
  };

  let source = $state(defaultTemplate.source);
  let selectedTemplate = $state(defaultTemplate.id);
  let status = $state<{ ok: boolean; message: string } | null>(null);
  let isCompiling = $state(false);
  let splitPct = $state(48);

  let EditorComponent = $state<Component<EditorProps> | null>(null);
  let PreviewComponent = $state<Component<PreviewProps> | null>(null);

  let containerEl: HTMLDivElement;

  onMount(async () => {
    const [editorMod, previewMod] = await Promise.all([
      import('$lib/Editor.svelte'),
      import('$lib/Preview.svelte'),
    ]);
    EditorComponent = editorMod.default;
    PreviewComponent = previewMod.default;
  });

  function handleDividerMouseDown(e: MouseEvent) {
    e.preventDefault();
    const startX = e.clientX;
    const startPct = splitPct;

    function onMove(ev: MouseEvent) {
      const delta = ev.clientX - startX;
      const pct = startPct + (delta / containerEl.offsetWidth) * 100;
      splitPct = Math.max(20, Math.min(80, pct));
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  function handleTemplateChange(id: string) {
    const tpl = templates.find((t) => t.id === id);
    if (tpl) {
      selectedTemplate = id;
      source = tpl.source;
      status = null;
    }
  }

  async function handleCompilePdf() {
    isCompiling = true;
    status = null;
    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: res.statusText }));
        status = { ok: false, message: data.error ?? 'Compilation failed' };
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      a.click();
      URL.revokeObjectURL(url);

      fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source }),
      }).catch(() => {});

      status = { ok: true, message: 'PDF downloaded' };
    } catch {
      status = { ok: false, message: 'Network error — is the server running?' };
    } finally {
      isCompiling = false;
    }
  }
</script>

<div class="flex h-screen flex-col overflow-hidden bg-zinc-950">
  <Toolbar
    {selectedTemplate}
    onTemplateChange={handleTemplateChange}
    onCompilePdf={handleCompilePdf}
    {isCompiling}
    {status}
  />

  <div bind:this={containerEl} class="flex min-h-0 flex-1 overflow-hidden">
    <!-- Editor pane -->
    <div style="width: {splitPct}%" class="min-w-0 overflow-hidden">
      {#if EditorComponent}
        <EditorComponent value={source} onChange={(v) => (source = v)} />
      {/if}
    </div>

    <!-- Drag handle: role="slider" is the correct ARIA role for a resizable splitter -->
    <div
      role="slider"
      aria-label="Resize panels"
      aria-orientation="vertical"
      aria-valuemin={20}
      aria-valuemax={80}
      aria-valuenow={Math.round(splitPct)}
      tabindex="0"
      onmousedown={handleDividerMouseDown}
      class="group relative z-10 flex w-1.5 cursor-col-resize items-center justify-center bg-zinc-800 hover:bg-blue-600 transition-colors"
    >
      <div class="h-8 w-0.5 rounded-full bg-zinc-600 group-hover:bg-white/60"></div>
    </div>

    <!-- Preview pane -->
    <div class="min-w-0 flex-1 overflow-y-auto bg-zinc-200">
      <div class="p-6">
        <div class="mx-auto max-w-[8.5in] shadow-2xl">
          {#if PreviewComponent}
            <PreviewComponent {source} onStatusChange={(s) => (status = s)} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
