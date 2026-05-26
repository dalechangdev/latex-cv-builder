<script lang="ts">
  import { templates } from '$lib/templates';

  interface Props {
    selectedTemplate: string;
    onTemplateChange: (id: string) => void;
    onCompilePdf: (fileName: string) => void;
    isCompiling: boolean;
    status: { ok: boolean; message: string } | null;
  }

  let { selectedTemplate, onTemplateChange, onCompilePdf, isCompiling, status }: Props = $props();

  let menuOpen = $state(false);
  let fileName = $state('');
  let menuEl: HTMLDivElement | undefined;
  let triggerEl: HTMLButtonElement | undefined;
  let inputEl: HTMLInputElement | undefined;

  $effect(() => {
    if (!menuOpen) return;
    inputEl?.focus();

    function onMouseDown(e: MouseEvent) {
      if (!menuEl?.contains(e.target as Node) && !triggerEl?.contains(e.target as Node)) {
        menuOpen = false;
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  });

  function toggleMenu() {
    if (isCompiling) return;
    menuOpen = !menuOpen;
    if (menuOpen) fileName = '';
  }

  function handleSave() {
    if (!fileName.trim() || isCompiling) return;
    onCompilePdf(fileName.trim());
    menuOpen = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') menuOpen = false;
  }
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

    <div class="relative">
      <button
        bind:this={triggerEl}
        onclick={toggleMenu}
        disabled={isCompiling}
        aria-expanded={menuOpen}
        aria-haspopup="dialog"
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

      {#if menuOpen}
        <div
          bind:this={menuEl}
          role="dialog"
          aria-label="Save PDF"
          class="absolute right-0 top-full z-50 mt-1.5 w-64 rounded-lg border border-zinc-700 bg-zinc-900 p-3 shadow-xl"
        >
          <label for="pdf-filename" class="mb-1.5 block text-xs font-medium text-zinc-400">
            File name
          </label>
          <div class="flex items-center rounded border border-zinc-600 bg-zinc-800 focus-within:ring-1 focus-within:ring-blue-500">
            <input
              bind:this={inputEl}
              bind:value={fileName}
              id="pdf-filename"
              type="text"
              placeholder="resume"
              onkeydown={handleKeydown}
              class="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
            />
            <span class="shrink-0 pr-2 text-xs text-zinc-500">.pdf</span>
          </div>
          <div class="mt-2.5 flex justify-end">
            <button
              onclick={handleSave}
              disabled={!fileName.trim()}
              class="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</header>
