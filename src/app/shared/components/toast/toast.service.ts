import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ToastVariant = 'default' | 'primary' | 'success' | 'warning' | 'alert';

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

const DEFAULT_DURATION = 4000;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly #toasts = signal<Toast[]>([]);
  readonly toasts = this.#toasts.asReadonly();

  private nextId = 0;

  private readonly timers = new Map<
    number,
    { timerId: ReturnType<typeof setTimeout>; remaining: number; lastTick: number }
  >();

  show(message: string, variant: ToastVariant = 'default'): number {
    const id = this.nextId++;
    this.#toasts.update(list => [...list, { id, message, variant }]);

    if (isPlatformBrowser(this.platformId)) {
      this.startTimer(id, DEFAULT_DURATION);
    }

    return id;
  }

  dismiss(id: number): void {
    this.clearTimer(id);
    this.#toasts.update(list => list.filter(t => t.id !== id));
  }

  pause(id: number): void {
    const entry = this.timers.get(id);
    if (!entry) return;

    clearTimeout(entry.timerId);
    const elapsed = Date.now() - entry.lastTick;
    entry.remaining = Math.max(0, entry.remaining - elapsed);
  }

  resume(id: number): void {
    const entry = this.timers.get(id);
    if (!entry || entry.remaining <= 0) return;

    this.startTimer(id, entry.remaining);
  }

  private startTimer(id: number, remaining: number): void {
    this.clearTimer(id);

    const timerId = setTimeout(() => this.dismiss(id), remaining);
    this.timers.set(id, { timerId, remaining, lastTick: Date.now() });
  }

  private clearTimer(id: number): void {
    const entry = this.timers.get(id);
    if (entry) {
      clearTimeout(entry.timerId);
      this.timers.delete(id);
    }
  }
}
