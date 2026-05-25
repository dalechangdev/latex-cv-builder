<script lang="ts">
  import { templates } from '$lib/templates';

  interface Props {
    selectedTemplate: string;
    onTemplateChange: (id: string) => void;
    onCompilePdf: () => void;
    isCompiling: boolean;
    status: { ok: boolean; message: string } | null;
  }

  let { selectedTemplate, onTemplateChange, onCompilePdf, isCompiling, status }: Props = $props();
</script>

<header
  class="flex h-12 shrink-0 items-center justify-between border-b border-zinc-700 bg-zinc-900 px-4"
>
  <div class="flex items-center gap-2">
    <span class="text-sm font-semibold text-zinc-100 tracking-tight">LaTeX Resume Builder</span>
  </div>

  <div class="hidden sm:flex items-center text-xs">
    {#if status}
      <span class={status.ok ? 'text-emerald-400' : 'max-w-xs truncate text-red-400'}>
        {status.ok ? '✓ ' : '✕ '}
        {status.message}
      </span>
    {/if}
  </div>

  <div class="flex items-center gap-2">
    <select
      onchange={(e) => onTemplateChange((e.currentTarget as HTMLSelectElement).value)}
      class="rounded border border-zinc-600 bg-zinc-800 px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {#each templates as t (t.id)}
        <option value={t.id} selected={t.id === selectedTemplate}>{t.name}</option>
      {/each}
    </select>

    <button
      onclick={onCompilePdf}
      disabled={isCompiling}
      class="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
    >
      {#if isCompiling}
        <span
          class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white"
        ></span>
        Compiling…
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={13}
          height={13}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width={2.5}
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download PDF
      {/if}
    </button>
  </div>
</header>
