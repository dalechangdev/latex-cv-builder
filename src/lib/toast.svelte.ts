export type ToastVariant = 'success' | 'warning';

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

let toasts = $state<Toast[]>([]);
let nextId = 0;

export function addToast(message: string, variant: ToastVariant, duration = 3500) {
  const id = nextId++;
  toasts.push({ id, message, variant });
  setTimeout(() => {
    const idx = toasts.findIndex((t) => t.id === id);
    if (idx !== -1) toasts.splice(idx, 1);
  }, duration);
}

export function dismissToast(id: number) {
  const idx = toasts.findIndex((t) => t.id === id);
  if (idx !== -1) toasts.splice(idx, 1);
}

export { toasts };
