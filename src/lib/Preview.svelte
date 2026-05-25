<script lang="ts">
  import { latexToHtml, buildHtmlDocument } from '$lib/latexToHtml';

  interface Props {
    source: string;
    onStatusChange?: (status: { ok: boolean; message: string }) => void;
  }

  let { source, onStatusChange }: Props = $props();

  let iframeEl: HTMLIFrameElement;
  let isRendering = $state(false);

  $effect(() => {
    const s = source;
    if (!s.trim() || !iframeEl) return;

    isRendering = true;
    try {
      const body = latexToHtml(s);
      const html = buildHtmlDocument(body);
      iframeEl.srcdoc = html;
      onStatusChange?.({ ok: true, message: 'Rendered successfully' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      onStatusChange?.({ ok: false, message: msg });
      iframeEl.srcdoc = `<!DOCTYPE html><html><body style="font-family:monospace;padding:24px;color:#c0392b;background:#fff8f8">
        <strong>Render error</strong><pre style="font-size:12px;margin-top:12px">${msg.replace(/</g, '&lt;')}</pre>
      </body></html>`;
    } finally {
      isRendering = false;
    }
  });

  function handleLoad(e: Event) {
    const iframe = e.currentTarget as HTMLIFrameElement;
    try {
      const h = iframe.contentDocument?.body?.scrollHeight;
      if (h && h > 0) iframe.style.height = `${h + 40}px`;
    } catch {
      // cross-origin sandbox blocks access in some configs
    }
  }
</script>

<div class="relative w-full">
  {#if isRendering}
    <div
      class="absolute top-3 right-4 z-10 flex items-center gap-2 rounded-full bg-blue-900/80 px-3 py-1 text-xs text-blue-200"
    >
      <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-400"></span>
      Rendering…
    </div>
  {/if}
  <iframe
    bind:this={iframeEl}
    title="LaTeX Preview"
    sandbox="allow-same-origin"
    style="min-height: 1056px"
    class="w-full border-0 bg-white block"
    onload={handleLoad}
  ></iframe>
</div>
