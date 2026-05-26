<script lang="ts">
  import { toasts, dismissToast } from '$lib/toast.svelte';
</script>

<div class="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
  {#each toasts as toast (toast.id)}
    <div
      class="pointer-events-auto flex items-start gap-3 rounded-lg px-4 py-3 shadow-lg text-sm font-medium text-white max-w-xs
        {toast.variant === 'success'
        ? 'bg-emerald-600'
        : 'bg-amber-500'}"
    >
      {#if toast.variant === 'success'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={15}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width={2.5}
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mt-px shrink-0"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={15}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width={2.5}
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mt-px shrink-0"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      {/if}

      <span class="leading-snug">{toast.message}</span>

      <button
        onclick={() => dismissToast(toast.id)}
        class="ml-auto -mr-1 shrink-0 rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  {/each}
</div>
